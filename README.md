# React Native ToDoList

A simple React Native to-do list app with support for adding, editing, deleting, completing tasks and toggling between day/night modes.

---
## Project Structure
├── App.js
├── package.json
└── src
└── ToDoItem.jsx
- **App.js**  
  The main entry point. Contains the task list, modal for add/edit, day/night mode toggle and core logic.  
- **src/ToDoItem.jsx**  
  A single task item component. Renders task text, completion checkbox, edit & delete buttons, and applies dynamic styling.

---

## Features

- Add new tasks  
- Edit existing tasks  
- Delete tasks with confirmation dialog  
- Toggle task completion status  
- Day / Night theme toggle  
- Input validation (no empty tasks)  
- iOS & Android support

---

## Requirements

- Node.js ≥ 14  
- Yarn or npm  
- React Native CLI  
- Xcode (iOS)  
- Android Studio (Android)

---

## Quick Start

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/your-todolist.git
   cd your-todolist

2. **Install dependencies**
   
    \# Using npm
   
    npm install
    
    \# Or using Yarn
   
    yarn install
4. **Link native dependencies (only for React Native < 0.60)**
5. 
    npx react-native link
   
7. **Run the app**
   
   ~ Android
   
   \# Start Metro bundler
   
    npx react-native start
    
   \# In another terminal
   
    npx react-native run-android
   
   
   ~ iOS
   
   \# Start Metro bundler
   
    npx react-native start
    
   \# In another terminal
   
    npx react-native run-ios

## Usage
1. Add Task
  Tap the “+” button, enter a task name, then tap Add.
2. Edit Task
  Tap the Edit button on a task, modify the text, then tap Update.
3. Delete Task
  Tap the Delete button on a task, confirm in the dialog to remove it.
4. Toggle Completion
  Tap the checkbox to mark a task complete or incomplete. Completed tasks show a strikethrough.
5. Day/Night Mode
  Use the toggle button at the top to switch between day and night themes. Styles update dynamically.

