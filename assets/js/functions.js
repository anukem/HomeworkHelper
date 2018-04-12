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

var generateMonthDays = function(month, year, today, currMonth, currYear) {
  var element;
  var fragment = document.createDocumentFragment();
  var days = daysInMonth(month, year)

  var daysInView = 5 * 7; // rows x days in week
  var daysCounted = 0;

  for (var i=firstDay(month, year); i > 0; i--) { // add prev month days to view
    var date = new Date(year, month,  -1 * daysCounted).getDate();

    element = document.createElement('li');
    element.className = 'prev-month date';
    element.innerText = date;
    // TODO: add listeners

    fragment.appendChild(element);
    daysCounted++;
  }

  for (var i=1; i <= days; i++) { // add current month days to view
    element = document.createElement('li'); 
    element.className = `curr-month date ${(i == today && currMonth == month && currYear == year) ? 'active' : '' }`;
    element.innerText = i;
    // TODO: add listeners

    fragment.appendChild(element);
    daysCounted++;
  }

  var daysLeft = daysInView - daysCounted;
  for (var i=1; i <= daysLeft; i++ ) { // add next month days to view

    element = document.createElement('li'); 
    element.className = 'next-month date';
    element.innerText = i;
    // TODO: add listeners

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

  var targetMonth = (currMonth + index) % 12;
  var targetFunc = (currMonth + index > 0) ? Math.floor : Math.ceil; // symmetric rounding
  var targetYear = targetFunc((currMonth + index) / 12) + currYear;

  var root;
  var element;
  var subelement;
  var fragment = document.createDocumentFragment(); // chunk

  // calendar obj 
  root = document.createElement('div');
  root.className = 'calendar-object center rounded';
  root.dataset.index = index.toString();
  if (index == 0) root.id = 'current';

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

  console.log(fragment);
  
  return fragment; // append to HTML
};
