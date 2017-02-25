var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signUp', { title: 'OPG' });
});

//create
router.post('/', function(req, res, next){
  User.create(req.body, function(err, data){
    if(err)
      return res.json(err);
    else{
      console.log(data);
    }
    res.redirect('/');
  });
});



module.exports = router;
