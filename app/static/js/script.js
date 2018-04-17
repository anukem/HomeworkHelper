function ready() {
  // init interface
  calendar_init();
  schedule_init();

  // course detail modal
  var detailModal = document.getElementById('detail-modal');
  detailModal.addEventListener('click', event => {
    detailModal.style.display = 'none';
  });

  // course create modal
  var createModal = document.getElementById('create-modal');
  document.querySelectorAll('.hours-container .hour').forEach((elem, i) => {
    var dataHour = elem.dataset.hour;
    elem.addEventListener('click', event => {
      createModal.style.display = 'block';
    });
  });
  var closeCreateModal = document.getElementById('close-create');
  closeCreateModal.addEventListener('click', event => {
      createModal.style.display = 'none';
  });
}

function calendar_init() {
  // load half-a-year forward and back
  var calendars = document.getElementById('calendars');
  for (var i=-12; i<=12; i++) {
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
  var plannerWrapper = document.querySelector('.planner-section');

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
}

document.onLoad = ready();
