import mongoose, { Schema } from "mongoose";

const UsersSchema = new Schema({
    nome: {
        type: 'string',
        required: [true, "Nome is required!"]
    },
    photo: {
        type: 'string',
        required: [true, "Photo is required!"]
    },
    password: {
        type: 'string',
        required: [true, "Password is required!"]
    },
    email: {
        type: 'string',
        required: [true, "Email is required!"]
    },
    nif: {
        type: 'string',
        required: [true, "Email is required!"]
    },
    phone: {
        type: 'number',
        required: [true, "Phone is required!"]
    },
    isActive: {
        type: 'boolean',
        default: false
    }
},
    { timestamps: true }
);

export default mongoose.model('Users', UsersSchema);