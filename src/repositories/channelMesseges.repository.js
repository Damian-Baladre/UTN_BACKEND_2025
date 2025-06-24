import ChannelMessages from '../models/ChannelMessages.model.js'

class ChannelMessagesRepository {
  async create({ user_id, channel_id, content }) {
    try {
      const channelMessage = new ChannelMessages(
        {
          user_id,
          channel_id,
          content,
        }
      )

      await channelMessage.save();
      console.log('channelMessage', channelMessage)
      return { channelMessage }
    }
    catch (error) {
      console.error('Error al crear mensaje:', error)
      throw error
    }
  }
  async getAllByChannelId(channel_id) {
    try {
      const channelMessages = await ChannelMessages.find({ channel_id: channel_id })
        .populate('user_id', 'name');

      const channelMessagesFotmatted = channelMessages.map((channelMessages) => {
        return {
          _id: channelMessages._id,
          user: channelMessages.user_id,
          content: channelMessages.content,
          created_at: channelMessages.created_at,
        }
      })
      return channelMessagesFotmatted;
    } catch (error) {
    console.error('Error obteniendo mensajes:', error);
    throw error;
  }
}
}

const channelMessagesRepository = new ChannelMessagesRepository();
export default channelMessagesRepository;