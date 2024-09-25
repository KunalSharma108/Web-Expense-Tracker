# Expense Tracker

This project is a web-based **Expense Tracker** application built with **React** and **Firebase**. It allows users to track their expenses and create separate sets for different categories like office and house expenses.

## Features

- **Expense Tracking**: Keep your expenses organized by creating different sets (e.g., separate office and house expenses).
- **Authentication**: Secure access using Firebase Authentication, ensuring that your data is accessible across multiple devices.
- **Realtime Updates**: Uses Firebase's Realtime Database to ensure that your expenses update instantly as you make changes.
- **Not Responsive**: The application is designed primarily for desktop use. Some components might be responsive due to Bootstrap, but overall, it is recommended to use the app on a desktop screen for a better experience.
- **Mixture of Bootstrap and Custom CSS**: Styling is a combination of Bootstrap components and custom CSS, which means some components may behave differently across devices.

## Firebase Setup

Please note that the `firebase.js` file is **not included** in the repository for security reasons. You will need to create your own `firebase.js` file in the `FrontEnd\src\templates\Assets\Auth` directory and add the following code:

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "", // Put appropriate values
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
```
Make sure to replace the placeholder values (`apiKey`, `authDomain`, etc.) with your own Firebase project's configuration.

## Important Notes

- **No Code Comments**: This project was developed without detailed comments or documentation for the code structure and functions. It might take some time to understand the code if you are unfamiliar with the project structure.
- **Firebase.js is missing**: You need to configure your own Firebase project and add the `firebase.js` file as shown above.

## How to Clone and Run the Project

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/KunalSharma108/expense-tracker.git
   ```
2. Navigate into the project directory:

   ```bash
   cd expense-tracker
   ```
3. Install the dependencies:

   ```bash
   npm install
   ```
4. Start the development server:

   ```bash
   npm start
   ```
Now you can open your browser and go to `http://localhost:3000` to view the application.
