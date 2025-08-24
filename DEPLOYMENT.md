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

## Deployment Strategy: Which Approach is Better?

For your situation (using free tiers), you have two viable options:

### Option 1: Both Services on Render (Recommended for simplicity)

**Pros:**
- Single platform to manage
- Simplified environment variable management
- Easier to set up and maintain
- Both services can share the same domain structure

**Cons:**
- Render's free tier only includes one web service and one database
- You'll need to upgrade for additional services

### Option 2: Backend on Render, Frontend on Vercel (Recommended for performance)

**Pros:**
- Vercel is optimized for frontend deployment with superior CDN and performance
- Each service can scale independently
- Better separation of concerns
- Both platforms have generous free tiers
- You can take advantage of Vercel's preview deployments

**Cons:**
- Slightly more complex to manage (two platforms)
- Need to handle CORS configuration between different domains

**Recommendation:** For the free tier, **Option 2 is better** because:
1. Vercel's free tier is more generous for frontend hosting
2. You get better performance for your frontend
3. Both platforms have excellent free tiers that won't cost you anything
4. You can easily manage CORS with proper configuration

## Deployment Options

### Option 1: Deploy to Render (Both services)

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

### Option 2: Backend on Render, Frontend on Vercel (Recommended)

#### Backend Deployment (Render)

1. Deploy the `backend/` directory as a standalone Node.js application
2. Set the build command to: `npm install`
3. Set the start command to: `npm start`
4. Ensure all required environment variables are set

#### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the root directory to `/frontend`
4. Set the build command to: `npm run build`
5. Set the output directory to: `dist`
6. Set the install command to: `npm install`
7. Add environment variables:
   - `VITE_API_URL` - Your Render backend URL (e.g., https://your-app.onrender.com/api)

## Environment Variables

### Backend Required Variables (Render)

- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `NODE_ENV` - Environment (development/production)
- `PORT` - Port to run the server on (Render will set this automatically)
- `FRONTEND_URL` - Your frontend URL for CORS configuration (e.g., https://your-frontend.vercel.app)

### Frontend Required Variables (Vercel)

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

## Handling CORS Between Different Domains

When deploying backend and frontend separately, you'll need to configure CORS in your backend. The current implementation allows all origins, which is fine for development but should be restricted in production.

To configure CORS for production, update your backend `index.js` file:

```javascript
// In your backend index.js (around line 17)
import cors from "cors";

// Configure CORS options
const corsOptions = {
  origin: process.env.NODE_ENV === 'development' 
    ? true  // Allow all origins in development
    : process.env.FRONTEND_URL || 'http://localhost:5173',  // Restrict to frontend URL in production
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

Add `FRONTEND_URL` to your Render environment variables with your Vercel frontend URL.

## Troubleshooting

### Common Deployment Issues

1. **Module not found errors**: Ensure the correct directory structure is maintained and the build/start commands point to the right locations.

2. **Environment variables not set**: Make sure all required environment variables are configured in your deployment platform.

3. **Database connection issues**: Verify that your database URL is correct and the database is accessible from your deployment environment.

4. **CORS errors**: Ensure your CORS configuration allows requests from your frontend domain.

### Checking Deployment Logs

If you encounter issues:

1. Check the build logs for any errors during installation
2. Check the runtime logs for any startup errors
3. Verify that all environment variables are properly set