/**
* User model routes
*/

//Dependencies
const express = require('express');
const router = express.Router();
const passport = require ('passport');
const jwt = require('jsonwebtoken');
const configuration = require('../../config/configuration');
const User = require('../../model/user');

// Retriving all users
router.get('/all',function(req, res, next){
  User.find(function(err, users){
    if(err)
      return res.status(500).send(err);

    return res.json(users);
  });
});

// Retriving one user
router.get('/:username', passport.authenticate('jwt'), function(req, res, next){
  User.findOne({'username':req.params.username},function(err, user){
    if(err)
      return res.status(500).send(err);

    return res.json(user);
  });
});

// Add new user
router.post('/new',function(req, res, next){
  let newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    telephoneNumber: req.body.telephoneNumber,
    password: req.body.password
  });

  newUser.save(function(err, user){
    if(err){
      console.log(err)
      return res.status(500).send(err);
    }

    return res.status(200).json({msg:'User added!'});
  });
});

// Update user
router.put('/:id',function(req, res, next){
  User.findById(req.params.id, function(err, user){
    if(err)
      return res.status(500).send(err);

    //Control if found
    if(!user){
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.username = req.body.username; // Dev only
      user.email = req.body.email; // Dev only
      user.telephoneNumber = req.body.telephoneNumber;
      user.password = req.body.password;

      var validate = user.validate();
      if(!validate.error){
        user.save(function(err, user){
          if(err)
            return res.status(500).send(err);

          return res.status(200).json({msg:'User updated!'});
        });
      }else{
        return res.status(500).send(validate);
      }
    }else{
      return res.status(500).json({msg:'User not found!'});
    }
  });
});

// Delete user by id
router.delete('/:id',function(req, res, next){
  User.findByIdAndRemove(req.params.id, function(err, user){
    if(err)
      return res.status(500).send(err);

    if(!user)
      return res.status(500).json({msg:'User not found!'});

    return res.status(200).json({msg:'User removed!'});
  });
});

// Login user and send JWT token
router.post('/login', function(req, res, next) {
  // Check if username/password are empty
  if(req.body.username && req.body.password){
    User.findOne({'username': req.body.username}, function(err, user){
      // Can't do the query
      if (err)
        return res.status(500).json(err);

      // Username not found
      if(!user)
        return res.status(401).json({msg:"Username/password non corretti!"});

      // Verify username / password
      if (user.comparePassword(req.body.password)){

        // Get and send the JWT token
        const token = jwt.sign({id: user.id}, configuration.jwtSecret);
        return res.json({token: token});

      } else {
        // Password don't match
        return res.status(401).json({msg:"Username/password non corretti!"});
      }
    });
  }else{
    return res.status(401).json({msg:"Username/password vuoti!"});
  }
});

// Logout the user
router.get('/logout', function(req, res){
  return req.logout();
});

// Check if user is logged correctly
router.get('/logged', passport.authenticate('jwt'), function(req, res){
  return res.status(200);
});

module.exports = router;
