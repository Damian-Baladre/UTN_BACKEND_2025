import channelRepository from '../repositories/channel.repository.js';
import workspaceRepository from '../repositories/workspace.repository.js';
import workspaceMembersRepository from '../repositories/workspaceMembers.respository.js';

const channelMiddleware = async (request, response, next) => {
    const channelId = request.params.channel_id;
    const workspaceId = request.params.workspace_id;
    const clientId = request.client_id;

    try {
        const channel = await channelRepository.getChannelById(channelId);
        console.log("este es el canal", channel)
        if (!channel) {
            return response.status(404).json({
                message: 'Canal no encontrado',
                ok: false,
                status: 404,
            });
        }

        const workspace = await workspaceRepository.findByName(workspaceId);
        if (!workspace) {
            return response.status(404).json({
                message: 'Workspace no encontrado',
                ok: false,
                status: 404,
            });
        }

        const member = await workspaceMembersRepository.getMemberByWorkspaceIdAndUserId(workspaceId, clientId);
        if (!member) {
            return response.status(403).json({
                message: 'No tienes permiso para acceder a este canal',
                ok: false,
                status: 403,
            });
        }
        request.channel = channel;
        next();

    } catch (error) {
        console.error('Error en el catch:', error)
        if (error.status) {
            response.status(error.status).json({ message: error.message, status: error.status, ok: false });
        } else {
            response.status(500).json({ message: 'Internal Server Error', status: 500, ok: false });
        }
    }
};

export default channelMiddleware;