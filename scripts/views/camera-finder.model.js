Colors.CameraFinder = (function($) {
  var waiting = false;
  var data;

  console.log('in the camera finder model!')

  function parseData() {
    data = data.feed.entry;
  }

  function fetch(callback) {
    if (waiting) {
      return false;
    }

    waiting = true;
    var url = 'https://spreadsheets.google.com/feeds/list/1Z5YFLfZ_UkAWvJRY9mKZbNvegNbSTJ0F0CXqVdyhePw/od6/public/values?alt=json-in-script&callback=?';

    $.getJSON(url, function(response) {
      waiting = false;
      data = response;
      parseData();
      callback();
    });
  }

  function getData(callback) {
    if (!data) {
      fetch(function() {
        callback(data);
      });
    } else {
      return callback(data);
    }
  }

  function search(term, callback) {
    getData(function(data) {
      var results = _.filter(data, function(camera) {
        var PATTERN = new RegExp(term, 'i');
        if (camera.gsx$camera.$t.search(PATTERN) > -1) {
          return true;
        }
      });

      results = results ? results : false;

      callback(results);
    });
  }

  return {
    data: getData,
    search: search
  }
})(jQuery);
