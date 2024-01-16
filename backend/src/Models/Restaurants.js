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
    email: {
        type: 'string',
        unique: true,
        required: [true, "Email is required!"]
    },
    vat: {
        type: 'number',
        unique: true,
        required: [true, "Email is required!"],
        maxlength: 9
    },
    phone: {
        type: 'number',
        unique: true,
        required: [true, "Phone is required!"],
        maxlength: 9
    },
    isActive: {
        type: 'boolean',
        default: false
    },
    obervations: {
        type: 'string',
    },
    addressLineOne: {
        type: 'string',
        required: [true, "Address Line One is required!"],
    },
    addressLineTwo: {
        type: 'string',
        required: [true, "Address Line Two is required!"],
    },
    openingTime: {
        type: 'string',
        required: [true, "Opening Time is required!"],
    },
    closedTime: {
        type: 'string',
        required: [true, "Closed Time is required!"],
    },
    latitude: {
        type: 'string',
        required: [true, "Latitude is required!"],
    },
    longitude: {
        type: 'string',
        required: [true, "Longitude is required!"],
    },
    restDays: {
        type: [String]
    }
},
    { timestamps: true }
);

export default mongoose.model('Users', UsersSchema);