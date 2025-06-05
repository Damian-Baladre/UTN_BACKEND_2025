import ChannelMembers from "../models/ChannelMembers.model.js"

class ChannelMembersRepository {
    async create({ member_id, channel_id, created_at}){
        try{
            const channelMembers = new ChannelMembers({
                member_id,
                channel_id,
                created_at
            })
            await channelMembers.save()
            console.log("todo bien por aca")
        }
        catch (error){
            console.error("Aca paso algoooooo, OJO")
        }
    } 
}

const channelMembersRepository = new ChannelMembersRepository()
export default channelMembersRepository