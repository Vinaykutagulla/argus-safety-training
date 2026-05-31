# Vercel Deployment Guide - Argus Safety Training

## Quick Deploy (1 Click)

Click the button below to deploy to Vercel immediately:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FVinaykutagulla%2Fargus-safety-training&env=MONGODB_URI,JWT_SECRET,SEED_PASSWORD&project-name=argus-safety-training&repository-name=argus-safety-training)

---

## Manual Deployment via Vercel CLI

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- Vercel CLI installed: `npm i -g vercel`
- MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)

### Step 1: Set Up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free M0 tier is fine for demo)
4. Create a database user with username/password
5. Whitelist IP address: Add `0.0.0.0/0` for Vercel (or specific Vercel IPs)
6. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/argus-db?retryWrites=true&w=majority`

### Step 2: Create Environment Variables

Generate a strong JWT secret:
```powershell
# Windows PowerShell
$random = -join ((33..126) | Get-Random -Count 32 | ForEach-Object {[char]$_})
Write-Host $random
```

Or use an online generator: [Random.org](https://www.random.org)

### Step 3: Deploy via CLI

```bash
cd c:\Users\lenovo\Desktop\Argus

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

When prompted:
- **Set up project?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (first time) or Yes (re-deploy)
- **Project name** → argus-safety-training
- **Root directory** → Leave blank (.)

### Step 4: Add Environment Variables in Vercel Dashboard

After deployment, add environment variables:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **argus-safety-training** project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Variable | Value | Production | Preview | Development |
|----------|-------|-----------|---------|-------------|
| MONGODB_URI | `mongodb+srv://...` | ✅ | ✅ | ✅ |
| JWT_SECRET | Your generated secret | ✅ | ✅ | ✅ |
| SEED_PASSWORD | dev-seed-key | ✅ | ✅ | ✅ |
| NODE_ENV | production | ✅ | ✅ | ✅ |

5. Click **Save**
6. Click **Redeploy** to apply environment variables

---

## Deployment via GitHub (Recommended)

### Step 1: Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Select your GitHub account
5. Find and select **argus-safety-training** repository
6. Click **Import**

### Step 2: Configure Build Settings

Vercel auto-detects Next.js settings. Verify:
- **Framework Preset:** Next.js ✅
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Step 3: Add Environment Variables

Before deploying, configure environment variables:

1. On the import screen, click **Environment Variables**
2. Add:
   - `MONGODB_URI` = `mongodb+srv://username:password@cluster.mongodb.net/argus-db`
   - `JWT_SECRET` = Your secure secret key
   - `SEED_PASSWORD` = dev-seed-key
   - `NODE_ENV` = production

3. Click **Deploy**

**Vercel will automatically deploy whenever you push to `main` branch!**

---

## Post-Deployment Configuration

### Seed Training Data

After deployment, populate the database with training cases:

```bash
# Get your production URL from Vercel dashboard
# Then seed the database:

curl -X POST https://your-project.vercel.app/api/admin/seed \
  -H "x-seed-password: dev-seed-key" \
  -H "Content-Type: application/json"
```

### Update GitHub Webhook (Optional)

Vercel automatically creates a webhook when you connect GitHub. It triggers:
- **Automatic deployment** on push to `main`
- **Preview deployments** for pull requests
- **Automatic rollbacks** on deployment failure

---

## MongoDB Connection Issues

### Issue: "MongooseServerSelectionError"

**Solution:**
1. Go to MongoDB Atlas
2. **Network Access** → Add new IP address
3. Add `0.0.0.0/0` (allows all IPs - use specific IPs for production)
4. **Database Access** → Verify username/password
5. Connection string format: 
   ```
   mongodb+srv://username:password@cluster.mongodb.net/argus-db?retryWrites=true&w=majority
   ```

### Issue: "Unauthorized: not master"

**Solution:**
1. Ensure database user has correct permissions
2. Create user at **Database Access** page, not just cluster level
3. Verify `retryWrites=true` in connection string

---

## Production Best Practices

### 1. Environment Secrets
✅ Store all secrets in Vercel Environment Variables (not in code)
✅ Use different secrets for dev/staging/production
✅ Rotate JWT_SECRET regularly

### 2. MongoDB Atlas Security
✅ Use strong username/password (16+ characters)
✅ Enable IP Whitelist (specific IPs, not 0.0.0.0 in production)
✅ Enable two-factor authentication
✅ Monitor connection attempts

### 3. Monitoring
- Vercel Dashboard: Check deployment logs
- MongoDB Atlas: Monitor cluster metrics
- Application logs: Check function logs in Vercel

### 4. Performance
- Vercel edge caching enabled by default
- MongoDB connection pooling (min 5, max 50)
- API response times shown in Vercel Analytics

### 5. Security Headers
Vercel automatically adds:
- Content-Security-Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Strict-Transport-Security (HSTS)

---

## Rollback Deployment

If something breaks after deployment:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **argus-safety-training** project
3. Go to **Deployments** tab
4. Find previous working deployment
5. Click **·· (menu)** → **Promote to Production**

---

## Custom Domain (Optional)

1. Go to **Vercel Dashboard** → Project → **Settings** → **Domains**
2. Enter your domain (e.g., `argus.example.com`)
3. Follow DNS configuration steps provided by Vercel
4. Wait 24-48 hours for DNS propagation

---

## Monitoring & Analytics

### Vercel Analytics
- **Deployments**: View logs and build times
- **Functions**: Monitor API execution times
- **Performance**: Track Core Web Vitals
- **Traffic**: See request patterns

### Error Tracking
Vercel integration with Sentry (optional):
```bash
vercel env add SENTRY_DSN your-sentry-dsn
```

---

## Troubleshooting

### Build Fails
```bash
# Check local build
npm run build

# View Vercel logs
vercel logs
```

### Application Not Starting
1. Check environment variables (missing MONGODB_URI?)
2. Verify MongoDB connection
3. Check node_modules (missing dependencies?)

### API Endpoint Returns 404
1. Verify file is in `src/app/api/` directory
2. Check file name matches route pattern
3. Restart development server (if testing locally)

### MongoDB Connection Timeout
1. Check IP whitelist in MongoDB Atlas
2. Verify network connectivity
3. Check connection string format
4. Ensure user has database access permissions

---

## Deployment Checklist

- [ ] MongoDB Atlas account created and cluster running
- [ ] Database user created with strong password
- [ ] IP whitelist configured
- [ ] MongoDB connection string copied
- [ ] JWT_SECRET generated (32+ characters)
- [ ] Code pushed to GitHub main branch
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Environment variables added to Vercel
- [ ] Deployment successful (no build errors)
- [ ] Training data seeded via API
- [ ] Test login at deployed URL
- [ ] Test case entry and form submission
- [ ] Audit trail visible in cases
- [ ] Training mode toggle working

---

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Argus GitHub**: https://github.com/Vinaykutagulla/argus-safety-training
- **Deployment Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## Support

For issues:
1. Check Vercel deployment logs: Dashboard → Deployments → View Logs
2. Check MongoDB connection: MongoDB Atlas → Network Access → Verify IP
3. Review application logs: Dashboard → Functions → View Logs
4. Check GitHub commits: Ensure latest code is deployed

---

**Deployment Version**: 1.0  
**Last Updated**: May 31, 2026  
**Next Steps**: Phase 4 - Production Hardening & Testing
