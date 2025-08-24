# Deployment Guide for Tenant Manager

This guide explains how to deploy the Tenant Manager application, which consists of a Node.js backend and a React frontend.

## Project Structure

```
tenant-manager/
├── backend/          # Node.js/Express API server
├── frontend/         # React + Vite frontend
├── render.yaml       # Render deployment configuration
└── package.json      # Root package.json with convenience scripts
```

## Deployment Options

### Option 1: Deploy to Render (Recommended)

This project includes a `render.yaml` file that defines the deployment configuration for Render.com.

#### Automatic Deployment with render.yaml

1. Connect your GitHub repository to Render
2. Render will automatically detect the `render.yaml` file
3. The backend service will be deployed with these settings:
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`
   - Environment: Node.js
   - Root directory: Project root (render.yaml is at the root)

#### Manual Deployment on Render

If you prefer to configure manually on Render:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the Root Directory to `/` (project root)
4. Set the Build Command to: `cd backend && npm install`
5. Set the Start Command to: `cd backend && npm start`
6. Add environment variables as needed (DATABASE_URL, JWT_SECRET, etc.)

### Option 2: Deploy Backend and Frontend Separately

#### Backend Deployment

1. Deploy the `backend/` directory as a standalone Node.js application
2. Set the build command to: `npm install`
3. Set the start command to: `npm start`
4. Ensure all required environment variables are set

#### Frontend Deployment

1. Deploy the `frontend/` directory as a static site
2. Set the build command to: `npm install && npm run build`
3. Set the publish directory to: `dist/`
4. Configure environment variables for API endpoints

## Environment Variables

### Backend Required Variables

- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `NODE_ENV` - Environment (development/production)

### Frontend Required Variables

- `VITE_API_URL` - Backend API URL (e.g., https://your-backend.onrender.com/api)

## Root Scripts

The root `package.json` includes convenience scripts for local development:

```bash
# Start backend in development mode
npm run dev

# Start backend in production mode
npm start

# Install backend dependencies
npm run backend:install
```

## Troubleshooting

### Common Deployment Issues

1. **Module not found errors**: Ensure the correct directory structure is maintained and the build/start commands point to the right locations.

2. **Environment variables not set**: Make sure all required environment variables are configured in your deployment platform.

3. **Database connection issues**: Verify that your database URL is correct and the database is accessible from your deployment environment.

### Checking Deployment Logs

If you encounter issues:

1. Check the build logs for any errors during installation
2. Check the runtime logs for any startup errors
3. Verify that all environment variables are properly set