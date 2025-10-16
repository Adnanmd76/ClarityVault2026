# 🚀 ClarityVault2026 - Deployment Guide

Complete guide for deploying ClarityVault2026 to Vercel.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Vercel account ([Sign up here](https://vercel.com/signup))
- ✅ API keys ready (Infura, Alchemy, etc.)
- ✅ Repository pushed to GitHub

---

## 🎯 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Adnanmd76/ClarityVault2026)

Click the button above for one-click deployment!

---

## 📦 Manual Deployment Steps

### Step 1: Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Connect your GitHub account (if not already connected)
5. Search for **`ClarityVault2026`**
6. Click **"Import"**

---

### Step 2: Configure Project

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Project Name** | `ClarityVault2026` |
| **Framework Preset** | `Create React App` |
| **Root Directory** | `./` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |
| **Install Command** | `npm install --legacy-peer-deps` |

---

### Step 3: Environment Variables

Add these environment variables in Vercel:

#### 🔴 Required Variables

```bash
# API Keys
REACT_APP_INFURA_ID=your_infura_project_id_here
REACT_APP_ALCHEMY_KEY=your_alchemy_key_here

# Security Keys (Generate: openssl rand -hex 32)
REACT_APP_ENCRYPTION_KEY=your_32_character_encryption_key
REACT_APP_JWT_SECRET=your_32_character_jwt_secret

# Backend Configuration
REACT_APP_API_URL=http://localhost:3001

# Chain RPC URLs
REACT_APP_ETH_RPC=https://mainnet.infura.io/v3/YOUR_INFURA_ID
REACT_APP_POLYGON_RPC=https://polygon-rpc.com
REACT_APP_BSC_RPC=https://bsc-dataseed.binance.org/
REACT_APP_AVALANCHE_RPC=https://api.avax.network/ext/bc/C/rpc
REACT_APP_FANTOM_RPC=https://rpc.ftm.tools

# Default Chain Configuration
REACT_APP_DEFAULT_CHAIN=ethereum
REACT_APP_DEFAULT_CHAIN_ID=1

# Environment
NODE_ENV=production
REACT_APP_DEBUG=false
```

#### 🟡 Optional Variables

```bash
# WalletConnect (Get from: https://cloud.walletconnect.com)
REACT_APP_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Web3Auth (Get from: https://dashboard.web3auth.io)
REACT_APP_WEB3AUTH_CLIENT_ID=your_web3auth_client_id

# SIM API (For backend)
SIM_API_KEY=your_sim_api_key
```

---

### Step 4: Add Environment Variables in Vercel

For each variable:

1. Click **"Add Environment Variable"**
2. Enter **Name** (e.g., `REACT_APP_INFURA_ID`)
3. Enter **Value** (your actual key)
4. Select **all three environments**: ☑️ Production ☑️ Preview ☑️ Development
5. Click **"Add"**
6. Repeat for all variables

---

### Step 5: Deploy

1. Review all settings
2. Click **"Deploy"** button
3. Wait for build to complete (2-5 minutes)
4. 🎉 Your app is live!

---

## 🔑 Getting API Keys

### Infura (Ethereum RPC)

1. Go to [https://infura.io](https://infura.io)
2. Sign up / Log in
3. Create new project
4. Copy **Project ID**
5. Use as `REACT_APP_INFURA_ID`

### Alchemy (Enhanced Ethereum)

1. Go to [https://dashboard.alchemy.com](https://dashboard.alchemy.com)
2. Sign up / Log in
3. Create new app
4. Copy **API Key**
5. Use as `REACT_APP_ALCHEMY_KEY`

### WalletConnect (Optional)

1. Go to [https://cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Sign up / Log in
3. Create new project
4. Copy **Project ID**
5. Use as `REACT_APP_WALLETCONNECT_PROJECT_ID`

### Web3Auth (Optional)

1. Go to [https://dashboard.web3auth.io](https://dashboard.web3auth.io)
2. Sign up / Log in
3. Create new project
4. Copy **Client ID**
5. Use as `REACT_APP_WEB3AUTH_CLIENT_ID`

---

## 🔐 Generate Security Keys

Run these commands in terminal:

```bash
# Generate Encryption Key
openssl rand -hex 32

# Generate JWT Secret
openssl rand -hex 32
```

Copy the output and use as:
- `REACT_APP_ENCRYPTION_KEY`
- `REACT_APP_JWT_SECRET`

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add Domain"**
4. Enter your domain name
5. Follow DNS configuration instructions

### DNS Configuration

Add these records to your domain provider:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

---

## 📊 Post-Deployment

### Enable Analytics

1. Go to Vercel Dashboard → Your Project
2. Click **"Analytics"** tab
3. Click **"Enable Speed Insights"**
4. Analytics will start tracking automatically

### Verify Deployment

Check these URLs:

- **Production:** `https://clarityvault2026.vercel.app`
- **Preview:** `https://clarityvault2026-git-[branch].vercel.app`

---

## 🔄 Automatic Deployments

Vercel automatically deploys:

- **Main branch** → Production deployment
- **Other branches** → Preview deployments
- **Pull requests** → Preview deployments

Every `git push` triggers a new deployment!

---

## 🚨 Troubleshooting

### Build Failed - Dependency Conflict

**Error:** `ERESOLVE could not resolve`

**Solution:**
```bash
Install Command: npm install --legacy-peer-deps
```

### Environment Variables Not Working

**Issue:** Variables showing as `undefined`

**Solution:**
1. Ensure variable names start with `REACT_APP_`
2. Select all three environments (Production, Preview, Development)
3. Redeploy the project

### 404 Error on Routes

**Issue:** Direct URL access shows 404

**Solution:**
- `vercel.json` is already configured
- Check if file exists in repository
- Redeploy if needed

### Build Timeout

**Issue:** Build takes too long

**Solution:**
1. Go to Settings → General
2. Increase build timeout
3. Check for large dependencies

---

## 📱 Vercel CLI (Advanced)

### Install Vercel CLI

```bash
npm install -g vercel
```

### Deploy from Terminal

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🔗 Useful Links

- **Vercel Dashboard:** [https://vercel.com/dashboard](https://vercel.com/dashboard)
- **Vercel Documentation:** [https://vercel.com/docs](https://vercel.com/docs)
- **Speed Insights:** [https://vercel.com/docs/speed-insights](https://vercel.com/docs/speed-insights)
- **Environment Variables:** [https://vercel.com/docs/environment-variables](https://vercel.com/docs/environment-variables)

---

## ✅ Deployment Checklist

Before deploying, ensure:

- [ ] Repository is pushed to GitHub
- [ ] All required API keys are ready
- [ ] Security keys are generated
- [ ] Environment variables are prepared
- [ ] Build command is correct
- [ ] Output directory is set to `build`
- [ ] Install command includes `--legacy-peer-deps`

After deployment:

- [ ] Production URL is accessible
- [ ] All pages load correctly
- [ ] Wallet connection works
- [ ] API calls are successful
- [ ] Speed Insights is enabled
- [ ] Custom domain configured (if applicable)

---

## 🆘 Need Help?

If you encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review build logs in Vercel Dashboard
3. Check environment variables
4. Open an issue on GitHub

---

## 📝 Notes

- **Node Version:** Vercel automatically uses Node.js 20.x
- **Build Time:** Typically 2-5 minutes
- **Free Tier:** 100GB bandwidth/month
- **SSL:** Automatically enabled
- **CDN:** Global edge network

---

**Happy Deploying! 🚀**

For more information, see [docs/vercel-setup.md](./docs/vercel-setup.md)
