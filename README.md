# Hallway Track

**会场、晚宴、投资人的电话，先在这里练一遍。**

Hallway Track 是 [SocialCoach](https://github.com/GeminiLight/SocialCoach) 的一个分支，专门练前沿 AI 圈的社交场合：NeurIPS / ICML / ICLR 的 poster 和走廊、会议晚宴和赞助酒会、tech night、和投资人或研究者的通话、组织 workshop。

你技术上没问题，但坐到一桌投资人、创业者和 lab 研究员中间，不知道他们的规矩。这里的对面是只问「所以呢」的投资人、不能谈未发布工作的研究员、时间很紧的教授。他们不会顺着你；练完之后，复盘逐条引用你的原话。

[English](README.en.md) · [原项目 README](docs/upstream-README.zh-CN.md)

![一场会议晚宴的场景简报](docs/screenshots/hallway-track/briefing-zh.png)

## 在原项目之上加了什么

| | 内容 |
|---|---|
| **33 个场景** | 会议现场 10 个、晚宴与酒会 9 个、约聊与通话 7 个、组织与主持 7 个。每个角色有自己的立场和一件不会主动说的事；每个场景写明了固定事实和各种走向下对方怎么反应。 |
| **11 项能力** | 讲清自己的工作、分寸感、读懂对方的身份与激励、信息交换、加入与退出对话、提出明确的请求、当场落实下一步、问出好问题、亮出观点并更新、守住不能说的、召集与主持。放在原有的五项 CASEL 能力之下，雷达图、排程和熟练度估计照常工作。 |
| **场合手册**（`/field`） | 八类人各自靠什么被评价、想要什么、不能说什么、常说的话是什么意思；八种场合的规矩；三十多个词。 |
| **实战笔记** | 活动结束后记下真实发生的事，可以直接拿去排练。 |
| **写作台**（`/write`） | 约聊邮件、跟进、请人引荐、邀请讲者、主页简介、发布帖。模拟的收件人只读一遍，告诉你他读懂了什么；每条批注指向你原文里的一处；改写只删和调。 |
| **16 条策略、12 个教学示例** | 21 个来源，每一个都在 2026-10-09 打开核对过。 |

原项目的 58 个场景、3D 实景、视频示范和全部机制都保留。

![场合手册](docs/screenshots/hallway-track/field-guide-zh.png)

## 运行

```bash
cd app
cp .env.example .env.local     # 填 LLM_API_KEY；或留空，在应用里填你自己的 key
pnpm install
pnpm dev                       # http://localhost:3000
```

支持 Anthropic 和任何 OpenAI 兼容接口。没有账号，没有数据库；练习、草稿和笔记都在你的浏览器里，可以导出为 JSON。部署方式与原项目相同，见[原项目 README](docs/upstream-README.zh-CN.md)。

```bash
pnpm check                     # lint、类型、语料检查、全部测试
```

## 部署成一个网站

`app/wrangler.jsonc` 已经配好 Cloudflare Workers + D1：GitHub 登录（白名单），每个人把自己的 API 地址、key、模型和 reasoning effort 保存在账号里，key 加密存储。步骤见 [docs/deploy-cloudflare.md](docs/deploy-cloudflare.md)。练习记录不上传。

## 要知道的几件事

- **模拟的投资人是模型想象中的投资人。** 场合手册标了「依据」的条目来自公开来源，其余是编者归纳，不是研究结论。它是一张起步地图，要靠你自己的实战笔记修正。
- **人物和机构都是虚构的。** 场景不模拟任何真人。在排练里写了真人的名字，得到的也只是一个练习对象，不是对那个人的预测。
- **它练的是开口，不是你手里有什么。** 别人愿意和你交换信息，是因为你有具体的判断可以给。这部分来自你的研究，工具替代不了。
- **写作台的改写不会替你加成果。** 改写里出现你没写过的数字，这次点评会被丢弃重做；需要你补的地方留方括号。发之前自己再读一遍。
- **3D 实景仍是原项目的饭桌、电梯口和办公室。** 这个分支的新场景目前只有文字版。

## 改了哪些地方

见 [NOTICE.md](NOTICE.md) 和 [wiki/13-stage-hallway-track.md](wiki/13-stage-hallway-track.md)。新语料全部在 `app/src/data/corpus/frontier/`，加一个场景就会被打标、检索和排程。

## 许可与出处

Apache-2.0，与原项目相同。原项目版权归 SocialCoach contributors 所有；论文：

> Wang et al., *SocialCoach: Personalized Social Skill Learning with Agentic Tutoring and Practice*, arXiv:2606.04155, 2026.

仅用于低风险的练习与反思，不用于临床评估、诊断或对人做出录用等决定。
