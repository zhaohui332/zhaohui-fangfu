#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Zhaohui Ops static API server: news search proxy + DeepSeek proxy."""

import html
import json
import os
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get('PORT', '5010'))
KEY_FILE = '/root/.zhaohui-deploy/deepseek_key'
DEEPSEEK_API = 'https://api.deepseek.com/chat/completions'


def read_deepseek_key():
    try:
        if os.path.exists(KEY_FILE):
            with open(KEY_FILE, 'r', encoding='utf-8') as fh:
                key = fh.read().strip()
            if key:
                return key
    except Exception:
        pass
    return os.environ.get('DEEPSEEK_API_KEY', '')


def strip_html(value):
    value = re.sub(r'<[^>]+>', ' ', value or '')
    return html.unescape(value).strip()


def fetch_bing_rss(query):
    url = 'https://www.bing.com/search?format=rss&q=' + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, */*'
    })
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = resp.read()
    root = ET.fromstring(data)
    items = []
    for item in root.findall('.//item')[:30]:
        def text(tag):
            el = item.find(tag)
            return el.text.strip() if el is not None and el.text else ''
        title = text('title')
        link = text('link')
        desc = strip_html(text('description'))[:220]
        pub = text('pubDate')
        if title and link:
            items.append({
                'title': title,
                'link': link,
                'desc': desc,
                'pubDate': pub,
                'source': urllib.parse.urlparse(link).netloc.replace('www.', '')
            })
    return items


class Handler(BaseHTTPRequestHandler):
    def _json(self, status, obj):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/health':
            return self._json(200, {'ok': True})
        if parsed.path == '/api/news':
            params = urllib.parse.parse_qs(parsed.query)
            query = (params.get('q') or [''])[0]
            if not query:
                return self._json(400, {'error': 'missing q'})
            try:
                items = fetch_bing_rss(query)
                return self._json(200, items)
            except Exception as exc:
                return self._json(502, {'error': str(exc)[:300], 'items': []})
        return self._json(404, {'error': 'not found'})

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path != '/api/deepseek':
            return self._json(404, {'error': 'not found'})
        length = int(self.headers.get('Content-Length', '0'))
        raw = self.rfile.read(length) if length else b'{}'
        try:
            payload = json.loads(raw.decode('utf-8'))
        except Exception:
            return self._json(400, {'error': 'bad json'})
        messages = payload.get('messages') or []
        model = payload.get('model') or 'deepseek-chat'
        api_key = payload.get('apiKey') or read_deepseek_key()
        if not api_key:
            return self._json(401, {'error': 'deepseek key not configured'})
        body = json.dumps({'model': model, 'messages': messages}, ensure_ascii=False).encode('utf-8')
        req = urllib.request.Request(DEEPSEEK_API, data=body, headers={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_key,
            'User-Agent': 'zhaohui-ops-server'
        })
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = json.loads(resp.read().decode('utf-8'))
            content = ''
            try:
                content = data['choices'][0]['message']['content']
            except Exception:
                content = json.dumps(data, ensure_ascii=False)
            return self._json(200, {'content': content})
        except urllib.error.HTTPError as exc:
            try:
                detail = exc.read().decode('utf-8', 'ignore')
            except Exception:
                detail = ''
            return self._json(exc.code, {'error': detail[:400]})
        except Exception as exc:
            return self._json(502, {'error': str(exc)[:400]})

    def log_message(self, fmt, *args):
        return


if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
    server.serve_forever()
