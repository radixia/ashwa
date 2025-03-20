# Bookmark Vault

A modern web application built with Next.js 15 and React 19 for managing and organizing bookmarks.

## Tech Stack

- **Framework**: Next.js 15.2.3
- **UI Library**: React 19
- **Styling**: Tailwind CSS with custom animations
- **Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Theme**: Dark/Light mode support via next-themes
- **Package Manager**: pnpm

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The app will be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── actions/       # Server actions
├── app/          # Next.js app directory
├── components/   # Reusable UI components
├── domain/       # Domain logic and types
├── hooks/        # Custom React hooks
├── images/       # Static images
├── lib/          # Utility functions
└── public/       # Static assets
```

## Development

- Uses TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling with custom animations
- Component-driven development with Radix UI primitives

## Contributing

1. Use pnpm as the package manager
2. Follow the TypeScript guidelines
3. Ensure all strings are internationalized
4. Write modular and reusable code
5. Run linting before committing: `pnpm lint`

## License

Radixia - All rights reserved
