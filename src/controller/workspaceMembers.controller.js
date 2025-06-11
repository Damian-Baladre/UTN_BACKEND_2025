import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from '../dictonaries/availableRoles.dictonary.js'
import userRepository from '../repositories/users.repository.js'
import workspaceRepository from '../repositories/workspace.repository.js'
import workspaceMembersRepository from '../repositories/workspaceMembers.respository.js'

class WorkspaceMembersController {
    async add(request, response) {
        try{

        const { id } = request.user
        const { workspace_id } = request.params
        const { role, email } = request.body

        if (Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS).includes(role)) {
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

        const workspace_found = await workspaceRepository.getByID(workspace_id)

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
                message: 'Workspace creado exitosamente',
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
