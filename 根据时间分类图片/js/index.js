const tab = document.getElementById('tab');
const counts = tab.tHead.getElementsByClassName('count')[0]
const loading = document.getElementById('loadin')
let tHead = tab.tHead;
let dataItems = tHead.getElementsByClassName('date-item');

let timeStr = '2018-08-16 13:30;2018-08-16 16:00,2018-08-16 16:00;2018-08-16 17:48,2018-08-16 17:48;2018-08-17 01:00,2018-08-17 01:00;2018-08-17 09:00,2018-08-17 09:00;2018-08-17 11:56,2018-08-17 11:56;2018-08-17 15:28,2018-08-17 15:28;2018-08-17 23:35,2018-08-17 23:35;2018-08-18 07:30,2018-08-18 07:30;2018-08-18 10:10'.split(',');
let timeArr = [];
for (let i = 0; i < timeStr.length; i++) {
  let item = timeStr[i].split(';');
  timeArr.push({
    start: {
      str: item[0]
    },
    end: {
      str: item[1]
    }
  });
}
console.log(timeArr);
/*
  times: 保存表头的时间范围
  imgs:  自己选择的图片列表
  renderList: 最终渲染的数据
  outherList: 最终渲染的读取不到时间信息的数据列表
*/
// 保存表头的时间范围
let times = [];
let imgs = [];
let renderList = [];
let outherList = [];
for (let i = 0; i < dataItems.length; i++) {
  let item = dataItems[i];
  let startDate = item.getElementsByTagName('p')[0].innerHTML;
  let startTime = item.getElementsByTagName('p')[1].innerHTML;
  let endDate = item.getElementsByTagName('p')[2].innerHTML;
  let endTime = item.getElementsByTagName('p')[3].innerHTML;

  let startDateObj = startDate.split('-');
  let startTimeObj = startTime.split(':')
  let start = new Date(startDateObj[0], startDateObj[1] - 1, startDateObj[2], startTimeObj[0], startTimeObj[1]).getTime();
  // console.log('start', startDateObj, startTimeObj, start);

  let endDateObj = endDate.split('-');
  let endTimeObj = endTime.split(':')
  let end = new Date(endDateObj[0], endDateObj[1] - 1, endDateObj[2], endTimeObj[0], endTimeObj[1]).getTime();
  // console.log('end', endDateObj, endTimeObj, end);
  times[i] = {
    start,
    end
  }
}
// console.log('表头的时间范围：', times);

const fileInput = document.getElementById('file-input')
fileInput.addEventListener('change', function (ev) {
  loading.style.display = 'block';
  imgs = [];
  renderList = [];
  outherList = [];
  let files = ev.target.files;
  for (let i = 0; i < files.length; i++) {
    handlerImg(files[i]);
  }
})

function handlerImg(file) {
  EXIF.getData(file, function () {
    let reader = new FileReader();
    let src = '';
    reader.onload = function () {
      src = this.result;
      let data = EXIF.getAllTags(file);
      if (!data.DateTime) { // 无数据图片
        imgs.push({
          dateTime: '无',
          src,
          stamp: null
        })
      } else { // 有数据图片
        let dataTImeObj = data.DateTime.split(' ');
        let dataObj = dataTImeObj[0].split(':');
        let timeObj = dataTImeObj[1].split(':');
        let time = new Date(dataObj[0], (dataObj[1] - 1), dataObj[2], timeObj[0], timeObj[1], 0).getTime();
        // console.log(
        //   '图片日期：', data.DateTime, '\n',
        //   '图片src: ', src.slice(0, 10), '\n',
        //   '时间戳：', time
        // );
        imgs.push({
          dateTime: data.DateTime,
          src,
          stamp: time
        })
      }
      if (imgs.length === fileInput.files.length) {
        // console.log('imgs: ', imgs);
        handlerImgs(imgs);
      }
    }
    reader.readAsDataURL(file);
  })
}

function handlerImgs(data) {
  // console.log('handlerImgs')
  let tHeader = document.querySelector('#tab .theader');
  for (let i = 0; i < tHeader.getElementsByTagName('td').length - 1; i++) {
    renderList[i] = [];
  };
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (!item.stamp) {
      // console.log('无时间')
      outherList.push(item);
    } else {
      // console.log('有时间')
      let index = null; // 代表第几个时间范围
      for (let i = 0; i < times.length; i++) {
        if (item.stamp >= times[i].start && item.stamp <= times[i].end) {
          index = i;
          break;
        }
      }
      // console.log('index: ', index);
      if (index === null) {
        // console.log('不再范围内，按其它算')
        outherList.push(item);
      } else {
        if (renderList[index]) {
          renderList[index].push(item);
        } else {
          renderList[index] = [item];
        }
      }
    }
  }
  if (outherList.length) {
    renderList.push(outherList);
  }
  // console.log(renderList);
  render(renderList);
}
function render(data) {
  console.log('render: ', data);
  tab.tBodies[0].innerHTML = '';
  let maxLen = 0;
  for (let item of data) {
    if (item.length > maxLen) {
      maxLen = item.length;
    }
  }
  if (!maxLen) {
    return;
  }

  // for (let i = 0; i < maxLen; i++) {
  //   $(tab.tBodies[0]).append('<tr></tr>');
  //   for (let j = 0; j < data[i].length; j++) {
  //     let el = ``;
  //     console.log(data[i][j])
  //     if (data[i][j]) {

  //     }
  //     $(tab.tBodies[0]).eq(i).append()
  //   }
  // }


  let str = '';
  let strBuffer = [];
  for (let i = 0; i < maxLen; i++) {
    str += '<tr>';
    let tr = $('<tr></tr>');
    // strBuffer.push('<tr>')
    for (let j = 0; j < data.length; j++) {
      // console.log('item: ', j, i, data[j][i])
      if (data[j][i]) {
        // console.log('item: ', j, i, data[j][i])
        str += `
        <td colspan="2">
          <img width="100%" src="${data[j][i].src}" alt="">
          <p>${data[j][i].dateTime}</p>
        </td>
        `
        // strBuffer.push(`
        // <td colspan="2">
        //   <img width="100%" src="${data[j][i].src}" alt="">
        //   <p>${data[j][i].dateTime}</p>
        // </td>
        // `)
      } else {
        str += '<td colspan="2"></td>';
        // strBuffer.push('<td colspan="2"></td>');
      }
    }
    str += '</tr>';
    // strBuffer.push('</tr>')
  }
  console.log(str, tab.tBodies)
  // str = strBuffer.join('\n');
  tab.tBodies[0].innerHTML = str;
  // tab.tBodies[0].innerHTML = strBuffer.join('\n');

  let items = counts.getElementsByClassName('item');
  for (let i = 0; i < items.length; i++) {
    items[i].innerHTML = renderList[i].length;
  }
  loading.style.display = 'none';
}