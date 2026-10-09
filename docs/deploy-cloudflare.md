# 部署到 Cloudflare（hallway.ycjian.com）

这份说明对应 `app/wrangler.jsonc` 里已经写好的配置：Worker 名 `hallway-track`，域名 `hallway.ycjian.com`，D1 数据库 `hallway-track`（已创建，表已建好）。

## 部署之后是什么样

- 任何人都能打开网站、看场景和手册。
- 只有 `AUTH_ALLOWED_LOGINS` 里列出的 GitHub 用户名能登录。
- 登录后在「我 → 账号与模型」填 API 地址和 key，点「获取模型列表」选模型，选 reasoning effort，保存。之后这个人的所有练习都由服务器用他自己的 key 去调用他自己的地址。
- 数据库里只有两张表：`users`（GitHub 用户名、头像）和 `model_configs`（地址、**加密后的** key、模型名、effort）。练习记录、草稿、笔记不在数据库里，仍在各自浏览器里。
- 这个部署没有共享的 key：没登录、或登录了但没保存配置的人，会看到「接入模型」提示。

## 你要做的四步

### 1. 建一个 GitHub OAuth 应用

GitHub → Settings → Developer settings → OAuth Apps → New OAuth App：

| 字段 | 填 |
|---|---|
| Homepage URL | `https://hallway.ycjian.com` |
| Authorization callback URL | `https://hallway.ycjian.com/api/auth/callback` |

建好后记下 **Client ID**，点 Generate a new client secret 记下 **Client secret**。

### 2. 在 Cloudflare 连接仓库

Cloudflare 后台 → Workers & Pages → Create → Import a repository → 选 `MTDickens/SocialCoach`：

| 字段 | 填 |
|---|---|
| Project name | `hallway-track`（必须和 `wrangler.jsonc` 里的 `name` 一致） |
| Production branch | `main`（先把 PR 合并） |
| Root directory | `app` |
| Build command | `pnpm exec opennextjs-cloudflare build` |
| Deploy command | `pnpm exec wrangler deploy` |

### 3. 设三个密钥

Worker → Settings → Variables and Secrets → Add，类型都选 **Secret**：

| 名字 | 值 |
|---|---|
| `ACCOUNT_SECRET` | 至少 32 位随机字符，例如 `openssl rand -base64 48` 的输出 |
| `GITHUB_CLIENT_ID` | 第 1 步的 Client ID |
| `GITHUB_CLIENT_SECRET` | 第 1 步的 Client secret |

`ACCOUNT_SECRET` 同时用来签发登录状态和加密数据库里的 key。**换掉它，所有人需要重新登录并重新填 key**；丢了它，数据库里的 key 谁也解不开（包括你）。

设完后在 Deployments 里重新部署一次。

### 4. 加朋友

改 `app/wrangler.jsonc` 里的这一行，推送后自动重新部署：

```jsonc
"AUTH_ALLOWED_LOGINS": "MTDickens,朋友的GitHub用户名,另一个"
```

把某个人从名单里删掉，他的登录立刻失效（每次请求都会核对名单）。

## 可能遇到的问题

- **域名没生效**：`ycjian.com` 这个域必须在同一个 Cloudflare 账号下。想换子域名，改 `wrangler.jsonc` 里的 `routes` 和 `APP_ORIGIN`，同时改 GitHub OAuth 应用里的两个地址。
- **偶发 1102 错误（超出 CPU 限制）**：免费版 Workers 每个请求只有 10 毫秒 CPU 时间，等模型返回不计入，但页面渲染和解析长场景会用掉一些。如果出现，需要升级到 Workers Paid（每月 5 美元）。本地测不出线上会不会触发。
- **构建时 pnpm 版本报错**：项目锁定 pnpm 11。在 Worker 的构建设置里加环境变量 `PNPM_VERSION=11.24.0`。
- **保存配置后提示「不提供可核对的模型信息」**：这个中转站没有 `/models` 接口，或暂时连不上；不代表不能用，练一场就知道。
- **选了 reasoning effort 后报模型错误**：这个模型或中转站不支持该参数，改回「默认」。

## 本地试

```bash
cd app
cp .dev.vars.example .dev.vars        # 填本地用的值
pnpm cf:migrate:local                 # 在本地 D1 文件里建表
pnpm cf:preview                       # 在本地的 Workers 运行时里跑
```

## 以后改表结构

在 `app/migrations/` 加一个新的 `.sql` 文件，然后 `pnpm cf:migrate`（需要本机登录过 wrangler）。
