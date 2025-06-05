import mongoose from "mongoose";

const ChannelMessageSchema = new mongoose.Schema({
    member_channel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ChannelMembers',
    },
    channel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'channel',
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