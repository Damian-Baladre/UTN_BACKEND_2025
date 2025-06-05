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
}

const channelMessagesRepository = new ChannelMessagesRepository();
export default channelMessagesRepository;