function getUserId() { // TODO
  return '55';
}

// AJAX request: schedule per day - 'api/courses'
function getDateSchedule(date, element, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'api/courses', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  // data response
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      respData = JSON.parse(xhttp.responseText);
      return callback(null, element, respData);
    } else if (xhttp.readyState == 4) {
      var err = new Error(xhttp.status);
      return callback(err, element, respData);
    }
  };
  // make POST request
  xhttp.send(JSON.stringify({
    userId: getUserId(),
    date: {
      day: date.day,
      month: date.month,
      year: date.year
    }
  }));
}

// AJAX request: get assignments - 'api/assignments'
function getAssignments(date, element, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'api/assignments', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  // data response
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      respData = JSON.parse(xhttp.responseText);
      return callback(null, element, respData);
    } else if (xhttp.readyState == 4) {
      var err = new Error(xhttp.status);
      return callback(err, element, respData);
    }
  };

  // make POST request
  xhttp.send(JSON.stringify({
    userId: getUserId(),
    date: {
      day: date.day,
      month: date.month,
      year: date.year
    }
  }));
}

// AJAX request: course creation - 'api/create-course'
function createCourse(course, element, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'api/create-course', true);
  xhttp.setRequestHeader('Content-Type', 'application/json');
  // data response
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      respData = JSON.parse(xhttp.responseText);
      return callback(null, element, respData);
    } else if (xhttp.readyState == 4) {
      var err = new Error(xhttp.status);
      return callback(err, element, respData);
    }
  };
  // make POST request
  xhttp.send(JSON.stringify({
    userId: getUserId(),
    courseName: course.name,
    location: course.location,
    startDate: course.startDate,
    endDate: course.endDate,
    startTime: course.startTime,
    endTime: course.endTime,
    daysOfWeek: course.daysOfWeek,
    teacherId: course.teacherId || 31
  }));
}
