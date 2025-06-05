import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        workspace_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'workspace',
            required: true,
        },
        created_at:{
            type: Date,
            default: new Date()
        },
        isPrivate:{
            type: Boolean,
            required:true,
            default: false
        }
    }
)


const Channel = mongoose.model('Channel', channelSchema)
export default Channel