//Set up imports
const{Schema, model} = require('mongoose');


//Set up object
const userSchema = new Schema(
    {
       username: { 
           type: String, 
           unique: true, 
           required: true, 
           trim: true,
       },
       email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/.+@.+\..+/, 'Not an email/Must be a email address!'], 
       },
       thoughts: [
           {
               type: Schema.Types.ObjectId, 
               ref: 'Thought',
           },
       ],
       friends: [
           {
                type: Schema.Types.ObjectId,
                ref: 'User',
           },
       ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


//Export
const User = model('User', userSchema);
module.exports = User;