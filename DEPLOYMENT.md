# 🚀 Deployment Guide - Beautycode

Panduan lengkap untuk deploy Beautycode ke Netlify dan platform lainnya.

## 📦 Prerequisites

Sebelum deploy, pastikan:
- ✅ Code sudah di-test lokal (`npm run dev`)
- ✅ Build success (`npm run build`)
- ✅ Git repository sudah setup
- ✅ Account Netlify/Vercel/platform lain

## 🌐 Deploy ke Netlify (Recommended)

### Method 1: Deploy via Netlify Dashboard (Easiest)

1. **Push code ke GitHub**
```bash
git add .
git commit -m "Initial commit - Beautycode v1.0"
git push origin main
```

2. **Login ke Netlify**
- Buka [https://app.netlify.com](https://app.netlify.com)
- Login dengan GitHub account

3. **Create New Site**
- Click "Add new site" → "Import an existing project"
- Choose "Deploy with GitHub"
- Authorize Netlify untuk akses GitHub
- Select repository `beautycode2`

4. **Configure Build Settings**
Netlify akan auto-detect dari `netlify.toml`:
```
Build command: npm run build
Publish directory: dist
Node version: 18
```

5. **Deploy!**
- Click "Deploy site"
- Wait 1-2 menit
- Site akan live di `https://random-name.netlify.app`

6. **Custom Domain (Optional)**
- Click "Domain settings"
- Add custom domain atau change site name

### Method 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy to production
netlify deploy --prod

# Your site is live!
```

### Method 3: Drag & Drop

1. Build locally
```bash
npm run build
```

2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag & drop `dist` folder

4. Site deployed instantly!

## 🔄 Continuous Deployment

Dengan Git-based deployment, setiap push akan auto-deploy:

```bash
# Make changes
git add .
git commit -m "Update: add new feature"
git push origin main

# Netlify auto-deploy in ~1-2 minutes
```

## 🌍 Deploy ke Platform Lain

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### GitHub Pages

1. Install gh-pages
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/beautycode2"
}
```

3. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/beautycode2/',
  // ... rest of config
})
```

4. Deploy
```bash
npm run deploy
```

### Cloudflare Pages

1. Login to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
   - Node version: 18
4. Deploy!

## ⚙️ Environment Variables

Beautycode tidak memerlukan environment variables karena fully client-side.

Jika di masa depan butuh API keys:

### Netlify
```bash
# Via CLI
netlify env:set API_KEY "your-key-here"

# Via Dashboard
Site settings → Environment variables → Add variable
```

### Vercel
```bash
# Via CLI
vercel env add API_KEY

# Via Dashboard
Project Settings → Environment Variables
```

## 🔍 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: Memory limit**
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Routing Issues (404 on refresh)

Jika halaman 404 saat refresh:

**Netlify**: `netlify.toml` sudah include redirect rule
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel**: Create `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Build Time Too Long

Optimize build:
```javascript
// vite.config.js
export default defineConfig({
  build: {
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion']
        }
      }
    }
  }
})
```

## 📊 Performance Optimization

### Image Optimization

Jika menambah images:
```bash
npm install --save-dev vite-plugin-image-optimizer
```

### Code Splitting

Sudah di-handle otomatis oleh Vite dengan dynamic imports.

### Caching

Netlify/Vercel sudah handle caching headers automatically.

## 🔐 Security Headers

Untuk production, tambahkan security headers.

### Netlify
Create `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### Vercel
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

## 📈 Analytics (Optional)

### Netlify Analytics
- Enable di site dashboard
- $9/month per site

### Google Analytics
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## ✅ Post-Deployment Checklist

- [ ] Test all routes (`/home`, `/apps/*`)
- [ ] Test onboarding flow
- [ ] Test data persistence (localStorage)
- [ ] Test on mobile devices
- [ ] Test browser compatibility
- [ ] Check loading performance
- [ ] Verify animations work
- [ ] Test bottom navigation
- [ ] Check console for errors
- [ ] Verify medical disclaimer visible

## 🎯 Custom Domain Setup

### Netlify

1. Domain settings → Add custom domain
2. Add DNS records dari domain provider:
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

3. Enable HTTPS (automatic)

### Vercel

Similar process, Vercel provides DNS instructions.

## 📱 PWA Setup (Future Enhancement)

Untuk membuat Progressive Web App:

```bash
npm install vite-plugin-pwa
```

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Beautycode',
        short_name: 'Beautycode',
        description: 'Your Personal Health OS',
        theme_color: '#6366f1',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

## 🔄 Rollback Strategy

### Netlify
- Go to "Deploys" tab
- Click on previous successful deploy
- Click "Publish deploy"

### Vercel
- Similar: Deployments → Previous → Promote to Production

## 📞 Support

Jika ada masalah deployment:
1. Check build logs di platform dashboard
2. Check browser console for errors
3. Verify all files committed to Git
4. Test build locally first
5. Create issue di GitHub repo

---

**Happy Deploying! 🚀**

Built with 💜 by Beautycode Team
