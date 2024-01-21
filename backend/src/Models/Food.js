import mongoose, { Schema } from "mongoose";

const FoodsSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    price: {
        type: 'Number',
        required: true
    },
    photo: {
        type: 'string',
        required: true
    },
    alergy: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string'
    },
    restaurant: {
        type: 'string',
        ref: "Restaurants"
    }
},
    { timestamps: true }
);

export default mongoose.model('Foods', FoodsSchema);