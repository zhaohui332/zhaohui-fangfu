'use strict';

const STORAGE_KEY = 'zhaohui_ops_v1';

const PLATFORMS = [
  {
    name: '抖音', group: '短视频阵地', weekly: 5, status: '更新中', statusColor: '#0E7264',
    role: '展示工厂实力 + 工程师人设，主攻私信留资',
    goal: '私信留资', tagClass: 'tag-green', freq: '每周 5-7 条', best: '07:00-08:00 / 18:00-20:00', metric: '主页咨询率',
    mix: [['场景实拍', 60, 'var(--green)'], ['技术干货', 25, 'var(--steel)'], ['客户案例', 15, 'var(--rust)']],
    cta: '评论区扣“衬氟方案”，私信领《选型对照表》'
  },
  {
    name: '快手', group: '短视频阵地', weekly: 3, status: '更新中', statusColor: '#0E7264',
    role: '覆盖中小工厂老板和施工队，语言更直接',
    goal: '私信咨询', tagClass: 'tag-green', freq: '每周 4-5 条', best: '06:30-08:00 / 19:00-21:00', metric: '私信率',
    mix: [['现场实拍', 55, 'var(--green)'], ['技术干货', 30, 'var(--steel)'], ['案例拆解', 15, 'var(--rust)']],
    cta: '直播或私信报工况，先给初步方向'
  },
  {
    name: '视频号', group: '短视频阵地', weekly: 2, status: '联动中', statusColor: '#B98617',
    role: '依托朋友圈和企业微信，做客户信任传播',
    goal: '添加企业微信', tagClass: 'tag-amber', freq: '每周 3-4 条', best: '12:00-13:00 / 20:00-21:00', metric: '好友添加',
    mix: [['客户案例', 45, 'var(--rust)'], ['现场实拍', 35, 'var(--green)'], ['直播切片', 20, 'var(--amber)']],
    cta: '转发到朋友圈 + 评论区引导添加企微'
  },
  {
    name: '小红书', group: '短视频阵地', weekly: 2, status: '测试期', statusColor: '#B98617',
    role: '用避坑笔记和搜索词，抓住主动查资料的客户',
    goal: '收藏 + 私信', tagClass: 'tag-amber', freq: '每周 2-3 条', best: '12:00-13:00 / 21:00-23:00', metric: '收藏率',
    mix: [['避坑干货', 60, 'var(--steel)'], ['案例记录', 25, 'var(--rust)'], ['工厂日常', 15, 'var(--amber)']],
    cta: '评论区留工况，领《衬氟避坑清单》'
  },
  {
    name: 'B站', group: '短视频阵地', weekly: 1, status: '孵化中', statusColor: '#39687C',
    role: '做长视频技术科普，建立深度专业信任',
    goal: '完播与收藏', tagClass: 'tag-steel', freq: '每周 1-2 条', best: '19:00-22:00', metric: '完播率',
    mix: [['长科普', 70, 'var(--steel)'], ['项目解析', 20, 'var(--green)'], ['幕后花絮', 10, 'var(--amber)']],
    cta: '关注 + 评论区技术提问，私信送检测清单'
  },
  {
    name: '微信公众号', group: '图文与问答', weekly: 2, status: '更新中', statusColor: '#0E7264',
    role: '沉淀深度案例和方案，承接私域阅读',
    goal: '阅读 + 加微', tagClass: 'tag-green', freq: '每周 2-3 篇', best: '08:00 / 20:00', metric: '加微率',
    mix: [['客户案例', 40, 'var(--rust)'], ['技术解析', 40, 'var(--steel)'], ['公司动态', 20, 'var(--amber)']],
    cta: '文末领取资料包，扫码添加企业微信'
  },
  {
    name: '知乎', group: '图文与问答', weekly: 3, status: '重点运营', statusColor: '#0E7264',
    role: '回答防腐选型、验收、报价类长尾问题',
    goal: '专业信任 + 咨询', tagClass: 'tag-green', freq: '每周 3-4 个回答', best: '10:00 / 21:00', metric: '咨询转化',
    mix: [['问题回答', 60, 'var(--green)'], ['技术文章', 40, 'var(--steel)']],
    cta: '回答里放真实案例，结尾引导带工况咨询'
  },
  {
    name: '百家号', group: '图文与问答', weekly: 2, status: 'SEO 铺设', statusColor: '#B98617',
    role: '围绕关键词持续发布，抢占百度搜索流量',
    goal: '收录 + 点击', tagClass: 'tag-amber', freq: '每周 3-4 篇', best: '09:00-11:00', metric: '搜索点击',
    mix: [['技术内容', 40, 'var(--steel)'], ['案例内容', 40, 'var(--rust)'], ['行业资讯', 20, 'var(--amber)']],
    cta: '文末留资表单 + 电话'
  },
  {
    name: '今日头条', group: '图文与问答', weekly: 2, status: '同步发布', statusColor: '#39687C',
    role: '行业资讯和项目故事，扩大泛行业曝光',
    goal: '阅读 + 评论', tagClass: 'tag-steel', freq: '每周 3-4 篇', best: '12:00 / 19:00', metric: '评论互动',
    mix: [['行业资讯', 45, 'var(--amber)'], ['技术内容', 35, 'var(--steel)'], ['案例故事', 20, 'var(--rust)']],
    cta: '评论区引导留工况，私信发案例'
  },
  {
    name: '官网/百度', group: '搜索与 B2B', weekly: 1, status: '重点转化', statusColor: '#0E7264',
    role: '统一承接搜索询盘，承载方案、案例、资质',
    goal: '表单 + 电话', tagClass: 'tag-green', freq: '每周更新 1 次', best: '全天', metric: '询盘率',
    mix: [['案例', 30, 'var(--rust)'], ['产品方案', 30, 'var(--green)'], ['资质报告', 20, 'var(--steel)'], ['问答', 20, 'var(--amber)']],
    cta: '表单 + 电话 + 企业微信三通道留资'
  },
  {
    name: '1688/爱采购', group: '搜索与 B2B', weekly: 3, status: '维护中', statusColor: '#B98617',
    role: '承接工业品采购询盘，覆盖明确购买意向',
    goal: '旺旺询盘', tagClass: 'tag-amber', freq: '每天维护', best: '09:00-17:00', metric: '询盘量',
    mix: [['产品信息', 60, 'var(--green)'], ['资质证明', 20, 'var(--steel)'], ['应用案例', 20, 'var(--rust)']],
    cta: '旺旺 + 电话，优先引导加企微发方案'
  },
  {
    name: '企业微信', group: '私域承接', weekly: 5, status: '私域主阵地', statusColor: '#0E7264',
    role: '所有平台线索统一沉淀，标签分组跟进',
    goal: '新增好友 + 回复', tagClass: 'tag-green', freq: '每天', best: '09:00 / 20:00', metric: '好友通过率',
    mix: [['一对一跟进', 50, 'var(--green)'], ['朋友圈运营', 30, 'var(--amber)'], ['客户群', 20, 'var(--steel)']],
    cta: '欢迎语发资料包，备注来源平台和工况'
  },
  {
    name: '朋友圈/社群', group: '私域承接', weekly: 5, status: '日常运营', statusColor: '#B98617',
    role: '持续触达老客户和已咨询客户，推动复购转介绍',
    goal: '互动 + 成交', tagClass: 'tag-amber', freq: '每天 2-3 条', best: '08:00 / 12:00 / 19:00', metric: '互动率',
    mix: [['客户案例', 50, 'var(--rust)'], ['干货知识', 30, 'var(--steel)'], ['公司日常', 20, 'var(--amber)']],
    cta: '晒现场、晒检测、晒对比，定期发资料钩子'
  }
];

const LAYERS = [
  {
    code: 'L1', name: '内容层', desc: '把产品、案例、工艺变成可分发的内容资产',
    nodes: [
      { name: '短视频脚本', icon: 'clapperboard' }, { name: '图文文章', icon: 'file-text' },
      { name: '朋友圈文案', icon: 'message-square' }, { name: '问答库', icon: 'help-circle' }
    ]
  },
  {
    code: 'L2', name: '分发层', desc: '按平台人群和规则分发，形成全网内容矩阵',
    nodes: [
      { name: '抖音', icon: 'play' }, { name: '快手', icon: 'play' }, { name: '视频号', icon: 'video' },
      { name: '小红书', icon: 'book-open' }, { name: 'B站', icon: 'monitor-play' }, { name: '公众号', icon: 'file-text' }
    ]
  },
  {
    code: 'L3', name: '搜索层', desc: '用关键词和落地页承接主动搜索的意向客户',
    nodes: [
      { name: '官网落地页', icon: 'globe' }, { name: '百度SEO', icon: 'search' },
      { name: '1688', icon: 'shopping-bag' }, { name: '爱采购', icon: 'store' }, { name: '百科问答', icon: 'help-circle' }
    ]
  },
  {
    code: 'L4', name: '私域层', desc: '把公域流量沉淀到企业微信，完成标签和培育',
    nodes: [
      { name: '企业微信', icon: 'users' }, { name: '公众号', icon: 'send' },
      { name: '客户群', icon: 'messages-square' }, { name: '朋友圈', icon: 'smartphone' }
    ]
  },
  {
    code: 'L5', name: '转化层', desc: '用方案、报价和案例缩短成交周期',
    nodes: [
      { name: '报价系统', icon: 'calculator' }, { name: '方案模板', icon: 'folder-open' },
      { name: '案例库', icon: 'folder-kanban' }, { name: '合同模板', icon: 'file-check' }
    ]
  },
  {
    code: 'L6', name: '复购层', desc: '用项目档案和回访机制带来复购与转介绍',
    nodes: [
      { name: '客户档案', icon: 'database' }, { name: '回访计划', icon: 'calendar-check' },
      { name: '转介绍机制', icon: 'share-2' }, { name: '老客户案例', icon: 'award' }
    ]
  }
];

const CONTENT_IDEAS = [
  { id: 'v1', type: '短视频', title: '钢衬四氟储罐为什么比普通防腐更耐高温强腐蚀？', desc: '用现场设备对比讲清四氟衬里和普通防腐的本质区别。', tags: ['四氟', '储罐'] },
  { id: 'v2', type: '短视频', title: '板衬四氟工艺到底是怎么做的？现场实拍', desc: '实拍下料、贴合、焊接、检测全过程，建立工艺信任。', tags: ['板衬', '工艺'] },
  { id: 'v3', type: '短视频', title: '钢衬PE和钢衬PO储罐怎么选？', desc: '一张工况对照表讲清PE、PO的适用边界。', tags: ['PE', 'PO', '选型'] },
  { id: 'v4', type: '短视频', title: '反应釜衬四氟开裂，问题出在哪？', desc: '拆解基体处理、焊缝、负压等常见失效原因。', tags: ['反应釜', '避坑'] },
  { id: 'v5', type: '短视频', title: '塔器衬里怎么做才能不漏？', desc: '讲清塔器衬里的节点处理和验收重点。', tags: ['塔器', '技术'] },
  { id: 'v6', type: '短视频', title: '钢衬四氟管道 vs 衬塑管道，工况怎么选', desc: '从温度、压力、介质三方面做直观对比。', tags: ['管道', '选型'] },
  { id: 'v7', type: '短视频', title: '旧储罐怎么翻新成钢衬四氟？', desc: '用旧罐检测和翻新过程展示“换新 vs 翻新”的账。', tags: ['翻新', '储罐'] },
  { id: 'v8', type: '短视频', title: '四氟板衬里为什么必须做电火花检测？', desc: '拍检测火花画面，解释焊缝和板面的验收意义。', tags: ['检测', '四氟'] },
  { id: 'v9', type: '短视频', title: '客户预算有限，PE、PO、四氟怎么选？', desc: '用真实报价结构讲清三种衬里的性价比逻辑。', tags: ['报价', '选型'] },
  { id: 'v10', type: '短视频', title: '一个衬氟设备工程师的一天', desc: '跟拍式内容，展示专业度和生产现场。', tags: ['人设', '日常'] },
  { id: 'a1', type: '文章', title: '钢衬四氟储罐施工全流程：从钢体处理到板衬焊接', desc: '按步骤写施工流程，覆盖设备、材料和检测。', tags: ['四氟', '施工流程'] },
  { id: 'a2', type: '文章', title: '板衬四氟工艺详解：为什么焊缝是质量关键', desc: '从基体处理、板衬贴合到焊条焊接逐项拆解。', tags: ['板衬', '工艺'] },
  { id: 'a3', type: '文章', title: '钢衬PE、PO储罐选型对照表', desc: '按介质、温度、压力、成本给出选型对照。', tags: ['PE', 'PO', '选型'] },
  { id: 'a4', type: '文章', title: '衬氟反应釜常见失效原因与维修方案', desc: '整理鼓包、开裂、渗漏等失效场景和处理思路。', tags: ['反应釜', '维修'] },
  { id: 'a5', type: '文章', title: '塔器、管道衬氟施工与验收清单', desc: '整理法兰、翻边、焊缝、试压等验收项。', tags: ['塔器', '管道', '验收'] },
  { id: 'a6', type: '文章', title: '钢衬四氟 vs 不锈钢，哪些介质适合用衬氟', desc: '从耐温、耐介质、成本三个维度做对比。', tags: ['四氟', '选型'] },
  { id: 'a7', type: '文章', title: '衬氟设备报价由什么构成？', desc: '拆解钢材、衬里材料、人工、检测和管理成本。', tags: ['报价', '成本'] },
  { id: 'a8', type: '文章', title: '旧设备衬里翻新前要检查什么？', desc: '给出测厚、旧衬清除、基体评估等检查清单。', tags: ['翻新', '检查'] },
  { id: 'a9', type: '文章', title: '电火花检测在衬氟验收中的作用', desc: '讲清电火花检测原理、标准和常见误判。', tags: ['检测', '验收'] },
  { id: 'a10', type: '文章', title: '选衬氟设备厂家看资质还是看案例？', desc: '给出考察清单，帮助客户建立筛选标准。', tags: ['获客', '信任'] },
  { id: 'h1', type: '钩子', title: '免费领《钢衬四氟/PE/PO选型对照表》', desc: '按介质、温度、压力快速选型，适合各平台资料包。', tags: ['资料', '私域'] },
  { id: 'h2', type: '钩子', title: '评论区留下介质、温度和压力，帮你评估衬里方案', desc: '低门槛互动，收集关键工况信息。', tags: ['互动', '留资'] },
  { id: 'h3', type: '钩子', title: '转发给负责设备检修的同事，关键时候能省钱', desc: '借转发触达设备维护责任人。', tags: ['转发', '获客'] },
  { id: 'h4', type: '钩子', title: '文末领取《衬氟设备施工与验收清单》', desc: '用标准清单换留资，适合文章和问答。', tags: ['资料', '留资'] },
  { id: 'h5', type: '钩子', title: '私信“方案”领取化工行业衬氟案例', desc: '按行业发案例，建立同行参考价值。', tags: ['私域', '案例'] },
  { id: 'h6', type: '钩子', title: '留下储罐尺寸 + 介质，先给你初步衬里方向', desc: '把咨询变成可评估的工况信息。', tags: ['留资', '方案'] },
  { id: 'h7', type: '钩子', title: '点赞收藏，设备选型前对照检查', desc: '提高收藏率，让内容进入客户收藏夹。', tags: ['互动', '收藏'] },
  { id: 'h8', type: '钩子', title: '扫码添加企业微信，领取衬氟设备报价模板', desc: '把流量直接沉淀到私域。', tags: ['私域', '报价'] },
  { id: 'h9', type: '钩子', title: '老客户转介绍享设备检测服务', desc: '复购层钩子，推动老客户转介绍。', tags: ['复购', '转介绍'] },
  { id: 'h10', type: '钩子', title: '评论区扣 1，送你《衬氟设备项目报价结构表》', desc: '简单指令式留资，适合短视频评论区。', tags: ['留资', '报价'] }
];

const DEFAULT_ASSETS = [
  { name: '报价系统', icon: 'calculator', layer: '转化层', color: 'var(--green-soft)', iconColor: 'var(--green)', note: '把材料、工艺、辅材成本统一成报价模板，询盘进来先发方案和报价。', url: '' },
  { name: '客户案例库', icon: 'folder-kanban', layer: '转化层', color: 'var(--steel-soft)', iconColor: 'var(--steel)', note: '按行业、介质、基材归档，内容引用和销售陪访都用它。', url: '' },
  { name: '产品照片库', icon: 'image', layer: '内容层', color: 'var(--amber-soft)', iconColor: '#B98617', note: '高清施工图、完工图、检测图，给各平台做首图和素材。', url: '' },
  { name: '视频素材库', icon: 'video', layer: '内容层', color: 'var(--rust-soft)', iconColor: 'var(--rust)', note: '实拍原始素材按场景打标，短视频直接剪辑复用。', url: '' },
  { name: '合同与资质库', icon: 'file-check', layer: '转化层', color: 'var(--steel-soft)', iconColor: 'var(--steel)', note: '资质、检测报告、合同模板统一管理，支撑信任链路。', url: '' },
  { name: '企业微信', icon: 'users', layer: '私域层', color: 'var(--green-soft)', iconColor: 'var(--green)', note: '线索统一沉淀，自动欢迎语 + 标签分组。', url: 'https://work.weixin.qq.com' },
  { name: '公众号后台', icon: 'send', layer: '私域层', color: 'var(--green-soft)', iconColor: 'var(--green)', note: '深度文章发布、自动回复、菜单承接。', url: 'https://mp.weixin.qq.com' },
  { name: '抖音/巨量后台', icon: 'play', layer: '分发层', color: 'var(--rust-soft)', iconColor: 'var(--rust)', note: '发布、评论管理、私信自动回复、投流看板。', url: 'https://www.douyin.com' },
  { name: '1688 商家后台', icon: 'shopping-bag', layer: '搜索层', color: 'var(--amber-soft)', iconColor: '#B98617', note: '商品、询盘、访客数据统一看板。', url: 'https://www.1688.com' },
  { name: '百度搜索后台', icon: 'search', layer: '搜索层', color: 'var(--steel-soft)', iconColor: 'var(--steel)', note: '官网 SEO、关键词、爱采购和推广数据。', url: 'https://www.baidu.com' },
  { name: '表单/落地页工具', icon: 'form-input', layer: '搜索层', color: 'var(--green-soft)', iconColor: 'var(--green)', note: '免费资料留资、预约检测、电话回拨。', url: '' },
  { name: '直播与会议工具', icon: 'monitor-play', layer: '分发层', color: 'var(--rust-soft)', iconColor: 'var(--rust)', note: '工厂直播、技术答疑、项目复盘。', url: '' }
];

const DEFAULT_SETTINGS = {
  company: '江苏兆辉防腐科技',
  products: '钢衬四氟设备、钢衬PE/PO储罐、反应釜、塔器、管道、板衬四氟工艺',
  phone: '请填写联系电话',
  wechat: 'zhaohui-fangfu',
  website: ''
};

const SCENARIO_MAP = {
  '钢衬四氟储罐/反应釜': {
    name: '钢衬四氟储罐/反应釜', pain: '高温、强腐蚀介质让设备频繁失效', risks: '钢体处理不净、四氟板焊缝缺陷、负压鼓包',
    proof: '钢体喷砂除锈 → 四氟板下料粘贴 → 焊缝焊接 → 电火花检测', angle: '按介质选衬里，让设备寿命匹配工艺周期',
    titles: ['钢衬四氟设备为什么比普通防腐更耐腐蚀？', '反应釜衬四氟开裂，问题常出在这几步', '钢衬四氟储罐验收，重点盯哪里？']
  },
  '板衬四氟工艺': {
    name: '板衬四氟工艺', pain: '板衬脱落、焊缝渗漏、设备返工', risks: '基体处理不达标、板材贴合不实、焊条焊接不密',
    proof: '钢体表面处理 → 板衬裁剪贴合 → 焊接封闭 → 电火花/负压检测', angle: '把焊缝当质量生命线',
    titles: ['板衬四氟工艺怎么验收？焊缝是生命线', '四氟板衬里为什么会鼓包脱落？', '老师傅现场讲解板衬四氟完整流程']
  },
  '钢衬PE/PO储罐': {
    name: '钢衬PE/PO储罐', pain: '常温腐蚀介质也让储罐提前报废', risks: '选材不当、焊缝开裂、负压吸瘪',
    proof: '介质分析 → PE/PO选型 → 钢体处理 → 衬里成型 → 检测', angle: 'PE和PO先分清，选型不花冤枉钱',
    titles: ['钢衬PE和PO储罐到底怎么选？', '钢衬塑储罐用两年就坏，先查这3点', 'PE、PO、四氟三种衬里，价格差在哪']
  },
  '衬氟管道/塔器': {
    name: '衬氟管道/塔器', pain: '管道泄漏、塔器腐蚀、停车损失', risks: '法兰面不平、翻边不到位、衬里厚度不足',
    proof: '管件处理 → 四氟翻边/衬里 → 法兰密封面加工 → 试压检测', angle: '管线和塔器一起做，别漏掉任何一段',
    titles: ['衬氟管道泄漏前有哪些信号？', '塔器衬四氟怎么做才不漏？', '衬氟管道和衬塑管道差在哪？']
  },
  '旧设备衬里翻新': {
    name: '旧设备衬里翻新', pain: '旧罐旧塔检修成本高，直接换新更贵', risks: '旧衬里没清干净、基体腐蚀减薄、翻新方案选错',
    proof: '基体测厚 → 旧衬里清除 → 表面处理 → 重新衬里 → 检测', angle: '能翻新就别急着换设备',
    titles: ['旧储罐直接换新还是翻新衬里？', '设备衬里翻新前，先做这4项检查', '旧反应釜怎么改成钢衬四氟？']
  },
  '其他/工况选型': {
    name: '衬氟设备工况选型', pain: '介质、温度、压力没匹配，设备容易提前失效', risks: '介质没分析透、负压没考虑、衬里结构选错',
    proof: '工况参数收集 → 介质对照 → 衬里选型 → 结构设计 → 出厂检测', angle: '先把工况问清楚，再谈方案和报价',
    titles: ['衬氟设备选型，客户一定要说清这4个参数', '钢衬四氟、PE、PO怎么按工况选？', '衬氟设备报价前，为什么先要工况表？']
  }
};

const AUDIENCE_MAP = {
  '工厂老板': { concern: '算总账：返工和停产比省下的钱贵得多', tone: '直接给结论，讲风险' },
  '工程师/技术': { concern: '要工艺和验收标准，能直接对表检查', tone: '给标准、给步骤、给数据' },
  '采购/预算': { concern: '要报价透明，知道钱花在哪里', tone: '给对比、给清单、给依据' },
  '同行/施工队': { concern: '想交流方案和材料选型', tone: '给经验、给细节、给工具' }
};

const FORMAT_MAP = {
  '短视频口播': { label: '口播脚本', short: '60 秒' },
  '图文文章': { label: '文章大纲', short: '1200-1800 字' },
  '朋友圈': { label: '朋友圈文案', short: '3-5 行' },
  '问答/SEO': { label: '回答框架', short: '800-1200 字' }
};

const VIEW_META = {
  overview: ['全局驾驶舱', '全网获客系统一周态势'],
  platforms: ['平台矩阵', '每个平台的定位、节奏与转化动作'],
  content: ['内容工厂', '生成内容方案 + 选题灵感库'],
  schedule: ['排期作战台', '周排期、每日任务和发布节奏'],
  leads: ['线索池', '全平台线索集中跟进与私域承接'],
  assets: ['素材软件库', '把已有软件和素材接入获客链路'],
  data: ['数据复盘', '每周按平台记录流量、线索和成交']
};

const STAGE_LABELS = { new: '新增', contacted: '已联系', quote: '报价中', won: '已成交', lost: '已流失' };
const STAGE_ORDER = ['new', 'contacted', 'quote', 'won'];
const WEEKDAY_CN = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

function uid() {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3);
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function startOfWeek(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day);
  return d;
}

function addDays(date, days) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + days);
  return d;
}

function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function weekDays(offset) {
  const base = addDays(startOfWeek(new Date()), offset * 7);
  return Array.from({ length: 7 }, (_, i) => addDays(base, i));
}

function fmtMD(date) {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function fmtCN(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function todayKey() {
  return dateKey(new Date());
}

function metricKey(offset) {
  return dateKey(startOfWeek(addDays(new Date(), offset * 7)));
}

function loadState() {
  const base = {
    currentView: 'overview',
    settings: { ...DEFAULT_SETTINGS },
    tasks: [],
    leads: [],
    assets: [],
    metrics: {},
    contentFilter: 'all',
    gen: { scenario: '钢衬四氟储罐/反应釜', audience: '工厂老板', format: '短视频口播' },
    generated: null,
    scheduleOffset: 0,
    metricOffset: 0
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState(base);
    const saved = JSON.parse(raw);
    const mergedGen = { ...base.gen, ...(saved.gen || {}) };
    if (!SCENARIO_MAP[mergedGen.scenario]) mergedGen.scenario = base.gen.scenario;
    if (!AUDIENCE_MAP[mergedGen.audience]) mergedGen.audience = base.gen.audience;
    if (!FORMAT_MAP[mergedGen.format]) mergedGen.format = base.gen.format;
    return {
      ...base,
      ...saved,
      settings: { ...DEFAULT_SETTINGS, ...(saved.settings || {}) },
      gen: mergedGen,
      assets: saved.assets && saved.assets.length ? saved.assets : DEFAULT_ASSETS.map((a) => ({ ...a, id: uid(), builtin: true })),
      generated: buildGenerated(mergedGen)
    };
  } catch (err) {
    return seedState(base);
  }
}

function seedState(base) {
  const days = weekDays(0);
  const video = CONTENT_IDEAS.filter((i) => i.type === '短视频');
  const article = CONTENT_IDEAS.filter((i) => i.type === '文章');
  const hook = CONTENT_IDEAS.filter((i) => i.type === '钩子');
  const seedTitles = [
    [video[0], '抖音', '12:30'],
    [article[0], '知乎', '08:30'],
    [hook[7], '朋友圈', '19:30'],
    [video[4], '快手', '12:30'],
    [article[1], '百家号', '08:30'],
    [hook[1], '朋友圈', '19:30'],
    [video[6], '视频号', '12:30'],
    [article[3], '微信公众号', '08:30'],
    [hook[4], '企业微信', '19:30'],
    [video[9], '抖音', '12:30'],
    [article[4], '今日头条', '08:30'],
    [hook[0], '朋友圈', '19:30']
  ];
  const tasks = seedTitles.map(([idea, platform, time], i) => ({
    id: uid(), date: dateKey(days[i % 7]), time, platform, type: idea.type, title: idea.title, done: false
  }));
  const leads = [
    { id: uid(), company: '苏北化工设备厂', source: '抖音', product: '钢衬四氟储罐', stage: 'quote', value: 128000, next: addDays(new Date(), 2), note: '介质为硫酸，已发初步方案' },
    { id: uid(), company: '华东环保工程公司', source: '1688', product: '钢衬PO储罐', stage: 'contacted', value: 86000, next: addDays(new Date(), 1), note: '采购负责人，等报价单' },
    { id: uid(), company: '南通化工装备公司', source: '知乎', product: '反应釜衬里', stage: 'new', value: 56000, next: addDays(new Date(), 3), note: '从长文回答来，留了电话' },
    { id: uid(), company: '常州精细化工厂', source: '视频号', product: '钢衬PE储罐', stage: 'quote', value: 42000, next: addDays(new Date(), 4), note: '看过案例，准备现场勘查' },
    { id: uid(), company: '张家港管道工程队', source: '快手', product: '衬氟管道', stage: 'contacted', value: 73000, next: addDays(new Date(), 1), note: '同行转介绍，主要问材料和翻边工艺' },
    { id: uid(), company: '无锡新能源装备厂', source: '官网', product: '塔器衬氟', stage: 'new', value: 150000, next: addDays(new Date(), 5), note: '表单留资，需求较急' }
  ].map((l) => ({ ...l, next: dateKey(l.next) }));
  base.tasks = tasks;
  base.leads = leads;
  base.assets = DEFAULT_ASSETS.map((a) => ({ ...a, id: uid(), builtin: true }));
  base.generated = buildGenerated(base.gen);
  return base;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    // storage may be unavailable; app keeps working in memory
  }
}

let state = null;
state = loadState();

function buildGenerated(gen, settings) {
  const scenario = SCENARIO_MAP[gen.scenario] || SCENARIO_MAP['钢衬四氟储罐/反应釜'];
  const audience = AUDIENCE_MAP[gen.audience] || AUDIENCE_MAP['工厂老板'];
  const format = FORMAT_MAP[gen.format] || FORMAT_MAP['短视频口播'];
  const appSettings = settings || (state && state.settings) || DEFAULT_SETTINGS;
  const company = appSettings.company || '我们';
  const contact = appSettings.wechat || appSettings.phone || '私信';
  const product = appSettings.products || scenario.name;
  const titles = scenario.titles;
  const hashtags = `#${scenario.name} #钢衬四氟 #衬氟设备 #钢衬PE #钢衬PO #四氟衬里 #${product.split('、')[0]}`;
  const keywords = `钢衬四氟厂家, ${scenario.name}, 板衬四氟, 钢衬PE储罐, 钢衬PO储罐, 衬氟管道, 衬氟塔器, 四氟衬里`;

  const hookByAudience = {
    '工厂老板': `设备衬里最怕的不是花钱，是花完钱还返工。${scenario.pain}，问题往往出在选型和基体处理上。`,
    '工程师/技术': `${scenario.pain}，验收时盯住${scenario.risks}，衬里质量不会差。`,
    '采购/预算': `同样做${scenario.name}，报价差在哪？先看${scenario.risks}有没有被算进去。`,
    '同行/施工队': `${scenario.pain}，我们现场常用的做法是${scenario.proof}，交流一下。`
  };
  const hook = hookByAudience[gen.audience] || hookByAudience['工厂老板'];

  let cta;
  if (gen.format === '短视频口播') {
    cta = `私信“方案”，领取《${scenario.name}选型对照表》；评论区留下介质、温度和压力，我们按工况给建议。`;
  } else if (gen.format === '图文文章') {
    cta = `文末领取《${scenario.name}施工与验收清单》，加${contact}备注“方案”。`;
  } else if (gen.format === '朋友圈') {
    cta = `想了解${scenario.name}的老板，私信留工况，我先给你出初步方向。`;
  } else {
    cta = `如果你也在为${scenario.name}头疼，可以带上工况私信${contact}，我给你按实际条件建议。`;
  }

  let script;
  if (gen.format === '短视频口播') {
    script = `0-3秒 钩子\n${hook}\n\n3-15秒 痛点\n${scenario.pain}，很多项目输在${scenario.risks}。\n\n15-35秒 专业拆解\n${company}的完整做法：${scenario.proof}。\n重点看${audience.concern}。\n\n35-50秒 证据\n用一个真实项目对比：返工一次的成本 vs 一次做对。\n\n50-60秒 转化\n${cta}`;
  } else if (gen.format === '图文文章') {
    script = `标题：${titles[0]}\n\n1. 开场场景：${scenario.pain}\n2. 常见误区：${scenario.risks}\n3. 正确流程：${scenario.proof}\n4. 对比与算账：${audience.concern}\n5. 验收清单：焊缝、电火花、负压、法兰密封面\n6. 案例佐证：真实项目前后数据\n7. 结尾转化：${cta}`;
  } else if (gen.format === '朋友圈') {
    script = `配图建议：现场施工图 + 检测图 + 完工图\n\n文案：\n${scenario.pain}？${scenario.angle}。\n${company}：${scenario.proof}\n${cta}\n\n${hashtags}`;
  } else {
    script = `开头直接给结论：${scenario.name}的核心不是材料越贵越好，而是${scenario.angle}。\n\n分点回答：\n1. 常见失效：${scenario.risks}\n2. 正确做法：${scenario.proof}\n3. 验收重点：焊缝、电火花、负压、法兰密封面\n4. 预算建议：${audience.concern}\n\n结尾：${cta}`;
  }

  const caption = `${titles[0]}\n\n${scenario.pain}？${company}把${scenario.proof}整理成一份可对照的资料。\n${audience.concern}，评论区留下工况或私信“方案”。\n${cta}\n\n${hashtags}`;

  return {
    hook,
    titles,
    script,
    caption,
    keywords,
    hashtags,
    cta,
    meta: `${format.label} · ${format.short}`
  };
}

function computeFunnel(offset) {
  const m = getMetrics(offset);
  let exp = 0, click = 0, leads = 0, amount = 0;
  for (const p of PLATFORMS) {
    const row = m[p.name] || {};
    exp += Number(row.exp || 0);
    click += Number(row.click || 0);
    leads += Number(row.leads || 0);
    amount += Number(row.amount || 0);
  }
  return { exp, click, leads, amount };
}

function getMetrics(offset) {
  return state.metrics[metricKey(offset)] || {};
}

function renderActiveView() {
  const view = state.currentView;
  if (view === 'overview') renderOverview();
  if (view === 'platforms') renderPlatforms();
  if (view === 'content') renderContent();
  if (view === 'schedule') renderSchedule();
  if (view === 'leads') renderLeads();
  if (view === 'assets') renderAssets();
  if (view === 'data') renderData();
  refreshIcons();
}

function renderAll() {
  const meta = VIEW_META[state.currentView] || VIEW_META.overview;
  document.getElementById('view-title').textContent = meta[0];
  document.getElementById('view-subtitle').textContent = meta[1];
  document.querySelectorAll('.nav-item[data-view]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.view === state.currentView);
  });
  document.getElementById('today-chip').textContent = `${fmtCN(new Date())} · ${WEEKDAY_CN[(new Date().getDay() + 6) % 7]}`;
  renderActiveView();
  renderSidebarNote();
}

function renderSidebarNote() {
  const days = weekDays(0);
  const weekTasks = state.tasks.filter((t) => t.date >= dateKey(days[0]) && t.date <= dateKey(days[6]));
  const todo = weekTasks.filter((t) => !t.done).length;
  document.getElementById('sidebar-note').innerHTML = `${esc(state.settings.company)}<br>今日 ${fmtCN(new Date())}<br>本周待办 ${todo} 项`;
}

function switchView(view) {
  if (!VIEW_META[view]) return;
  state.currentView = view;
  saveState();
  document.querySelectorAll('.view').forEach((section) => {
    section.hidden = section.dataset.view !== view;
  });
  renderAll();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderOverview() {
  const days = weekDays(0);
  const weekTasks = state.tasks.filter((t) => t.date >= dateKey(days[0]) && t.date <= dateKey(days[6]));
  const todo = weekTasks.filter((t) => !t.done).length;
  const published = weekTasks.filter((t) => t.done).length;
  const leads = state.leads;
  const wonAmount = leads.filter((l) => l.stage === 'won').reduce((sum, l) => sum + Number(l.value || 0), 0);
  const quoteAmount = leads.filter((l) => l.stage === 'quote').reduce((sum, l) => sum + Number(l.value || 0), 0);
  const expected = Math.round(wonAmount + quoteAmount * 0.35);
  const funnel = computeFunnel(0);
  const maxFunnel = Math.max(funnel.exp, funnel.click, funnel.leads, 1);
  const todayTasks = state.tasks.filter((t) => t.date === todayKey());

  const kpis = [
    { label: '本周待办', value: todo, delta: `${published} 项已完成`, color: 'var(--rust)', icon: 'list-checks' },
    { label: '本周发布', value: weekTasks.length, delta: `目标 21 条`, color: 'var(--green)', icon: 'send' },
    { label: '线索池', value: leads.length, delta: `${leads.filter((l) => l.stage === 'new').length} 条待联系`, color: 'var(--steel)', icon: 'users' },
    { label: '预计成交额', value: `¥${expected.toLocaleString('zh-CN')}`, delta: `报价中 ${quoteAmount.toLocaleString('zh-CN')}`, color: 'var(--amber)', icon: 'badge-yen' }
  ];

  const funnelRows = [
    { label: '曝光', value: funnel.exp, color: 'var(--steel)' },
    { label: '点击', value: funnel.click, color: 'var(--amber)' },
    { label: '留资', value: funnel.leads, color: 'var(--green)' },
    { label: '成交', value: funnel.amount, color: 'var(--rust)' }
  ];

  document.getElementById('view-overview').innerHTML = `
    <div class="kpi-grid">
      ${kpis.map((k) => `
        <div class="kpi-card" style="--accent:${k.color}">
          <div class="kpi-label"><span>${k.label}</span>${icon(k.icon)}</div>
          <div class="kpi-value">${k.value}</div>
          <div class="kpi-delta"><strong>${k.delta}</strong></div>
        </div>`).join('')}
    </div>

    <div class="section-head">
      <div class="section-title">
        <h2>六层获客衬里</h2>
        <p>像衬里工艺一样，把内容、平台、搜索、私域、转化、复购逐层做厚</p>
      </div>
    </div>

    <div class="system-layers">
      ${LAYERS.map((l, i) => `
        <div class="layer-row">
          <div class="layer-index"><strong>${i + 1}</strong>${l.code}</div>
          <div class="layer-title"><strong>${l.name}</strong><span>${l.desc}</span></div>
          <div class="layer-tags">
            ${l.nodes.map((n) => `<span class="layer-node">${icon(n.icon)}${n.name}</span>`).join('')}
          </div>
        </div>`).join('')}
    </div>

    <div class="dash-grid">
      <div class="panel">
        <div class="panel-head">
          <div><h2>平台火力表</h2><p>当前矩阵状态</p></div>
          <button class="btn btn-ghost btn-small" data-view="platforms" type="button">查看矩阵</button>
        </div>
        <div class="panel-body">
          <div class="platform-list">
            ${PLATFORMS.map((p) => `
              <div class="platform-chip">
                <span class="platform-chip-name"><span class="platform-dot" style="--status:${p.statusColor}"></span>${p.name}</span>
                <small>${p.status}</small>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div><h2>获客漏斗</h2><p>本周全平台合计</p></div>
        </div>
        <div class="panel-body">
          <div class="funnel">
            ${funnelRows.map((r) => `
              <div class="funnel-row">
                <span class="funnel-label">${r.label}</span>
                <div class="funnel-track"><div class="funnel-bar" style="width:${Math.max(2, (r.value / maxFunnel) * 100)}%;--bar-color:${r.color}"></div></div>
                <span class="funnel-value">${Number(r.value).toLocaleString('zh-CN')}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div><h2>今日任务</h2><p>${fmtCN(new Date())}</p></div>
          <button class="btn btn-ghost btn-small" data-view="schedule" type="button">打开排期</button>
        </div>
        <div class="panel-body">
          ${todayTasks.length ? `
            <div class="task-list">
              ${todayTasks.map((t) => `
                <div class="task-item ${t.done ? 'is-done' : ''}">
                  <input class="task-check" type="checkbox" ${t.done ? 'checked' : ''} data-action="task-toggle" data-id="${t.id}" aria-label="完成">
                  <div class="task-info">
                    <strong>${esc(t.title)}</strong>
                    <div class="task-meta">${icon('clock')}${t.time} · ${t.platform} · ${t.type}</div>
                  </div>
                </div>`).join('')}
            </div>` : `
            <div class="empty">${icon('calendar-x')}<div>今天还没有排期</div></div>`}
        </div>
      </div>
    </div>`;
}

function renderPlatforms() {
  const groups = ['短视频阵地', '图文与问答', '搜索与 B2B', '私域承接'];
  const groupDesc = {
    '短视频阵地': '用实拍、干货和案例建立专业人设，把流量导进私信和主页',
    '图文与问答': '用长内容占领搜索和问答，承接主动找资料的客户',
    '搜索与 B2B': '让官网、1688 和百度搜索成为确定性询盘入口',
    '私域承接': '所有平台流量统一沉淀，用标签和跟进完成成交'
  };

  document.getElementById('view-platforms').innerHTML = `
    <div class="platform-groups">
      ${groups.map((group) => `
        <div class="platform-group">
          <div class="platform-group-title">
            <strong>${group}</strong>
            <span>${groupDesc[group]}</span>
          </div>
          <div class="platform-card-grid">
            ${PLATFORMS.filter((p) => p.group === group).map((p) => `
              <div class="platform-card">
                <div class="platform-card-head">
                  <div>
                    <h3>${p.name}</h3>
                    <p>${p.role}</p>
                  </div>
                  <span class="tag ${p.tagClass}">${p.goal}</span>
                </div>
                <div class="meta-grid">
                  <div class="meta-cell"><small>发布频率</small><strong>${p.freq}</strong></div>
                  <div class="meta-cell"><small>最佳时段</small><strong>${p.best}</strong></div>
                  <div class="meta-cell"><small>核心指标</small><strong>${p.metric}</strong></div>
                </div>
                <div class="content-mix">
                  ${p.mix.map(([label, value, color]) => `
                    <div class="mix-row">
                      <span>${label}</span>
                      <div class="mix-track"><div class="mix-bar" style="width:${value}%;--mix-color:${color}"></div></div>
                      <span>${value}%</span>
                    </div>`).join('')}
                </div>
                <div class="cta-line">${icon('message-circle')}<span>${p.cta}</span></div>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>`;
}

function renderContent() {
  const gen = state.gen;
  const output = state.generated || buildGenerated(gen);
  const counts = {
    all: CONTENT_IDEAS.length,
    '短视频': CONTENT_IDEAS.filter((i) => i.type === '短视频').length,
    '文章': CONTENT_IDEAS.filter((i) => i.type === '文章').length,
    '钩子': CONTENT_IDEAS.filter((i) => i.type === '钩子').length
  };
  const filter = state.contentFilter;
  const ideas = CONTENT_IDEAS.filter((i) => filter === 'all' || i.type === filter);

  document.getElementById('view-content').innerHTML = `
    <div class="generator-layout">
      <div class="panel">
        <div class="panel-head">
          <div><h2>内容生成器</h2><p>按场景生成可落地内容</p></div>
        </div>
        <div class="panel-body gen-form">
          <label class="field">
            <span>产品 / 场景</span>
            <select id="gen-scenario">
              ${Object.keys(SCENARIO_MAP).map((key) => `<option value="${key}" ${gen.scenario === key ? 'selected' : ''}>${key}</option>`).join('')}
            </select>
          </label>
          <div class="field">
            <span>目标人群</span>
            <div class="radio-row">
              ${Object.keys(AUDIENCE_MAP).map((key) => `
                <label class="radio-card">
                  <input type="radio" name="gen-audience" value="${key}" ${gen.audience === key ? 'checked' : ''}>${key}
                </label>`).join('')}
            </div>
          </div>
          <div class="field">
            <span>内容形式</span>
            <div class="radio-row">
              ${Object.keys(FORMAT_MAP).map((key) => `
                <label class="radio-card">
                  <input type="radio" name="gen-format" value="${key}" ${gen.format === key ? 'checked' : ''}>${key}
                </label>`).join('')}
            </div>
          </div>
          <button class="btn btn-primary" type="button" data-action="gen">重新生成</button>
        </div>
      </div>

      <div class="panel output-panel">
        <div class="output-head">
          <div>
            <h3>生成结果</h3>
            <p style="color:var(--muted);font-size:12px;margin:2px 0 0">${output.meta}</p>
          </div>
          <button class="btn btn-ghost btn-small" type="button" data-action="copy-all">一键复制</button>
        </div>
        <div class="output-body">
          ${renderOutputBlock('hook', '开场钩子', output.hook)}
          ${renderOutputBlock('titles', '标题方案', output.titles.map((t, i) => `${i + 1}. ${t}`).join('\n'))}
          ${renderOutputBlock('script', FORMAT_MAP[gen.format].label, output.script)}
          ${renderOutputBlock('caption', '发布文案', output.caption)}
          ${renderOutputBlock('keywords', '关键词与话题', `${output.keywords}\n\n${output.hashtags}`)}
          ${renderOutputBlock('cta', '转化引导', output.cta)}
        </div>
      </div>
    </div>

    <div class="section-head">
      <div class="section-title">
        <h2>选题灵感库</h2>
        <p>${CONTENT_IDEAS.length} 条可直接复用的选题</p>
      </div>
    </div>

    <div class="library-layout">
      <div class="panel">
        <div class="panel-head"><div><h2>筛选</h2><p>按内容类型</p></div></div>
        <div class="filter-list">
          ${['all', '短视频', '文章', '钩子'].map((key) => `
            <button class="filter-btn ${filter === key ? 'is-active' : ''}" type="button" data-action="content-filter" data-filter="${key}">
              <span>${key === 'all' ? '全部选题' : key}</span><small>${counts[key]}</small>
            </button>`).join('')}
        </div>
      </div>
      <div class="idea-grid">
        ${ideas.map((idea) => `
          <div class="idea-card">
            <div class="idea-card-top">
              <h4>${esc(idea.title)}</h4>
              <button class="copy-btn" type="button" data-action="copy-idea" data-id="${idea.id}">复制</button>
            </div>
            <p>${esc(idea.desc)}</p>
            <div class="idea-tags">
              <span class="tag ${idea.type === '短视频' ? 'tag-rust' : idea.type === '文章' ? 'tag-steel' : 'tag-amber'}">${idea.type}</span>
              ${idea.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
            </div>
            <button class="btn btn-ghost btn-small" type="button" data-action="idea-schedule" data-id="${idea.id}">加入排期</button>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderOutputBlock(key, label, text) {
  return `
    <div class="output-block">
      <div class="output-block-head">
        <strong>${label}</strong>
        <button class="copy-btn" type="button" data-action="copy" data-copy-key="${key}">复制</button>
      </div>
      <div class="output-block-body">${esc(text)}</div>
    </div>`;
}

function renderSchedule() {
  const days = weekDays(state.scheduleOffset);
  const startKey = dateKey(days[0]);
  const endKey = dateKey(days[6]);
  const weekTasks = state.tasks.filter((t) => t.date >= startKey && t.date <= endKey).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const today = todayKey();
  const platformOptions = PLATFORMS.map((p) => `<option>${p.name}</option>`).join('');

  document.getElementById('view-schedule').innerHTML = `
    <div class="panel schedule-layout">
      <div class="schedule-toolbar">
        <div class="section-title">
          <h2>${state.scheduleOffset === 0 ? '本周排期' : '下周排期'}</h2>
          <p>${fmtMD(days[0])} - ${fmtMD(days[6])} · ${weekTasks.length} 条任务</p>
        </div>
        <div class="topbar-actions">
          <button class="btn btn-ghost" type="button" data-action="week-prev">上一周</button>
          <button class="btn btn-ghost" type="button" data-action="week-next">下一周</button>
          <button class="btn btn-primary" type="button" data-action="generate-schedule">一键生成排期</button>
          <button class="btn btn-danger" type="button" data-action="clear-schedule">清空本周</button>
        </div>
      </div>
    </div>

    <div class="week-grid">
      ${days.map((d, i) => {
        const key = dateKey(d);
        const dayTasks = weekTasks.filter((t) => t.date === key);
        return `
          <div class="day-col">
            <div class="day-head">
              <strong>${key === today ? '今天' : WEEKDAY_CN[i]}</strong>
              <small>${fmtMD(d)}</small>
            </div>
            <div class="day-tasks">
              ${dayTasks.length ? dayTasks.map((t) => `
                <div class="task-card ${t.done ? 'is-done' : ''}" style="--accent:${t.done ? 'var(--line-strong)' : t.type === '短视频' ? 'var(--rust)' : t.type === '文章' ? 'var(--steel)' : 'var(--amber)'}">
                  <strong>${esc(t.title)}</strong>
                  <small>${t.time} · ${t.platform} · ${t.type}</small>
                  <div class="task-card-actions">
                    <button class="btn btn-ghost btn-small" type="button" data-action="task-toggle" data-id="${t.id}">${t.done ? '恢复' : '完成'}</button>
                    <button class="btn btn-danger btn-small" type="button" data-action="task-delete" data-id="${t.id}">删除</button>
                  </div>
                </div>`).join('') : '<div class="empty">暂无排期</div>'}
            </div>
          </div>`;
      }).join('')}
    </div>

    <form class="panel task-form" data-form="task">
      <label class="field">
        <span>内容标题</span>
        <input name="title" required placeholder="例如：钢衬四氟储罐 3 个验收关键">
      </label>
      <label class="field">
        <span>平台</span>
        <select name="platform">${platformOptions}</select>
      </label>
      <label class="field">
        <span>形式</span>
        <select name="type">
          <option>短视频</option>
          <option>文章</option>
          <option>钩子</option>
        </select>
      </label>
      <label class="field">
        <span>日期</span>
        <select name="date">
          ${days.map((d, i) => `<option value="${dateKey(d)}">${keyLabel(d, i)}</option>`).join('')}
        </select>
      </label>
      <label class="field">
        <span>时段</span>
        <select name="time">
          <option>08:30</option>
          <option>12:30</option>
          <option>19:30</option>
        </select>
      </label>
      <button class="btn btn-primary" type="submit" data-action="submit-form">添加任务</button>
    </form>`;
}

function keyLabel(date, i) {
  const key = dateKey(date);
  return `${key === todayKey() ? '今天' : WEEKDAY_CN[i]} ${fmtMD(date)}`;
}

function renderLeads() {
  const leads = [...state.leads].sort((a, b) => a.next.localeCompare(b.next));
  const stages = {
    new: leads.filter((l) => l.stage === 'new').length,
    contacted: leads.filter((l) => l.stage === 'contacted').length,
    quote: leads.filter((l) => l.stage === 'quote').length,
    won: leads.filter((l) => l.stage === 'won').length
  };
  const wonAmount = leads.filter((l) => l.stage === 'won').reduce((sum, l) => sum + Number(l.value || 0), 0);
  const platformOptions = PLATFORMS.map((p) => `<option>${p.name}</option>`).join('');

  document.getElementById('view-leads').innerHTML = `
    <div class="lead-summary">
      <div class="lead-stat"><small>新增线索</small><strong>${stages.new}</strong></div>
      <div class="lead-stat"><small>已联系</small><strong>${stages.contacted}</strong></div>
      <div class="lead-stat"><small>报价中</small><strong>${stages.quote}</strong></div>
      <div class="lead-stat"><small>已成交额</small><strong>¥${wonAmount.toLocaleString('zh-CN')}</strong></div>
    </div>

    <div class="lead-layout">
      <div class="panel">
        <div class="panel-head">
          <div><h2>线索池</h2><p>${leads.length} 条线索</p></div>
        </div>
        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr><th>客户</th><th>来源</th><th>意向产品</th><th>阶段</th><th>金额</th><th>下次跟进</th><th>操作</th></tr>
            </thead>
            <tbody>
              ${leads.map((l) => `
                <tr>
                  <td>${esc(l.company)}</td>
                  <td><span class="tag">${esc(l.source)}</span></td>
                  <td>${esc(l.product)}</td>
                  <td><span class="stage-pill ${l.stage}">${STAGE_LABELS[l.stage] || l.stage}</span></td>
                  <td>¥${Number(l.value || 0).toLocaleString('zh-CN')}</td>
                  <td>${esc(l.next)}</td>
                  <td>
                    <div class="row-actions">
                      ${l.stage !== 'won' && l.stage !== 'lost' ? `<button class="btn btn-ghost btn-small" type="button" data-action="lead-advance" data-id="${l.id}">推进</button>` : ''}
                      <button class="btn btn-danger btn-small" type="button" data-action="lead-delete" data-id="${l.id}">删除</button>
                    </div>
                  </td>
                </tr>`).join('') || '<tr><td colspan="7" class="empty">暂无线索</td></tr>'}
            </tbody>
          </table>
        </div>
        <form class="lead-form" data-form="lead">
          <label class="field">
            <span>客户 / 公司</span>
            <input name="company" required placeholder="例如：华东化工设备厂">
          </label>
          <label class="field">
            <span>来源平台</span>
            <select name="source">${platformOptions}<option>老客户转介绍</option><option>其他</option></select>
          </label>
          <label class="field">
            <span>意向产品</span>
            <input name="product" required placeholder="钢衬四氟储罐">
          </label>
          <label class="field">
            <span>阶段</span>
            <select name="stage">
              <option value="new">新增</option>
              <option value="contacted">已联系</option>
              <option value="quote">报价中</option>
              <option value="won">已成交</option>
              <option value="lost">已流失</option>
            </select>
          </label>
          <label class="field">
            <span>预估金额</span>
            <input name="value" type="number" min="0" placeholder="80000">
          </label>
          <label class="field">
            <span>下次跟进</span>
            <input name="next" type="date" value="${todayKey()}">
          </label>
          <button class="btn btn-primary" type="submit" data-action="submit-form">添加线索</button>
        </form>
      </div>

      <div class="panel private-panel">
        <div class="panel-head"><div><h2>私域承接</h2><p>线索进来后的统一动作</p></div></div>
        <div class="panel-body private-panel">
          <div class="private-block">
            <strong>企微欢迎语</strong>
            <p>您好，我是${esc(state.settings.company)}的销售。您关注的${esc(state.settings.products)}，我先发一份选型对照和近期案例，方便您快速判断。</p>
          </div>
          <div class="private-block">
            <strong>朋友圈节奏</strong>
            <p>08:00 行业干货 · 12:00 现场实拍 · 19:30 客户案例或资料钩子。每天最多 3 条，不刷屏。</p>
          </div>
          <div class="private-block">
            <strong>标签建议</strong>
            <p>来源平台 / 行业 / 介质 / 基材 / 预算区间 / 紧急度，每条线索至少打 3 个标签。</p>
          </div>
          <div class="private-block">
            <strong>企业微信二维码</strong>
            <div class="private-qr">在此替换企微活码</div>
          </div>
        </div>
      </div>
    </div>`;
}

function renderAssets() {
  const assets = state.assets;
  const layerOptions = ['内容层', '分发层', '搜索层', '私域层', '转化层', '复购层', '通用工具'].map((l) => `<option>${l}</option>`).join('');

  document.getElementById('view-assets').innerHTML = `
    <div class="section-head">
      <div class="section-title">
        <h2>软件与素材接入</h2>
        <p>把已有软件和素材对应到获客环节，避免重复建工具</p>
      </div>
    </div>

    <div class="asset-grid">
      ${assets.map((a) => `
        <div class="asset-card" style="--asset-bg:${a.color || 'var(--green-soft)'};--asset-color:${a.iconColor || 'var(--green)'}">
          <div class="asset-card-head">
            <div class="asset-icon">${icon(a.icon || 'box')}</div>
            <div>
              <h3>${esc(a.name)}</h3>
              <span class="tag">${esc(a.layer || '通用工具')}</span>
            </div>
          </div>
          <p>${esc(a.note)}</p>
          <div class="asset-actions">
            ${a.url ? `<a class="btn btn-ghost btn-small" href="${esc(a.url)}" target="_blank" rel="noopener">打开</a>` : ''}
            ${a.builtin ? '' : `<button class="btn btn-danger btn-small" type="button" data-action="delete-asset" data-id="${a.id}">移除</button>`}
          </div>
        </div>`).join('')}
    </div>

    <form class="panel asset-form" data-form="asset">
      <label class="field">
        <span>软件 / 素材名称</span>
        <input name="name" required placeholder="例如：报价系统">
      </label>
      <label class="field">
        <span>链接</span>
        <input name="url" placeholder="https://...">
      </label>
      <label class="field">
        <span>获客环节</span>
        <select name="layer">${layerOptions}</select>
      </label>
      <label class="field">
        <span>用途</span>
        <input name="note" placeholder="用于什么环节、怎么用">
      </label>
      <button class="btn btn-primary" type="submit" data-action="submit-form">接入软件</button>
    </form>`;
}

function renderData() {
  const days = weekDays(state.metricOffset);
  const wk = metricKey(state.metricOffset);
  const m = state.metrics[wk] || {};
  const rows = PLATFORMS.map((p) => ({ platform: p.name, row: m[p.name] || {} }));
  let exp = 0, click = 0, fans = 0, leads = 0, amount = 0;
  for (const { row } of rows) {
    exp += Number(row.exp || 0);
    click += Number(row.click || 0);
    fans += Number(row.fans || 0);
    leads += Number(row.leads || 0);
    amount += Number(row.amount || 0);
  }

  const summary = [
    ['总曝光', exp, 'var(--steel)'], ['总点击', click, 'var(--amber)'],
    ['新增粉丝', fans, 'var(--green)'], ['成交额', amount, 'var(--rust)']
  ];

  document.getElementById('view-data').innerHTML = `
    <div class="data-summary">
      ${summary.map(([label, value, color]) => `
        <div class="lead-stat" style="--accent:${color}">
          <small>${label}</small>
          <strong>${Number(value).toLocaleString('zh-CN')}</strong>
        </div>`).join('')}
    </div>

    <form class="panel" data-form="metrics" id="metrics-form">
      <div class="schedule-toolbar">
        <div class="section-title">
          <h2>${state.metricOffset === 0 ? '本周数据' : '上周数据'}</h2>
          <p>${fmtMD(days[0])} - ${fmtMD(days[6])}</p>
        </div>
        <div class="topbar-actions">
          <button class="btn btn-ghost" type="button" data-action="metric-prev">上一周</button>
          <button class="btn btn-ghost" type="button" data-action="metric-next">下一周</button>
          <button class="btn btn-primary" type="submit" data-action="submit-form">保存数据</button>
        </div>
      </div>
      <div class="data-table-wrap">
        <table class="table">
          <thead>
            <tr><th>平台</th><th>曝光</th><th>点击</th><th>新增粉丝</th><th>私信/留言</th><th>留资</th><th>成交额</th></tr>
          </thead>
          <tbody>
            ${rows.map(({ platform, row }) => `
              <tr>
                <td>${platform}</td>
                <td><input class="metric-input" type="number" min="0" data-platform="${platform}" data-metric="exp" value="${row.exp || ''}" placeholder="0"></td>
                <td><input class="metric-input" type="number" min="0" data-platform="${platform}" data-metric="click" value="${row.click || ''}" placeholder="0"></td>
                <td><input class="metric-input" type="number" min="0" data-platform="${platform}" data-metric="fans" value="${row.fans || ''}" placeholder="0"></td>
                <td><input class="metric-input" type="number" min="0" data-platform="${platform}" data-metric="msg" value="${row.msg || ''}" placeholder="0"></td>
                <td><input class="metric-input" type="number" min="0" data-platform="${platform}" data-metric="leads" value="${row.leads || ''}" placeholder="0"></td>
                <td><input class="metric-input" type="number" min="0" data-platform="${platform}" data-metric="amount" value="${row.amount || ''}" placeholder="0"></td>
              </tr>`).join('')}
            <tr class="totals-row">
              <td>合计</td>
              <td>${exp.toLocaleString('zh-CN')}</td>
              <td>${click.toLocaleString('zh-CN')}</td>
              <td>${fans.toLocaleString('zh-CN')}</td>
              <td>${rows.reduce((s, { row }) => s + Number(row.msg || 0), 0).toLocaleString('zh-CN')}</td>
              <td>${leads.toLocaleString('zh-CN')}</td>
              <td>¥${amount.toLocaleString('zh-CN')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>`;
}

function openSettings() {
  const form = document.getElementById('settings-form');
  form.company.value = state.settings.company;
  form.products.value = state.settings.products;
  form.phone.value = state.settings.phone;
  form.wechat.value = state.settings.wechat;
  form.website.value = state.settings.website;
  document.getElementById('settings-modal').hidden = false;
}

function closeSettings() {
  document.getElementById('settings-modal').hidden = true;
}

function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { el.hidden = true; }, 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('已复制');
  } catch (err) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    toast('已复制');
  }
}

function copyOutput(key) {
  const output = state.generated || buildGenerated(state.gen);
  if (key === 'titles') {
    copyText(output.titles.map((t, i) => `${i + 1}. ${t}`).join('\n'));
  } else {
    copyText(output[key]);
  }
}

function copyAll() {
  const output = state.generated || buildGenerated(state.gen);
  copyText([
    `【开场钩子】\n${output.hook}`,
    `【标题方案】\n${output.titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}`,
    `【${FORMAT_MAP[state.gen.format].label}】\n${output.script}`,
    `【发布文案】\n${output.caption}`,
    `【关键词与话题】\n${output.keywords}\n${output.hashtags}`,
    `【转化引导】\n${output.cta}`
  ].join('\n\n'));
}

function addIdeaToSchedule(id) {
  const idea = CONTENT_IDEAS.find((i) => i.id === id);
  if (!idea) return;
  const target = addDays(new Date(), 1);
  const platform = idea.type === '短视频' ? '抖音' : idea.type === '文章' ? '知乎' : '朋友圈';
  const time = idea.type === '短视频' ? '12:30' : idea.type === '文章' ? '08:30' : '19:30';
  state.tasks.push({ id: uid(), title: idea.title, platform, type: idea.type, date: dateKey(target), time, done: false });
  saveState();
  toast('已加入明天排期');
}

function generateSchedule() {
  const days = weekDays(state.scheduleOffset);
  const startKey = dateKey(days[0]);
  const endKey = dateKey(days[6]);
  const videos = CONTENT_IDEAS.filter((i) => i.type === '短视频');
  const articles = CONTENT_IDEAS.filter((i) => i.type === '文章');
  const hooks = CONTENT_IDEAS.filter((i) => i.type === '钩子');
  const videoPlatforms = ['抖音', '快手', '视频号'];
  const articlePlatforms = ['知乎', '百家号', '今日头条', '微信公众号'];
  const hookPlatforms = ['朋友圈', '企业微信'];
  const newTasks = days.flatMap((day, i) => {
    return [
      { title: videos[i % videos.length].title, platform: videoPlatforms[i % videoPlatforms.length], type: '短视频', time: '12:30' },
      { title: articles[(i + 2) % articles.length].title, platform: articlePlatforms[i % articlePlatforms.length], type: '文章', time: '08:30' },
      { title: hooks[(i + 4) % hooks.length].title, platform: hookPlatforms[i % hookPlatforms.length], type: '钩子', time: '19:30' }
    ].map((t) => ({ ...t, id: uid(), date: dateKey(day), done: false }));
  });
  state.tasks = state.tasks.filter((t) => t.date < startKey || t.date > endKey).concat(newTasks);
  saveState();
  renderSchedule();
  refreshIcons();
  toast('已生成 21 条排期');
}

function advanceLead(id) {
  const lead = state.leads.find((l) => l.id === id);
  if (!lead) return;
  const idx = STAGE_ORDER.indexOf(lead.stage);
  if (idx >= 0 && idx < STAGE_ORDER.length - 1) {
    lead.stage = STAGE_ORDER[idx + 1];
    saveState();
    renderLeads();
    refreshIcons();
    toast(`已推进到${STAGE_LABELS[lead.stage]}`);
  }
}

document.addEventListener('click', (e) => {
  const nav = e.target.closest('[data-view]');
  if (nav && nav.tagName === 'BUTTON' && VIEW_META[nav.dataset.view]) {
    switchView(nav.dataset.view);
    return;
  }

  if (e.target.closest('#open-settings') || e.target.closest('#open-settings-2')) {
    openSettings();
    return;
  }
  if (e.target.closest('#close-settings') || e.target.closest('#cancel-settings')) {
    closeSettings();
    return;
  }

  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  if (action === 'submit-form') {
    const form = el.closest('form[data-form]');
    if (form) {
      e.preventDefault();
      handleFormSubmit(form);
    }
  } else if (action === 'gen') {
    state.generated = buildGenerated(state.gen);
    saveState();
    renderContent();
    refreshIcons();
    toast('已生成新内容');
  } else if (action === 'copy') {
    copyOutput(el.dataset.copyKey);
  } else if (action === 'copy-all') {
    copyAll();
  } else if (action === 'copy-idea') {
    const idea = CONTENT_IDEAS.find((i) => i.id === el.dataset.id);
    if (idea) copyText(`${idea.title}\n${idea.desc}`);
  } else if (action === 'idea-schedule') {
    addIdeaToSchedule(el.dataset.id);
  } else if (action === 'content-filter') {
    state.contentFilter = el.dataset.filter;
    saveState();
    renderContent();
    refreshIcons();
  } else if (action === 'task-toggle') {
    const task = state.tasks.find((t) => t.id === el.dataset.id);
    if (task) { task.done = !task.done; saveState(); renderActiveView(); refreshIcons(); }
  } else if (action === 'task-delete') {
    if (confirm('删除这条排期？')) {
      state.tasks = state.tasks.filter((t) => t.id !== el.dataset.id);
      saveState();
      renderActiveView();
      refreshIcons();
    }
  } else if (action === 'week-prev') {
    state.scheduleOffset -= 1;
    saveState();
    renderSchedule();
    refreshIcons();
  } else if (action === 'week-next') {
    state.scheduleOffset += 1;
    saveState();
    renderSchedule();
    refreshIcons();
  } else if (action === 'generate-schedule') {
    if (confirm('将清空当前周排期并生成 21 条任务，继续？')) generateSchedule();
  } else if (action === 'clear-schedule') {
    if (confirm('清空当前周全部排期？')) {
      const days = weekDays(state.scheduleOffset);
      const startKey = dateKey(days[0]);
      const endKey = dateKey(days[6]);
      state.tasks = state.tasks.filter((t) => t.date < startKey || t.date > endKey);
      saveState();
      renderSchedule();
      refreshIcons();
    }
  } else if (action === 'lead-advance') {
    advanceLead(el.dataset.id);
  } else if (action === 'lead-delete') {
    if (confirm('删除这条线索？')) {
      state.leads = state.leads.filter((l) => l.id !== el.dataset.id);
      saveState();
      renderLeads();
      refreshIcons();
    }
  } else if (action === 'delete-asset') {
    if (confirm('移除这个软件入口？')) {
      state.assets = state.assets.filter((a) => a.id !== el.dataset.id);
      saveState();
      renderAssets();
      refreshIcons();
    }
  } else if (action === 'metric-prev') {
    state.metricOffset -= 1;
    saveState();
    renderData();
    refreshIcons();
  } else if (action === 'metric-next') {
    state.metricOffset += 1;
    saveState();
    renderData();
    refreshIcons();
  } else if (action === 'reset-demo') {
    if (confirm('清空当前数据并恢复示例数据？')) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        // storage may be unavailable; reload still resets in-memory state
      }
      location.reload();
    }
  }
});

document.addEventListener('change', (e) => {
  if (e.target.id === 'gen-scenario') {
    state.gen.scenario = e.target.value;
    state.generated = buildGenerated(state.gen);
    saveState();
    renderContent();
    refreshIcons();
  }
  if (e.target.name === 'gen-audience') {
    state.gen.audience = e.target.value;
    state.generated = buildGenerated(state.gen);
    saveState();
    renderContent();
    refreshIcons();
  }
  if (e.target.name === 'gen-format') {
    state.gen.format = e.target.value;
    state.generated = buildGenerated(state.gen);
    saveState();
    renderContent();
    refreshIcons();
  }
});

function handleFormSubmit(form) {
  const kind = form.dataset.form;
  const fd = new FormData(form);

  if (kind === 'task') {
    state.tasks.push({
      id: uid(), title: String(fd.get('title') || '').trim(), platform: fd.get('platform'),
      type: fd.get('type'), date: fd.get('date'), time: fd.get('time'), done: false
    });
    saveState();
    renderSchedule();
    refreshIcons();
    toast('任务已添加');
  } else if (kind === 'lead') {
    state.leads.push({
      id: uid(), company: String(fd.get('company') || '').trim(), source: fd.get('source'),
      product: String(fd.get('product') || '').trim(), stage: fd.get('stage'),
      value: Number(fd.get('value')) || 0, next: fd.get('next') || todayKey()
    });
    saveState();
    renderLeads();
    refreshIcons();
    toast('线索已添加');
  } else if (kind === 'asset') {
    state.assets.push({
      id: uid(), name: String(fd.get('name') || '').trim(), url: String(fd.get('url') || '').trim(),
      layer: fd.get('layer') || '通用工具', note: String(fd.get('note') || '').trim(),
      icon: 'plug', color: 'var(--green-soft)', iconColor: 'var(--green)', builtin: false
    });
    saveState();
    renderAssets();
    refreshIcons();
    toast('软件已接入');
  } else if (kind === 'metrics') {
    const wk = metricKey(state.metricOffset);
    const data = {};
    document.querySelectorAll('#metrics-form .metric-input').forEach((input) => {
      const platform = input.dataset.platform;
      const metric = input.dataset.metric;
      data[platform] = data[platform] || {};
      data[platform][metric] = Number(input.value) || 0;
    });
    state.metrics[wk] = data;
    saveState();
    renderData();
    refreshIcons();
    toast('数据已保存');
  } else if (kind === 'settings-form') {
    state.settings = {
      company: String(fd.get('company') || '').trim(),
      products: String(fd.get('products') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      wechat: String(fd.get('wechat') || '').trim(),
      website: String(fd.get('website') || '').trim()
    };
    state.generated = buildGenerated(state.gen);
    saveState();
    closeSettings();
    renderAll();
    refreshIcons();
    toast('参数已保存');
  }
}

document.addEventListener('submit', (e) => {
  const form = e.target.closest('form[data-form]');
  if (!form) return;
  e.preventDefault();
  handleFormSubmit(form);
});

document.getElementById('print-btn').addEventListener('click', () => {
  window.print();
});

document.querySelectorAll('.view').forEach((section) => {
  section.hidden = section.dataset.view !== state.currentView;
});

renderAll();
