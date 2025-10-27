# ClickHouse Data Viewer

This is a Next.js application that displays data from ClickHouse using Server-Side Rendering (SSR).

## Features

- **Server-Side Rendering**: Data is fetched from ClickHouse on the server before the page is rendered
- **Modern TypeScript**: Built with TypeScript for type safety
- **Responsive Design**: Uses Tailwind CSS for a modern, responsive UI
- **Error Handling**: Gracefully handles connection errors and displays helpful messages

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Access to a ClickHouse database instance

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables:

Create a `.env.local` file in the root directory with your ClickHouse connection details:

```bash
CLICKHOUSE_URL=https://your-clickhouse-instance.com
CLICKHOUSE_USERNAME=default
CLICKHOUSE_PASSWORD=your-password
CLICKHOUSE_DATABASE=default
```

See `.env.example` for reference.

### Running the Application

Development mode:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Production build:

```bash
pnpm build
pnpm start
```

### Database Requirements

The application expects a ClickHouse table named `set_token_props`. Make sure this table exists and is accessible with the provided credentials.

## Project Structure

- `app/page.tsx` - Main page component with SSR data fetching
- `lib/clickhouse.ts` - ClickHouse client configuration and data fetching functions
- `app/layout.tsx` - Root layout component
- `.env.example` - Example environment variables

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework with SSR support
- [React 19](https://react.dev/) - UI library
- [@clickhouse/client-web](https://clickhouse.com/docs/en/integrations/javascript) - ClickHouse JavaScript client
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Learn More

To learn more about Next.js and ClickHouse:

- [Next.js Documentation](https://nextjs.org/docs)
- [ClickHouse JavaScript Client Documentation](https://clickhouse.com/docs/en/integrations/javascript)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

