const els = {
days: document.getElementById('days'),
hours: document.getElementById('hours'),
minutes: document.getElementById('minutes'),
seconds: document.getElementById('seconds'),
heading: document.getElementById('heading'),
status: document.getElementById('status')
};


const targetDate = new Date('2026-09-05T00:00:00');
let timerId = null;


function pad(n){ return String(n).padStart(2,'0') }


function setStatus(msg, isExpired=false){
els.status.textContent = msg;
els.status.classList.toggle('expired', isExpired);
document.title = isExpired ? `⏳ ${msg}` : `${els.heading.textContent} – ${msg}`;
}


function update(diff){
const total = Math.max(0, Math.floor(diff/1000));
const d = Math.floor(total / 86400);
const h = Math.floor((total % 86400) / 3600);
const m = Math.floor((total % 3600) / 60);
const s = total % 60;
els.days.textContent = pad(d);
els.hours.textContent = pad(h);
els.minutes.textContent = pad(m);
els.seconds.textContent = pad(s);
}


function tick(){
const now = new Date();
const diff = targetDate - now;
if (diff <= 0){
update(0);
clearInterval(timerId);
timerId=null;
setStatus(`${els.heading.textContent} reached!`, true);
return;
}
update(diff);
const pretty = humanize(diff);
setStatus(`${pretty} remaining`);
}


function humanize(ms){
const total = Math.floor(ms/1000);
const d = Math.floor(total / 86400);
const h = Math.floor((total % 86400) / 3600);
const m = Math.floor((total % 3600) / 60);
const s = total % 60;
const parts = [];
if(d) parts.push(`${d} day${d!==1?'s':''}`);
if(h) parts.push(`${h} hour${h!==1?'s':''}`);
if(m) parts.push(`${m} minute${m!==1?'s':''}`);
if(!d && !h) parts.push(`${s} second${s!==1?'s':''}`);
return parts.slice(0,3).join(', ');
}


// start countdown immediately
timerId = setInterval(tick, 1000);
tick();





