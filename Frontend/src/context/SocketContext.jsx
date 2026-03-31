import React from 'react';
import { io } from 'socket.io-client';
import { useNotification } from './NotificationContext';

const SocketContext = React.createContext();

export const useSocket = () => React.useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = React.useState(null);
  const [lastUpdate, setLastUpdate] = React.useState(Date.now());
  const { notify } = useNotification();

  React.useEffect(() => {
    // Replace with your production domain if needed
    const socketInstance = io('http://localhost:8080', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    socketInstance.on('connect', () => {
      console.log('🔗 Connected to Real-time Update Server');
    });

    socketInstance.off('content-update').on('content-update', (data) => {
      console.log('🔔 Content update received:', data);
      setLastUpdate(Date.now());
      // Removed toast notification for standard content updates (e.g. view count increments) to prevent visual spam
    });

    socketInstance.off('newMessage').on('newMessage', (data) => {
      notify(`New message from ${data.sender || 'Portfolio Viewer'}`, {
        toastId: data._id, // Prevents duplicates
      });
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Disconnected from Real-time Update Server');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, lastUpdate }}>
      {children}
    </SocketContext.Provider>
  );
};
