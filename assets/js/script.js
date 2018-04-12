function ready() {
  calendar_init();
  schedule_init();
}

function calendar_init() {
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

function schedule_init() {
  var today = document.getElementById('today');
  var scheduleDate = document.getElementById('schedule-date'); 

  scheduleDate.innerText = `${today.dataset.day}, ${today.dataset.month} ${today.dataset.date} ${today.dataset.year}`;
}

document.onLoad = ready();
