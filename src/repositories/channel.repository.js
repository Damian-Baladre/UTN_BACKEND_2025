import Channel from "../models/Channel.model.js"

class ChannelRepository {
    async create(workspaceId, name, isPrivate) {
        try {
            const channel = new Channel({
                name,
                workspace_id: workspaceId,
                private: isPrivate
            });
            await channel.save();
            return channel;
        } catch (error) {
            throw error;
        }
    }
    async findByName(name, workspaceId) {
        try {
            const channel = await Channel.findOne({ name, workspace_id: workspaceId });
            return channel;
        } catch (error) {
            throw error;
        }
    }
    async getChannelById(channelId){
        try{
            const channel = await Channel.findById(channelId)
            return channel
        }
        catch(error){
            throw error
        }
    }

    async getAllByWorkspace(workspaceId) {
        try {
            const channels = await Channel.find({ workspace_id: workspaceId });
            return channels;
        } catch (error) {
            throw error;
        }

    }
    async deleteById(workspaceId, channelId) {
        try {
            const channel = await Channel.findOne({ _id: channelId, workspace_id: workspaceId });
            if (!channel) {
                throw { status: 404, message: 'Channel not found' };
            }
            await Channel.deleteOne({ _id: channelId})
            return channel;
        } catch (error) {
            throw error;
        }
    }
}

const channelRepository = new ChannelRepository()
export default channelRepository