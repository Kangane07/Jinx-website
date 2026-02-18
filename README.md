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


### Multiplayer now works without running your own server

Realtime mode now uses PeerJS cloud signaling by default, so you can tap **Play Multiplayer** and create/join lobby directly.

You only need internet on both devices. No separate backend process is required in normal usage.


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
git add index.html
git rebase --continue
git push --force-with-lease
```

Then test before merging:

```bash
python3 -m http.server 8013
# open http://localhost:8013/index.html
```

Expected checks:
- Footer stays at the bottom.
- **Play Local** opens Local Mode.
- **Play Multiplayer** opens Multiplayer Mode.


## ⚡ Zero-Setup Multiplayer (New)

Multiplayer now uses **PeerJS cloud signaling**, so you do **not** need to run your own backend server in normal usage.

How to use:
1. Open game and tap **Play Multiplayer**.
2. Host enters name → **Create Lobby** (instant code generated).
3. Friends enter name + lobby code → **Join Lobby**.
4. Use **Copy Lobby Code** or **Share Lobby** (WhatsApp-friendly) to invite quickly.

> Note: This still requires internet for cross-device multiplayer, but no custom server setup in background.
