import Workspace from "../models/Worspace.model.js";

class WorkspaceRepository {

    async create({ name, owner_id, description, created_at}) {
        try {
            const workspace = new Workspace({
                name,
                owner_id,
                description,
                created_at
            });
            await workspace.save()
            console.log("Worspace creado exitosamente");
        }
        catch(error){
            console.error("oh no! ocurrio un error")
        }
    }
}

const workspaceRepository = new WorkspaceRepository()

export default workspaceRepository