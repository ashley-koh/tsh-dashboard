# TSH Dashboard Backend

## How to Install

### Requirements

1. Visual Studio Code (with Prettier - Code Formatter and ESLint extensions)
2. Docker
3. Node.js (Preferably v20.15.0)

To configure npm and Node.js versions, use the [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Refer to the NVM documentation (above) for details on troubleshooting and platform-dependent support (e.g., `nvm-windows`).

### Installation Procedure

Open Docker on your local machine and leave it open in the background. Then, in a bash terminal, run the following commands in sequence:

```bash
cd TSH_PROJ_DIR/backend
cp .env.development.example .env.development.local
npm install
docker compose up -d
npm run dev
```

Short explanations on what each command does:

- `cp .env.development.example .env.development.local`: Copy the example environment variables into an actual one.
- `npm install`: Installs all packages listed in `package.json`
- `docker compose up -d`: Spawns containers specified in `compose.yml` in detached mode.
- `npm run dev`: Run Express App in `development` mode.

## API Documentation

Go to `http://localhost:3000/docs` to view all the routes along with their parameters and responses. You can also try executing them by clicking the "Try it out" button.

## Managing MongoDB Database

If you ever want to manually edit the key-value pairs of a specific document on the database, you can use the `mongo-express` application to do as such. It is accessible on `http://localhost:8081` after running `docker compose up -d`.
