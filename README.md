# VISA Furniture - The India Edit

A premium e-commerce furniture store featuring timeless Indian craftsmanship. Built with React, Vite, and Tailwind CSS.

## Features

- **Product Catalog** - Browse curated furniture collections
- **Shopping Cart** - Add items with custom dimensions
- **Checkout Flow** - Multi-step checkout process
- **Admin Dashboard** - Manage inventory and orders
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Premium user experience

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Tailwind CSS 3** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is deployment-ready for:

### Vercel
```bash
vercel
```

### Netlify
```bash
netlify deploy --prod
```

### Other Platforms
Upload the `dist` folder to any static hosting service.

## Configuration

Environment variables are stored in `.env`:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_SUPABASE_ANON_KEY` - Supabase anonymous key

## Admin Access

Access the admin dashboard via the footer "Staff Access" button.
- Default password: `admin123`

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── App.jsx      # Main application component
│   ├── main.jsx     # Application entry point
│   └── index.css    # Global styles
├── dist/            # Production build (generated)
├── index.html       # HTML template
├── vite.config.js   # Vite configuration
├── tailwind.config.js # Tailwind configuration
└── package.json     # Dependencies
```

## License

ISC
