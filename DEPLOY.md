# 言绎官网 GitHub Pages 部署指南

## 第一步：创建 GitHub 仓库

1. 打开 https://github.com/new
2. 仓库名输入 `promptlogic-website`
3. 选择 **Public**（GitHub Pages 免费版要求公开仓库）
4. **不要**勾选 README / .gitignore / License（本地已有）
5. 点 **Create repository**

## 第二步：推送代码

在终端执行（把 `你的用户名` 替换成你的 GitHub 用户名）：

```powershell
cd g:\Projects\PromptLogicPlatform\website
git remote add origin https://github.com/你的用户名/promptlogic-website.git
git branch -M main
git push -u origin main
```

> 首次推送会弹窗要求登录 GitHub，按提示完成认证。

## 第三步：开启 GitHub Pages

1. 打开仓库页面 → 点顶部 **Settings**
2. 左侧菜单找到 **Pages**
3. **Source** 选 `Deploy from a branch`
4. **Branch** 选 `main`，目录选 `/ (root)`
5. 点 **Save**
6. 等待 1-2 分钟，刷新页面，顶部会出现访问链接：
   `https://你的用户名.github.io/promptlogic-website/`

## 第四步：绑定自定义域名

### 4.1 域名注册

去域名注册商购买域名（推荐 `.cn` 或 `.com`），例如：
- 腾讯云：https://dnspod.cloud.tencent.com
- 阿里云：https://wanwang.aliyun.com
- Cloudflare：https://www.cloudflare.com

### 4.2 配置 DNS 解析

在域名注册商的 DNS 管理面板添加以下记录：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| CNAME | www | 你的用户名.github.io | 600 |

> `@` 表示裸域（如 `promptlogic.cn`），`www` 表示 `www.promptlogic.cn`

### 4.3 修改 CNAME 文件

修改 `website/CNAME` 文件内容为你的实际域名：

```
promptlogic.cn
```

然后推送：

```powershell
cd g:\Projects\PromptLogicPlatform\website
git add CNAME
git commit -m "update: custom domain"
git push
```

### 4.4 GitHub 端绑定

1. 仓库 → **Settings** → **Pages**
2. **Custom domain** 输入你的域名（如 `promptlogic.cn`）
3. 点 **Save**
4. 等 DNS 生效后，勾选 **Enforce HTTPS**

## 第五步：验证

- DNS 生效时间：10 分钟 ~ 48 小时（通常 30 分钟内）
- HTTPS 证书自动签发：DNS 生效后约 15 分钟
- 最终访问地址：`https://promptlogic.cn` ✅

## 后续更新

每次修改网站内容后，推送即自动部署：

```powershell
cd g:\Projects\PromptLogicPlatform\website
git add .
git commit -m "update: 更新说明"
git push
```

GitHub Pages 会在 1-2 分钟内自动重新部署。
