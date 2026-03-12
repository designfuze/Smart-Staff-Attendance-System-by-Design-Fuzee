#  Junior New Delhi Public School (JNDPS) - Attendance System

![JNDPS Logo](images/logo.png)

A modern, fast, and intelligent staff attendance management system built for Junior New Delhi Public School. Features AI-powered face verification, live GPS geofencing, and real-time administrative monitoring, wrapped in a sleek, premium Apple-inspired Glassmorphism UI.

## ✨ Key Features

- **🔐 Secure Firebase Authentication:** Email & password-based login for staff and administrators.
- **🤖 AI Face Verification:** Prevents proxy attendance with robust on-device face matching using `face-api.js`.
- **📍 Live GPS Tracking & Geofencing:** Ensures staff can only mark attendance when physically present inside the school premises.
- **📊 Real-Time Admin Dashboard:** Monitor live staff presence, absence, and late arrivals seamlessly.
- **🗺️ Interactive Map:** Admin view displaying real-time geographic plots of staff check-ins.
- **📱 PWA Ready (Progressive Web App):** Installable on Android/iOS natively with offline capabilities via Service Workers.
- **📄 Excel Data Export:** One-click automated Excel timesheet generation for entire staff rosters.
- **🎨 Premium UI/UX:** Built with Tailwind CSS and powered by smooth GSAP micro-animations.

---

## 🚀 Tech Stack

- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript (ES6 Modules)
- **Backend & Database:** Firebase Authentication, Firestore (NoSQL), Firebase Storage
- **AI / Computer Vision:** Face-api.js
- **Animations:** GSAP (GreenSock)
- **Maps:** Google Maps API
- **Data Export:** SheetJS (xlsx)
- **Deployment:** Vercel 

---

## 🛠️ Local Development Setup

To run this application locally, you'll need the following:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/jndps-attendance-system.git
cd jndps-attendance-system
```

### 2. Configure Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore**, **Firebase Storage**, and **Email/Password Authentication**.
3. Grab your `firebaseConfig` and place it correctly in `firebase/firebase-config.js`.

### 3. Server Setup (For Local Testing)
Because this project utilizes ES modules (`import`/`export`), it **must be run via a local web server**, not directly from the file system.
You can use Live Server (VS Code Extension), Python, or Node:

**Using Python:**
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your browser.

**Using Node (npx):**
```bash
npx serve .
```

---

## 🌐 Deployment (Vercel)

This project has been pre-configured for seamless deployment with **Vercel**. A `vercel.json` has been included to enforce clean URLs (removing `.html` extensions) and handle SPA-like routing behavior.

1. Install Vercel CLI: `npm i -g vercel`
2. Run deployment command inside the project directory:
```bash
vercel --prod
```
Or simply push your code to **GitHub** and import the repository directly via the [Vercel Dashboard](https://vercel.com/dashboard).

---

## 🗝️ Default Admin Access

You can log in to the admin panel from the primary login screen by clicking **"Switch to Admin Login"** using the configured environment variables or defaults outlined in your firebase configuration context.

---

## 🎨 Design System & UI Credits
Designed by **Design Fuze** combining dynamic interactions and a minimalist premium aesthetic focused on immediate readability. 

*Codebase maintained for JNDPS strictly compliant with local data privacy guidelines.*
