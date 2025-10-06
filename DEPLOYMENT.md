# Automatic Deployment Setup

This project is configured with GitHub Actions for automatic deployment to GitHub Pages.

## How it works

1. **Automatic Trigger**: Every time you push changes to the `main` branch, GitHub Actions will automatically:
   - Install dependencies using `yarn install`
   - Build the project using `yarn build`
   - Deploy the built files to GitHub Pages

2. **Custom Domain**: The deployment is configured to use your custom domain `yashcoded.com`

## Workflows

### Primary Workflow: `.github/workflows/pages.yml`
- Uses GitHub's official Pages deployment action
- Automatically handles the deployment process
- Sets up proper permissions for GitHub Pages

### Backup Workflow: `.github/workflows/deploy-portfolio.yml`
- Alternative deployment method using `peaceiris/actions-gh-pages`
- Includes CNAME file handling for custom domain

## Manual Deployment (if needed)

If you need to deploy manually for any reason:

```bash
# Build the project
yarn build

# Deploy to GitHub Pages
yarn deploy
```

## Monitoring Deployments

You can monitor the deployment status by:
1. Going to your GitHub repository
2. Clicking on the "Actions" tab
3. Viewing the workflow runs and their status

## Troubleshooting

- If deployment fails, check the Actions tab for error logs
- Ensure your custom domain DNS is properly configured
- Make sure the `CNAME` file in the `public` folder contains `yashcoded.com`
