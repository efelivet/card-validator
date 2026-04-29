🛠 Validation Architecture The application distributes validation logic between the client and the server to balance high-performance User Experience (UX) with rigorous data integrity.
1. Frontend:
 The UX Layer (Sanitization & Constraint)The frontend acts as the first line of defense, focusing on immediate feedback:Input Masking: Implements a Regular Expression (/\D/g) to strip non-digit characters in real-time.Visual Formatting: Automatically groups digits into blocks of four for better readability.Pre-flight Sanitization: Before the API call, the system strips all whitespace, sending only the raw numeric string (13–19 digits) to the backend to minimize processing overhead.

 2. Backend: The Source of Truth (Mathematical Validation)The backend serves as the final authority for data authenticity:The Mod-10 Check: Implements the computational logic to double every second digit and calculate the checksum.Integrity: Validation is only granted if $TotalSum \pmod{10} = 0$.Security: Centralizing logic on the server prevents client-side bypass and ensures consistent results across any interface.

 3. Quality Assurance & Automated TestingTo ensure the reliability of the core algorithm, this project utilizes a comprehensive Unit Testing Suite powered by Jest. This approach guarantees that the mathematical "Source of Truth" remains accurate across different edge cases.Positive Validation: Confirms that standard card patterns (Visa, Mastercard, etc.) correctly return a valid: true status.Negative Validation: Ensures that "near-miss" numbers (e.g., a card with a single digit typo) are correctly identified as invalid.Input Sanitization: Verifies that the backend correctly handles edge cases like empty strings or non-numeric characters.

Tech StackFrontend: React, TypeScript, CSS3Backend: Node.js, Express, TypeScript, CorsTesting: Jest, ts-jestDeployment: Render (Web Service & Static Site)

⚙️ Installation & Setup

1. Clone the repositoryBashgit clone <your-repo-url>
cd card-validator
2. Setup BackendBashcd backend
npm install
npm run test  # Run unit tests
npm run dev   # Start development server
3. Setup FrontendBashcd ../frontend
npm install
npm run dev
📂 Project StructurePlaintext/card-validator (Root)
├── README.md       
├── frontend/        # React + Vite application
└── backend/         # Express API + Jest Test Suite