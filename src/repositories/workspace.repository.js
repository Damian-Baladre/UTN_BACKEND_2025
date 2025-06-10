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
    async deleteWorkspace(_id) {
        try {
            const workspaceDeleteById = await Workspace.findByIdAndDelete(_id);
            if (!workspaceDeleteById){
                throw new Error("workspace no encontrado")
            }
            return workspaceDeleteById
        } catch (error) {
            console.error('Ups! ha ocurrido un error al eliminarel workspace', error)
            throw error
        }
    }
}

const workspaceRepository = new WorkspaceRepository()
export default workspaceRepository