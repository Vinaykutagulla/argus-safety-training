# Argus PV Safety Training - Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] Security audit completed
- [ ] API documentation up to date

## Production Environment Setup

### Backend Deployment

#### Option 1: Heroku Deployment

1. Install Heroku CLI:
```bash
npm install -g heroku
```

2. Login to Heroku:
```bash
heroku login
```

3. Create a new Heroku app:
```bash
heroku create argus-pv-backend
```

4. Set environment variables:
```bash
heroku config:set MONGODB_URI=<your-mongodb-atlas-uri>
heroku config:set JWT_SECRET=<strong-secret-key>
heroku config:set NODE_ENV=production
```

5. Deploy:
```bash
git push heroku main
```

6. View logs:
```bash
heroku logs --tail
```

#### Option 2: AWS Deployment (EC2)

1. Launch EC2 instance (Ubuntu 20.04)

2. SSH into instance:
```bash
ssh -i key.pem ubuntu@<instance-ip>
```

3. Install Node.js and npm:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. Clone repository:
```bash
git clone <repo-url>
cd argus-pv/backend
```

5. Install dependencies:
```bash
npm install --production
```

6. Create .env file with production settings

7. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start src/server.js --name "argus-backend"
pm2 startup
pm2 save
```

8. Configure Nginx as reverse proxy

#### Option 3: Railway.app

1. Connect GitHub repository to Railway

2. Create MongoDB service in Railway

3. Configure environment variables

4. Deploy automatically on push

### Frontend Deployment

#### Option 1: Vercel (Recommended)

1. Login to [Vercel](https://vercel.com)

2. Import project from GitHub

3. Configure environment variables:
```
REACT_APP_API_URL=<production-api-url>
```

4. Deploy automatically on push

#### Option 2: Netlify

1. Build the project:
```bash
cd frontend
npm run build
```

2. Deploy to Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

#### Option 3: AWS S3 + CloudFront

1. Build project:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://argus-pv-frontend
```

3. Upload build files:
```bash
aws s3 sync build/ s3://argus-pv-frontend --delete
```

4. Create CloudFront distribution pointing to S3

### Database Deployment

#### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Create cluster:
   - Choose AWS region close to users
   - Select M0 free tier for testing
   - M2+ for production

3. Create database user

4. Get connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/argus-pv?retryWrites=true&w=majority
```

5. Add connection string to environment variables

#### Self-Hosted MongoDB

1. Install MongoDB on server

2. Create data directory:
```bash
mkdir -p /data/db
sudo chown -R mongodb:mongodb /data/db
```

3. Start MongoDB service:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

4. Create database and users:
```bash
mongosh
use argus-pv
db.createUser({
  user: "argus_user",
  pwd: "strong_password",
  roles: ["readWrite"]
})
```

## Security Best Practices

### Environment Variables
- Use strong JWT_SECRET (minimum 32 characters)
- Use complex database passwords
- Store secrets in secure vaults (AWS Secrets Manager, etc.)
- Rotate secrets regularly

### API Security
- Enable HTTPS/TLS
- Implement rate limiting
- Add request validation
- Use CORS appropriately
- Implement CSRF protection

### Database Security
- Enable authentication
- Use read-only replicas for backups
- Regular backups (daily minimum)
- Monitor access logs
- Encrypt sensitive data at rest

### Frontend Security
- Use Content Security Policy (CSP)
- Implement SRI for external scripts
- Sanitize user inputs
- Keep dependencies updated
- Use HTTPS only

## Monitoring & Logging

### Backend Monitoring
- Use PM2 for process monitoring
- Configure error tracking (Sentry)
- Set up application performance monitoring (APM)
- Monitor database performance
- Alert on error rates

### Frontend Monitoring
- Set up error tracking
- Monitor application performance
- Track user analytics
- Monitor API response times

### Log Management
- Centralize logs (ELK Stack, CloudWatch)
- Set up log retention policies
- Monitor error logs for issues
- Regular log analysis

## Backup & Recovery

### Database Backups
```bash
# MongoDB backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/argus-pv" --out=./backup

# Restore
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net" ./backup
```

### Backup Schedule
- Production: Daily automated backups
- Backup retention: 30 days minimum
- Test restores monthly
- Document recovery procedures

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (AWS ALB, Nginx)
- Distribute backend across multiple instances
- Use CDN for frontend (CloudFront, Cloudflare)
- Implement database replication

### Performance Optimization
- Enable caching (Redis)
- Optimize database queries
- Implement pagination
- Use compression (gzip)
- Minimize bundle size

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          # Deploy commands
```

## Rollback Procedures

1. Monitor deployment for issues
2. If critical issues occur:
   ```bash
   # Rollback to previous version
   git revert HEAD
   git push
   ```
3. Verify rollback successful
4. Document incident
5. Post-mortem analysis

## Disaster Recovery

- Maintain geographical redundancy
- Test disaster recovery procedures quarterly
- Document all procedures
- Maintain runbooks for common issues
- Regular security audits

## Support & Maintenance

- Monitor application health
- Regular dependency updates
- Security patches within 24 hours
- Performance optimization
- User support channels

---

For detailed troubleshooting, refer to specific provider documentation.
