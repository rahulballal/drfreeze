# drfreeze

A TypeScript library project using Bun.js runtime with Biome.js for linting and formatting.

## Features

- 🚀 **Bun.js** - Fast JavaScript runtime
- 📦 **TypeScript** - Type-safe development
- ✨ **Biome.js** - Fast linter and formatter
- 🏗️ **Library Setup** - Ready for building libraries

## Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0

## Installation

```bash
bun install
```

Or using npm:

```bash
npm install
```

## Development

### Build

```bash
npm run build
```

### Linting

```bash
# Check for linting issues
npm run lint

# Fix linting issues
npm run lint:fix
```

### Formatting

```bash
# Check formatting
npm run format

# Fix formatting
npm run format:fix
```

### Type Checking

```bash
npm run typecheck
```

### Combined Check

Run linting and formatting together:

```bash
npm run check

# With auto-fix
npm run check:fix
```

## Running with Bun

```bash
bun run src/index.ts
```

## Project Structure

```
drfreeze/
├── src/           # Source files
├── dist/          # Compiled output
├── biome.json     # Biome configuration
├── tsconfig.json  # TypeScript configuration
└── package.json   # Package configuration
```

## License

See [LICENSE](LICENSE) file for details.