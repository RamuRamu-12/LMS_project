# AWS Deployment Guide for LMS Project

## 🚀 Overview
This guide covers deploying the Learning Management System (LMS) project on AWS using various services.

## 📋 Prerequisites
- AWS Account
- AWS CLI configured
- Node.js 16+ installed locally
- Git installed

## 🏗️ Architecture Options

### Option 1: AWS Elastic Beanstalk (Recommended for beginners)
- **Frontend**: Static website hosting on S3 + CloudFront
- **Backend**: Elastic Beanstalk with Node.js
- **Database**: RDS PostgreSQL

### Option 2: AWS ECS/Fargate (Containerized)
- **Frontend**: S3 + CloudFront
- **Backend**: ECS Fargate with Docker
- **Database**: RDS PostgreSQL

### Option 3: AWS Lambda (Serverless)
- **Frontend**: S3 + CloudFront
- **Backend**: API Gateway + Lambda
- **Database**: RDS PostgreSQL or DynamoDB

## 🛠️ Deployment Steps

### 1. Database Setup (RDS PostgreSQL)

```bash
# Create RDS instance
aws rds create-db-instance \
    --db-instance-identifier lms-database \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username admin \
    --master-user-password YourPassword123 \
    --allocated-storage 20 \
    --vpc-security-group-ids sg-xxxxxxxxx
```

### 2. Backend Deployment (Elastic Beanstalk)

#### Create Application
```bash
# Create application
eb init lms-backend

# Create environment
eb create production

# Deploy
eb deploy
```

#### Environment Variables
Set these in Elastic Beanstalk console:
```
NODE_ENV=production
PORT=5000
DB_HOST=your-rds-endpoint
DB_PORT=5432
DB_NAME=lms
DB_USER=admin
DB_PASSWORD=YourPassword123
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
```

### 3. Frontend Deployment (S3 + CloudFront)

#### Build Frontend
```bash
cd frontend
npm install
npm run build
```

#### Upload to S3
```bash
# Create S3 bucket
aws s3 mb s3://lms-frontend-bucket

# Upload build files
aws s3 sync dist/ s3://lms-frontend-bucket --delete

# Enable static website hosting
aws s3 website s3://lms-frontend-bucket --index-document index.html --error-document index.html
```

#### CloudFront Distribution
```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
    --distribution-config file://cloudfront-config.json
```

### 4. Database Migration

```bash
# Run migrations
cd backend
npm run migrate

# Seed initial data (optional)
npm run seed
```

## 🔧 Configuration Files

### Backend - package.json Scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "migrate": "npx sequelize-cli db:migrate",
    "seed": "npx sequelize-cli db:seed:all"
  }
}
```

### Frontend - vite.config.js
```javascript
export default {
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
  }
}
```

## 🌐 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=5432
DB_NAME=lms
DB_USER=admin
DB_PASSWORD=YourPassword123
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-api-url.elasticbeanstalk.com
VITE_APP_NAME=LMS
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## 📦 Docker Support (Optional)

### Backend Dockerfile
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Dockerfile
```dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit .env files
2. **Database**: Use RDS with encryption at rest
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure CORS properly
5. **Rate Limiting**: Implement rate limiting
6. **Authentication**: Use secure JWT secrets

## 📊 Monitoring

### CloudWatch Logs
- Application logs
- Error tracking
- Performance metrics

### Health Checks
- Database connectivity
- API endpoints
- Frontend availability

## 💰 Cost Optimization

1. **RDS**: Use t3.micro for development
2. **S3**: Use S3 Standard-IA for static files
3. **CloudFront**: Use appropriate caching
4. **Elastic Beanstalk**: Use t3.micro instances

## 🚨 Troubleshooting

### Common Issues
1. **Database Connection**: Check security groups
2. **CORS Errors**: Verify CORS configuration
3. **Environment Variables**: Ensure all are set
4. **Build Failures**: Check Node.js version

### Logs
```bash
# Elastic Beanstalk logs
eb logs

# CloudWatch logs
aws logs describe-log-groups
aws logs get-log-events --log-group-name /aws/elasticbeanstalk/lms-backend
```

## 📈 Scaling

### Horizontal Scaling
- Elastic Beanstalk auto-scaling
- RDS read replicas
- CloudFront edge locations

### Vertical Scaling
- Larger instance types
- More database resources

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to AWS
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Elastic Beanstalk
        uses: einaregilsson/beanstalk-deploy@v20
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: lms-backend
          environment_name: production
          region: us-east-1
          version_label: ${{ github.sha }}
```

## 📞 Support

For deployment issues:
1. Check AWS CloudWatch logs
2. Verify environment variables
3. Test database connectivity
4. Review security group rules
