// format time as str
var getStrTimeFromSeconds = function(secs) {
  var hours = Math.floor(secs / 3600);
  secs -= hours * 3600;
  var minutes = Math.floor(secs / 60);
  secs -= minutes * 60;

  var pm = false;
  if (hours == 0 && minutes) {
    hours = 12;
  } else if (hours > 12) {
    pm = true;
    hours -= 12;
  }
return `${hours}:${minutes} ${pm ? ('PM') : ('AM')}`;
};

// appropriately define modulo
var mod = function(n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};

// number of days in month
function daysInMonth(month, year) { return new Date(year, month+1, 0).getDate(); }

// weekday of first day in month
function firstDay(month, year) {return new Date(year, month, 1).getDay(); }

// get month name from index
function getMonthName(month) {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ][month];
}

// get day name from index
function getDayName(day) {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ][day];
}

// add meta-data tags
function addDateInfo(element, date) {
  element.dataset.month = getMonthName(date.getMonth());
  element.dataset.monthNum = date.getMonth();
  element.dataset.day = getDayName(date.getDay());
  element.dataset.date = date.getDate();
  element.dataset.year = date.getFullYear();
}


function generateMonthDays(month, year, today, currMonth, currYear) {
  var element;
  var fragment = document.createDocumentFragment();
  var days = daysInMonth(month, year)

  var daysInView = 5 * 7; // rows x days in week
  var daysCounted = 0;

  var daysPrev = [];
  for (var i=firstDay(month, year); i > 0; i--) { // add prev month days to view
    var date = new Date(year, month,  -1 * daysCounted);

    element = document.createElement('li');
    element.className = 'prev-month date animated';
    element.innerText = date.getDate();
    addDateInfo(element, date);

    // add listeners
    addDateEventListeners(element);

    daysPrev.push(element);
    daysCounted++;
  }
  daysPrev.reverse(); // correct backwards
  daysPrev.forEach(function(element) {
    fragment.appendChild(element);
  });

  for (var i=1; i <= days; i++) { // add current month days to view
    var date = new Date(year, month, i);

    element = document.createElement('li');
    element.className = 'curr-month date animated';
    // today?
    if (i == today && currMonth == month && currYear == year) {
      element.id = 'today';
      element.className += ' active';
    }
    element.innerText = i;
    addDateInfo(element, date);

    // add listeners
    addDateEventListeners(element);

    fragment.appendChild(element);
    daysCounted++;
  }

  var daysLeft = daysInView - daysCounted;
  for (var i=1; i <= daysLeft; i++ ) { // add next month days to view
    var date = new Date(year, month+1, i);

    element = document.createElement('li');
    element.className = 'next-month date animated';
    element.innerText = i;
    addDateInfo(element, date);

    // add listeners
    addDateEventListeners(element);

    fragment.appendChild(element);
    daysCounted++;
  }

  return fragment; // document fragment
}


function generateCalendar(index=0) {
  /*
    @param index: relative to current month (0) prev < 0 && next > 0
   */
  var now = new Date();
  var today = now.getDate(); // today
  var currMonth = now.getMonth();
  var currYear = now.getFullYear();

  var targetMonth = mod((currMonth + index), 12);
  var targetYear = Math.floor((currMonth + index) / 12) + currYear;

  var root;
  var element;
  var subelement;
  var fragment = document.createDocumentFragment(); // chunk

  // calendar obj
  var width = 300;
  root = document.createElement('div');
  root.className = 'calendar-object inline-block center rounded';

  root.dataset.index = index;
  root.style.width = `${width}px`;

  // position relative to OG calendar
  if (index == 0) root.id = 'current-month';

  fragment.appendChild(root);

  // calendar name
  element = document.createElement('div');
  element.className = 'calendar-month-section';
  element.innerText = getMonthName(targetMonth);

  root.appendChild(element);

  // calendar weekdays
  element = document.createElement('div');
  element.className = 'calendar-weekdays-section';

  subelement = document.createElement('ul');
  subelement.className = 'weekdays flex center';
  subelement.innerHTML = '<li>S</li><li>M</li><li>T</li><li>W</li><li>T</li><li>F</li><li>S</li>';

  element.appendChild(subelement);
  root.appendChild(element);

  // calendar days
  element = document.createElement('div');
  element.className = 'calendar-days-section';

  subelement = document.createElement('ul');
  subelement.className = 'days flex center';
  subelement.appendChild(generateMonthDays( // get appropriate view
    targetMonth,
    targetYear,
    today,
    currMonth,
    currYear,
  ));

  element.appendChild(subelement);
  root.appendChild(element);

  return fragment; // document fragment
}


/* EVENT LISTENERS */

// POST to '/api/courses' w/ date
function loadSchedule(err, parentElement, respData) {
  if (err) return console.log('ERROR pulling schedule:', err);

  var courses = respData.courses;
  var planner = document.getElementById('planner');

  // change schedule headers
  var scheduleDate = document.getElementById('schedule-date');
  scheduleDate.innerText = `${parentElement.dataset.day}, ${parentElement.dataset.month} ${parentElement.dataset.date} ${parentElement.dataset.year}`;

  var timeOffset = hour => Math.floor((planner.offsetHeight / 24) * hour);

  var fragment = document.createDocumentFragment();
  courses.forEach(course => {
    var colorClass;
    var randomNum = Math.random();
    if (randomNum > .66) {
      colorClass = 'a';
    } else if (randomNum > .33) {
      colorClass = 'b';
    } else {
      colorClass = 'c';
    }

    var hours = secs => secs / 3600;

    // create course div
    var elem = document.createElement('div');
    elem.className = `course ${colorClass} absolute rounded`;
    elem.style.top = timeOffset(course.startTime/3600) + 'px';
    elem.style.height = timeOffset(course.duration/3600) + 'px';

    elem.dataset.professor = course.professor;
    elem.dataset.courseId = course.courseId;
    elem.dataset.name = course.courseName;
    elem.dataset.location = course.location;
    elem.dataset.startTimeSeconds = course.startTime;
    elem.dataset.endTimeSeconds = course.endTime;

    elem.dataset.startTime = getStrTimeFromSeconds(course.startTime);
    elem.dataset.endTime = getStrTimeFromSeconds(course.endTime);

    var subelem = document.createElement('h3');
    subelem.className = 'course-title';
    subelem.innerText = course.courseName;
    elem.append(subelem);

    if (parseInt(course.duration) > 3600) { // add course-meta in bubble
      subelem = document.createElement('h4');
      subelem.className = 'course-meta';
      subelem.innerText= `${elem.dataset.startTime} @ ${course.location}`;
      elem.append(subelem);
    }

    fragment.appendChild(elem);
  });

  // add courses to schedule DOM
  planner.appendChild(fragment);
}

// date event listeners
function addDateEventListeners(element) {
  var commonClassName = 'date';
  var activeClass = 'active';


  // $(li.date).onCLick
  element.addEventListener('click', function(event) {
    // remove active class from others
    Array.from(document.querySelectorAll('.'+commonClassName)).some((date) => {
      if (date.classList.contains(activeClass)) {
        date.classList.remove(activeClass);
        return true;
      }
    });
    // add active class
    element.className += ' active'

    // clear planner
    document.getElementById('planner').innerHTML = '';

    // AJAX Request
    return getDaySchedule(element.dataset.date, element.dataset.monthNum, element.dataset.year, element, loadSchedule);
  });
}
