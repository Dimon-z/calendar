    const shablon = [`<table>`,`<tr>`,`<th>ПН</th>`,`<th>ВТ</th>`,`<th>СР</th>`,`<th>ЧТ</th>`,`<th>ПТ</th>`,`<th>СБ</th>`,`<th>ВС</th>`,`<tr>`]
    //let ask = prompt(`введите значения в формате(местоВставки,год,месяц)`,`guf,2023,1`)
    //let args = ask.split(',',)


      function createCalendar(elem, year, month){
        if(elem===null){
            elem = `guf`
            throw new Error(`введите данные`)
        }
        let summatorHTML = [`<table>`,`<tr>`,`<th>ПН</th>`,`<th>ВТ</th>`,`<th>СР</th>`,`<th>ЧТ</th>`,`<th>ПТ</th>`,`<th>СБ</th>`,`<th>ВС</th>`,`<tr>`];
        elem = document.getElementById(elem)
        // функция заполнения календаря при обходе обькта с датами
        function daysFilling(date,dayOfWeek){
            if (dayOfWeek === 0  ) {
                summatorHTML.push(`<td>${date}</td>`)
                summatorHTML.push(`</tr><tr>`)
            } else {
                summatorHTML.push(`<td>${date}</td>`)
            }
        }
        //вспомогательная функция, функция заполняет пустые ячейки перед первой датой
        function fillEmptyDaysStart(day) {
          if (+day === 0) {
              day = 7
          }
          if (day>1) {
              for (let index = 1; index < day; index++) {
                  summatorHTML.push(`<td></td>`);
              }
          }
        }
       //вспомогательная функция, заполняет ячейки после последней даты
        function fillEmptyDaysEnd(day) {
            if (day === 0){
              return;
            }
            if (day<6) {
                for (let index = day; index < 7; index++) {
                    summatorHTML.push(`<td>  </td>`);
                }
            }
            summatorHTML.push(`</tr>`)
        }
        //основная функция создания календаря
          const jsMonth = month - 1;
          const date = new Date(year, jsMonth,)
          const firstDay = date.getDay()
          const daysObj = {};
          const day = 60 * 60 * 24 * 1000;
          const lastDayOfMonth = new Date(year,month,0).getDate();
          const lastday = new Date(year,month,0).getDay()
          for (let i = 0; i < lastDayOfMonth; i++ ) {
              let newDay = new Date(date.getTime()+day*i)
              daysObj[i+1] = newDay.getDay() 
          };
          //debugger;
          fillEmptyDaysStart(firstDay)
          for (const key in daysObj) {
              daysFilling(key,daysObj[+key])
          }
          fillEmptyDaysEnd(lastday)
          let hTML = summatorHTML.toString();
          hTML = hTML.replaceAll(',','')
          summatorHTML = [];
          summatorHTML = shablon;
          if(year === `clear`){
            elem.innerHTML = ``
          } else {
            elem.innerHTML = hTML
          }
      }
    //createCalendar(...args);
    //console.log(`guf,2023,1`)
    button.onclick = () => createCalendar(...document.getElementById('args').value.split(`,`))