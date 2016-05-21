/*global Promise, getData, httpReq, searchData, getHotData, storeData*/

var http = require('http');
var mongoose = require('mongoose');

var database = require('../config/database.js'); // load the database config
var CoubVideo = require('./models/coubdb.js');

mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

function CoubApi (url, numPerPage, numOfPages) {
  this.url = url;
  this.numOfPages = numOfPages;
  this.numPerPage = numPerPage;
  this.getData = getData;
  this.httpReq = httpReq;
  this.searchData = searchData;
  this.getHotData = getHotData;
  this.storeData = storeData;
}

// Get data from server
function httpReq (url) {
  var promise = new Promise (function (resolve, reject) {

    http.get(url, function (res) {
      var data = '';
      
      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        if(data.length > 0) {
          resolve(JSON.parse(data));
        } else {
          reject("Error: HTTP request rejected!");
        }
      });

    }).on('error', function (err) {
      console.log(err);
    });

  });

  return promise;
}

// Store data in MongoDB
function storeData (data, per_page) {
  
  function insertVideoDoc (i) {
    CoubVideo.count({id: data.coubs[i].id}, function (err, count) {
      if (err) {
        console.log(err);
      }

      if (count === 0 || count === null) {
        var video = new CoubVideo(data.coubs[i]);

        video.save(function (err) {
          if (err) {
            console.log(err);
          }
          console.log("Saved successfully!");
        });
      } else { 
        console.log("Duplicate");
      }
    });
  }

  var i;
  for(i = 0; i < per_page; i++) {
    insertVideoDoc(i);
  }
}

// Search for coubs
function searchData (searchtext, order, page, per_page) {
  var url = this.url +
            "search?q=" + searchtext +
            "&order_by=" + order +
            "&per_page=" + per_page + 
            "&page=" + page;

  this.httpReq(url).then(function (data) {
    this.storeData(data, per_page);
  }.bind(this));
}

// Get hot coubs
function getHotData (order, page, per_page) {
  var url = this.url +
            "timeline/hot?page=" + page +
            "&per_page=" + per_page + 
            "&order_by=" + order;

  this.httpReq(url).then(function (data) {
    this.storeData(data, per_page);
  }.bind(this));
}

// Get data
function getData () { 
  var i;
  for(i = 0; i < this.numOfPages; i++) {
    this.getHotData("newest_popular", i, this.numPerPage);
  }
}

var coub = new CoubApi("http://coub.com/api/v2/", 20, 40);
coub.getData();

setTimeout(function () {
  mongoose.disconnect();
}, 240000);
