// Elements of real-time clock
const elemTime = {
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
  milliseconds: document.querySelector("#milliseconds"),
};

// Elements of tick clock
const elemTicks = {
  tickrate: document.querySelector("#tickrate"),
  ticks: document.querySelector("#ticks")
};

const values = {
  hr: 0,
  min: 0,
  sec: 0,
  ms: 0,
  tps: 60,
  ticks: 0
};

function updateValues () {
  values.hr = parseInt(elemTime.hours.value) || 0;
  values.min = parseInt(elemTime.minutes.value) || 0;
  values.sec = parseInt(elemTime.seconds.value) || 0;
  values.ms = parseInt(elemTime.milliseconds.value) || 0;
  values.tps = parseInt(elemTicks.tickrate.value) || 60;
  values.ticks = parseInt(elemTicks.ticks.value) || 0;
}

function updateTickClock () {
  // Update values from UI
  updateValues();
  // Calculate ticks from real time
  let seconds = values.hr * 60 * 60 + values.min * 60 + values.sec;
  let ticks = seconds * values.tps + Math.round(values.ms * (values.tps / 1000));
  // Write output to UI
  elemTicks.ticks.value = ticks;
}

function updateTimeClock () {
  // Update values from UI
  updateValues();
  // Calculate seconds from ticks
  let seconds = values.ticks / values.tps;
  // Write output to UI
  elemTime.hours.value = Math.floor(seconds / 3600);
  elemTime.minutes.value = Math.floor(seconds % 3600 / 60);
  elemTime.seconds.value = Math.floor(seconds % 3600 % 60);
  elemTime.milliseconds.value = Math.round(seconds % 3600 % 60 * 1000 % 1000);
}

function sanitizeInput (event) {
  const charCode = event.which ? event.which : event.keyCode
  return !(charCode > 31 && (charCode < 48 || charCode > 57))
}

for (const curr in elemTime) {
  elemTime[curr].oninput = updateTickClock;
  elemTime[curr].onkeypress = sanitizeInput;
}
for (const curr in elemTicks) {
  elemTicks[curr].oninput = updateTimeClock;
  elemTicks[curr].onkeypress = sanitizeInput;
}
