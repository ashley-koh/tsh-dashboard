# TSH Dashboard Backend

## How to Install

### Requirements

1. Visual Studio Code (with Prettier - Code Formatter and ESLint extensions)
2. Docker
3. Node.js (Preferably v20.15.0)

### Commands

```bash
cd TSH_PROJ_DIR/backend
cp .env.development.example .env.development.local
npm install
docker compose up -d
npm run dev
```

`cp .env.development.example .env.development.local`: Copy the example environment variables into an actual one.

`npm install`: Installs all packages listed in `package.json`

`docker compose up -d`: Spawns containers specified in `compose.yml` in detached mode.

`npm run dev`: Run Express App in `development` mode.

## API Documentation

Go to `http://localhost:3000/docs` to view all the routes along with their parameters and responses. You can also try executing them by clicking the "Try it out" button.

## Managing MongoDB Database

If you ever want to manually edit the key-value pairs of a specific document on the database, you can use the `mongo-express` application to do as such. It is accessible on `http://localhost:8081` after running `docker compose up -d`.
