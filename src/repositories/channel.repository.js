import Channel from "../models/Channel.model.js"

class ChannelRepository {
    async create({ name, workspace_id, created_at, isPrivate}){
        try{
            const channel = new Channel({
                name,
                workspace_id,
                created_at,
                isPrivate
            })
            await channel.save()
            console.log("todo bien por aca")
        }
        catch (error){
            console.error("Aca paso algoooooo, OJO")
        }
    } 
}

const channelRepository = new ChannelRepository()
export default ChannelRepository