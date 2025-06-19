consigna:
necesito que crees una clase llama channel.service que tendra un metodo async llamado create que reciba el id del workspace y va a validar que exista, sino lanzara un error conb mensaje (workjspace not found) status 404. tambien recibira el nombre del canal como parametro y vamos a instanciar el metodo create de ChannelRepository para creatr el canal

---

consgina:
crea un metodo en ChannelRepository que se llame findByName que reiba el nombre del canal como parametro y el id del workspace y lo busque en la coleccion de canales y lo devuelva

---

consigna:

crea un metodo asincronico para eliminar un canal en  para el repositorio el channelsService y su correspondiete metodo para el controlador y la ruta a compartir . Verificar si el workspace existe sino 404. podra ser solamente eliminado por el admin. Si no tiene permisos status 403

---
consigna:
crea un channelMiddleware que cheekee que el canal exista y que guarde en el canal buscado en request.channel
 para poder generar consultar a la api desde /api/messages/:channel_id. en su respuesta tendra que estar detallado el mensaje como por ejemplo:
 {
    "message": "Mensajes obtenidos",
    "ok": true,
    "status": 200,
    "data": {
        "messages": [
            {
                
            }
            // Aquí vendrá la lista de mensajes
        ]
    }
}

---

consigna:
Crea un metodo get para channelMesseges.repository con el nombre ChannelMessagesRepostory para que podamos hacer consultas a la api para obtener los mensajes de un canal, tambien service y el controlador para poder obtener los mensajes de un canal. no olvides que tmb habria que hacer un middlewar de channel donde chekee que el channel exista y uqe guarde el canal en request channel.

 
crear un middleware llamado channelMilddleware, va a validar que el canal exista a partir del parametro channel_id, para verificar esto llamara al channelRepository y si no lo encuentra lanzara un error 404. si lo encuentra validara el id del cliente y si no lazara 403. verificar que existe el workspace desde el repositorio de Workspace y chekeear si el es miembro del workspace.si todo sale ok lo guardara en el request.channel

@chsta tendra que estar detallado el mensaje como por ejemplo:
 {
    "message": "Mensajes obtenidos",
    "ok": true,
    "status": 200,
    "data": {
        "messages": [
            {
                
            }
            // Aquí vendrá la lista de mensajes
        ]
    }
}

necesito un unservicio y un controlador para poder obtener los mensajes de un canal. la ruta sera /api/messages/:channel_id. si no existe el canal lanzara un error 404. 
