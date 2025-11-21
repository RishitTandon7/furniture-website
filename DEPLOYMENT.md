# Deployment Guide

This project is ready to deploy to multiple platforms. Choose your preferred hosting service below.

## Quick Deploy Options

### 1. Vercel (Recommended)

**One-Click Deploy:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect Vite and deploy

**CLI Deploy:**
```bash
npm install -g vercel
vercel
```

Configuration is already set in `vercel.json`.

### 2. Netlify

**Drag & Drop:**
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deploy zone

**CLI Deploy:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

Configuration is already set in `netlify.toml`.

### 3. GitHub Pages

```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

### 4. AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Upload `dist` folder to S3 bucket

3. Enable static website hosting

4. Configure CloudFront for HTTPS

### 5. Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select dist as public directory
npm run build
firebase deploy
```

## Environment Variables

Make sure to set these environment variables in your hosting platform:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Setting Environment Variables

**Vercel:**
Dashboard → Project → Settings → Environment Variables

**Netlify:**
Dashboard → Site Settings → Build & Deploy → Environment

**Other Platforms:**
Check your platform's documentation for environment variable configuration.

## Build Requirements

- Node.js 18 or higher
- npm 8 or higher
- Build Command: `npm run build`
- Output Directory: `dist`

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test shopping cart functionality
- [ ] Confirm admin dashboard access
- [ ] Check responsive design on mobile
- [ ] Test checkout flow
- [ ] Verify environment variables are set

## Performance Optimization

The build is already optimized with:
- Code splitting (vendor, icons, main)
- Minification (esbuild)
- Tree shaking
- Asset compression (gzip)

## Troubleshooting

**Build fails:**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18+)

**Blank page after deployment:**
- Verify routing configuration (SPA fallback)
- Check browser console for errors
- Ensure environment variables are set

**Assets not loading:**
- Verify base path in `vite.config.js`
- Check asset paths are relative

## Support

For deployment issues, check:
- Vite Documentation: https://vitejs.dev/guide/
- Platform-specific deployment guides
- Project README.md
