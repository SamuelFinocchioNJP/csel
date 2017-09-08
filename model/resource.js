/**
 * Resource model and schema
 */

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    // Resource title
    title: {
        type: String,
        required: [true, 'attribute required']
    },

    // Resource description
    description: {
        type: String,
    },

    // Resource reference - Where to find the content ( href, url, upload )
    reference: {
        type: String, 
        required: [true, 'attribute required']
    },

    // isLeading - Top most - Important content
    leading: {
        type: Boolean,
        default: false
    },

    // Reference to the User uploading the content
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Defining model
const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;