# MongoDB Setup Guide

The application requires MongoDB. Choose one of the options below:

## Option 1: MongoDB Atlas (Recommended - Cloud, Free)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Create a new project
4. Click "Create a Deployment" and select "FREE" tier (M0)
5. Choose your region and click "Create Deployment"
6. Wait 1-2 minutes for the cluster to be created
7. Click "Connect"
8. Choose "Connection String" (URI)
9. Copy the entire connection string (it will look like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?retryWrites=true&w=majority`)
10. Update `backend/.env`:
    ```
    MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/argus-pv?retryWrites=true&w=majority
    ```

## Option 2: MongoDB Community Server (Local)

1. Download from [mongodb.com/try/download/community](https://mongodb.com/try/download/community)
2. Choose your OS and download the installer
3. Run the installer and follow the setup wizard
4. MongoDB will start automatically
5. Your `.env` file already has the local connection string configured:
    ```
    MONGODB_URI=mongodb://localhost:27017/argus-pv
    ```

## Option 3: Quick Setup with Docker (Requires Docker)

If you have Docker installed:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

Then restart the backend server.

## After Setup

1. Update `backend/.env` with your MongoDB URI
2. Restart the backend: In the terminal, send `rs` to restart nodemon
3. You should see: `MongoDB connected successfully`
4. Refresh your browser at http://localhost:3000

## Default Test Credentials

Once MongoDB is connected, seed the database with test data:
```bash
cd backend
npm run seed
```

Then you can login with:
- Email: admin@argus.com
- Password: demo123
