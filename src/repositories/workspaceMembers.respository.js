import WorkspaceMember from "../models/WorkspaceMembers.model.js";

class WorkspaceMembersRepository {
    async create({ workspace_id, user_id, role }) {

        const workspaceMember = new WorkspaceMember({
            workspace_id,
            user_id,
            role
        })
        await workspaceMember.save()
    }
    async getAllByWorkspaceId(workspace_id) {
        return await WorkspaceMember.find({ workspace_id: workspace_id })
    }
    async getAllByUserId(user_id) {
        const workspaces_list = await WorkspaceMember
        .find({user_id: user_id})
        .populate('workspace_id', 'name')

        const workspaces_list_formatted = workspaces_list.map((workspace_member) => {
            return{
            _id: workspace_member._id,
            user: workspace_member.user_id,
            workspace: workspace_member.workspace_id,
            role: workspace_member.role
             }
        })
        return workspaces_list_formatted
    }
    async getMemberByWorkspaceIdAndUserId (workspace_id, user_id) {
        return await WorkspaceMember.findOne({workspace_id: workspace_id, user_id: user_id });
    }
}
const workspaceMembersRepository = new WorkspaceMembersRepository()
export default workspaceMembersRepository