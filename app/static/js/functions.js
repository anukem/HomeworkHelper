// appropriately define modulo
var mod = function (n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};

// number of days in month
var daysInMonth = (month, year) => new Date(year, month+1, 0).getDate();

// weekday of first day in month
var firstDay = (month, year) => new Date(year, month, 1).getDay();

// get month name from index
var getMonthName = (month) => [
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

// get day name from index
var getDayName = (day) => [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
][day];

// add meta-data tags
var addDateInfo = function(element, date) {
  element.dataset.month = getMonthName(date.getMonth());
  element.dataset.day = getDayName(date.getDay());
  element.dataset.date = date.getDate();
  element.dataset.year = date.getFullYear();
};

// date event listeners
var addDateEventListeners = function(element) {
  element.addEventListener('click', function() {
    // TODO
    console.log(`${element.dataset.day}, ${element.dataset.month} ${element.dataset.date} ${element.dataset.year}`);
  });
};

var generateMonthDays = function(month, year, today, currMonth, currYear) {
  var element;
  var fragment = document.createDocumentFragment();
  var days = daysInMonth(month, year)

  var daysInView = 5 * 7; // rows x days in week
  var daysCounted = 0;

  for (var i=firstDay(month, year); i > 0; i--) { // add prev month days to view
    var date = new Date(year, month,  -1 * daysCounted);

    element = document.createElement('li');
    element.className = 'prev-month date animated';
    element.innerText = date.getDate();
    addDateInfo(element, date);

    // add listeners
    addDateEventListeners(element);

    fragment.appendChild(element);
    daysCounted++;
  }

  for (var i=1; i <= days; i++) { // add current month days to view
    var date = new Date(year, month, i);

    element = document.createElement('li'); 
    element.className = 'curr-month date animated';
    // today?
    if (i == today && currMonth == month && currYear == year) {
      element.className += ' active';
      element.id = 'today';
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
};


var generateCalendar = function(index=0) {
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
};
