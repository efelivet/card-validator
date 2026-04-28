# Card Validator (Luhn Algorithm)
A full-stack application built to validate credit card numbers using the standard Luhn Algorithm (Mod 10 Check). This project demonstrates a clean separation of concerns between a React/TypeScript frontend and an Express/Node.js backend.

# Features
Real-time Formatting: Automatically groups digits by 4s for better user experience.

Smart Validation: Distinguishes between simple length errors (client-side) and mathematical checksum failures (server-side).

Strict Typing: Built entirely with TypeScript for robust error handling and code quality.

Security Conscious: Uses environment variables for configuration and ignores sensitive files via .gitignore.

# Tech Stack
Frontend: React, TypeScript, CSS3

Backend: Node.js, Express, TypeScript, Nodemon, ts-node

Utilities: Luhn Algorithm implementation, CORS, Dotenv