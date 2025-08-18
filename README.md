# 💸 Expenses App

A **React Native** application built with **TypeScript** and **Expo** for managing daily expenses. Users can add, edit, delete, and view expenses, along with a total expense summary. The app uses **Firebase** for backend data storage and supports **bottom tab navigation** for easy access.

## 📽️ Demo

<img src="./assets/screen-record.gif" alt="App Demo" width="300"/>

## 🚀 Features

- Add new expenses
- View list of all expenses
- Edit or delete existing expenses
- View total sum of expenses
- Firebase integration for real-time data storage
- Bottom tab navigation for user-friendly navigation

## 🛠️ Tech Stack

- **React Native (via Expo)**
- **TypeScript**
- **React Navigation** (Stack & Bottom tab)
- **Firebase**
- **Axios**
- **Date Picker(@react-native-community/datetimepicker)**

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/meytirm/meal-app.git
   cd expenses-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the app:**
   ```bash
   npm start
   ```

## 🗂️ Project Structure

```
.
├── App.tsx                   # Entry point, navigation setup
├── assets/                   # Images, icons, etc.
├── components/               # Reusable UI components
├── constants/                # App-wide constants
├── hooks/                    # Custom React hooks
├── navigation/               # Navigation configuration (bottom tabs)
├── screens/                  # All app screens
├── service/                  # API and Firebase logic
├── store/                    # Global state management (Context API)
├── types/                    # Type definitions
├── utils/                    # Utility functions
└── ...

```

## 📄 License

MIT
