# TSH Dashboard Frontend

## How to Install

### Requirements

3. Node.js (Preferably v20.15.0)

To configure npm and Node.js versions, use the [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Refer to the NVM documentation (above) for details on troubleshooting and platform-dependent support (e.g., `nvm-windows`).

### Installation Procedure

Open Docker on your local machine and leave it open in the background. Then, in a bash terminal, run the following commands in sequence:

```bash
cd TSH_PROJ_DIR/frontend
cp .env.development.example .env.development.local
npm install
npm run dev
```

Short explanations on what each command does:

- `cp .env.development.example .env.development.local`: Copy the example environment variables into an actual one.
- `npm install`: Installs all packages listed in `package.json`
- `npm run dev`: Run Express App in `development` mode.

## File Structure

Due to React's unopinioinated approach to file structuring, below is an opinionated file structure to help everyone collaborate efficiently while maintaining code modularity, cleanliness and readability.

### Top-level Directory Layout

```
root
├── build                   # Compiled files (alternatively `dist`)
├── docs                    # Documentation files except the main README.md file
├── src                     # Source files to be built (we will expound more on it below)
└── README.md
```

### Source Files `/src`

```
root
├── ...
├── src
│   ├── assets              # Images and styles used in React components
│   ├── components          # All simple and reusable components used throughout application
│   ├── context             # Context files that are used across multiple pages
│   ├── data                # JSON files that are used (form data, config, global contants)
│   ├── lib                 # Contains facades (wrappers) for various libraries (e.g. axios)
│   ├── hooks               # Global hooks
│   ├── pages               # One folder for each complex component (pages) in application
│   ├── types               # Type definitions that are used globally
│   ├── utils               # Contains pure function like formatters
│   ├── App.tsx             # Main Component
└── ...
```

### Pages Folder `/src/pages`

```
root/src
├── ...
├── pages                   # One folder for each complex component (pages) in application
│   ├── ComponentOne            # Component name (in UpperCamelCase format)
│   │   ├── types                   # Types folder only used in ComponentOne
│   │   ├── index.ts                # Single root file
│   │   ├── ComponentOneForm.tsx    # Form component that only ComponentOne uses
│   │   ├── ComponentOneLayout.tsx  # Layout component that only ComponentOne uses
│   │   ├── ComponentOne.css        # Styling only for ComponentOne
│   │   ├── useComponentOne.tsx     # hook that only for ComponentOne uses
│   │   ├── ...                     # Files pertaining only to ComponentOne (contexts, tests, other components)
│   ├── ComponentTwo            # Component name (in UpperCamelCase format)
│   │   ├── index.ts                # Single root file
│   │   ├── ComponentTwo.tsx        # Form component that only ComponentTne uses
│   │   ├── ComponentTwo.css        # Styling only for ComponentTne
│   │   ├── ...                     # Files pertaining only to ComponentTwo (contexts, tests, other components)
├── ...
```

_Adapted from [Web Dev Simplified's Intermediate Folder Structure](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)_

## Links

1. [Vite](/docs/vite.md)
2. [React API](https://react.dev/reference/react)
3. [AntDesign Components](https://ant.design/components/overview)
