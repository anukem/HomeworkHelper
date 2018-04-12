function ready() {
  // load half-a-year forward and back
  var calendars = document.getElementById('calendars');
  for (var i=-6; i<=6; i++) {
    var calendarView = generateCalendar(index=i); 
    calendars.appendChild(calendarView);
  }

  // get scrollable element and jump to current month
  var calendars = document.getElementById('calendars');
  var currMonth = document.querySelector('[data-index="0"]');

  var scrollMax = calendars.scrollWidth - calendars.clientWidth;
  calendars.scrollLeft = scrollMax / 2;
}

document.onLoad = ready();
