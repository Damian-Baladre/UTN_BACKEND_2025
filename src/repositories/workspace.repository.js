import Workspace from "../models/Worspace.model.js";

class WorkspaceRepository {

    async create({ name, owner_id, description }) {
        try {
            const workspace = new Workspace({
                name,
                owner_id,
                description,
            });
            await workspace.save()
            console.log("Worspace creado exitosamente")
            return workspace
        }
        catch (error) {
            console.error("oh no! ocurrio un error");
            throw error;
        }
    }
    async getAll(owner_id) {
        try {
            const workspaces = await Workspace.find({ owner_id: owner_id })
            return workspaces
        } catch (error) {
            console.error('ocurrio un error al obtener el workspace', error);
            throw error
        }
    }
    async deleteWorkspaceFromOwner(owner_id, workspace_id) {
        const result = await Workspace.findOneAndDelete({ owner_id, _id: workspace_id })
        if (!result) {
            throw {
                status: 404,
                message: 'el workspace a eliminar no existe'
            }
        }
    }
    async deleteById(workspace_id) {
        return await Workspace.findOneAndDelete({ _id: workspace_id })
    }
    async getById(workspace_id){
        return await Workspace.findById(workspace_id)
    }
}

const workspaceRepository = new WorkspaceRepository()
export default workspaceRepository