import $ from 'jquery'

// 渲染星期
function renderDayRegion () { // 
  let cnWeekArr = ['一', '二', '三', '四', '五', '六', '日'];
  let str = '';

  $(cnWeekArr).each((index, item) => {
    str += `<li class="day-item">${item}</li>`;
  })
  $('.day-region').html(str);
}
renderDayRegion();

// 渲染日期
function renderDateRegion (obj) {
  let dateEl = $('.date-wrapper');
  dateEl.html('');
  let currentTime = new Date();

  // 当月第一天是星期几
  let computedDayDate;
  if (!obj) {
    computedDayDate = new Date();
  } else {
    computedDayDate = new Date(
      obj.year, obj.month, 1, 0, 0, 0
    )
  }
  // console.log('当月的时间：', computedDayDate.toLocaleString());
  computedDayDate.setDate(1);
  let firstDay = computedDayDate.getDay() ? computedDayDate.getDay() : 7;
  
  // console.log('当月第一天是星期', firstDay)
  // 当月一共多少天
  let currentMonth;
  if (!obj) {
    currentMonth = new Date().getMonth()
  } else {
    currentMonth = new Date(
      obj.year, obj.month, 1, 0, 0, 0
    ).getMonth()
  }
  let nextMonth = currentMonth + 1;
  // console.log('下一个月是：', nextMonth)
  let currentDate;

  if (!obj) {
    currentDate = new Date();
  } else {
    currentDate = new Date(obj.year, nextMonth, 0, 0, 0, 0);
  }

  let currentDateObj = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    date: currentDate.getDate()
  }
  let currentMonthDayLenDate = new Date(
    currentDateObj.year, nextMonth, 0, 0, 0, 0
  );
  let currentMonthDayLen = currentMonthDayLenDate.getDate();
  // console.log('当月的天数', currentMonthDayLen);

  // 需要显示的上个月天数和这个月日期加起来一共多少天
  let maxDayLen = (firstDay - 1) + currentMonthDayLen;

  // console.log('需要显示的上个月天数和这个月日期加起来', maxDayLen)
  let maxRow = Math.ceil(maxDayLen / 7);
  // console.log('这个月一共跨越了' + maxRow + '周');

  let str = '';
  let j, k = 0;

  for (let i = 0; i < maxRow; i++) {
    str += '<li class="date-row"><ul class="date-item-list clearfix">';
    for (j = 0; j < 7;) {
      j++;
      k++;
      if (k > maxDayLen) {
        break;
      }
      let h = 264 / maxRow;
      if (k < firstDay) {
        str += '<li class="date-item" style="height:'+ h +'px;line-height:'+ h +'px"></li>';
      } else {
        str += '<li class="date-item" style="height:'+ h +'px;line-height:'+ h +'px">'+ (k - firstDay + 1) +'</li>';
      }
    }
    str += '</ul></li>';
  }
  dateEl.html(str);
}
renderDateRegion();

// renderDateRegion({year: 2020, month: 2});

let currentDate = new Date();
let currentDateObj = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth()
}

function displayCurrentDate() {
  let date = new Date(currentDateObj.year, currentDateObj.month, 1,0,0,0);
  let str = '';
  str = `${date.getFullYear()}年${date.getMonth() + 1}月`;
  $('.button-region .current-date').html(str);
}
displayCurrentDate();

function nextMonth () {
  currentDateObj.month++;
  renderDateRegion(currentDateObj);
  displayCurrentDate();
}
function prevMonth () {
  currentDateObj.month--;
  renderDateRegion(currentDateObj);
  displayCurrentDate();
}
$('.toPrevMonthBtn').on('click', prevMonth);
$('.toNextMonthBtn').on('click', nextMonth);

