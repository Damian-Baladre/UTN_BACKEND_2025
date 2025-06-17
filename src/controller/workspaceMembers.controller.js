import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from '../dictonaries/availableRoles.dictonary.js'
import userRepository from '../repositories/users.repository.js'
import workspaceRepository from '../repositories/workspace.repository.js'
import workspaceMembersRepository from '../repositories/workspaceMembers.respository.js'

class WorkspaceMembersController {


    async getMembersByWorkspaceId(request, response) {
        try {
            const workspace_id = request.params.workspace_id
            const { id } = request.user;

            const workspace = await workspaceRepository.getById(workspace_id)
            if (!workspace) {
                return response.status(404).json(
                    {
                        message: 'Workspace no se encuentra'
                    }
                )
            }
            const isMember = await workspaceMembersRepository.findByWorkspaceAndUser(workspace_id, id)
            if (!isMember) {
                return response.status(403).json(
                    {
                        message: 'No tienes permiso para hacer esto'
                    }
                )
            }
            const members = await workspaceMembersRepository.getAllByWorkspaceId(workspace_id)
            {
                return response.status(200).json(
                    {
                        ok: true,
                        message: 'Workspace eliminado correctamente',
                        status: 200,
                        data: members
                    }
                )
            }
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

    async add(request, response) {
        try {
            console.log('Request Body:', request.body);
            const { id } = request.user
            const { workspace_id } = request.params
            const { role, email } = request.body

            if (!Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS).includes(role)) {
                throw {
                    status: 400,
                    message: 'Role is not available'
                }
            }

            const user_found = await userRepository.findByEmail({ email })

            if (!user_found) {
                throw {
                    status: 404,
                    message: 'Usuario no encontrado'
                }
            }

            const members = await workspaceMembersRepository.getAllByWorkspaceId(workspace_id)

            if (members.find(member => {
                return member.user_id.equals(user_found._id)
            })) {
                throw {
                    message: 'El usuario ya es miembro de este workspace',
                    status: 400
                }
            }

            const workspace_found = await workspaceRepository.getById(workspace_id)

            if (!workspace_found) {
                throw {
                    status: 404,
                    message: "workspace no existe"
                }
            }
            if (!workspace_found.owner_id.equals(id)) {
                throw {
                    status: 403,
                    message: "No puede hacer esta accion, no eres el duenio del workspace"
                }
            }

            await workspaceMembersRepository.create({
                user_id: id,
                workspace_id: workspace_id,
                role: role
            })
            response.status(201).json(
                {
                    ok: true,
                    message: 'Miembro agreado con exito al workspace',
                    status: 201,
                    data: {}
                }
            )
        }
        catch (error) {
            if (error.status) {
                response.status(error.status).json(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
                return
            }
            else {
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
}


const workspaceMembersController = new WorkspaceMembersController()
export default workspaceMembersController
