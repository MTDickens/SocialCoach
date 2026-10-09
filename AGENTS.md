# AGENTS.md

Hallway Track —— [SocialCoach](https://github.com/GeminiLight/SocialCoach) 的分支，专练前沿 AI 圈的社交场合。应用在 `app/`（Next.js），仓库根只有文档。

## 分支约定（与下文冲突时以此为准）

- 先读 `wiki/13-stage-hallway-track.md`：这个分支加了什么、为什么、还没做什么。`wiki/00`–`12` 描述的是原项目，未改动。
- **对外名称是 `Hallway Track`。** 下文「产品名一律是 SocialCoach」「主句四处同源」是原项目的规定，在本分支不适用；内部存储键仍以 `socialcoach.` 开头，不要改。About、README 与 `NOTICE.md` 保留对原项目的署名。
- **新语料只放在 `app/src/data/corpus/frontier/`。** 场景必须有 `simulationFacts`、`simulationDirection`、至少一项 `track: "frontier"` 的能力，`source` 用 `frontierSource()` 且只引用 `sources.ts` 里核对过的来源。加新来源前先打开原文核对题目、作者和要用的论点。`pnpm exec tsx scripts/check-corpus.ts` 会检查这些。
- **人物和机构一律虚构；不模拟具名真人。** 不把真实公司写成角色的雇主，不给真实的人或机构编事实。学习者的研究内容不写死。
- **手册（`data/field-guide.ts`）如实区分来源与归纳。** 对不上已核对来源的条目 `basis` 留空，页面会标为「编者归纳」。
- **写作台不提供模板，不替用户加事实。** 引文与数字的代码核对（`tasks/draft-review.ts`）不能放宽。
- **账号只在 Cloudflare 部署上存在，且只存模型配置。** `app/src/lib/account/` 负责 GitHub 登录、D1 里的用户表和每人的模型地址 / 加密后的 key / 模型名。练习记录、草稿、笔记仍然只在浏览器里，不要把它们搬进数据库。API key 永远不回传给浏览器，不写日志；`tests/core/accounts.test.ts` 里的这些断言不能删。没有 D1 绑定或密钥时 `accountEnv()` 返回 null，应用行为与原项目一致。部署说明见 `docs/deploy-cloudflare.md`。
- 原项目的其余约束照旧：NPC 不讨好、反馈先引用原话、语料必须有 `source`、文案是 `{zh, en}`、色值只在 `globals.css`、结构化输出走 `jsonCall()`。
- 这个分支只在语料和上述新增文件里做事，尽量不动原项目的核心模块，方便以后合并上游。

---

以下为原项目的说明。

## 入口

1. 先读 `wiki/00-product-proposal.md`（做什么、**不做什么**）和 `wiki/01-project-roadmap.md`（当前阶段、功能索引）。
2. 动 `app/` 里的代码前，读 `app/AGENTS.md` —— Next.js 16 与训练数据差异较大，该文件由 `next dev` 自动维护。
3. 不要一次加载 `wiki/archive/`、`wiki/refs/`、`wiki/reviews/`。

## 3D 版本维护

- **主仓库是唯一开发主线。** 3D 饭局的功能、人物、交互与修复优先在 `app/src/features/dinner/` 和主站 `/3d` 完成、验证和发布。
- `GeminiLight/SocialCoach-3D` 保留为独立演示原型，只接受从主仓库到独立仓库的可选同步。允许版本落后，不以两边一致作为主站交付条件。
- 仅在适配成本低时同步可复用的场景、人物、素材或纯逻辑；不为同步复制主站的 Next.js、模型 / BYOK、存储和发布集成，也不维护两套平行实现。
- 同步时记录主仓库来源提交和实际同步范围，在独立仓库运行相应检查；需要大量适配或独立维护时，保留其已验证版本。未经新需求，不引入自动双向同步或共享包重构。

## 论文材料

- 论文写作、投稿调研、审稿回复及未公开研究记录保留在本地或独立研究仓库，不纳入本产品仓库的提交、上传或部署。
- 当前本地论文材料位于 `docs/research/`，已由 `.gitignore` 排除；提交前核对新增文件，避免论文材料混入其他目录。
- 产品实现、产品评审与测试验收记录按下方 Wiki 规则维护。

## Wiki

架构 / 数据流改动再读 `wiki/02-system-architecture.md` 与当前 stage；API 改动读 `wiki/04-api-reference.md`；UI 改动读 `wiki/03-design-principle.md`；修 bug 先扫 `wiki/80-known-pitfalls.md`。

本项目用**紧凑编号方案**（`0x` 战略+架构，`1x` 阶段，`8x` 运维）。不要引入 `20-` / `30-` / `6x-` 这类展开方案编号。

开发到以下节点时同步 wiki（不需要每次 commit 都更新）：

| 做了这件事 | 更新 |
|---|---|
| 新增 / 修改 API | `wiki/04-api-reference.md` |
| 完成 stage 内一个功能 | `wiki/01-project-roadmap.md` 对应行状态 |
| 架构变更（新模块、新数据流） | `wiki/02-system-architecture.md` |
| 踩到非显而易见的坑 | `wiki/80-known-pitfalls.md`（现象 / 原因 / 解法 / 教训） |
| 同一模块连续 3+ 相关 bug | 新建 `wiki/81-postmortem-{topic}.md` |
| 发现 bug / 技术债 / 改进想法 | `wiki/85-backlog.md` |
| 新增设计 token / 动效 | `wiki/03-design-principle.md` |
| 阶段全部交付 | `wiki/90-changelog.md`（从 backlog 已完成项整理） |
| 重命名 / 移动 wiki 文件 | 全文搜索旧路径并更新引用 |

新建：功能复杂到一句话说不清 → `wiki/1X-stage-X.md`；小功能需要边界和验收 → `wiki/specs/spec-{name}.md`；外部机制被查阅 2 次以上 → `wiki/refs/{topic}.md`；评审结束 → `wiki/reviews/review-{YYYY-MM-DD}-{subject}.md`。

归档：spec 完成 → `git mv` 到 `wiki/archive/specs/` 并在 backlog 打勾；review 的 action items 全部完成 → `archive/reviews/`；stage 完结且无跨引用 → `archive/stages/`，roadmap 标 `[archived]`。

每个阶段开始时跑一次审计，按 high → medium 处理：

```bash
python3 ~/.claude/skills/project-wiki/scripts/wiki_audit.py wiki/
```

## 项目专有约束

这些约束违反了就是产品定位问题，不是代码风格问题：

- **NPC 不能讨好用户。** 不因态度好就让步、不提前吐露 `hidden`、不在对话内跳出角色做教练。阻力是产品唯一的护城河。
- **剧情必须可玩、有转折。** 开场给具体冲突；用户行动改变后续压力、条件或关系。部分成功后谈其后果，失误后保留修复与拒绝的路。高潮是用户能回应的关键决定，不靠随机辱骂、编造紧急事件、固定回合换题或重复施压。文字 / 3D / 自定义排练统一遵守；新场景验收必须含让步、拒绝、反问、玩笑、修复与续聊，不能只测标准答案。
- **任何反馈必须先引用用户原话。** 没有转录证据的评价不出现。
- **语料必须有 `source`。** 不生成无出处的「策略」或「案例」。
- **不引入账号体系或服务端存储。** 状态留在设备上、可导出。
- **面向用户的静态文案是 `L = {zh, en}` 双语对象**，用 `pick(v, lang)` 取值。
- **产品名对外一律是 `SocialCoach`**，中文语境也不例外。中文说明放在名字下面的副行（`nav_workspace`：你的情商练习场），不做第二个名字。
- **主句四处同源**：`README.md`、`app/src/app/layout.tsx` 的 `metadata.description`、`app/public/manifest.webmanifest` 的 `description`、`site/content.mjs` 的 `hero.h1` 与 `footer.tagline`。同源指的是**主句本身逐字一致**，不是整个字符串相等——manifest 只放主句，layout 是主句加一段展开，README 是行文。改主句必须四处一起改。
- **色值只在 `app/src/app/globals.css` 定义**（OKLCH）。组件里不写死颜色；对外 SVG 用脚本换算的 hex。
- **结构化输出走 `jsonCall()` / `extractJSON()`**，不要用 SDK 的 `output_config.format`（当前网关不支持）。
