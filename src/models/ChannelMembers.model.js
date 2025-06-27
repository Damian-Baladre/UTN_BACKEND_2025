import mongoose from "mongoose";

const channelMembersSchema = new mongoose.Schema(
    {
        member_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        channel_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
            required: true,

        },
        created_at:{
            type: Date,
            default: new Date()

        },
    }
)

const ChannelMembers = mongoose.model('ChannelMembers', channelMembersSchema)

export default ChannelMembers