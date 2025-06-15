import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket as WSWebSocket } from 'ws';
import { parse } from 'url';
import cors from 'cors';

const app = express();
app.use(cors());
const server = createServer(app);
const wss = new WebSocketServer({ server });

interface RoomMap {
  [roomId: string]: Set<WSWebSocket>;
}

const rooms: RoomMap = {};

// client가 서버에 WebSocket 연결을 맺음
wss.on('connection', (ws, req) => {
  // parse를 통해 query 값을 받아옴
  const { query } = parse(req.url || '', true);
  const roomId = query.room as string;

  if (!roomId) {
    ws.close();
    return;
  }

  // 해당 room이 존재하지 않으면 새로 만들고, 현재 연결된 클라이언트를 추가
  rooms[roomId] = rooms[roomId] || new Set();
  rooms[roomId].add(ws);

  // 메세지를 받았을 때, 같은 room에 있는 다른 clients에게만 메시지를 Broadcast
  // 자신한테는 보내지 않도록 client !== ws 조건을 추가
  // client.readyState === ws.OPEN 조건을 추가하여 연결이 열린 상태인 client에게만 메시지를 전달
  ws.on('message', (message) => {
    rooms[roomId].forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // WebSocket이 닫혔을 경우 room에 있는 clients를 내보냄
  ws.on('close', () => {
    rooms[roomId].delete(ws);
  });
});

// rooms의 목록을 보여주기 위해 rooms Object에 keys를 추출
app.get('/rooms', (req, res) => {
  res.json(Object.keys(rooms));
});

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
