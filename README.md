# clickhouse-dca-dot-fun

NextJS Clickhouse for DCA

## Project Structure

This repository contains a Next.js sample application that demonstrates how to fetch and display data from ClickHouse using Server-Side Rendering (SSR).

### `/my-app` - Next.js Application

The main application is located in the `my-app` directory. See [my-app/README.md](my-app/README.md) for detailed setup and usage instructions.

**Key Features:**
- Server-Side Rendering (SSR) with Next.js 16
- ClickHouse integration using `@clickhouse/client-web`
- Modern TypeScript with full type safety
- Responsive UI with Tailwind CSS
- Comprehensive error handling
- Environment-based configuration

**Quick Start:**
```bash
cd my-app
pnpm install
cp .env.example .env.local
# Edit .env.local with your ClickHouse credentials
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Requirements

- Node.js 18+
- pnpm package manager
- ClickHouse database instance with `set_token_props` table

## License

See [LICENSE](LICENSE) file for details.
