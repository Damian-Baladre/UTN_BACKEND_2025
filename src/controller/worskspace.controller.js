import workspaceRepository from '../repositories/workspace.repository.js';
import workspaceMembersRepository from '../repositories/workspaceMembers.respository.js'
import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from '../dictonaries/availableRoles.dictonary.js';

class WorkspaceController {
    async create(request, response) {
        try {
            const { name, description } = request.body
            const { id } = request.user

            const workspace_created = await workspaceRepository.create({ name, description, owner_id: id })
            await workspaceMembersRepository.create({
                workspace_id: workspace_created._id,
                user_id: id,
                role: AVAILABLE_ROLES_WORKSPACE_MEMBERS.ADMIN
            })
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
    async getAllByMember(request, response) {
        const { id } = request.user
        const workspaces = await workspaceMembersRepository.getAllByUserId(id)
        response.json({
            ok: true,
            status: 200,
            message: 'Lista de Workspaces',
            data: {
                workspaces: workspaces
            }
        })
    }
    async delete(request, response) {
        try {
            const workspace_id = request.params.workspace_id
            const user_id = request.user.id
            await workspaceRepository.deleteWorkspaceFromOwner(user_id, workspace_id)

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