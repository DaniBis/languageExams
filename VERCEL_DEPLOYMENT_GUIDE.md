# Vercel Deployment Guide for English with Daniel Website

Complete step-by-step guide to deploy your Next.js English tutoring website on Vercel with a custom domain.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create a GitHub Repository](#step-1-create-a-github-repository)
3. [Step 2: Push Your Project to GitHub](#step-2-push-your-project-to-github)
4. [Step 3: Create a Vercel Account](#step-3-create-a-vercel-account)
5. [Step 4: Connect GitHub to Vercel](#step-4-connect-github-to-vercel)
6. [Step 5: Deploy Your Project](#step-5-deploy-your-project)
7. [Step 6: Configure Environment Variables](#step-6-configure-environment-variables)
8. [Step 7: Connect a Custom Domain](#step-7-connect-a-custom-domain)
9. [Step 8: Verify Deployment](#step-8-verify-deployment)
10. [Troubleshooting Common Errors](#troubleshooting-common-errors)
11. [Continuous Deployment](#continuous-deployment)
12. [Best Practices](#best-practices)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ Completed the website setup following `SETUP_GUIDE.md`
- ✅ Your Next.js project running locally without errors
- ✅ Git installed on your computer
- ✅ A GitHub account (free tier is fine)
- ✅ A Vercel account (we'll create this together)
- ✅ (Optional) A custom domain name purchased from a domain registrar

---

## Step 1: Create a GitHub Repository

### 1.1 Sign in to GitHub

1. Go to [github.com](https://github.com)
2. Sign in to your account (or create one if you don't have it)

### 1.2 Create a New Repository

1. Click the **"+"** icon in the top-right corner
2. Select **"New repository"**
3. Fill in the repository details:
   - **Repository name**: `english-with-daniel` (or your preferred name)
   - **Description**: "Professional English tutoring website for Cambridge, IELTS, and General English students"
   - **Visibility**: Choose **Public** (free) or **Private** (requires paid plan for some features)
   - **Initialize repository**: Leave all checkboxes **UNCHECKED** (we already have code)
4. Click **"Create repository"**

### 1.3 Note Your Repository URL

After creation, you'll see a page with instructions. Note the repository URL:

```
https://github.com/YOUR-USERNAME/english-with-daniel.git
```

**Keep this page open** - we'll use these commands in the next step.

---

## Step 2: Push Your Project to GitHub

### 2.1 Navigate to Your Project Directory

Open your terminal and navigate to your project folder:

```bash
cd /path/to/your/english-with-daniel
```

### 2.2 Initialize Git (if not already done)

Check if Git is already initialized:

```bash
git status
```

If you see "not a git repository", initialize it:

```bash
git init
```

### 2.3 Create .gitignore File

Make sure you have a `.gitignore` file to exclude unnecessary files:

```bash
# Check if .gitignore exists
ls -la | grep .gitignore
```

If it doesn't exist, create one:

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/
.next

# Production
/build
dist

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env*.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
EOF
```

### 2.4 Add All Files to Git

```bash
git add .
```

### 2.5 Commit Your Files

```bash
git commit -m "Initial commit: Complete English with Daniel website"
```

### 2.6 Connect to GitHub Repository

Replace `YOUR-USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR-USERNAME/english-with-daniel.git
```

### 2.7 Push to GitHub

For the first push:

```bash
git branch -M main
git push -u origin main
```

**Enter your GitHub credentials when prompted.**

### 2.8 Verify Upload

Go back to your GitHub repository page in the browser and refresh. You should see all your project files!

---

## Step 3: Create a Vercel Account

### 3.1 Go to Vercel

1. Open your browser and go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** in the top-right corner

### 3.2 Sign Up with GitHub

1. Click **"Continue with GitHub"**
2. Authorize Vercel to access your GitHub account
3. Click **"Authorize Vercel"**

**Why GitHub?** This makes deployment super easy - Vercel can automatically deploy your code whenever you push updates to GitHub.

### 3.3 Complete Your Profile

1. Enter your name (or tutoring business name)
2. Choose **"Personal Account"** (free tier)
3. Click **"Continue"**

You're now logged into Vercel! 🎉

---

## Step 4: Connect GitHub to Vercel

Good news! If you signed up with GitHub (Step 3.2), your account is already connected.

### 4.1 Verify Connection

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your profile icon (top-right)
3. Select **"Settings"**
4. Click **"Connected Git Accounts"** in the left sidebar
5. You should see GitHub listed as connected ✓

### 4.2 Grant Repository Access

If this is your first time, Vercel needs permission to access your repositories:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Under "Import Git Repository", click **"Adjust GitHub App Permissions"**
3. Select which repositories Vercel can access:
   - **Recommended**: Choose "Only select repositories" and select `english-with-daniel`
   - **Alternative**: Choose "All repositories" (gives access to all your repos)
4. Click **"Save"**

---

## Step 5: Deploy Your Project

### 5.1 Start a New Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. You'll see a list of your GitHub repositories
3. Find **"english-with-daniel"** (or your repository name)
4. Click **"Import"**

### 5.2 Configure Your Project

Vercel will automatically detect that this is a Next.js project. You'll see:

**Project Name:**
- Default: `english-with-daniel`
- You can change this if you want (e.g., `english-tutoring-daniel`)

**Framework Preset:**
- Should auto-detect as **"Next.js"** ✓

**Root Directory:**
- Leave as `./` (default)

**Build and Output Settings:**
- Vercel auto-configures these for Next.js
- **Build Command**: `next build` (already set)
- **Output Directory**: `.next` (already set)
- **Install Command**: `npm install` or `yarn install` (already set)

### 5.3 Deploy!

1. Click the **"Deploy"** button
2. Wait for the deployment (usually 1-3 minutes)
3. You'll see a progress indicator showing:
   - ✓ Building
   - ✓ Uploading
   - ✓ Deploying

### 5.4 Deployment Success! 🎉

Once complete, you'll see:

- ✅ Confetti animation (congratulations!)
- A preview image of your website
- Your deployment URL: `https://english-with-daniel.vercel.app`

Click **"Visit"** to see your live website!

---

## Step 6: Configure Environment Variables

If your project needs environment variables (like for email sending or API keys), set them up now.

### 6.1 Go to Project Settings

1. From your project page, click **"Settings"** (top menu)
2. Click **"Environment Variables"** in the left sidebar

### 6.2 Add Environment Variables

For each variable you need (check your `.env.local` file):

**Example variables for the English with Daniel website:**

1. **EMAIL_SERVER** (for contact form)
   - **Key**: `EMAIL_SERVER`
   - **Value**: `smtp.gmail.com` (or your email provider)
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Add"**

2. **EMAIL_USER**
   - **Key**: `EMAIL_USER`
   - **Value**: `your-email@gmail.com`
   - **Environment**: Select all
   - Click **"Add"**

3. **EMAIL_PASSWORD**
   - **Key**: `EMAIL_PASSWORD`
   - **Value**: `your-app-password` (use app-specific password, not your regular password)
   - **Environment**: Select all
   - Click **"Add"**

4. **CONTACT_EMAIL**
   - **Key**: `CONTACT_EMAIL`
   - **Value**: `daniel@yourdomain.com` (where contact form submissions are sent)
   - **Environment**: Select all
   - Click **"Add"**

5. **NEXT_PUBLIC_SITE_URL**
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://yourdomain.com` (or `https://english-with-daniel.vercel.app` initially)
   - **Environment**: Select all
   - Click **"Add"**

### 6.3 Redeploy with Environment Variables

After adding environment variables:

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"**

This ensures your environment variables are applied to the live site.

---

## Step 7: Connect a Custom Domain

### 7.1 Purchase a Domain (if you don't have one)

Popular domain registrars:
- **Namecheap** (namecheap.com) - Affordable, beginner-friendly
- **GoDaddy** (godaddy.com) - Popular, easy to use
- **Google Domains** (domains.google.com) - Simple interface
- **Porkbun** (porkbun.com) - Good prices

**Recommended domain examples:**
- `englishwithdaniel.com`
- `danielenglish.com`
- `english-tutor-daniel.com`

### 7.2 Add Domain to Vercel

1. Go to your project in Vercel
2. Click **"Settings"** (top menu)
3. Click **"Domains"** in the left sidebar
4. In the "Domain" field, enter your domain:
   - Example: `englishwithdaniel.com`
5. Click **"Add"**

### 7.3 Configure DNS Records

Vercel will show you DNS configuration instructions. You have **two options**:

#### Option A: Use Vercel Nameservers (Recommended - Easier)

1. Vercel will provide nameservers like:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

2. Go to your domain registrar (Namecheap, GoDaddy, etc.)
3. Find **DNS Settings** or **Nameservers**
4. Change nameservers to Vercel's nameservers
5. Save changes

**Note:** DNS changes can take 24-48 hours to propagate, but usually complete in 1-2 hours.

#### Option B: Add DNS Records (Alternative)

If you want to keep your current nameservers:

1. Vercel will show required DNS records:

   **For root domain (`englishwithdaniel.com`):**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 76.76.21.21
   ```

   **For www subdomain (`www.englishwithdaniel.com`):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

2. Go to your domain registrar's DNS settings
3. Add these DNS records exactly as shown
4. Save changes

### 7.4 Verify Domain Connection

1. Wait 5-10 minutes for DNS to propagate
2. Go back to Vercel > Settings > Domains
3. You should see a **green checkmark ✓** next to your domain
4. If not, click **"Refresh"** and wait a bit longer

### 7.5 Test Your Custom Domain

1. Open a new browser tab
2. Go to your custom domain: `https://englishwithdaniel.com`
3. Your website should load! 🎉

### 7.6 Redirect www to Root (or vice versa)

Vercel automatically redirects `www.yourdomain.com` to `yourdomain.com` (or vice versa). You can configure this:

1. Go to Settings > Domains
2. Find your domain
3. Click **"Edit"**
4. Choose your preferred redirect

---

## Step 8: Verify Deployment

### 8.1 Test All Pages

Visit each page of your website to make sure everything works:

- ✅ Home: `https://yourdomain.com`
- ✅ About: `https://yourdomain.com/about`
- ✅ Cambridge Prep: `https://yourdomain.com/cambridge`
- ✅ IELTS Prep: `https://yourdomain.com/ielts`
- ✅ General English: `https://yourdomain.com/general-english`
- ✅ Prices: `https://yourdomain.com/prices`
- ✅ Reviews: `https://yourdomain.com/reviews`
- ✅ Book a Lesson: `https://yourdomain.com/book`
- ✅ Pay via Revolut: `https://yourdomain.com/pay`
- ✅ Contact: `https://yourdomain.com/contact`

### 8.2 Test Forms

1. Go to the Contact page
2. Fill out the contact form
3. Submit and check if you receive the email

### 8.3 Test Mobile Responsiveness

1. Open your website on your phone
2. Or use browser DevTools:
   - Right-click > Inspect
   - Click the mobile device icon (top-left)
   - Test different screen sizes

### 8.4 Check Performance

1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your domain
3. Click **"Analyze"**
4. Review performance scores (aim for 90+ on mobile and desktop)

### 8.5 Test SEO

1. Search for your website on Google: `site:yourdomain.com`
2. Check that pages are being indexed (may take a few days for new sites)

---

## Troubleshooting Common Errors

### Error 1: "Build Failed" or "Module Not Found"

**Problem:** Missing dependencies or incorrect package.json

**Solution:**

1. Check your `package.json` for missing dependencies
2. Make sure all required packages are listed
3. Locally run: `npm install` or `yarn install`
4. Commit and push changes
5. Vercel will automatically redeploy

### Error 2: "Environment Variable Not Found"

**Problem:** Missing environment variables

**Solution:**

1. Go to Vercel > Settings > Environment Variables
2. Add the missing variables (see Step 6)
3. Redeploy the project

### Error 3: "404 - Page Not Found" on Refresh

**Problem:** Next.js routing issue

**Solution:**

This shouldn't happen with Vercel (they handle Next.js routing automatically), but if it does:

1. Check that you're using Next.js App Router correctly
2. Make sure `next.config.js` is properly configured
3. Verify all pages are in the `app/` directory

### Error 4: "Custom Domain Not Working"

**Problem:** DNS not configured correctly

**Solution:**

1. Double-check DNS records in your domain registrar
2. Wait longer (DNS can take up to 48 hours)
3. Use [DNS Checker](https://dnschecker.org/) to verify DNS propagation
4. Make sure you entered the domain correctly in Vercel (no `https://` or trailing `/`)

### Error 5: "Images Not Loading"

**Problem:** Incorrect image paths or missing images

**Solution:**

1. Check that images are in the `public/` folder
2. Verify image paths in your code (use `/images/...` not `./images/...`)
3. Make sure images were pushed to GitHub
4. Check Vercel logs for specific errors

### Error 6: "API Route Returns 500 Error"

**Problem:** Contact form API not working

**Solution:**

1. Check Vercel > Functions > Logs
2. Verify environment variables are set correctly
3. Test the API route locally first
4. Check for syntax errors in `app/api/contact/route.ts`

### Error 7: "Calendly Widget Not Showing"

**Problem:** iframe blocked or incorrect URL

**Solution:**

1. Verify your Calendly URL is correct
2. Check browser console for errors (F12)
3. Make sure Calendly URL uses `https://` not `http://`
4. Try embedding Calendly using their inline widget script instead

### Error 8: "Deployment Taking Too Long"

**Problem:** Large dependencies or slow build

**Solution:**

1. Check Vercel build logs for what's taking time
2. Optimize images before uploading
3. Remove unused dependencies from `package.json`
4. Consider using Vercel's Image Optimization

### Error 9: "SSL Certificate Error"

**Problem:** Domain SSL not provisioned yet

**Solution:**

1. Wait 5-10 minutes for Vercel to provision SSL certificate
2. If it persists, go to Settings > Domains > Refresh
3. Contact Vercel support if issue continues

### Error 10: "Git Push Rejected"

**Problem:** Local and remote repositories out of sync

**Solution:**

```bash
# Pull latest changes first
git pull origin main

# Then push your changes
git push origin main
```

---

## Continuous Deployment

### How It Works

Once your project is deployed on Vercel, **every time you push to GitHub, Vercel automatically deploys your changes**! 🚀

### Automatic Deployment Workflow

1. Make changes to your code locally
2. Test locally: `npm run dev`
3. Commit changes: `git commit -m "Update homepage content"`
4. Push to GitHub: `git push origin main`
5. **Vercel automatically detects the push and deploys** (no manual steps!)
6. Check deployment status at [vercel.com/dashboard](https://vercel.com/dashboard)

### Preview Deployments

When you push to a branch other than `main`:

```bash
git checkout -b update-prices
# Make changes
git add .
git commit -m "Update pricing information"
git push origin update-prices
```

Vercel creates a **preview deployment** with a unique URL. You can test changes before merging to production!

### Deployment Notifications

Get notified when deployments complete:

1. Go to Vercel > Settings > Notifications
2. Enable email or Slack notifications
3. You'll be alerted when builds succeed or fail

---

## Best Practices

### 1. Use Environment Variables for Sensitive Data

**Never commit secrets to GitHub:**

```bash
# ❌ DON'T DO THIS
const apiKey = "abc123secret"

# ✅ DO THIS
const apiKey = process.env.API_KEY
```

### 2. Test Locally Before Deploying

Always test your changes locally:

```bash
npm run dev      # Test development
npm run build    # Test production build
npm run start    # Test production locally
```

### 3. Use Git Branches for New Features

```bash
# Create feature branch
git checkout -b new-feature

# Make changes and test

# Push to GitHub
git push origin new-feature

# Create Pull Request on GitHub

# Merge to main after review
```

### 4. Monitor Vercel Analytics

Enable Vercel Analytics to track:
- Page views
- Performance metrics
- User behavior

1. Go to your project in Vercel
2. Click **"Analytics"**
3. Enable analytics (free for basic metrics)

### 5. Set Up Custom 404 Page

Create a custom 404 page for better user experience:

1. Create `app/not-found.tsx`
2. Design a friendly "page not found" message
3. Include links back to main pages

### 6. Optimize Images

Use Next.js Image component for automatic optimization:

```tsx
import Image from 'next/image'

<Image 
  src="/images/hero.jpg" 
  alt="English lessons" 
  width={800} 
  height={600}
  priority
/>
```

### 7. Enable Vercel Speed Insights

Track real user performance:

1. Install: `npm install @vercel/speed-insights`
2. Add to `app/layout.tsx`:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 8. Set Up Sitemap for SEO

Create `app/sitemap.ts` for better SEO:

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://yourdomain.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add all your pages...
  ]
}
```

### 9. Regular Backups

Your code is safe on GitHub, but also:
- Download your repository periodically
- Keep a local backup of your `.env` variables
- Export your contact form submissions regularly

### 10. Monitor Uptime

Use free services to monitor your website:
- [UptimeRobot](https://uptimerobot.com/) - Free uptime monitoring
- [Freshping](https://www.freshworks.com/website-monitoring/) - Monitor from multiple locations

---

## Next Steps

After successful deployment:

1. ✅ **Update your Revolut link** in `/pay` page
2. ✅ **Add your real Calendly URL** in `/book` page
3. ✅ **Set up email** for contact form
4. ✅ **Add Google Analytics** (optional)
5. ✅ **Submit sitemap to Google Search Console**
6. ✅ **Create social media profiles** and link them in the footer
7. ✅ **Get student feedback** and add real testimonials
8. ✅ **Add QR code image** for Revolut payments
9. ✅ **Test everything thoroughly** on different devices
10. ✅ **Start marketing** your tutoring services!

---

## Support Resources

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

### Community Support
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Next.js Discord](https://nextjs.org/discord)
- [Vercel Discord](https://vercel.com/discord)

### Video Tutorials
- [Deploy Next.js to Vercel (Official)](https://www.youtube.com/watch?v=5QnNPw57Z6M)
- [Custom Domain Setup](https://www.youtube.com/results?search_query=vercel+custom+domain)

### Contact Vercel Support
- [Vercel Support](https://vercel.com/support)
- Email: support@vercel.com

---

## Congratulations! 🎉

Your English with Daniel website is now live on the internet! Students from around the world can now find and book lessons with you.

**Your live website:** `https://yourdomain.com`

Share your website:
- Add it to your social media profiles
- Include it in your email signature
- Share on language learning forums
- Tell your current students

**Happy teaching!** 👨‍🏫📚

---

## Deployment Checklist

Use this checklist to make sure you've completed everything:

### Pre-Deployment
- [ ] Website tested locally and working perfectly
- [ ] All pages load without errors
- [ ] Forms tested and working
- [ ] Images optimized and loading correctly
- [ ] Mobile responsiveness verified
- [ ] Content proofread for typos
- [ ] `.gitignore` file configured correctly

### GitHub Setup
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Repository is public or private (as desired)
- [ ] README.md updated with project info

### Vercel Deployment
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Project imported to Vercel
- [ ] Initial deployment successful
- [ ] Deployment URL working

### Configuration
- [ ] Environment variables added
- [ ] Project redeployed with environment variables
- [ ] Contact form tested on live site
- [ ] All API routes working

### Custom Domain
- [ ] Domain purchased (if applicable)
- [ ] Domain added to Vercel
- [ ] DNS configured correctly
- [ ] SSL certificate issued (green lock icon)
- [ ] Domain accessible via HTTPS
- [ ] www redirect configured

### Testing
- [ ] All 10 pages tested on live site
- [ ] Contact form submissions received
- [ ] Calendly widget working
- [ ] Revolut payment link working
- [ ] Mobile version tested
- [ ] Multiple browsers tested (Chrome, Safari, Firefox)
- [ ] Performance score checked (PageSpeed Insights)

### SEO & Analytics
- [ ] Sitemap created
- [ ] Robots.txt configured
- [ ] Google Search Console set up (optional)
- [ ] Google Analytics added (optional)
- [ ] Social media meta tags verified

### Final Steps
- [ ] Revolut link updated with real URL
- [ ] Calendly URL updated with real URL
- [ ] Contact email verified
- [ ] QR code added for Revolut
- [ ] Social media links added to footer
- [ ] Privacy policy and terms added (if required)

---

**Last Updated:** November 2025

**Guide Version:** 1.0

**For:** English with Daniel Website (Next.js 14 + Vercel)
