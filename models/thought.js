//Set up imports
const{Schema, model} = require('mongoose');
const sReaction = require('./Reaction');
const date = require('../utils/dateFormat');

//Set up object
const thoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: 'You need to leave a thought!', 
            minlength: 1, 
            maxlength: 280
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: thoughtTime => date(thoughtTime)
        },
        userId: {
            type: String,
            required: true
        },
        reactions: [sReaction]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

//Export
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;