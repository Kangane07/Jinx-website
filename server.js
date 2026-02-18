const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const PORT = process.env.PORT || 3000;

const questions = [
  'Who would survive the longest in a zombie apocalypse?',
  'Who has the best smile?',
  'Who is most likely to show up late to their own wedding?',
  'Who is the funniest person here?',
  'Who is most likely to start a dramatic rumor by accident?',
  'Who is most likely to brighten your day?',
  'Who is most likely to forget where they parked?',
  'Who has the kindest heart?',
  'Who is most likely to send a text to the wrong person?',
  'Who has the most contagious laugh?',
  'Who is the biggest drama magnet?',
  'Who is the best storyteller?',
  'Who would panic first in an escape room?',
  'Who is the most creative person here?',
  'Who spends the longest getting ready?',
  'Who gives the best advice?',
  'Who is most likely to laugh at the wrong moment?',
  'Who is the most adventurous in the group?',
  'Who is most likely to go viral for something random?',
  'Who is the most reliable in a crisis?'
];

const lobbies = new Map();

function randomId(length = 16) {
  return Math.random().toString(36).slice(2, 2 + length);
}

app.use(express.static(path.join(__dirname)));

app.get('/health', (_req, res) => {
  res.json({ ok: true, lobbies: lobbies.size });
});

function randomCode(length = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < length; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function createUniqueLobbyCode() {
  let code;
  do {
    code = randomCode();
  } while (lobbies.has(code));
  return code;
}

function lobbyStateForClient(lobby) {
  const turnPlayer = lobby.players[lobby.turnIndex] || null;
  return {
    code: lobby.code,
    hostId: lobby.hostId,
    players: lobby.players,
    started: lobby.started,
    turnIndex: lobby.turnIndex,
    round: lobby.round,
    turnPlayer,
    questionAsked: lobby.questionAsked,
    currentQuestion: lobby.currentQuestion,
    coinResult: lobby.coinResult,
    questionVisible: lobby.questionVisible
  };
}

function findPlayerByKey(lobby, playerKey) {
  return lobby.players.find((player) => player.key === playerKey);
}

function broadcastLobby(code) {
  const lobby = lobbies.get(code);
  if (!lobby) return;
  io.to(code).emit('lobby_state', lobbyStateForClient(lobby));
}

function advanceTurn(lobby) {
  if (!lobby.players.length) return;
  lobby.turnIndex = (lobby.turnIndex + 1) % lobby.players.length;
  if (lobby.turnIndex === 0) {
    lobby.round += 1;
  }
  lobby.currentQuestion = '';
  lobby.questionAsked = false;
  lobby.coinResult = '';
  lobby.questionVisible = false;
}

function removePlayerFromLobby(socketId, code) {
  const lobby = lobbies.get(code);
  if (!lobby) return;

  const playerIndex = lobby.players.findIndex((p) => p.id === socketId);
  if (playerIndex === -1) return;

  lobby.players.splice(playerIndex, 1);

  if (!lobby.players.length) {
    lobbies.delete(code);
    return;
  }

  if (lobby.hostId === socketId) {
    lobby.hostId = lobby.players[0].id;
  }

  if (lobby.turnIndex >= lobby.players.length) {
    lobby.turnIndex = 0;
  }

  broadcastLobby(code);
}

function removePlayerById(code, targetId) {
  const lobby = lobbies.get(code);
  if (!lobby) return;

  const target = lobby.players.find((player) => player.id === targetId);
  if (!target) return;

  const targetSocket = io.sockets.sockets.get(targetId);
  if (targetSocket) {
    targetSocket.leave(code);
    targetSocket.data.lobbyCode = null;
  }

  removePlayerFromLobby(targetId, code);
  io.to(targetId).emit('player_removed', { targetId });
}

io.on('connection', (socket) => {
  socket.on('create_lobby', ({ name }, callback) => {
    const cleanName = String(name || '').trim().slice(0, 20);
    if (!cleanName) {
      callback({ ok: false, error: 'Enter a valid player name.' });
      return;
    }

    const code = createUniqueLobbyCode();
    const lobby = {
      code,
      hostId: socket.id,
      players: [{ id: socket.id, key: randomId(), name: cleanName }],
      started: false,
      turnIndex: 0,
      round: 1,
      questionAsked: false,
      currentQuestion: '',
      coinResult: '',
      questionVisible: false,
      lastQuestion: ''
    };

    lobbies.set(code, lobby);
    socket.join(code);
    socket.data.lobbyCode = code;

    callback({ ok: true, code, playerKey: lobby.players[0].key, state: lobbyStateForClient(lobby) });
    broadcastLobby(code);
  });

  socket.on('join_lobby', ({ code, name }, callback) => {
    const lobbyCode = String(code || '').trim().toUpperCase();
    const cleanName = String(name || '').trim().slice(0, 20);

    const lobby = lobbies.get(lobbyCode);
    if (!lobby) {
      callback({ ok: false, error: 'Lobby not found.' });
      return;
    }

    if (lobby.started) {
      callback({ ok: false, error: 'Game already started for this lobby.' });
      return;
    }

    if (!cleanName) {
      callback({ ok: false, error: 'Enter a valid player name.' });
      return;
    }

    if (lobby.players.some((p) => p.name.toLowerCase() === cleanName.toLowerCase())) {
      callback({ ok: false, error: 'That name is already in the lobby.' });
      return;
    }

    const player = { id: socket.id, key: randomId(), name: cleanName };
    lobby.players.push(player);
    socket.join(lobbyCode);
    socket.data.lobbyCode = lobbyCode;

    callback({ ok: true, code: lobbyCode, playerKey: player.key, state: lobbyStateForClient(lobby) });
    broadcastLobby(lobbyCode);
  });

  socket.on('reconnect_lobby', ({ code, playerKey }, callback) => {
    const lobbyCode = String(code || '').trim().toUpperCase();
    const cleanKey = String(playerKey || '').trim();

    const lobby = lobbies.get(lobbyCode);
    if (!lobby || !cleanKey) {
      callback({ ok: false, error: 'Lobby session not found.' });
      return;
    }

    const player = findPlayerByKey(lobby, cleanKey);
    if (!player) {
      callback({ ok: false, error: 'Player session not found.' });
      return;
    }

    player.id = socket.id;
    socket.join(lobbyCode);
    socket.data.lobbyCode = lobbyCode;

    callback({ ok: true, state: lobbyStateForClient(lobby) });
    broadcastLobby(lobbyCode);
  });

  socket.on('start_game', () => {
    const code = socket.data.lobbyCode;
    const lobby = lobbies.get(code);
    if (!lobby || lobby.hostId !== socket.id || lobby.players.length < 2) {
      return;
    }

    lobby.started = true;
    lobby.turnIndex = 0;
    lobby.round = 1;
    lobby.currentQuestion = '';
    lobby.questionAsked = false;
    lobby.coinResult = '';
    lobby.questionVisible = false;
    broadcastLobby(code);
  });

  socket.on('remove_player', ({ targetId }) => {
    const code = socket.data.lobbyCode;
    const lobby = lobbies.get(code);

    if (!lobby || lobby.started || lobby.hostId !== socket.id || targetId === socket.id) {
      return;
    }

    removePlayerById(code, targetId);
  });

  socket.on('ask_question', () => {
    const code = socket.data.lobbyCode;
    const lobby = lobbies.get(code);
    if (!lobby || !lobby.started) return;

    const turnPlayer = lobby.players[lobby.turnIndex];
    if (!turnPlayer || turnPlayer.id !== socket.id || lobby.questionAsked) {
      return;
    }

    let question = questions[Math.floor(Math.random() * questions.length)];
    if (questions.length > 1) {
      while (question === lobby.lastQuestion) {
        question = questions[Math.floor(Math.random() * questions.length)];
      }
    }

    lobby.currentQuestion = question;
    lobby.lastQuestion = question;
    lobby.questionAsked = true;
    lobby.coinResult = '';
    lobby.questionVisible = false;
    broadcastLobby(code);
  });

  socket.on('flip_coin', () => {
    const code = socket.data.lobbyCode;
    const lobby = lobbies.get(code);
    if (!lobby || !lobby.started || !lobby.questionAsked || lobby.coinResult) {
      return;
    }

    const turnPlayer = lobby.players[lobby.turnIndex];
    if (!turnPlayer || turnPlayer.id !== socket.id) {
      return;
    }

    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    lobby.coinResult = result;
    lobby.questionVisible = result === 'Heads';
    broadcastLobby(code);
  });

  socket.on('next_turn', () => {
    const code = socket.data.lobbyCode;
    const lobby = lobbies.get(code);
    if (!lobby || !lobby.started || !lobby.coinResult) {
      return;
    }

    const turnPlayer = lobby.players[lobby.turnIndex];
    const canAdvance = socket.id === lobby.hostId || (turnPlayer && turnPlayer.id === socket.id);
    if (!canAdvance) return;

    advanceTurn(lobby);
    broadcastLobby(code);
  });

  socket.on('disconnect', () => {
    const code = socket.data.lobbyCode;
    if (!code) return;
    removePlayerFromLobby(socket.id, code);
  });
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Jinx realtime server running on http://localhost:${PORT}`);
});
