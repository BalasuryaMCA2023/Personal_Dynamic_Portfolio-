const mongoose = require('mongoose');
const socketUtils = require('../socket');

const watchDatabase = () => {
  const db = mongoose.connection.db;
  if (!db) {
    console.warn("⚠️ Database connection not ready for watching. Retrying in 2 seconds...");
    setTimeout(watchDatabase, 2000);
    return;
  }

  console.log("👀 Starting MongoDB Change Stream watcher...");

  // Watch the entire database
  const changeStream = db.watch();

  changeStream.on('change', (change) => {
    const collectionName = change.ns?.coll;
    if (!collectionName) return;
    
    // Ignore internal or unrelated collections
    const ignoredCollections = ['visitors', 'sessions', 'messages', 'activitylogs', 'logs'];
    if (ignoredCollections.includes(collectionName.toLowerCase())) return;

    try {
      const io = socketUtils.getIo();
      io.emit('content-update', {
        collection: collectionName,
        operation: change.operationType,
        timestamp: new Date()
      });
      // console.log(`🚀 Emitted real-time update for: ${change.ns.coll}`);
    } catch (err) {
      // Socket not initialized yet or other error
    }
  });

  changeStream.on('error', (error) => {
    console.error("❌ Change Stream Error:", error);
    // Attempt to restart watcher after a delay
    setTimeout(watchDatabase, 5000);
  });
};

module.exports = watchDatabase;
