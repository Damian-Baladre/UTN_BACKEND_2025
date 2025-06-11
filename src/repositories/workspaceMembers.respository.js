import WorkspaceMember from "../models/WorkspaceMembers.model.js";

class WorkspaceMembersRepository {
    async create({ workspace_id, user_id, role}) {

            const workspaceMember = new WorkspaceMember({
            workspace_id,
            user_id,
            role
        })

        await workspaceMember.save()
    }
    async getByWorkspaceId(workspace_id){
        WorkspaceMember.find({workspace_id: workspace_id})
    }
    async getAllByUserId (user_id){
        
    }

}
const workspaceMembersRepository = new WorkspaceMembersRepository()
export default workspaceMembersRepository