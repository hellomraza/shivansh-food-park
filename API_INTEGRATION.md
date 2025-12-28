# Google Maps API Integration Guide

## 🔌 How the API Integration Works

### Data Flow

```
User Browser
    ↓
Next.js Server
    ↓
Server Action (app/actions/google.ts)
    ↓
In-Memory Cache Check (1-hour TTL)
    ├─ Cache HIT → Return cached data
    └─ Cache MISS → Continue to API
    ↓
Google Places API
    ↓
Zod Validation (app/lib/types.ts)
    ├─ ✅ Valid → Cache & return
    └─ ❌ Invalid → Throw error
    ↓
React Components (Server + Client)
    ↓
HTML/CSS/JSON → User Browser
```

---

## 🔐 Security Model

### API Key Protection

**❌ INSECURE (What we DON'T do):**
```typescript
// Frontend code - EXPOSED!
const apiKey = "AIzaSyDxxxx..."; // VISIBLE IN NETWORK TAB
fetch('https://maps.googleapis.com/...?key=' + apiKey);
```

**✅ SECURE (What we DO):**
```typescript
// Backend (server action only)
'use server';
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
// API call here - never exposed to client
```

### How It's Protected

1. **Environment Variable**: Stored in `.env.local` (never committed)
2. **Server-Side Only**: Only used in `app/actions/google.ts`
3. **No Client Access**: Browser never sees the key
4. **Response Validation**: Zod schema validates before using data
5. **Caching**: Reduces API calls and exposure window

---

## 📡 API Endpoints Used

### Place Details Endpoint

```
GET https://maps.googleapis.com/maps/api/place/details/json
```

**Parameters:**
```
place_id=ChIJBWfN37cpLzoRkdLMmuXicX0
key={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
fields=name,formatted_address,formatted_phone_number,
       international_phone_number,rating,user_ratings_total,
       photos,reviews,opening_hours,geometry,url,business_status,
       dine_in,takeout,types
```

**Response includes:**
- ✅ Restaurant name
- ✅ Full address
- ✅ Phone numbers (formatted + international)
- ✅ Rating (0-5) + total reviews count
- ✅ Photo references (10+ images)
- ✅ Customer reviews (5 latest)
- ✅ Opening hours (all days)
- ✅ Location coordinates (lat/lng)
- ✅ Google Maps URL
- ✅ Business status
- ✅ Service types (dine-in, takeout)

### Photo Endpoint

```
GET https://maps.googleapis.com/maps/api/place/photo
```

**Parameters:**
```
maxwidth=800 (or 1200 for lightbox)
photo_reference={reference_from_details}
key={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
```

Returns optimized image for display.

---

## 💾 Caching Strategy

### Why Caching?

1. **Cost**: Free tier = 25,000 requests/month
   - Without cache: ~1 request/page load
   - With cache: ~1 request/hour = 168/month (lots of room!)

2. **Speed**: Cached response in 1ms vs API call in 500ms

3. **Reliability**: Works offline with stale cache

### Implementation

```typescript
// In-memory cache with TTL
interface CacheEntry {
  data: PlaceDetails;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 3600; // 1 hour

function checkCache(key: string): PlaceDetails | null {
  const cached = cache.get(key);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp < CACHE_DURATION * 1000) {
    return cached.data; // Still valid
  }
  return null; // Expired
}
```

### ISR (Incremental Static Regeneration)

```typescript
// Vercel Next.js feature
export const revalidate = 3600; // Revalidate every hour

// This tells Vercel to:
// 1. Cache the page HTML
// 2. Regenerate in the background after 1 hour
// 3. Serve stale content while regenerating
```

---

## 🔄 Data Fetching Sequence

### First Request (10:00 AM)

```
Browser Request
    ↓
Server calls getRestaurantDetails()
    ↓
Cache check: MISS
    ↓
API call to Google (takes ~500ms)
    ↓
Validate with Zod
    ↓
Cache result + timestamp
    ↓
Return to components
    ↓
Render page
```

### Second Request (10:30 AM, same hour)

```
Browser Request
    ↓
Server calls getRestaurantDetails()
    ↓
Cache check: HIT (1.5ms)
    ↓
Return cached data
    ↓
Render page (faster!)
```

### Request After Cache Expires (11:30 AM)

```
Browser Request
    ↓
Server calls getRestaurantDetails()
    ↓
Cache check: EXPIRED
    ↓
API call to Google (fresh data)
    ↓
Update cache
    ↓
Return to components
```

---

## 📝 Validation with Zod

### Raw API Response (Unvalidated)

```json
{
  "result": {
    "name": "Shivansh Food Park",
    "rating": 3.5,
    "photos": [ {...} ],
    ...
  },
  "status": "OK"
}
```

### Validation Process

```typescript
const validatedData = GooglePlacesResponseSchema.parse(data);

// If invalid:
// ❌ Throws error (prevents bugs)
// ❌ Shows error boundary
// ❌ Clear error message

// If valid:
// ✅ Type-safe (TypeScript knows structure)
// ✅ All required fields present
// ✅ Values are correct type
```

### Schema Definition

```typescript
const PlaceDetailsSchema = z.object({
  name: z.string(),                    // Must be string
  rating: z.number().min(0).max(5),   // 0-5 stars
  user_ratings_total: z.number(),      // Count
  photos: z.array(PhotoSchema),        // Array of photos
  reviews: z.array(ReviewSchema),      // Array of reviews
  opening_hours: OpeningHoursSchema.optional(), // Can be missing
  // ... more fields
});
```

---

## 🌐 Environment Variables

### Development (.env.local)

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_MAPS_PLACE_ID=ChIJBWfN37cpLzoRkdLMmuXicX0
NEXT_REVALIDATE_TIME=3600
```

### Production (Vercel Dashboard)

Same variables set in **Settings → Environment Variables**

### Important Notes

- `NEXT_PUBLIC_` prefix is safe (used in URLs, not secrets)
- Never commit `.env.local` to Git
- Each restaurant needs its own PLACE_ID
- API key can have rate limit restrictions

---

## 📊 API Response Example

### Real Data from Google for Shivansh Food Park

```json
{
  "result": {
    "name": "Shivansh Food Park",
    "formatted_address": "Infront of Equitas bank, Ratna bandha road, 
                         Subhash Nagar, Dhamtari, Chhattisgarh 493773, India",
    "formatted_phone_number": "098270 48957",
    "international_phone_number": "+91 98270 48957",
    "rating": 3.5,
    "user_ratings_total": 21,
    "photos": [
      {
        "height": 2296,
        "width": 4080,
        "html_attributions": ["<a href=\"...\">Lucky Valecha</a>"],
        "photo_reference": "AZLasHp0UeFR-cT0h8fNdAlkJNVGdK3R3k..."
      },
      // ... 9 more photos
    ],
    "reviews": [
      {
        "author_name": "Batika Rai",
        "rating": 4,
        "relative_time_description": "3 months ago",
        "text": "Shivansh Food Park is a great place to dine...",
        "profile_photo_url": "https://lh3.googleusercontent.com/...",
        "time": 1756989690
      },
      // ... 4 more reviews
    ],
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: Open 24 hours",
        "Tuesday: Open 24 hours",
        // ... all days
      ]
    },
    "geometry": {
      "location": {
        "lat": 20.7144585,
        "lng": 81.5326135
      }
    },
    "url": "https://maps.google.com/?cid=9039255402881798801",
    "business_status": "OPERATIONAL",
    "dine_in": true,
    "takeout": true,
    "types": ["establishment", "food", "point_of_interest", "restaurant"]
  },
  "status": "OK",
  "html_attributions": []
}
```

---

## 🔧 Get Restaurant Place ID

### For Shivansh Food Park (Already Set)

```
Place ID: ChIJBWfN37cpLzoRkdLMmuXicX0
Location: Dhamtari, Chhattisgarh, India
```

### For Another Restaurant

1. Go to Google Maps
2. Search restaurant name
3. Click "Share" button
4. Copy link: `https://maps.google.com/?cid=PLACE_ID`
5. Extract PLACE_ID from URL
6. Update `.env.local`

Example:
```
https://maps.google.com/?cid=123456789
                               ^^^^^^^^^ This is the PLACE_ID
```

---

## 🚀 Deployment Considerations

### API Key Restrictions (Recommended)

In Google Cloud Console:
1. Go to Credentials
2. Select API key
3. Application restrictions: `Website`
4. Website restrictions: Add your domain
5. API restrictions: `Places API only`

### Rate Limits

**Free Tier:**
- 25,000 requests/month
- At 1 request/hour: ~168 requests/month
- **Plenty of room!**

**If you exceed:**
- Upgrade to paid plan
- Implement Redis for distributed caching
- Increase `NEXT_REVALIDATE_TIME`

### Cost Estimation

```
25,000 free requests/month
After: $0.00286 per request

With ISR caching:
• 1 hour = ~24 requests
• 30 days = ~720 requests
• Monthly cost: ~$2

Without caching:
• 1000 visitors/day = ~30,000 requests
• Monthly cost: $17+

Caching saves: $15/month + improves performance!
```

---

## 🧪 Testing the API

### Manual Testing in Dev Console

```javascript
// In browser console
fetch('http://localhost:3000/api/restaurant')
  .then(r => r.json())
  .then(data => console.log(data))
```

### Automated Tests

See `tests/actions/google.test.ts`:
- ✅ API fetch success
- ✅ Cache behavior
- ✅ Error handling
- ✅ Response validation
- ✅ Photo URL generation

---

## 📞 Troubleshooting

### "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set"

```bash
# Check .env.local exists
cat .env.local

# Should show key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
```

### "Permission denied" or "Invalid API key"

1. Check key in `.env.local`
2. Verify Places API enabled in Google Cloud
3. Ensure API key isn't restricted to another project
4. Check domain restrictions (if set)

### "Zero results" for place

1. Verify GOOGLE_MAPS_PLACE_ID is correct
2. Restaurant must be on Google Maps
3. Try different place ID format

### Rate limit exceeded

1. Increase `NEXT_REVALIDATE_TIME` in `.env.local`
2. Upgrade API plan
3. Implement Redis cache for production

---

## 🔗 Resources

- [Google Places API Docs](https://developers.google.com/maps/documentation/places/web-service)
- [Place Details Request](https://developers.google.com/maps/documentation/places/web-service/details)
- [Photo Retrieval](https://developers.google.com/maps/documentation/places/web-service/photos)
- [API Console](https://console.cloud.google.com/)

---

**All API integration is secure and follows best practices!** ✅
