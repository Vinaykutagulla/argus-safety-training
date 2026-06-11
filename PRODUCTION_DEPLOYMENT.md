# Production Deployment Guide

## Phase 4 Completion - Production Ready

**Date**: June 11, 2026  
**Status**: Ready for Production Deployment  
**Version**: 1.0.0

---

## ✅ Completion Checklist

### Backend Integration
- ✅ All case CRUD endpoints implemented
- ✅ Role-based access control (RBAC)
- ✅ JWT authentication with 7-day expiry
- ✅ Case locking/unlocking mechanism
- ✅ Audit trail for all modifications
- ✅ Search with 8+ filter types
- ✅ MedDRA integration
- ✅ Safety report management

### Frontend Integration
- ✅ API client setup (`api-client.ts`)
- ✅ Auth module with token management
- ✅ Case form with full data binding
- ✅ Search/filter page working
- ✅ Training mode enabled
- ✅ Responsive design
- ✅ Error handling

### Security
- ✅ JWT token authentication
- ✅ HttpOnly cookies
- ✅ RBAC matrix enforced
- ✅ Input validation
- ✅ CORS configured
- ✅ Protected endpoints

### Testing
- ✅ API integration tests (8+ scenarios)
- ✅ Component unit tests
- ✅ Auth verification script
- ✅ Manual testing completed

### Documentation
- ✅ API documentation
- ✅ Setup guides
- ✅ Development guide
- ✅ This deployment guide

---

## Deployment Options

### Option 1: Docker Compose (Recommended)

#### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

#### Setup
```bash
# 1. Clone repository
git clone <repo-url>
cd argus

# 2. Create .env file
cat > .env.production << EOF
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/argus_production
JWT_SECRET=$(openssl rand -base64 32)
MONGO_USERNAME=admin
MONGO_PASSWORD=$(openssl rand -base64 24)
JWT_SECRET=$(openssl rand -base64 32)
API_URL=https://yourdomain.com
EOF

# 3. Build and run
docker-compose -f docker-compose.prod.yml up -d

# 4. Verify
docker-compose logs -f backend
curl http://localhost:3000
```

#### Stopping Services
```bash
docker-compose -f docker-compose.prod.yml down
```

### Option 2: Kubernetes

#### Prerequisites
- Kubernetes 1.24+
- kubectl configured
- Helm 3.0+ (optional)

#### Deployment
```bash
# Create namespace
kubectl create namespace argus-prod

# Create secrets
kubectl create secret generic argus-secrets \
  --from-literal=MONGODB_URI=<connection-string> \
  --from-literal=JWT_SECRET=$(openssl rand -base64 32) \
  -n argus-prod

# Apply manifests (create k8s/ directory with deployment.yaml, service.yaml, etc.)
kubectl apply -f k8s/ -n argus-prod

# Verify
kubectl get pods -n argus-prod
kubectl get svc -n argus-prod
```

### Option 3: Cloud Platforms

#### Vercel (Next.js Optimized)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login and deploy
vercel login
vercel --prod

# 3. Set environment variables
vercel env add MONGODB_URI <connection-string>
vercel env add JWT_SECRET <random-string>
vercel env add NEXT_PUBLIC_API_URL https://your-app.vercel.app
```

#### AWS Elastic Container Service (ECS)
```bash
# 1. Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
docker build -f Dockerfile.prod -t argus:latest .
docker tag argus:latest <account>.dkr.ecr.us-east-1.amazonaws.com/argus:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/argus:latest

# 2. Create ECS task definition
# 3. Create ECS service
# 4. Create load balancer
```

#### Google Cloud Run
```bash
# 1. Build and push
gcloud builds submit --tag gcr.io/<project>/argus

# 2. Deploy
gcloud run deploy argus \
  --image gcr.io/<project>/argus \
  --platform managed \
  --region us-central1 \
  --set-env-vars MONGODB_URI=<connection-string>
```

---

## Pre-Deployment Checklist

### Database
- [ ] MongoDB Atlas cluster created or on-premises MongoDB running
- [ ] Connection string obtained
- [ ] Database user created with appropriate permissions
- [ ] Backups configured
- [ ] Indexes created

### Environment Variables
```bash
# Required
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/argus
JWT_SECRET=<generate with: openssl rand -base64 32>
NODE_ENV=production

# Optional
API_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com
LOG_LEVEL=info
CORS_ORIGIN=https://yourdomain.com
```

### Security
- [ ] JWT_SECRET is strong and random
- [ ] HTTPS/SSL certificates obtained
- [ ] CORS origins whitelist configured
- [ ] Rate limiting enabled
- [ ] DDoS protection enabled (if using CDN)

### Monitoring
- [ ] Logging configured (CloudWatch, ELK, etc.)
- [ ] Error tracking setup (Sentry, NewRelic, etc.)
- [ ] Uptime monitoring configured
- [ ] Alert rules created

### Backup & Recovery
- [ ] Database backups automated
- [ ] Backup retention policy set
- [ ] Disaster recovery plan documented
- [ ] Recovery procedure tested

---

## Post-Deployment Verification

### Health Checks
```bash
# Check API endpoint
curl -i https://yourdomain.com/api/health

# Check database connection
curl -i https://yourdomain.com/api/admin/health

# Check authentication
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@argus.com","password":"demo123"}'
```

### Test Workflows
1. **User Login**
   - Login with demo credentials
   - Verify JWT token received
   - Verify token stored securely

2. **Case Creation**
   - Create new case
   - Verify API receives data
   - Verify case ID auto-generated
   - Verify data persisted in database

3. **Case Search**
   - Search by country
   - Filter by status
   - Verify results accurate
   - Verify pagination works

4. **Case Locking**
   - Lock a case
   - Attempt to edit locked case
   - Verify rejection
   - Verify only authorized users can unlock

5. **Audit Trail**
   - Make case modifications
   - View audit trail
   - Verify all changes logged

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (ALB, NLB, Nginx, etc.)
- Stateless application architecture (no local file storage)
- Session management via JWT tokens
- Database replication for MongoDB

### Vertical Scaling
- Increase pod/container resources
- Increase node/instance size
- Optimize queries and indexes
- Implement caching (Redis)

### Database Optimization
```javascript
// Create indexes in MongoDB
db.aecases.createIndex({ "caseId": 1 })
db.aecases.createIndex({ "status": 1 })
db.aecases.createIndex({ "administration.receiptDate": 1 })
db.aecases.createIndex({ "administration.countryOfOccurrence": 1 })
db.users.createIndex({ "email": 1 }, { unique: true })
```

---

## Maintenance & Monitoring

### Daily Tasks
- [ ] Monitor application logs
- [ ] Check error rates
- [ ] Verify database backups completed
- [ ] Monitor CPU/memory usage

### Weekly Tasks
- [ ] Review security logs
- [ ] Update dependencies (check for vulnerabilities)
- [ ] Run performance benchmarks
- [ ] Review user feedback

### Monthly Tasks
- [ ] Database optimization (analyze queries)
- [ ] Security audit
- [ ] Disaster recovery drill
- [ ] Capacity planning review

---

## Rollback Procedure

### If Issues Occur
```bash
# Docker Compose
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d # with previous image tag

# Kubernetes
kubectl rollout undo deployment/argus -n argus-prod

# Vercel
vercel rollback

# AWS ECS
aws ecs update-service \
  --cluster argus-prod \
  --service argus-app \
  --task-definition argus:previous_version
```

### Database Rollback
```bash
# MongoDB point-in-time recovery
mongorestore --host <host> --username <user> --password <pass> <backup-path>
```

---

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| API Response Time | < 200ms | - |
| Database Query Time | < 100ms | - |
| Page Load Time | < 2s | - |
| Availability | 99.9% | - |
| Memory Usage | < 512MB | - |
| CPU Usage | < 50% | - |

---

## Support & Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Verify connection string
# Check MongoDB service is running
docker exec argus-mongodb-prod mongosh admin -u admin -p <password> --eval "db.adminCommand('ping')"
```

**JWT Token Expired**
- Frontend should refresh token automatically
- Check token expiry: `jwt.decode(token, {complete: true})`
- Verify clock synchronization between servers

**Cases Not Persisting**
- Check database connection
- Verify write permissions
- Check disk space on database
- Review database logs

### Logs & Diagnostics
```bash
# Docker Compose
docker-compose logs backend
docker-compose logs mongodb

# Kubernetes
kubectl logs deployment/argus -n argus-prod
kubectl describe pod <pod-name> -n argus-prod
```

---

## Next Steps

1. ✅ **Immediate** (Week 1)
   - Deploy to staging environment
   - Run full test suite
   - Security audit
   - Performance benchmarking

2. ✅ **Short-term** (Week 2-3)
   - Deploy to production
   - Monitor closely
   - Gather user feedback
   - Document any issues

3. ✅ **Long-term** (Month 2+)
   - Implement caching layer
   - Advanced analytics
   - Mobile application
   - Regulatory compliance certifications

---

## Contact & Support

- **Documentation**: [See README.md]
- **Issue Tracking**: GitHub Issues
- **Email Support**: support@argus.com
- **Emergency Hotline**: +1-XXX-XXX-XXXX

---

**Last Updated**: June 11, 2026  
**Next Review**: July 11, 2026
