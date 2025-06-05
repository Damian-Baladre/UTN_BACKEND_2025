import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    owner_id:{
        type: mongoose.Schema.Types.ObjectId, //esto valida que el type sea ObjectId
        ref: 'User', //valida q cuando se cree un ws el owner_id sea un user_id valido
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const Workspace = mongoose.model('Workspaces', workspaceSchema)

export default Workspace