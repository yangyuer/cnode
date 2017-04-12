var express = require('express');
var router = express.Router();

var model = require('./model')

function goToError (res, msg) {
  res.render('error.njk', {
    message: msg
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  model.getTopicList().then(function(data) {
    if (data.success) {
      res.render('pages/index.njk', {
        title: '主页',
        data: data.data
      } )
    }
  }).catch(function(err) {
    goToError(res, err.message)
  })
});

/* Get topic page */
router.get('/:id', function(req, res, next) {
  model.getTopic(req.params.id).then(function(data) {
    if (data.success) {
      res.render('pages/topic.njk', {
        title: '话题',
        data: data.data
      })
    }
  }).catch(function(err) {
    goToError(res, err.message)
  })
})

router.get('/new-topic', function(req, res, next) {
  res.render('new-topic', {
    title: '新建话题'
  })
})

module.exports = router;
