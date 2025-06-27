import channelMessagesRepository from "../repositories/channelMesseges.repository.js";

class ChannelMessagesService {
    async create({ user_id, channel_id, content }) {
        if (!content) {
            throw { status: 400, message: 'Content is required' };
        }
        try {
            await channelMessagesRepository.create({ user_id, channel_id, content });
            const messagesList = await channelMessagesRepository.getAllByChannelId(channel_id);
            return messagesList;
        }
        catch (error) {
            console.error('Error al crear mensaje:', error);
            throw error;
        }
    }
    async getAllByChannelId({ channel_id }) {
        const messagesList = await channelMessagesRepository.getAllByChannelId(channel_id);
        return messagesList;
    }
}

const channelMessagesService = new ChannelMessagesService();
export default channelMessagesService