# Password Vault

A secure password manager built with Next.js, React, and TypeScript.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **Environment Variables:**
   - Create a `.env.local` file and add any required secrets (e.g., database URI, JWT secret).

## Crypto Usage

This project uses Node.js's built-in `crypto` module for password hashing and encryption.  
It was chosen for its reliability, security, and native support in Node.js, ensuring strong cryptographic operations without external dependencies.

## Features

- User authentication
- Secure password storage
- Password generator
- Responsive UI

---
