=== README.md ===
# Job Tracker App


A simple job application tracker built with React, Vite, Tailwind CSS and Firebase (Auth + Firestore). Deployable on Vercel.


## Setup
1. Create a Firebase project and enable Authentication (Email/Password) and Firestore.
2. Copy your Firebase config to `.env` (see `.env.example`).
3. Install dependencies: `npm install`.
4. Run dev server: `npm run dev`.


## Deployment
Connect the repository to Vercel, add environment variables, and deploy.


---


=== .env.example ===
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id


---