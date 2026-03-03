[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

# 🎮 Jinx


## 🌐 Live Demo

Play Jinx online here:  
**https://jinx-website.onrender.com/**

> Multiplayer works across devices from this link.

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
@@ -79,55 +87,55 @@ This project is licensed under the **MIT License**.

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

### Multiplayer hosting note
Realtime mode is server-backed in this version, so multiplayer works when this app is running on a live Node server (for example: Render/Railway).
Use the live URL above to create/join lobbies across devices.


## 🔀 Merge Conflicts (Current vs Incoming) — What to choose

If GitHub asks **Current** vs **Incoming** for `index.html`:

- **Current** = code already in `main`.
- **Incoming** = code from your PR branch.

For the button/footer fixes, prefer **Incoming** for conflict chunks that include:
- `footer { position: fixed ... pointer-events ... }`
- `id="play-local-btn"` and `id="play-multi-btn"`
- JS listeners around `showLocalMode()` / `showMultiplayerMode()`

### Why it can look "same as before" after merge
This usually happens when conflict blocks were resolved with the wrong side in one chunk, so old behavior comes back.

### Safer method (recommended)
Resolve conflicts locally (not in GitHub UI):

```bash
git fetch origin
git checkout <your-branch>
git rebase origin/main
# resolve conflicts in editor, keep the correct mixed result
