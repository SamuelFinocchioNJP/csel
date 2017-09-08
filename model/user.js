/**
 * User model and schema
 */

const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    // User name
    name: {
        type: String,
        required: [true, 'attribute required']
    },

    // User surname
    surname: {
        type: String,
        required: [true, 'attribute required']
    },

    // User alias
    username: {
        type: String,
        required: [true, 'attribute required']
    },

    // User email
    email: {
        type: String,
        required: [true, 'attribute required']
    },

    // User phone / cell
    telephoneNumber: {
        type: String
    },

    // User password
    password: {
        type: String, 
        required: [true, 'attribute required']
    }
});

// Hashing and salting when changing the password or creating a User
UserSchema.pre('save', function(next) {
    var user = this;
    if(this.isModified('password') || this.isNew) {
        // Salting before hashing
        bcrypt.genSalt(10, function(err, salt) {
            // Cant generate salt
            if(err) 
                return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                // Cant generate password
                if(err)
                    return next(err);

                // After hashing the plain password is replaced with the hash
                user.password = hash;
            });
        });
    } else {
        return next(null);
    }
});

// Comparing the password - Hash matching
UserSchema.methods.comparePassword = function(password, next) {
    bcrypt.compare(password, this.password, function(err, matching) {
        // Cant compare password and hash
        if(err) 
            return next(err);
        
        // Returns true / false 
        next(null, matching);
    });
};

// Defining model 
const User = mongoose.model('User', UserSchema);

module.exports = User;