# Text Content Management System - Architecture

## Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    Website Frontend                              │
│  (React Components rendering HTML with text)                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ Imports getContent()
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│          lib/useContent.ts (Helper Functions)                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ • getContent() → Loads and returns content.json         │   │
│  │ • interpolateText(text, values) → Replaces {placeholders}   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ Reads
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              lib/content.json (Content File)                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ {                                                        │   │
│  │   "navigation": { ... },                               │   │
│  │   "hero": { ... },                                     │   │
│  │   "about": { ... },                                    │   │
│  │   "gallery": { ... },                                  │   │
│  │   "reviews": { ... },                                  │   │
│  │   "contact": { ... },                                  │   │
│  │   "contactInfo": { ... },                              │   │
│  │   "footer": { ... },                                   │   │
│  │   "error": { ... }                                     │   │
│  │ }                                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
Developer edits
     ↓
lib/content.json
     ↓
File saved
     ↓
Next.js hot reload (dev) or rebuild (prod)
     ↓
Components import getContent()
     ↓
useContent.ts returns content object
     ↓
Components render with new text
     ↓
Website displays updated text
```

## Components Updated

```
components/
├── Navigation.tsx
│   └── Uses: content.navigation.*
│
├── home-client.tsx
│   └── Uses: 
│       • content.hero.*
│       • content.about.*
│       • content.gallery.*
│       • content.reviews.*
│       • content.contact.*
│       • content.contactInfo.*
│       • content.footer.*
│
├── home-server.tsx
│   └── No changes (passes props to home-client)
│
└── SectionHeading.tsx
    └── Receives title/subtitle as props

app/
└── page.tsx
    └── Uses: content.error.*
```

## Content Organization

```
content.json
│
├── navigation
│   ├── navLinks (array)
│   ├── bookTable (string)
│   └── brandName (string)
│
├── hero
│   ├── welcome (string)
│   ├── tagline (string with placeholders)
│   ├── reserveTable (string)
│   └── viewOnMap (string)
│
├── about
│   ├── title (string)
│   ├── subtitle (string)
│   ├── description1 (string with {placeholders})
│   ├── description2 (string)
│   ├── starsLabel (string)
│   ├── reviewsLabel (string)
│   ├── statusLabel (string)
│   ├── openStatus (string)
│   └── closedStatus (string)
│
├── gallery
│   ├── title (string)
│   ├── subtitle (string)
│   └── noPhotos (string)
│
├── reviews
│   ├── title (string)
│   └── subtitle (string)
│
├── contact
│   ├── title (string)
│   ├── subtitle (string)
│   ├── description (string)
│   ├── formLabels (object)
│   ├── formPlaceholders (object)
│   ├── submitButton (string)
│   └── submitLoading (string)
│
├── contactInfo
│   ├── location (string)
│   ├── phone (string)
│   ├── hours (string)
│   └── mapTitle (string with {placeholders})
│
├── footer
│   ├── copyrightText (string with {placeholders})
│   ├── createdBy (string)
│   └── links (object with 4 properties)
│
└── error
    ├── title (string)
    ├── defaultError (string)
    └── configError (string)
```

## Usage Example

### In a Component:

```tsx
'use client';

import { getContent, interpolateText } from '@/lib/useContent';

export function MyComponent({ restaurant }) {
  const content = getContent();
  
  // Simple text
  const welcome = content.hero.welcome;
  // Output: "Welcome to"
  
  // Text with placeholders
  const description = interpolateText(content.about.description1, {
    address: restaurant.formatted_address,
    rating: restaurant.rating,
    reviews: restaurant.user_ratings_total,
  });
  // Output: "Located at 123 Main St, Shivansh Food Park has established..."
  
  return (
    <div>
      <h1>{welcome}</h1>
      <p>{description}</p>
    </div>
  );
}
```

## Placeholder System

```
Pattern: {placeholderName}

When content.json has:
"description1": "Located at {address}, with {reviews} reviews"

And component calls:
interpolateText(text, {
  address: "123 Main Street",
  reviews: 450
})

Result:
"Located at 123 Main Street, with 450 reviews"
```

## File Dependencies

```
useContent.ts
└── imports → content.json

Navigation.tsx
└── imports → useContent.ts → content.json

home-client.tsx
└── imports → useContent.ts → content.json

app/page.tsx
└── imports → useContent.ts → content.json
```

## Benefits of This Architecture

✅ **Separation of Concerns** - Content separate from code
✅ **Single Source of Truth** - All text in one place
✅ **Easy Updates** - Edit JSON, no code changes
✅ **Type Safe** - getContent() returns typed object
✅ **Reusable** - interpolateText() works with any text
✅ **Scalable** - Easy to add new sections
✅ **i18n Ready** - Can create multiple JSON files per language

## Future Enhancements

### Add Multiple Languages:

```
lib/
├── content.json          (English)
├── content.es.json       (Spanish)
├── content.fr.json       (French)
└── useContent.ts         (Updated to support lang parameter)
```

### Usage:
```tsx
const content = getContent('es'); // Spanish
const content = getContent('fr'); // French
const content = getContent();     // English (default)
```

### Add Content Versioning:
```
lib/
├── content/
│   ├── v1.json
│   ├── v2.json
│   └── latest.json
```

### Add Content Validation:
```tsx
// Validate content structure on load
export const validateContent = (content) => {
  // Check required fields
  // Type checking
  // Default values
};
```

## Deployment Workflow

```
1. Developer edits lib/content.json
           ↓
2. Commit and push to git
           ↓
3. CI/CD pipeline runs tests
           ↓
4. Build and deploy to production
           ↓
5. Users see updated text immediately
```

## File Sizes

- `content.json` - ~2.5 KB
- `useContent.ts` - ~0.3 KB
- Total overhead - ~2.8 KB (negligible)

---

**Key Takeaway**: This architecture separates content (what users see) from code (how it works), making text updates simple and safe!
