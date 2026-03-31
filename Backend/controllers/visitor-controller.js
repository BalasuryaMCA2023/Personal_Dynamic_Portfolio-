const Visitor = require('../models/visitor.model');

exports.trackVisitor = async (req, res) => {
    try {
        const { sessionId, metadata } = req.body;

        if (!sessionId) {
            return res.status(400).json({ message: 'Session ID is required' });
        }

        // Atomic update or create
        await Visitor.findOneAndUpdate(
            { sessionId },
            {
                $set: { visitTime: Date.now(), metadata: metadata || {} }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json({ message: 'Visitor tracked successfully' });
    } catch (error) {
        console.error('Error tracking visitor:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getStats = async (req, res) => {
    try {
        const count = await Visitor.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error fetching visitor stats:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
