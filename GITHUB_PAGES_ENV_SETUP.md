# Setting Up OpenAI API Key for GitHub Pages

## Important Security Note ⚠️

Since you're using the OpenAI API key directly in the frontend, **it will be visible in your built JavaScript files**. Anyone can view your API key in the browser's developer tools. This is why using a backend API is recommended.

However, if you want to proceed with this approach, here's how to set it up:

## Step 1: Add GitHub Secret

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `REACT_APP_OPENAI_API_KEY`
5. Value: Your OpenAI API key (the one from your `.env` file)
6. Click **Add secret**

## Step 2: Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will automatically deploy on every push to `main`

## Step 3: Verify Deployment

After pushing to `main`, the workflow will:
- Install dependencies
- Build your app with the API key from GitHub Secrets
- Deploy to GitHub Pages

You can monitor the deployment in the **Actions** tab.

## Alternative: Manual Build & Deploy

If you don't want to use GitHub Actions, you can build locally:

```bash
# Set the env var and build
REACT_APP_OPENAI_API_KEY=your-key-here yarn build

# Then deploy
yarn deploy
```

But this requires building locally each time you want to deploy.

## Recommended: Use Backend API

For better security, consider:
1. Deploying the backend API (from `chatbot-api` folder) to Vercel/Netlify
2. Setting the API key as an environment variable there (never exposed)
3. Using `REACT_APP_CHATBOT_API_URL` in your frontend instead

This keeps your API key secure and not exposed in client-side code.

