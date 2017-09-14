/**
 * Course model routes
 */
//Dependencies
const express = require('express');
const router = express.Router();
const Course = require('../../model/course');
const util = require('util');

// Retriving all courses
router.get('/all',function(req, res, next){
    Course.find(function(err, courses){
        if(err)
            res.status(500).send(err);

        res.json(courses);
    });
});

// Add new course
router.post('/new',function(req, res, next){
    let newCourse = new Course({
        title: req.body.title,
        code: req.body.code
    });

    newCourse.save(function(err, course){
        if(err)
            res.status(500).send(err);

        res.json({msg:'Course added!'});
    });
});

// Update course
router.put('/:id',function(req, res, next){
    Course.findById(req.params.id, function(err, course){
        if(err)
            res.status(500).send(err);

        //Control if found
        if(util.inspect(course) !== 'null'){
            course.title = req.body.title;
            course.code = req.body.code;

            course.save(function(err, course){
                if(err)
                    res.status(500).send(err);

                res.json({msg:'Course updated!'});
            });
        }else{
            res.json({msg:'Course not found!'});
        }
    });
});

// Delete course by id
router.delete('/:id',function(req, res, next){
    Course.findByIdAndRemove(req.params.id, function(err, course){
        res.json({msg:'Course removed!'});
    });
});

module.exports = router;
