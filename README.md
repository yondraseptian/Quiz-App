# 🧩 Quiz Application

A dynamic, interactive frontend application built to test users on various topics using JSON-formatted question sets.

This project is part of the [roadmap.sh](https://roadmap.sh/projects/quiz-app) project ideas to practice advanced state management, component lifecycles, timers, and interactive UI feedback.

---

## 🎯 Features & Requirements

- **🚀 Welcome Screen:** Displays initial quiz details and a "Start" button to begin the session.
- **🃏 Card-Based Questions:** Questions are presented sequentially inside card components with answer choices as interactive buttons.
- **🎨 Visual Feedback:**
  - Selecting an answer turns the button **Green** (correct) or **Red** (incorrect).
  - Automatically highlights the correct answer if an incorrect option is chosen.
  - Disables options once an answer is selected to prevent re-selection.
- **📈 Real-Time Scoring:** Increments the user's score for every correct response.
- **⏱️ Optional Question Timer (1 Minute):**
  - Displays a 60-second countdown timer for each question.
  - If the timer reaches zero before an attempt is made, the app skips to the next question and **decrements the score by 1**.
- **📊 Final Score Breakdown:** Summarizes total score and provides a complete review of all questions and answers upon completion.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React (Vite) / Vue / Angular
- **State Management:** Zustand / React Context & `useReducer` / Pinia / NgRx
- **Language:** TypeScript
- **Styling:** Tailwind CSS / CSS Modules / Styled Components

---

## 📋 JSON Schema Specification

The quiz questions are loaded dynamically from a JSON file. Below is the expected format for each question object:

```json
[
  {
    "id": 1,
    "question": "What is the primary role of a state management library in frontend frameworks?",
    "options": [
      "To style UI components dynamically",
      "To manage and synchronize application state across components",
      "To optimize database queries",
      "To compile JavaScript into WebAssembly"
    ],
    "correctAnswer": "To manage and synchronize application state across components"
  }
]