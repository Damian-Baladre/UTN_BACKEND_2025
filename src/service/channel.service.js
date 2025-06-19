
import channelRepository from "../repositories/channel.repository.js";
import channelMessagesRepository from "../repositories/channelMesseges.repository.js";
import workspaceRepository from "../repositories/workspace.repository.js";

class ChannelService {
    /**
     * Crea un nuevo canal en el workspace especificado.
     * 
     * @param {string} workspace_id - El id del workspace donde se creará el canal.
     * @param {string} name - El nombre del canal a crear.
     * @return {Object.channels} - Un objeto que contiene la lista actualizada de canales en el workspace.

     * 
     * @throws {Object} - Si el nombre del canal ya existe o no cumple con las validaciones.
     * @throws {Object.status} {number} - El código de estado de la respuesta (400).
     * @throws {Object.message} {string} - El mensaje de error.
     * 
     * @throws {Object} - Si el workspace no existe.
     * @throws {Object.status} {number} - El código de estado de la respuesta (404).
     * @throws {Object.message} {string} - El mensaje de error.
     */
    async create(workspace_id, name) {
        try {
            if (typeof name !== 'string' || name.length >= 12) {
                throw { status: 400, message: 'El nombre del canal debe ser un string con menos de 12 caracteres' };
            }

            // Verificar si el canal ya existe
            const existingChannel = await channelRepository.findByName(name, workspace_id);
            if (existingChannel) {
                throw { status: 400, message: 'El nombre del canal ya está en uso' };
            }
            const workspace = await workspaceRepository.getById(workspace_id);
            if (!workspace) {
                throw { status: 404, message: 'Workspace not found' };
            }

            await channelRepository.create(workspace_id, name);
            const channels = await channelRepository.getAllByWorkspace(workspace_id);
            return {
                channels
            };
        } catch (error) {
            throw error;
        }
    }
    async getAllByWorkspaceId(workspace_id) {
        return await channelRepository.getAllByWorkspace(workspace_id)
    }

    async deleteById(workspace_id, channel_id) {
        try {
            console.log(' channel_id:', channel_id);
            console.log(' workspace_id:', workspace_id);
            const workspace = await workspaceRepository.getById(workspace_id);
            if (!workspace) {
                throw { status: 404, message: 'Workspace not found' };
            }
            const channel = await channelRepository.deleteById(workspace_id,channel_id);
            return channel;

        } catch (error) {
            throw error;
        }
    }
    async getMessagesByChannelId(channel_id) {
  try {
    const channel = await channelRepository.findById(channel_id);
    if (!channel) {
      throw { status: 404, message: 'Canal no encontrado' };
    }
    const messages = await channelMessagesRepository.find({ channel_id });
    return {
      message: 'Mensajes obtenidos',
      ok: true,
      status: 200,
      data: {
        messages
      }
    };
  } catch (error) {
    throw error;
  }
}
}


const channelService = new ChannelService();
export default channelService;