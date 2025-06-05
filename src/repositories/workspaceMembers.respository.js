import WorkspaceMember from "../models/WorkspaceMembers.model.js";

class WorkspaceMembersRepository {
    async create({ worspace_id, user_id, role, created_at}) {
        try {
            const workspaceMember = new WorkspaceMember({
            worspace_id,
            user_id,
            role,
            created_at
        })

        await workspaceMember.save()
        console.log("miembrows agregados exitosamente al worspace")
        }
        catch(error){
            console.log("algo anda mal, mi rey")
        }
    }
}

const workspaceMembersRepository = new WorkspaceMembersRepository()
export default workspaceMembersRepository