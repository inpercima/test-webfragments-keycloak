# Webfragments with Keycloak

This project demonstrates a **microfrontend architecture** using **[web fragments](https://github.com/web-fragments/web-fragments)**, a central **shell app**, and **Keycloak** for authentication and authorization.

The goal is to develop multiple frontends and backends modularly, deploy them independently, and integrate them dynamically within a shared shell.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer)
- [pnpm](https://pnpm.io/) (preferred package manager)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting started

### Project structure

- **containerization/**
  - `keycloak-realm/` → Keycloak configuration
  - `compose.yml` → Compose setup
  - `default.env` → Environment file
- **fragment/**
  - `backend/` → Fragment backend (API and BFF)
  - `frontend/` → Fragment frontend (Angular)
- **shell/**
  - `backend/` → Shell backend
  - `frontend/` → Shell frontend (Angular)
- **README.md**

### Install dependencies

Go to **fragment** and install dependencies for **backend** and **frontend**.

```bash
cd fragment/frontend
pnpm install

cd fragment/backend
pnpm install
```

Go to **shell** and install dependencies for **backend** and **frontend**.

```bash
cd shell/frontend
pnpm install

cd shell/backend
pnpm install
```

## Docker Setup

### Define environment variables

Create an environment file `.env` in containerization.

```bash
cd containerization
cp default.env .env
```

### Start compose

```bash
cd containerization
docker compose up -d
```

## Build and start apps

### Build and start fragment

Go to **fragment** to build and start app.

```bash
cd fragment/frontend
pnpm build

cd fragment/backend
pnpm start

# reachable on http://localhost:8000/
```

### Build and start shell

Open a new/extra or second terminal.
Go to **shell** to build and start app.

```bash
cd shell/frontend
pnpm build

cd shell/backend
pnpm start

# reachable on http://localhost:3000/
```

### Login

Use the user **webfragements** same as password.
You should see the shell and the fragment loaded with a button.
Clicking the button calls a request to load text **Hello World**.

## Optional

### Export keycloak realms

The following commands are for exporting changes in keycloak realms and save them for later.
You need to stop the compose before running the commands.

The realms will be imported on startup of the compose file.

```bash
cd containerization

# export realms
docker compose run --rm keycloak export --dir /opt/keycloak/data/import --realm dev
docker compose run --rm keycloak export --dir /opt/keycloak/data/import --realm master
```
