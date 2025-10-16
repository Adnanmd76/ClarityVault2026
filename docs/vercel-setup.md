# 🔧 Vercel Setup - Detailed Configuration Guide

This document provides detailed instructions for setting up ClarityVault2026 on Vercel.

---

## 📋 Table of Contents

1. [Account Setup](#account-setup)
2. [Project Import](#project-import)
3. [Build Configuration](#build-configuration)
4. [Environment Variables](#environment-variables)
5. [Domain Configuration](#domain-configuration)
6. [Analytics Setup](#analytics-setup)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Account Setup

### Create Vercel Account

1. Visit [https://vercel.com/signup](https://vercel.com/signup)
2. Choose **"Continue with GitHub"** (recommended)
3. Authorize Vercel to access your GitHub account
4. Complete profile setup

### Install Vercel for GitHub

1. Go to [https://github.com/apps/vercel](https://github.com/apps/vercel)
2. Click **"Install"**
3. Select **"Only select repositories"**
4. Choose **`ClarityVault2026`**
5. Click **"Install"**

---

## 📦 Project Import

### Method 1: From Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** button (top right)
3. Select **"Project"**
4. Find **`ClarityVault2026`** in the list
5. Click **"Import"**

### Method 2: Direct Link

Use this URL for quick import:
```
https://vercel.com/new/git/external?repository-url=https://github.com/Adnanmd76/ClarityVault2026
```

### Method 3: Deploy Button

Add this to your README.md:
```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Adnanmd76/ClarityVault2026)
```

---

## ⚙️ Build Configuration

### Framework Detection

Vercel should automatically detect:
- **Framework:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`

### Manual Configuration

If auto-detection fails, set these manually:

```yaml
Framework Preset: Create React App
Root Directory: ./
Build Command: npm run build
Output Directory: build
Install Command: npm install --legacy-peer-deps
Development Command: npm start
```

### Override Settings

If you need custom settings, create `vercel.json`:

```json
{
  "version": 2,
  "name": "ClarityVault2026",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 🔐 Environment Variables

### Adding Variables via Dashboard

1. In project settings, go to **"Environment Variables"**
2. Click **"Add New"**
3. Fill in:
   - **Key:** Variable name (e.g., `REACT_APP_INFURA_ID`)
   - **Value:** Your actual value
   - **Environments:** Select all three
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
4. Click **"Save"**

### Bulk Import

You can import multiple variables at once:

1. Click **"Add New"** → **"Plaintext"**
2. Paste all variables in this format:
```
REACT_APP_INFURA_ID=abc123
REACT_APP_ALCHEMY_KEY=xyz789
REACT_APP_ENCRYPTION_KEY=key123
```
3. Select environments
4. Click **"Save"**

### Required Variables

Minimum required for deployment:

```bash
REACT_APP_INFURA_ID=your_infura_id
REACT_APP_ALCHEMY_KEY=your_alchemy_key
REACT_APP_ENCRYPTION_KEY=your_encryption_key
REACT_APP_JWT_SECRET=your_jwt_secret
```

### Environment-Specific Variables

Set different values for different environments:

**Production:**
```bash
REACT_APP_API_URL=https://api.clarityvault2026.com
REACT_APP_DEBUG=false
```

**Preview/Development:**
```bash
REACT_APP_API_URL=https://api-dev.clarityvault2026.com
REACT_APP_DEBUG=true
```

---

## 🌐 Domain Configuration

### Add Custom Domain

1. Go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `clarityvault.com`)
4. Click **"Add"**

### DNS Configuration

#### For Root Domain (clarityvault.com)

Add **A Record**:
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### For Subdomain (www.clarityvault.com)

Add **CNAME Record**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### For Custom Subdomain (app.clarityvault.com)

Add **CNAME Record**:
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
TTL: 3600
```

### SSL Certificate

- ✅ Automatically provisioned by Vercel
- ✅ Free Let's Encrypt certificate
- ✅ Auto-renewal enabled
- ⏱️ Takes 5-10 minutes to activate

---

## 📊 Analytics Setup

### Enable Speed Insights

1. Go to **Analytics** tab
2. Click **"Enable Speed Insights"**
3. Confirm activation

### View Analytics

Access at:
```
https://vercel.com/[username]/clarityvault2026/analytics
```

### Metrics Tracked

- **Core Web Vitals:**
  - FCP (First Contentful Paint)
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
  - TTFB (Time to First Byte)

- **Real User Monitoring:**
  - Page load times
  - Geographic distribution
  - Device types
  - Browser types

---

## 🔄 Deployment Workflow

### Automatic Deployments

**Main Branch:**
- Every push → Production deployment
- URL: `https://clarityvault2026.vercel.app`

**Feature Branches:**
- Every push → Preview deployment
- URL: `https://clarityvault2026-git-[branch].vercel.app`

**Pull Requests:**
- Every PR → Preview deployment
- Comment with preview URL added automatically

### Manual Deployment

**Via Dashboard:**
1. Go to **Deployments** tab
2. Click **"Redeploy"** on any deployment
3. Confirm

**Via CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🚨 Troubleshooting

### Build Fails with Dependency Error

**Error:**
```
npm ERR! ERESOLVE could not resolve
```

**Solution:**
1. Go to **Settings** → **General**
2. Find **Build & Development Settings**
3. Override **Install Command**:
```bash
npm install --legacy-peer-deps
```
4. Save and redeploy

### Environment Variables Not Working

**Symptoms:**
- Variables show as `undefined`
- API calls fail

**Solutions:**

1. **Check variable names:**
   - Must start with `REACT_APP_`
   - Case-sensitive

2. **Check environments:**
   - Ensure all three are selected
   - Production, Preview, Development

3. **Redeploy:**
   - Changes require redeployment
   - Go to Deployments → Redeploy

### 404 on Direct URL Access

**Issue:**
- Routes work when navigating
- Direct URL shows 404

**Solution:**

Ensure `vercel.json` exists with:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Build Timeout

**Error:**
```
Error: Command timed out after 15 minutes
```

**Solutions:**

1. **Increase timeout:**
   - Settings → General → Build & Development Settings
   - Increase timeout limit

2. **Optimize build:**
   - Remove unused dependencies
   - Use production build only

3. **Check for infinite loops:**
   - Review build scripts
   - Check for circular dependencies

### Memory Limit Exceeded

**Error:**
```
Error: JavaScript heap out of memory
```

**Solution:**

Add to `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS=--max_old_space_size=4096 react-scripts build"
  }
}
```

---

## 🔧 Advanced Configuration

### Custom Build Command

Override in `vercel.json`:
```json
{
  "buildCommand": "npm run build && npm run post-build"
}
```

### Custom Headers

Add security headers:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Redirects

Add in `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

---

## 📱 Mobile App Integration

### Configure for PWA

Vercel automatically serves:
- `manifest.json`
- Service workers
- Icons

Ensure these files exist:
- `public/manifest.json`
- `public/favicon.ico`
- `public/logo192.png`
- `public/logo512.png`

---

## 🔗 Useful Commands

### Vercel CLI

```bash
# Install
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy preview
vercel

# Deploy production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]

# View environment variables
vercel env ls

# Add environment variable
vercel env add REACT_APP_KEY production
```

---

## 📚 Additional Resources

- **Vercel Documentation:** [https://vercel.com/docs](https://vercel.com/docs)
- **Create React App on Vercel:** [https://vercel.com/guides/deploying-react-with-vercel](https://vercel.com/guides/deploying-react-with-vercel)
- **Environment Variables:** [https://vercel.com/docs/environment-variables](https://vercel.com/docs/environment-variables)
- **Custom Domains:** [https://vercel.com/docs/custom-domains](https://vercel.com/docs/custom-domains)
- **Speed Insights:** [https://vercel.com/docs/speed-insights](https://vercel.com/docs/speed-insights)

---

## ✅ Post-Deployment Checklist

After successful deployment:

- [ ] Production URL is accessible
- [ ] All routes work correctly
- [ ] Environment variables are loaded
- [ ] API calls are successful
- [ ] Wallet connection works
- [ ] Images and assets load
- [ ] Speed Insights is enabled
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate is active
- [ ] Analytics are tracking
- [ ] Error monitoring is set up

---

**Need more help? Check [DEPLOYMENT.md](../DEPLOYMENT.md) or open an issue on GitHub.**
