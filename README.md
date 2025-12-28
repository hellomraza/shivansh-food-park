# Shivansh Food Park - Premium Restaurant Website

A modern, premium promotional website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. All data is dynamically loaded from **Google Maps API** using secure server-side actions.

## ✨ Features

Shivansh Food Park is a standalone Next.js application that allows users to search for restaurants and food establishments, view detailed information about each place, and browse photos using the Google Places API.

## Architecture

This application uses **Next.js Server Actions** for secure API communication:
- **Server Actions** (`lib/serverActions.ts`): Handle all Google Places API calls securely on the server
- **Client Components**: React components for UI interactivity
- **API Key Security**: `GOOGLE_PLACES_API_KEY` is stored server-side only, never exposed to the browser

## Features

✨ **Place Search**
- Search for restaurants, food places, and establishments
- Real-time loading states and error handling
- Responsive grid layout

📍 **Detailed Information**
- View comprehensive place information
- See ratings, reviews, and opening hours
- Browse location details and contact information

📸 **Photo Gallery**
- Display images from Google Places
- Navigation through multiple photos
- Photo attribution and details

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Places API Key (get one at [Google Cloud Console](https://console.cloud.google.com/))

### Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment Variables**

Create or update `.env.local` in the project root:
```
GOOGLE_PLACES_API_KEY=your_api_key_here
```

3. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
shivansh-food-park/
├── pages/
│   ├── _app.tsx           # Next.js App wrapper
│   ├── _document.tsx      # HTML document structure
│   ├── index.tsx          # Search/home page
│   └── place/
│       └── [place_id].tsx # Dynamic detail page
├── components/
│   ├── SearchBar.tsx      # Search input component
│   ├── PlaceCard.tsx      # Result card component
│   ├── PlaceDetailView.tsx # Place details component
│   └── PhotoGallery.tsx   # Photo gallery component
├── lib/
│   ├── serverActions.ts   # Google Places API integration (Server Actions)
│   ├── api.ts            # API re-export layer
│   └── types.ts          # TypeScript type definitions
├── styles/
│   ├── globals.css       # Global styles
│   └── index.css         # Component styles
├── public/               # Static assets
├── package.json
├── tsconfig.json
└── next.config.js
```

## Key Files

### `lib/serverActions.ts`
Server Actions that securely communicate with Google Places API:
- `searchPlaces(query: string)` - Search for places
- `getPlaceDetails(placeId: string)` - Get detailed information about a place

### `components/SearchBar.tsx`
Search input component with form submission handling

### `components/PlaceCard.tsx`
Displays individual search results with name, rating, and address

### `components/PlaceDetailView.tsx`
Comprehensive detail view including:
- Place information (name, address, phone, website)
- Photos gallery
- Customer reviews
- Operating hours

### `components/PhotoGallery.tsx`
Image gallery with:
- Photo navigation (prev/next)
- Loading states
- Photo attribution
- Error handling

## Environment Configuration

The application requires a Google Places API Key. Add it to `.env.local`:

```
GOOGLE_PLACES_API_KEY=your_key_here
```

The API key is only used on the server-side through Next.js Server Actions and is never exposed to the client browser.

## Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14.0.0** - React framework with Server Actions
- **React 18.2.0** - UI library
- **TypeScript 5.3.0** - Type safety
- **Google Places API** - Place search and details
- **CSS3** - Styling and responsive design

## API Integration

### Google Places Text Search
Endpoint: `https://maps.googleapis.com/maps/api/place/textsearch/json`

Used to search for places by query string. Returns basic place information and photos.

### Google Places Details
Endpoint: `https://maps.googleapis.com/maps/api/place/details/json`

Used to get comprehensive details about a specific place including reviews, hours, and all available photos.

### Photo Reference
Photos are retrieved using the `photo_reference` from Google Places API with the Photo endpoint:
`https://maps.googleapis.com/maps/api/place/photo?maxwidth={width}&photo_reference={ref}&key={apiKey}`

## Error Handling

The application includes comprehensive error handling:
- Network error messages
- Invalid query feedback
- Photo loading failures
- Missing data handling

## Responsive Design

The application is fully responsive and optimized for:
- Desktop browsers (1920px+)
- Tablets (768px - 1024px)
- Mobile devices (< 768px)

## Performance

- Server-side rendering with Next.js
- Static and dynamic page generation
- Optimized images through Google's CDN
- Minimal JavaScript bundle size

## Contributing

To contribute improvements to this project:

1. Make changes to components or styling
2. Test functionality in development mode
3. Verify responsive design on different screen sizes

## License

This project is part of the Map Prototype series.

## Support

For issues with:
- **Google Places API**: Visit [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service)
- **Next.js**: Check [Next.js Documentation](https://nextjs.org/docs)
- **TypeScript**: See [TypeScript Handbook](https://www.typescriptlang.org/docs/)
