# 江苏兆辉防腐 · 全网智能内容营销系统

> DeepSeek API 驱动 · 多平台内容自动化生成 · 深度思考赋能

---

## 项目概览

本系统基于全网关键词研究 + DeepSeek API 深度思考能力，为**江苏兆辉防腐科技有限公司**提供一站式的多平台内容生成解决方案。覆盖 10 款核心产品 × 8 个营销平台，共计 180+ 个精准关键词和 80+ 条平台适配内容。

---

## 交付物清单

| 文件 | 说明 |
|------|------|
| [keyword_research_report.md](./keyword_research_report.md) | 全网关键词研究报告（8大类180+关键词） |
| [keyword_database.js](./keyword_database.js) | 可编程关键词数据库（可直接被代码调用） |
| [platform_strategy.md](./platform_strategy.md) | 各平台内容策略与运营指南 |
| [deepseek_content_generator.js](./deepseek_content_generator.js) | DeepSeek API 驱动的内容生成引擎 |
| [deepseek_api_wrapper.sh](./deepseek_api_wrapper.sh) | 一键启动脚本 |
| [generated_content.md](./generated_content.md) | 已生成的内容样本（5产品 × 4平台 = 20条） |
| [full_generated_content.md](./full_generated_content.md) | 全量内容（10产品 × 8平台 = 80条） |
| [generated_content.json](./generated_content.json) | JSON 格式数据（20条） |
| [full_generated_content.json](./full_generated_content.json) | JSON 格式全量数据（80条） |

---

## 快速开始

### 1. 基础使用（无需 API Key）

系统内置了专业级本地模板引擎，无需配置 API Key 即可使用：

```bash
# 进入工作目录
cd /path/to/project

# 默认生成（5产品 × 4平台 = 20条内容）
node work/deepseek_content_generator.js

# 批量生成（10产品 × 8平台 = 80条）
node -e "
  const g = require('./work/deepseek_content_generator.js');
  g.batchGenerate().then(r => g.exportMarkdown(r));
"
```

### 2. 启用 DeepSeek 深度思考

接入 DeepSeek API，让 AI 先深度分析关键词策略、用户意图、平台规则后再生成内容：

```bash
# 设置 API Key
export DEEPSEEK_API_KEY="sk-你的API密钥"

# 一键生成
bash outputs/deepseek_api_wrapper.sh

# 深度思考模式（使用 deepseek-reasoner）
# 在 deepseek_content_generator.js 中将 useReasoner 设为 true
```

### 3. 精准定向生成

```bash
node work/deepseek_content_generator.js --product "钢衬塑储罐" --platform "douyin"
node work/deepseek_content_generator.js --product "反应釜" --platform "1688"
```

---

## 关键词体系（8大类）

| 类别 | 数量 | 用途 |
|------|------|------|
| 核心产品词 | 30 | 高搜索量精准匹配 |
| 材质/工艺词 | 32 | 技术搜索用词 |
| 长尾场景词 | 21 | 高转化低竞争 |
| 区域词 | 21 | 本地化引流 |
| 竞品关联词 | 10 | 竞品截流 |
| 应用场景词 | 26 | 行业客户搜索 |
| 购买意图词 | 11 | 高转化意向 |
| 平台专用词 | 29 | 平台规则适配 |

---

## 支持平台

| 平台 | 内容形式 | 标题限制 | 特点 |
|------|----------|----------|------|
| 1688/阿里巴巴 | 商品详情页 | 30字 | 参数化+工厂实力 |
| 百度SEO | 文章页 | 28字 | 长尾词+自然排名 |
| 百度爱采购 | 企业信息页 | 30字 | 结构化+资质 |
| 抖音短视频 | 15-60s 视频 | 60字 | 场景化+生产过程 |
| 快手 | 短视频 | 60字 | 接地气+价格透明 |
| 微信公众号 | 图文 | 64字 | 专业深度+行业洞察 |
| 小红书 | 图文笔记 | 20字 | 真实分享+实用 |
| 今日头条 | 图文 | 30字 | 信息增量+观点 |

---

## 生成的内容示例

系统自动为**每种产品在每种平台上**生成：
- ✅ 平台适配的标题（符合字数、关键词布局规则）
- ✅ 完整的文案/短视频脚本
- ✅ 关联关键词列表
- ✅ 平台规则说明

### 示例：钢衬塑储罐 × 抖音

```json
{
  "product": "钢衬塑储罐",
  "platform": "抖音短视频",
  "title": "化工厂采购必看！钢衬塑储罐到底怎么选？老厂长教你避坑👷",
  "script": "【🎬 拍摄脚本 - 15秒】\n【00:00-00:03】镜头推向车间...",
  "hashtags": "#防腐储罐 #化工设备 #钢衬塑 #化工厂"
}
```

---

## DeepSeek 深度思考的独特价值

当启用 DeepSeek API 后，系统将：

1. **意图分析**：分析用户搜索背后的真实需求
2. **竞争分析**：评估关键词竞争程度
3. **平台适配**：根据平台算法规则调整内容
4. **多角度创作**：从技术、场景、价格、服务等多维度生成
5. **持续优化**：可基于效果数据不断迭代

---

## 技术架构

```
keyword_database.js  ←  全网关键词研究
        ↓
deepseek_content_generator.js  ←  DeepSeek API + 本地模板引擎
        ↓
┌───────────────── 多平台输出 ─────────────────┐
  1688   百度SEO   爱采购   抖音   快手   微信   小红书   头条
└──────────────────────────────────────────────┘
```

---

## 定制化建议

如需进一步完善系统，可以考虑：

- **接入实际搜索数据**：通过百度搜索资源平台、5118等获取真实搜索量
- **添加A/B测试功能**：对标题进行多版本测试
- **集成发布功能**：直接发布到各平台
- **竞品监控模块**：自动追踪竞品关键词变化
- **效果数据回传**：根据转化数据优化关键词权重

---

*生成时间: 2026年7月28日*
*定制专享: 江苏兆辉防腐科技有限公司*
