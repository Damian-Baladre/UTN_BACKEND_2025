import channelService from "../service/channel.service.js";

class ChannelController {
    async create(request, response) {
        try {
            const { workspace_id } = request.params
            const { name } = request.body
            const { channels } = await channelService.create(workspace_id, name)
            response
                .status(201)
                .json(
                    {
                        ok: true,
                        message: 'Canal creado exitosamente',
                        status: 201,
                        data: {
                            channels
                        }
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
            }
            else {
                console.error('Hubo un error', error)
                response.status(500).json(
                    {
                        message: error.message,
                        status: 500,
                        ok: false
                    }
                )
            }
        }

    }
    async getAllByWorkspaceId(request, response) {
        try {
            const { workspace_id } = request.params
            const channels = await channelService.getAllByWorkspaceId(workspace_id)
            response.status(200).json(
                {
                    ok: true,
                    message: 'Canales obtenidos exitosamente',
                    status: 200,
                    data: {
                        channels
                    }
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
            }
            else {
                console.error('Hubo un error', error)
                response.status(500).json(
                    {
                        message: error.message,
                        status: 500,
                        ok: false
                    }
                )
            }
        }

    }
    async deleteById(request, response) {
        try {
            const { workspace_id, channel_id } = request.params
            const channel = await channelService.deleteById(workspace_id, channel_id)

            response.status(200).json({
                status: 200,
                ok: true,
                message: 'Canal eliminado exitosamente',
                data: {
                    channel
                }
            }
            )
        } catch (error) {
            console.error('Error en deleteById en channelController:', error);

            if (error.status) {
                response.status(error.status).json({
                    message: error.message,
                    status: error.status,
                    ok: false,
                });
            } else {
                console.error('Hubo un error', error);
                response.status(500).json({
                    message: error.message,
                    status: 500,
                    ok: false,
                });
            }
        }
    }
}

const channel_controller = new ChannelController()
export default channel_controller