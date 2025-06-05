import mongoose from "mongoose";
import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictonaries/availableRoles.dictonary.js";

const worspaceMembersSchema = new mongoose.Schema(

{
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true,

    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    role: {
        type: String,
        required: true,
        default: AVAILABLE_ROLES_WORKSPACE_MEMBERS.MEMBER,
        enum: Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS)//Limitamos solo a estos string
    },
    created_at: {
        type: Date,
        default: new Date()
    }
}
)

const WorkspaceMember = mongoose.model('WorkspaceMembers', worspaceMembersSchema)

export default WorkspaceMember