import channelMessagesService from "../service/channelMessages.service.js";

class ChannelMessageController {
    async create(request, response) {
        try {
            const messagesList = await channelMessagesService.create({
                user_id: request.user.id,
                channel_id: request.channel._id,
                content: request.body.content

            })
            response.json({
                ok: true,
                status: 201,
                message: "Message created successfully",
                data: {
                    messagesList
                }
            })

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
    }
    async getAllByChannelId(request, response) {
        try {
            const channel_id = request.params.channel_id;
            const messagesList = await channelMessagesService.getAllByChannelId(channel_id);
            response.json({
                ok: true,
                status: 200,
                message: "Messages found successfully",
                data:
                {
                    messagesList
                }
            })

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
    }
}

const channelMessageController = new ChannelMessageController();
export default channelMessageController