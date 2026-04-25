# Examples — Pirple's NodeJS Master Class

My personal implementation of the examples and exercises from **[Pirple's The Node.JS Master Class](https://www.pirple.com/courses/the-nodejs-master-class)**.

This repository tracks my progress through the course as I build each example from scratch using **vanilla Node.js** (no frameworks, no NPM dependencies — just core modules).

---

## Repository layout

Each top-level `example-XX/` folder corresponds to a chapter/section of the course and is self-contained.

```
Examples-gm-node-master-class/
├── example-01/        # HTTP + HTTPS server, routing, env-based config
│   ├── index.js
│   ├── config.js
│   └── https/         # local self-signed cert + key (gitignored)
├── .gitignore
└── readme.md
```

---

## What's implemented so far

### `example-01/` — RESTful API foundation

A bare-bones API server built with only Node.js core modules. Iteratively built up across the early chapters of the course. Current capabilities:

- **HTTP server** listening on a configurable port (`http` core module).
- **HTTPS server** listening on a separate port using a local self-signed certificate (`https` + `fs` core modules).
- **Unified request handler** (`unifiedServer`) shared by both HTTP and HTTPS servers — same routing logic regardless of protocol.
- **URL parsing** with the `url` module — extracts pathname, trimmed path, and the query string as an object.
- **HTTP method** captured and normalized to lowercase.
- **Request headers** captured as an object.
- **Request payload streaming** with the `string_decoder` module — accumulates `data` chunks and finalizes on `end`.
- **Router + handlers** pattern — paths are mapped to handler functions; unknown paths fall back to a `notFound` handler.
- **Handler callback contract** — handlers reply with `(statusCode, payloadObject)`; the server stringifies the payload, sets `Content-Type: application/json`, and writes the response.
- **Multi-environment configuration** (`config.js`) — selects `development`, `uat`, `staging`, or `production` settings based on the `NODE_ENV` environment variable, with sensible defaults.

#### Environments defined in `config.js`

| Environment             | HTTP port | HTTPS port |
|-------------------------|-----------|------------|
| development *(default)* | 3000      | 3001       |
| uat                     | 3002      | 3003       |
| staging                 | 3004      | 3005       |
| production              | 5000      | 5001       |

#### Running it

```bash
cd example-01
node index.js                 # development (default)
NODE_ENV=staging node index.js
```

> On Windows PowerShell:
> ```powershell
> $env:NODE_ENV="staging"; node index.js
> ```

#### Generating local HTTPS certs (one-time, before running)

The `https/` folder is gitignored. Generate a local self-signed cert and key with OpenSSL:

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 \
  -keyout example-01/https/key.pem -out example-01/https/cert.pem
```

#### Quick test

```bash
curl http://localhost:3000/sample
curl -k https://localhost:3001/sample
```

---

## Course reference

This repo is my own work as I progress through the course. The course's official structure (sections 1–8) lives in the parent course folder's readme.

---

## Notes

- No NPM packages — everything is built on Node.js core modules, by design of the course.
- Private keys, certificates, `node_modules/`, and local env files are excluded via `.gitignore`.
