# Dev Setup Instructions (For New Devices)

Follow these steps to set up the **Arc Blueprint Tracker** development environment on a new computer.

## 1. Prerequisites
- Install [Node.js](https://nodejs.org/) (Version 16+)
- Install [Git](https://git-scm.com/)

## 2. Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/COLDDOORNOB/ArcBlueprintTracker.git
cd ArcBlueprintTracker
```

## 3. Configure Environment Variables
We use environment variables for Firebase security. These are **not** stored on GitHub.
1. Create a file named `.env` in the root directory.
2. Refer to `.env.example` in the project root.
3. Fill in your Firebase configuration keys (found in the Firebase Console under Project Settings).

## 4. Install & Run
```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

## 5. Working with Antigravity
I have indexed this codebase. When you open this project on a new device, I will automatically understand all the custom logic we've built (Cloud Sync, Filtering, UI details). 

Just ask me to "Check the README and Needs Fixing section" to pick up where we left off!
