[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

# 🎮 Jinx

Hi, I’m **Omkar** — a passionate creator who enjoys building unique projects and fun experiences.  
I love experimenting with ideas, mixing creativity with logic, and turning simple concepts into engaging products.

Jinx reflects my interest in **game mechanics, human interaction, and suspense-driven gameplay**.

---

## 🧠 About Jinx

**Jinx** is an offline multiplayer party game designed to create **suspense, drama, and laughter** among friends.  
It is played on a **single device**, making it perfect for group gatherings without the need for an internet connection.

The core fun of Jinx lies in **not knowing why you were chosen** — and whether the truth will be revealed.

---

## 🎯 Game Mechanics

- All players sit in a circle and pass the device on their turn  
- A random player is selected to begin  
- The chosen player secretly reads a question (nice or mean)  
- They announce a player’s name **without revealing the question**  
- A coin toss decides the outcome:
  - **Heads** →  The question is revealed, leading to fun and dramatic reactions.
  - **Tails** → The question remains a mystery.

---

## ✨ Key Features

- 🎲 **Offline Multiplayer** – No internet required  
- 🪙 **Coin Toss Mechanic** – Builds suspense every round  
- 📱 **Single Device Gameplay** – Easy and accessible  
- 🕵️ **Easter Egg** –  
  Add **OMKAR** (in all caps) as a participant to unlock a hidden message  

---

## ▶️ How to Play

1. Gather your friends in a circle  
2. Pass the device to take turns  
3. Read, choose, toss, and react  
4. Enjoy the suspense, drama, and laughter  

---

## 🎓 Project Context

Jinx was developed as a **college project** to explore:
- Game logic and flow
- User engagement through suspense
- Offline multiplayer interaction

---

## 👤 Developer

**Omkar Kangane**  
Creator of Jinx 🎮  

📩 Contact Developer:  
Instagram — **@om_kangane07**

---

## 📄 License

This project is licensed under the **MIT License**.


---

## 🌐 Realtime Multiplayer (Beta)

Jinx now includes an experimental **realtime multiplayer mode** for cross-device play:

- One player creates a lobby and shares a 6-character code
- Friends join from their own devices using the code
- Turns, questions, and coin results stay synced for everyone

### Run it locally

```bash
npm install
npm start
```

Then open:
- `http://localhost:3000/index.html` (main menu with both Local and Multiplayer modes)


## 🧭 Main Menu

The game now starts with a main menu where players choose:
- **Local Mode** (single device pass-and-play)
- **Multiplayer Mode** (host lobby + friends join by code)


### Why do I see “Realtime server not available”?

Realtime mode needs a running backend server. If no server is running, you can still play immediately using **Local Mode** from the main menu.

For mobile/cross-device play, easiest setup:
1. Deploy `server.js` to a simple Node host (Render/Railway/Glitch).
2. Open the same `index.html` on phones.
3. In Multiplayer Mode, set **Realtime Server URL** to your deployed backend URL.
4. Host creates lobby code, others join with code.
