function ready() {
  // init interface
  calendar_init();
  schedule_init();
  assignments_init();
}

function assignments_init() {
  var today = document.getElementById('today');
  var date = {
    day: today.dataset.date,
    month: today.dataset.monthNum,
    year: today.dataset.year
  }
  // getAssignments(null, today, loadAssignments);
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

  var scrollMax = calendars.scrollWidth - calendars.clientWidth;
  calendars.scrollLeft = scrollMax / 2;
}

function schedule_init() {
  var today = document.getElementById('today');
  var scheduleDate = document.getElementById('schedule-date');
  var scheduleTime = document.getElementById('schedule-time');
  var plannerWrapper = document.querySelector('.planner-section');

  addScheduleHourEventListeners();
  addBacklightEventListeners();

  // get scrollable element and jump to middle
  var scrollMax = plannerWrapper.scrollHeight - plannerWrapper.clientHeight;
  plannerWrapper.scrollTop = scrollMax / 2;

  // put appropriate date
  scheduleDate.innerText = `${today.dataset.day}, ${today.dataset.month} ${today.dataset.date} ${today.dataset.year}`;
  var date = {
    day: today.dataset.date,
    month: today.dataset.monthNum,
    year: today.dataset.year
  }
  getDateSchedule(date, today, loadSchedule);
  // -> TODO: jump to first course
}

document.onLoad = ready();
