import mongoose from "mongoose";

const ChannelMessageSchema = new mongoose.Schema({
    channel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Channel',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    content: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default:new Date(),
    },
});
const ChannelMessage = mongoose.model('channels_messages', ChannelMessageSchema);
export default ChannelMessage;