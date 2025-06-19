import workspaceRepository from "../repositories/workspace.repository.js";
import workspaceMembersRepository from "../repositories/workspaceMembers.respository.js";

const workspaceMiddleware = async (req, res, next) => {

    const workspace_id = req.params.workspace_id;
    const userId = req.user.id;
       
    try {
        const workspace = await workspaceRepository.getById(workspace_id);
        console.log("workspaces_ID1", workspace)
        if (!workspace) {
            throw { status: 404, message: 'Workspace not found' };
        }

        const member = await workspaceMembersRepository.getMemberByWorkspaceIdAndUserId(workspace_id, userId);
        console.log("member", member)
        if (!member) {
            throw { status: 403, message: 'You are not a member of this workspace' };
        }

        req.workspace = workspace;
        next();
    } catch (error) {
        console.log('Error en el catch:', error)
    if (error.status) {
        res.status(error.status).json({ message: error.message, status: error.status, ok: false });
    } else {
        res.status(500).json({ message: 'Internal Server Error', status: 500, ok: false });
    }
}
}

export default workspaceMiddleware