# North Korean Unity

A modern Next.js 15 application showcasing North Korean cultural heritage, traditions, and modern achievements to promote peace and cultural understanding.

## Features

- Multi-language support with internationalization (English, Korean, Russian, Chinese)
- Responsive design for all devices
- Modern stack with Next.js 15 and React 19
- Sections covering various aspects of North Korean culture, heritage, and achievements
- Optimized performance with Partial Prerendering (PPR)
- Contact form with HeroTofu integration

## Tech Stack

- **Framework**: Next.js 15
- **JS Library**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Form Handling**: react-hook-form + zod
- **Icons**: Lucide React
- **Fonts**: Google Fonts with next/font
- **Contact Form**: HeroTofu integration

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm 8 or newer

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/north-korean-unity.git
cd north-korean-unity

# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev
```

The application will be available at http://localhost:3000

### Build for Production

```bash
# Create a production build
pnpm build

# Start the production server
pnpm start
```

## Project Structure

- **app/** - Next.js App Router pages and layouts
- **components/** - UI components
  - **features/** - Feature-specific components
  - **layout/** - Layout components (Header, Footer)
  - **sections/** - Content sections 
  - **ui/** - shadcn/ui components
- **lib/** - Utilities and services
- **hooks/** - Custom React hooks
- **public/** - Static assets
- **locales/** - Translation files

## Contact Form

The contact form is integrated with HeroTofu. The form endpoint is:

```
https://public.herotofu.com/v1/cb3ceee0-1058-11f0-8dc2-010227905b4a
```

This handles form submissions and delivers them to the connected email address.

## License

MIT