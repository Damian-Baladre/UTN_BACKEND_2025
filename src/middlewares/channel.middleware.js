import channelRepository from '../repositories/channel.repository.js';

const channelMiddleware = async (request, response, next) => {
    const  channelId = request.params.channel_id;
    const workspace = request.workspace;
    console.log(channelId)

    try {
        const channel = await channelRepository.findById(channelId);
        console.log(channel)
        if (!channel) {
            return response.status(404).json({
                message: 'Canal no encontrado',
                ok: false,
                status: 404,
            });
        }

        if (channel.workspace_id.toString() !== workspace._id.toString()) {
            return response.status(403).json({
                message: 'Este canal no pertenece a este workspace;',
                ok: false,
                status: 403,
            });
        }

        request.channel = channel;
        next();
    } catch (error) {
        console.error('Error en el catch:', error)
        if (error.status) {
            response.status(error.status).json(
                {
                    message: error.message,
                    status: error.status,
                    ok: false
                });
        } else {
            response.status(500).json(
                {
                    message: 'Internal Server Error',
                    status: 500,
                    ok: false
                });
        }
    }
};

export default channelMiddleware;