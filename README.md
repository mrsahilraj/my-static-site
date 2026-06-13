# Simag Singh Studio (React + Vite)

Landing page + MPIN-based authentication demo:

- Register/Login using mobile number + 4-digit MPIN (MPIN is hashed, never stored in plain text)
- Session via HttpOnly cookie (JWT)
- Forgot MPIN flow via OTP verification (SMS provider is configurable; console provider included for local dev)

## Install

```bash
npm install
```

## Run (dev)

Starts the API server on `http://localhost:5175` and the Vite app on `http://localhost:5173` (or the next available port).

```bash
npm run dev
```

## OTP configuration (dev)

The default SMS provider is `console`, which logs OTPs on the server.

Optional:
- `OTP_DEBUG=true` returns the OTP in the `/api/auth/otp/request` response (use only for local development).

## Build

```bash
npm run build
```

## Start API server

```bash
npm run start
```

## Environment variables

- `AUTH_JWT_SECRET` (recommended; required in production): 32+ characters
- `PORT` (optional): API server port (default `5175`)
