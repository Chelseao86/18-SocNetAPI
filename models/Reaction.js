//Set up imports
const {Schema, Types} = require('mongoose');
const date = require('../utils/dateFormat');

//Set up object
const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId() 
        },
        reactionBody: { 
            type: String, 
            required: true,
            maxlength:280 
        },
        username:{ 
            type: String, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: reactTime => date(reactTime) 
        }
    },
    {
        toJSON:{
            getters: true
        },
        id: false
    }
);

//Export
module.exports = reactionSchema;