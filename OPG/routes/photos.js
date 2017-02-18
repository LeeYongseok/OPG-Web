var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('photo', {
    title: 'Photo',
    main_menu: 'Photo Gallery'
  });
});

module.exports = router;
