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

function storeData (data) {
  var i;
  console.log("Storrrreee");
  for(i = 0; i < 10; i++) {
    delete data.coubs[i].id;
    data.coubs[i].video_orig = "coub.com";
    this.storage.push(data.coubs[i]);

    var video = new CoubVideo(data.coubs[i]);
    video.save(function (err) {
      if (err) {
        throw err;
      }
      console.log('Video saved successfully!');
    });
  }

  console.log(this.storage.length);
}

function searchData (searchtext, order, page, number) {
  var url = this.url +
            "search?q=" + searchtext +
            "&order_by=" + order +
            "&per_page=" + number + 
            "&page=" + page;

  this.httpReq(url).then(function (data) {
    this.storeData(data);
  }.bind(this));
}

function getHotData (order, page, number) {
  var url = this.url +
            "timeline/hot?page=" + page +
            "&per_page=" + number + 
            "&order_by=" + order

  this.httpReq(url).then(function (data) {
    this.storeData(data);
  }.bind(this));
}

var coub = new CoubApi("http://coub.com/api/v2/");
var i;
for(i = 0; i < 10; i++) {
  coub.getHotData("newest_popular", i, 10);
}

