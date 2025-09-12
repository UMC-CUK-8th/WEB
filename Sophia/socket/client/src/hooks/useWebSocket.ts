import { useEffect, useRef, useState } from 'react';

export const WebSocketStatus = {
  CONNECTING: 'CONNECTING',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RECONNECTING: 'RECONNECTING',
} as const;

// "CONNECTING" | "OPEN" | "CLOSED" | "RECONNECTING"
// 객체의 key에 해당하는 값들을 유니언 타입으로 정의
export type WebSocketStatus = (typeof WebSocketStatus)[keyof typeof WebSocketStatus];

// 훅이 반환하는 객체의 구조
export interface WebSocketHook {
  lastMessage: string | null;
  status: WebSocketStatus;
  sendMessage: (message: string) => void;
}

// 사용자가 전달할 수 있는 옵션들
export interface WebSocketOptions {
  maxReconnectAttempts?: number; //최대 재연결 시도 횟수
  reconnectDelay?: (attempt: number) => number; //시도 횟수 기반 딜레이 함수 (재연결 딜레이 계산 함수)
  onOpen?: () => void; //연결 성공 시 콜백
  onMessage?: (message: string) => void; //메세지 수신 시 콜백
  onClose?: (event: CloseEvent) => void; //연결 종료 시 콜백
  onError?: (error: Event) => void; //오류 발생 시 콜백
}

export const useWebSocket = (url: string, { maxReconnectAttempts = 5, reconnectDelay = (attempt) => Math.min(5000, Math.pow(2, attempt) * 1000), onOpen, onMessage, onClose, onError }: WebSocketOptions): WebSocketHook => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  // 현재 웹소켓 상태
  const [status, setStatus] = useState<WebSocketStatus>(WebSocketStatus.CONNECTING);

  // 컴포넌트 리렌더링과 무관하게 유지되는 값을 저장하는 데 사용
  // WebSocket 인스턴스를 저장하는 ref 객체
  const wsRef = useRef<WebSocket | null>(null);
  // 재연결 시도 횟수
  const reconnectAttempts = useRef<number>(0);

  // WebSocket 연결 및 이벤트 핸들러 설정
  const connectWebSocket = () => {
    setStatus(WebSocketStatus.CONNECTING);
    const ws = new WebSocket(url);
    wsRef.current = ws;

    // 연결 성공
    ws.onopen = () => {
      setStatus(WebSocketStatus.OPEN);

      reconnectAttempts.current = 0;
      onOpen?.(); // 사용자가 정의한 콜백 호출
    };

    // 메시지 수신
    ws.onmessage = (event) => {
      setLastMessage(event.data);
      onMessage?.(event.data); // 사용자가 정의한 콜백 호출
    };

    // 에러 발생
    ws.onerror = (error) => {
      onError?.(error);
    };

    // 연결 종료
    ws.onclose = (event) => {
      setStatus(WebSocketStatus.CLOSED);
      onClose?.(event);

      // 재연결 시도 조건 확인
      // 최대 재연결 획수를 초과하지 않으면 setTimeout으로 재연결 시도
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1; // 시도 횟수 증가
        setStatus(WebSocketStatus.RECONNECTING);

        // 재연결 예약
        setTimeout(connectWebSocket, reconnectDelay(reconnectAttempts.current));
      }
    };
  };

  // 메시지 전송 함수
  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message); // 연결이 오픈될때만 전송
    } else {
      console.warn('WebSocket is not open. Cannot send message.'); // 경고
    }
  };

  useEffect(() => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      connectWebSocket(); // 컴포넌트가 마운트될 때 WebSocket 연결
    }

    return () => {
      wsRef.current?.close(); // unmount 시 WebSocket 연결 종료
    };
  }, [url]); // url이 변경될 경우 리렌더링

  return {
    lastMessage,
    status,
    sendMessage,
  };
};
