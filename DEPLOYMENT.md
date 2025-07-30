# Deployment Guide

This document explains how to deploy the Angular application using GitHub Actions.

## 🚀 GitHub Actions Workflow

The project includes two GitHub Actions workflows:

### 1. Main Deployment Workflow (`deploy.yml`)
- **Triggers**: Push to `main` or `develop` branches, PR to `main`
- **Jobs**:
  - `build-and-test`: Builds and tests the application
  - `deploy-staging`: Deploys to staging (develop branch)
  - `deploy-production`: Deploys to production (main branch)
  - `security-scan`: Runs security audits
  - `performance-test`: Analyzes bundle size

### 2. Simple CI/CD Workflow (`ci-cd.yml`)
- **Triggers**: Push to any branch, PR to `main`
- **Jobs**:
  - `test`: Builds and tests the application
  - `deploy-staging`: Deploys to staging
  - `deploy-production`: Deploys to production

## 📋 Prerequisites

1. **GitHub Pages Enabled**: Ensure GitHub Pages is enabled in your repository settings
2. **Repository Permissions**: The workflow needs write permissions to create deployment branches
3. **Secrets**: No additional secrets required (uses `GITHUB_TOKEN`)

## 🔧 Setup Instructions

### 1. Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "Deploy from a branch"
4. Select `gh-pages` branch for production
5. Save the settings

### 2. Configure Branch Protection (Optional)
1. Go to repository settings
2. Navigate to "Branches" section
3. Add rule for `main` branch
4. Enable "Require status checks to pass before merging"
5. Select the required status checks

### 3. Enable Actions
1. Go to repository settings
2. Navigate to "Actions" section
3. Ensure "Allow all actions and reusable workflows" is selected

## 🌐 Deployment URLs

After successful deployment:

- **Production**: `https://[username].github.io/[repository-name]/`
- **Staging**: `https://[username].github.io/[repository-name]/staging/`

## 📊 Workflow Features

### Build and Test
- ✅ Node.js 20.x setup
- ✅ NPM dependency installation with caching
- ✅ Linting (continues on failure)
- ✅ Unit tests (continues on failure)
- ✅ Production build
- ✅ Artifact upload

### Deployment
- ✅ Automatic deployment to GitHub Pages
- ✅ Separate staging and production environments
- ✅ Deployment status tracking
- ✅ Success notifications

### Security & Performance
- ✅ Security audit with npm audit
- ✅ Bundle size analysis
- ✅ Performance monitoring

## 🔍 Monitoring

### Check Workflow Status
1. Go to your repository
2. Click "Actions" tab
3. View workflow runs and their status

### View Deployment Logs
1. Go to Actions tab
2. Click on a workflow run
3. Click on a job to see detailed logs

### Check Deployment Status
1. Go to repository settings
2. Navigate to "Environments"
3. View deployment history

## 🛠️ Troubleshooting

### Common Issues

#### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

#### Deployment Fails
- Ensure GitHub Pages is enabled
- Check repository permissions
- Verify branch names match workflow configuration

#### Bundle Size Warnings
- Current bundle size: ~520KB (exceeds 500KB budget)
- Consider code splitting or lazy loading
- Review and optimize dependencies

### Debug Steps
1. **Check Workflow Logs**: Go to Actions tab and review failed job logs
2. **Verify Configuration**: Ensure workflow files are in `.github/workflows/`
3. **Test Locally**: Run `npm run build:prod` locally to identify issues
4. **Check Permissions**: Ensure repository has proper permissions

## 📝 Customization

### Modify Deployment Branches
Edit the workflow files to change:
- Source branches (`main`, `develop`)
- Deployment branches (`gh-pages`, `gh-pages-staging`)

### Add Environment Variables
```yaml
env:
  NODE_ENV: production
  API_URL: ${{ secrets.API_URL }}
```

### Custom Build Commands
```yaml
- name: Custom build
  run: npm run build:custom
```

## 🔄 Manual Deployment

If you need to deploy manually:

```bash
# Build the application
npm run build:prod

# Deploy to GitHub Pages (requires gh-pages package)
npx gh-pages -d dist
```

## 📞 Support

For issues with the deployment workflow:
1. Check the Actions tab for error logs
2. Review this documentation
3. Create an issue in the repository

---

**Last Updated**: December 2024
**Version**: 1.0.0 