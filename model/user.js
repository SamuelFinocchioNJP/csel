/**
 * User model and schema
 */

const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const validators = require('mongoose-validators');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    // User name
    name: {
        type: String,
        required: [true, 'Campo richiesto!'],
        validate: validators.isAlpha({message:'Il nome deve contenere solo caratteri!'})
    },

    // User surname
    surname: {
        type: String,
        required: [true, 'Campo richiesto!'],
        validate: validators.isAlpha({message:'Il cognome deve contenere solo caratteri!'})
    },

    // User alias
    username: {
        type: String,
        unique: true,
        required: [true, 'Campo richiesto!'],
        validate: [validators.isAlphanumeric({message:'Non sono ammessi caratteri speciali!'}), validators.isLength({message:'Deve contenere almento 4 caratteri!'},4)]
    },

    // User email
    email: {
        type: String,
        unique: true,
        required: [true, 'Campo richiesto!'],
        validate: validators.isEmail({message:'Email non valida!'})
    },

    // User phone / cell
    telephoneNumber: {
        type: String
    },

    // User password
    password: {
        type: String,
        required: [true, 'Campo richiesto!'],
        validate: validators.isLength({message:'Deve contenere almento 8 caratteri!'},8)
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
                next();
            });
        });
    } else {
        return next(null);
    }
});

// Duplication error handling
UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    console.log(error.toJSON().errmsg.indexOf('username_1'));
    var errors = { errors : {}};

    if(error.toJSON().errmsg.indexOf('username_1') !== -1){
      errors.errors = {
        username: { message: "Questo username è già stato usato" }
      };
    }else{
      errors.errors = {
        email: { message: "Questa email è già stata usata" }
      };
    }

    return next(JSON.stringify(errors));
  } else {
    return next(error);
  }
});

// Comparing the password - Hash matching
UserSchema.methods.comparePassword = function(password, next) {
    return bcrypt.compareSync(password, this.password, function(err, matching) {
        // Cant compare password and hash
        if(err)
            return next(err);

        // Returns true / false
        return matching;
    });
};

// Defining model
const User = mongoose.model('User', UserSchema);

module.exports = User;
