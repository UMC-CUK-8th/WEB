import { useEffect, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

interface ChatMessage {
  sender: string;
  text: string;
}

interface ChatRoomProps {
  room: string; // 참여할 방 이름
  nickname: string; // 사용자 닉네임
  onBack: () => void; // 방 나가기 콜백
}

export default function ChatRoom({ room, nickname, onBack }: ChatRoomProps) {
  const [input, setInput] = useState('');
  // 대화 내용
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { lastMessage, sendMessage, status } = useWebSocket(`ws://localhost:3001?room=${room}`, {});

  const handleSend = () => {
    const message: ChatMessage = {
      sender: nickname,
      text: input.trim(),
    };

    sendMessage(JSON.stringify(message));
    setMessages((prev) => [...prev, message]);
    setInput('');
  };

  useEffect(() => {
    // 새로운 메시지가 있을 경우
    if (lastMessage) {
      try {
        const message: ChatMessage = JSON.parse(lastMessage);

        if (message.sender !== nickname) {
          setMessages((prev) => [...prev, message]);
        }
      } catch {
        console.error('Failed to parse message', lastMessage);
      }
    }
  }, [lastMessage, nickname]);

  return (
    <div>
      <button onClick={onBack}>채팅방 나가기</button>
      <h2>방 이름: {room}</h2>
      <p>연결 상태: {status}</p>

      {status !== 'OPEN' ? (
        <p>채팅방 연결중입니다...</p>
      ) : (
        <div
          style={{
            border: '1px solid #ccc',
            height: '300px',
            overflow: 'scroll',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {messages.map((message, index) => {
            const isMine = message.sender === nickname;
            return (
              <div
                key={index}
                style={{
                  alignSelf: isMine ? 'flex-end' : 'flex-start',
                  backgroundColor: isMine ? '#d1ffd1' : '#f1f1f1',
                  color: isMine ? '#333' : '#000',
                  padding: '8px 12px',
                  borderRadius: ' 8px',
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                }}
              >
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    marginBottom: 4,
                  }}
                >
                  {message.sender}
                </div>
                <div>{message.text}</div>
              </div>
            );
          })}
        </div>
      )}

      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder='메시지 입력' />
      <button onClick={handleSend}>채팅 보내기</button>
    </div>
  );
}
