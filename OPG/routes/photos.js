var express = require('express');
var router = express.Router();

router.get('/Activity', function(req, res, next) {
  res.render('photo', {
    title: 'Photo_MT_활동',
    main_menu: 'MT & 활동'
  });
});

router.get('/Study', function(req, res, next) {
  res.render('photo', {
    title: 'Photo_Study',
    main_menu: '스터디'
  });
});
router.get('/Seminar', function(req, res, next) {
  res.render('photo', {
    title: 'Photo_Seminar',
    main_menu: '세미나'
  });
});
router.get('/', function(req, res, next) {
  res.render('photo', {
    title: 'Photo Gallery',
    main_menu: 'Photo Gallery'
  });
});

module.exports = router;
