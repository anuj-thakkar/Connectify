const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const ConversationSchema = new Schema({
    recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    lastMessage: {
        type: String,
    },

    messagess: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
    }],

    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model(
    'Conversation',
    ConversationSchema
);