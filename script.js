/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
const shablon = ['<table>', '<tr>', '<th>ПН</th>', '<th>ВТ</th>', '<th>СР</th>', '<th>ЧТ</th>', '<th>ПТ</th>', '<th>СБ</th>', '<th>ВС</th>', '<tr>'];
// let ask = prompt(`введите значения в формате(местоВставки,год,месяц)`,`guf,2023,1`)
// let args = ask.split(',',)
const [element, year, month] = document.getElementById('args').value.split(',');
const nextMonth = document.getElementsByClassName('nextMonth');
const prevMonth = document.getElementsByClassName('prevMonth');

function createCalendar(elem, year, month) {
  if (elem === null) {
    elem = 'guf';
    throw new Error('введите данные');
  }

  let summatorHTML = ['<table>', '<tr>', '<th>ПН</th>', '<th>ВТ</th>', '<th>СР</th>', '<th>ЧТ</th>', '<th>ПТ</th>', '<th>СБ</th>', '<th>ВС</th>', '<tr>'];
  elem = document.getElementById(elem);
  // функция заполнения календаря при обходе обькта с датами
  function daysFilling(date, dayOfWeek) {
    if (dayOfWeek === 0) {
      summatorHTML.push(`<td>${date}</td>`);
      summatorHTML.push('</tr><tr>');
    } else {
      summatorHTML.push(`<td>${date}</td>`);
    }
  }
  // вспомогательная функция, функция заполняет пустые ячейки перед первой датой
  function fillDaysStart(day) {
    if (day === 0) {
      day = 7;
    }
    if (day === 1) {
      day = 8;
    }
    if (day > 1) {
      for (let index = day; index > 1; index--) {
        const pastDay = new Date(date.getTime() - 60 * 60 * 24 * 1000 * (index - 1)).getDate();
        summatorHTML.push(`<td class = 'prevMonth', input onkeydown=''> ${pastDay} </td>`);
      }
      if (day === 8) {
        summatorHTML.push('</tr><tr>');
      }
    }
  }

  // вспомогательная функция, заполняет ячейки после последней даты
  function fillEmptyDaysEnd(day) {
    if (day === 0) {
      summatorHTML.push('<tr>');
      // day = 7;
    }
    if (day < 8) {
      counter = 0;
      for (let index = day; index < 7; index++) {
        counter++;
        const nextDay = new Date(lastDayDate.getTime() + 60 * 60 * 24 * 1000 * counter).getDate();
        summatorHTML.push(`<td class = 'nextMonth', input onkeydown='return createCalendar(${year, month + 1})'> ${nextDay} </td>`);
      }
    }
    summatorHTML.push('</tr>');
  }
  // основная функция создания календаря
  const jsMonth = month - 1;
  const date = new Date(year, jsMonth);
  const firstDay = date.getDay();
  const daysObj = {};
  const day = 60 * 60 * 24 * 1000;
  const lastDayDate = new Date(year, month, 0);
  const lastDayOfMonth = lastDayDate.getDate();
  const lastday = lastDayDate.getDay();
  for (let i = 0; i < lastDayOfMonth; i++) {
    const newDay = new Date(date.getTime() + day * i);
    daysObj[i + 1] = newDay.getDay();
  }
  // debugger;
  fillDaysStart(firstDay);
  // fillEmptyDaysStart(firstDay);
  for (const key in daysObj) {
    daysFilling(key, daysObj[+key]);
  }
  fillEmptyDaysEnd(lastday);
  let hTML = summatorHTML.toString();
  hTML = hTML.replaceAll(',', '');
  summatorHTML = [];
  summatorHTML = shablon;
  if (year === 'clear') {
    elem.innerHTML = '';
  } else {
    elem.innerHTML = hTML;
  }
  function createCalendarNext() {
    if (month == 12) {
      return createCalendar(element, +year + 1, 1);
    }
    return createCalendar(element, year, +month + 1);
  }
  function createCalendarPrev() {
    if (month == 1) {
      return createCalendar(element, +year - 1, 12);
    }
    return createCalendar(element, year, +month - 1);
  }
  for (let i = 0; i < nextMonth.length; i++) {
    nextMonth[i].addEventListener('click', createCalendarNext, true);
  }
  for (let i = 0; i < prevMonth.length; i++) {
    prevMonth[i].addEventListener('click', createCalendarPrev, false);
  }
  console.log(year, month);
}

// createCalendar(...args);
// console.log(`guf,2023,1`)
button.onclick = () => createCalendar(...document.getElementById('args').value.split(','));
/* createCalendar(`guf`,2023,2); */
