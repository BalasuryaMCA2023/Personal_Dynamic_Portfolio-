const socketIo = require('socket.io');

let io;

module.exports = {
  init: (httpServer) => {
    io = socketIo(httpServer, {
      cors: {
        origin: ['https://personal-dynamic-portfolio-frontend.onrender.com'],
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    io.on('connection', (socket) => {
      // console.log('✅ New client connected for real-time updates');
      
      socket.on('disconnect', () => {
        // console.log('❌ Client disconnected from real-time updates');
      });
    });

    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  }
};
