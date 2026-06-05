# vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

## Docker Setup

This project includes Docker support for easy development environment setup.

### Prerequisites

- Docker installed on your system
- Docker Compose installed

### Running with Docker

1. Build and start the container:

```sh
docker-compose up --build
```

2. The application will be available at `http://localhost:3000`

### Development with Docker

- The container uses volume mounting, so changes to your code will be reflected immediately
- To stop the container: `docker-compose down`
- To rebuild after dependency changes: `docker-compose up --build --force-recreate`
