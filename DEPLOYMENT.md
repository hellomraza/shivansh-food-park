# Deployment Guide

## Prerequisites

- Node.js 18+ and npm
- Google Maps API Key with Places API enabled
- Vercel account (for deployment)

## Local Development

### 1. Setup Environment Variables

Create `.env.local` in the root directory:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
GOOGLE_MAPS_PLACE_ID=ChIJBWfN37cpLzoRkdLMmuXicX0
```

**Get your Google API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Places API
4. Create an API key (credential)
5. Restrict it to your domain for security

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Run Tests

```bash
npm test           # Run all tests
npm run test:watch # Watch mode
npm run test:coverage # Coverage report
```

## Deployment to Vercel

### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option B: Using GitHub Integration

1. Push your code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - `GOOGLE_MAPS_PLACE_ID`
4. Vercel will auto-deploy on push

### Option C: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `.next` folder to your hosting provider

## Environment Variables Configuration

### Production Vercel Dashboard

Go to: Settings → Environment Variables

Add:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (Public)
- `GOOGLE_MAPS_PLACE_ID` (Public)
- `NEXT_REVALIDATE_TIME=3600` (ISR cache time in seconds)

## Security Best Practices

✅ **Good:**
- API key stored in `.env.local`
- API calls only in server actions
- Response validation with Zod
- ISR caching to reduce API calls

❌ **Avoid:**
- Exposing API key in client-side code
- Direct API calls from frontend
- No response validation

## Performance Optimization

### ISR (Incremental Static Regeneration)
- Default revalidation: 3600 seconds (1 hour)
- Modify in `.env.local`: `NEXT_REVALIDATE_TIME=3600`

### Caching Strategy
- Server-side caching in `app/actions/google.ts`
- Google Photos cached at CDN level
- Fallback to stale cache if API fails

### Image Optimization
- Using Google Places Photos API
- Responsive image sizes
- WebP format support

## Monitoring & Debugging

### Logs
```bash
# Vercel logs
vercel logs [--prod]

# Local development
npm run dev  # Shows console logs
```

### Performance
- Lighthouse score target: 90+
- First Contentful Paint: <1.5s
- Cumulative Layout Shift: <0.1

## Troubleshooting

### API Key Issues

```
Error: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set
```
Solution: Add API key to `.env.local` and restart dev server

### Rate Limiting

If you hit API limits:
1. Increase `NEXT_REVALIDATE_TIME` in `.env.local`
2. Implement Redis caching for production
3. Upgrade Google Maps API plan

### Map Not Loading

1. Verify API key is valid
2. Check Places API is enabled in Google Cloud Console
3. Verify CORS restrictions allow your domain

## Rollback

```bash
# Vercel auto-keeps previous builds
vercel rollback

# Manual: Re-deploy previous commit
git revert HEAD
git push
vercel
```

## Costs

**Google Maps API:**
- Free: 25,000 requests/month
- Each request: $0.00286 after free tier
- Recommendation: Monitor usage in Google Cloud Console

**Vercel:**
- Free tier: Sufficient for most use cases
- Pro: $20/month for advanced features

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Monitor performance metrics
3. ✅ Set up automated backups
4. ✅ Configure SSL certificate
5. ✅ Setup domain DNS
