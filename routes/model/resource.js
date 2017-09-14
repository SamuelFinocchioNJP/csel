/**
* Resource model routes
*/
//Dependencies
const express = require('express');
const router = express.Router();
const Resource = require('../../model/resource');

// Retriving all resources
router.get('/all',function(req, res, next){
  Resource.find(function(err, courses){
    if(err)
      res.status(500).send(err);

    res.json(courses);
  });
});

// Retriving all resources of a course
router.get('/:course_id',function(req, res, next){

});

// Add new resource
router.post('/new',function(req, res, next){
  let newResource = new Resource({
    title: req.body.title,
    description: req.body.description,
    reference: req.body.reference
  });

  newResource.save(function(err, resource){
    if(err)
    res.status(500).send(err);

    res.json({msg:'Resource added!'});
  });
});

// Delete resource by id
router.delete('/:id',function(req, res, next){
  Resource.findByIdAndRemove(req.params.id, function(err, resource){
    res.json({msg:'Resource removed!'});
  });
});


module.exports = router;
