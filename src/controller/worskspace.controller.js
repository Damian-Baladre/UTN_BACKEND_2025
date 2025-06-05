class WorkspaceController {
    async create() {
        try {
            const { name, description } = request.body
            const { id } = request.user

            await workspaceRepository.create({ name, description, owner_id: id })
            response.status(201).json(
                {
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
            }
            else {
                console.log('Hubo un error', error)
                response.status(500).send(
                    {
                        message: 'Error interno del servidor',
                        ok: false
                    }
                )
            }
        }

    }
}

const workspaceController = new WorkspaceController()
export default workspaceController