/**
 * Course model and schema
 */

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    // Course title
    title: {
        type: String,
        required: [true, 'attribute required']
    },

    // Course code
    code: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'attribute required']
    },

    // Array of resources
    resources: [{
        type: Schema.Types.ObjectId, 
        ref: 'Resource'
    }]
});


// Defining model
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;