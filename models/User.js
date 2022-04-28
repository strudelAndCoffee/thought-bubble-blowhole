const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            require: "Please provide a username.",
            unique: true,
            trim: true
        },
        email: {
            type: String,
            require: "Please provide an email.",
            unique: true,
            match: /.+@.+\..+/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('firendCount').get(function() {
    return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;