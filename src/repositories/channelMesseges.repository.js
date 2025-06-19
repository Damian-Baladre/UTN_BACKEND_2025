import ChannelMessages from '../models/ChannelMessages.model.js'

class ChannelMessagesRepository {
    async create({member_channel_id, channel_id, content, created_at}){
        try{
            const channelMessages = new ChannelMessages({
                member_channel_id,
                channel_id,
                content,
                created_at
            })

            await channelMessages.save();
            console.log('mensajes enviados eficientementere')

        }
        catch(error){
            console.log('aLGO no anDa mWy B13n')
        }
    }
    async getAllByChannelId(channelId) {
    try {
      const messages = await ChannelMessages.find({ channel_id: channelId });
      return messages;
    } catch (error) {
      throw error;
    }
  }
}

const channelMessagesRepository = new ChannelMessagesRepository();
export default channelMessagesRepository;