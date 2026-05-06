# Portfolio — Fabrizio Biondi

Personal portfolio built with Vue 3 + Vuetify 3, deployed on Google Cloud with Docker and Nginx.

## Stack

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **UI:** Vuetify 3 with custom dark theme
- **Build:** Vite
- **Router:** Vue Router 4
- **Animations:** @vueuse/motion
- **Tests:** Vitest + @vue/test-utils
- **Deploy:** Docker (multi-stage) + Nginx on GCP VM

## Local development

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173`.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Tests

```bash
npm test
```

## Deploy

The app is containerized with a multi-stage Dockerfile (build → Nginx). On the GCP VM, it runs behind an Nginx reverse proxy with SSL via Certbot and a DuckDNS domain.

```bash
docker build -t portfolio .
docker run -p 80:80 portfolio
```
