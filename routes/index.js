var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let User = require('../models/data');
let bodyParser = require('body-parser');
let moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
  let params = {};

  if (req.query.checkid && req.query.formid) {
    params["id"] = req.query.formid;
  }
  if (req.query.checkstring && req.query.formstring) {
    params["string"] = req.query.formstring;
  }
  if (req.query.checkinteger && req.query.forminteger) {
    params["integer"] = req.query.forminteger;
  }
  if (req.query.checkfloat && req.query.formfloat) {
    params["float"] = req.query.formfloat;
  }
  if (req.query.checkdate && req.query.startdate && req.query.enddate) {
    params["date"] = {
      "$gte": new Date(req.query.startdate),
      "$lt": new Date(req.query.enddate)
    }
  }
  if (req.query.checkboolean && req.query.boolean) {
    params["boolean"] = boolean = req.query.boolean
  }
  User.find(params, (err, count) => {
    const page = req.query.page || 1;
    const limit = 5;
    const offset = (page - 1) * limit;
    const url = req.url == '/' ? '/?page=1' : req.url
    const total = count.length;
    const pages = Math.ceil(total / limit);

    User.find(params, null, {
      limit: limit,
      skip: offset
    }).then((data) => {
      res.render('index', {
        data,
        page,
        pages,
        query: req.query,
        url,
        moment
      });
    });
  });
});

// ==================== ADD ====================
router.get('/add', function (req, res, next) {
  res.render('add');
});

router.post('/add', function (req, res, next) {
  console.log(req.body);

  let addData = new User({
    string: req.body.string,
    integer: req.body.integer,
    float: req.body.float,
    date: req.body.date,
    boolean: req.body.boolean
  });

  addData.save()
    .then((result) => {
      console.log("result:", result);
      res.json({
        success: true,
        msg: `success`,
        result: {
          string: result.string,
          integer: result.integer,
          float: result.float,
          date: result.date,
          boolean: result.boolean
        }
      });
    })
  res.redirect('/');
})

// ==================== EDIT ====================
router.get('/edit', function (req, res, next) {
  let id = req.query.id;
  console.log(req.query.id);
  User.find({ _id: id }, function (err, rows) {
    res.render('edit', {
      item: rows[0]
    });
  });
});

router.post('/edit', function (req, res, next) {
  let id = req.query.id;
  console.log(req.query.id);
  User.update({ "_id": id }, {
    $set: {
      "string": req.body.string,
      "integer": req.body.integer,
      "float": req.body.float,
      "date": req.body.date,
      "boolean": req.body.boolean
    }
  },
    function (err) {
      console.log("edit success");
      res.redirect('/')
    });
});


// ==================== DELETE ====================
router.get('/delete', (req, res, next) => {
  let id = req.query.id;
  User.findByIdAndRemove(_id = id, function (err, data) {
    console.log(req.query.id);

    console.log("Sukses Di delete");
  })
  res.redirect('/');
})
module.exports = router;