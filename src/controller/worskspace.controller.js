import workspaceRepository from '../repositories/workspace.repository.js';

class WorkspaceController {
    async create(request, response) {
        try {
            const { name, description } = request.body
            const { id } = request.user

            await workspaceRepository.create({ name, description, owner_id: id })
            response.status(201).json(
                {
                    ok: true,
                    message: 'Workspace creado exitosamente',
                    status: 201,
                    data: {}
                }
            )

        }
        catch (error) {
            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
                return
            } else {
                console.log('Hubo un error', error)
                response.status(500).json(
                    {
                        message: 'Error interno del servidor',
                        ok: false
                    }
                )
            }
        }

    }
    async getAll(request, response) {
        response.send()
    }
    async deleteWorkspace(request, response) {
        try {
            const workspace_id = request.params.workspace_id
            const user_id = request.user.id
            const workspace = await workspaceRepository.getAll(user_id)
            const workspaceToDelete = workspace.find(workspace => workspace._id.toString() === workspace_id)

            if (!workspaceToDelete) {
                response.status(404).json(
                    {
                        ok: false,
                        message: "workspace no encontrado",
                        status: 404
                    }
                )
                return
            }
            if (workspaceToDelete.owner_id.toString() !== user_id) {
                response.status(404).json(
                    {
                        ok: false,
                        message: "No eres quien para borrar este workspace",
                        status: 403
                    }
                )
                return
            }

            await workspaceRepository.deleteWorkspace(workspace_id)

            response.status(200).json(
                {
                    ok: true,
                    message: 'Workspace eliminado correctamente',
                    status: 200,
                    data: {}
                }
            )
            return
        } catch (error) {
            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
                return
            } else {
                console.error('Hubo un error', error)
                response.status(500).json(
                    {
                        message: 'Error interno del servidor',
                        ok: false
                    }
                )
            }
        };
    }
}
const workspaceController = new WorkspaceController()
export default workspaceController