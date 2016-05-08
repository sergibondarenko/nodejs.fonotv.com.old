var http = require('http');
var CoubVideo = require('./models/coubdb.js');

function CoubApi (url) {
  this.url = url;
  this.storage = [];
  this.httpReq = httpReq;
  this.searchData = searchData;
  this.getHotData = getHotData;
  this.storeData = storeData;
}

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
      console.log("Error: ", e);
    });

  });

  return promise;
}

function storeData (data, per_page) {
  var i;
  for(i = 0; i < per_page; i++) {

    console.log("Before i = " + i);

    CoubVideo.count({id: data.coubs[i].id}, function (err, count) {

      console.log("After i = " + i);

      if (count == 0) {
        var video = new CoubVideo(data.coubs[i]);

        video.save(function (err) {
          if (err) throw err;
          console.log("Saved successfully!");
        });
      } else { 
        console.log("Duplicate");
      }

    });
  }
}

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

function getHotData (order, page, per_page) {
  var url = this.url +
            "timeline/hot?page=" + page +
            "&per_page=" + per_page + 
            "&order_by=" + order

  this.httpReq(url).then(function (data) {
    this.storeData(data, per_page);
  }.bind(this));
}

var coub = new CoubApi("http://coub.com/api/v2/");
var numOfPages = 1;
var numPerPage = 1;
var i;

for(i = 0; i < numOfPages; i++) {
  coub.getHotData("newest_popular", i, numPerPage);
}

