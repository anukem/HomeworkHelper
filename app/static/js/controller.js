
// AJAX request: schedule per day
function getDaySchedule(day, month, year, element, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'api/day-schedule', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  // data response
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      respData = JSON.parse(xhttp.responseText);
      console.log(respData);
      return callback(null, element, respData);
    } else if (xhttp.readyState == 4) {
      var err = new Error(xhttp.status);
      return callback(err, element, respData);
    }
  };

  // make POST request
  xhttp.send(JSON.stringify({
    day: day,
    month: month,
    year: year
  }));
}
