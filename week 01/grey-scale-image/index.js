document.querySelector('#btn-list').addEventListener('click', ({
  target
}) => {
  switch (target.name) {
    case 'get':
      getImageHandle();
      break;
    case 'save':
      saveImageHandle();
      break;
    case 'change':
      changeImageHandle();
      break;
    default:
      break;
  }
})

async function getImageHandle() {
  const pickerOpts = {
    types: [{
      description: 'Images',
      accept: {
        'image/*': ['.png', '.gif', '.jpeg', '.jpg']
      }
    }],
    excludeAcceptAllOption: true,
    multiple: false
  };
  let fileHandle;
  // 获取本地文件
  [fileHandle] = await window.showOpenFilePicker(pickerOpts);
  const fileData = await fileHandle.getFile();
  // 创建filereader读取文件
  const reader = new FileReader();
  reader.onload = (event) => {
    // 文件内容赋值
    document.querySelector('#source').src = event.target.result
  }
  reader.readAsDataURL(fileData)
}

// 文件保存
function saveImageHandle() {
  const c = document.querySelector("#grey-img");
  aDom.href = URI
  aDom.click();
}

function changeImageHandle() {
  var c = document.querySelector("#grey-img");
  var ctx = c.getContext("2d");
  var imgSource = document.querySelector("#source");
  const h = imgSource.clientHeight,
    w = imgSource.clientWidth
  ctx.drawImage(imgSource, 0, 0, w, h);
  var imgData = ctx.getImageData(0, 0, w, h);
  for (var i = 0; i < imgData.data.length; i += 4) {
    var R = imgData.data[i]; //R(0-255)
    var G = imgData.data[i + 1]; //G(0-255)
    var B = imgData.data[i + 2]; //G(0-255)
    var Alpha = imgData.data[i + 3]; //Alpha(0-255)
    //浮点算法
    // var gray = R * 0.299 + G * 0.587 + B * 0.114;
    //整数算法
    //  var gray = (R*299 + G*587 + B*114 + 500) / 1000;　
    //移位算法
    //  var gray =(R*76+G*151+B*28)>>8;
    //平均值算法
    var gray = Math.floor((R + G + B) / 3);
    imgData.data[i] = gray;
    imgData.data[i + 1] = gray;
    imgData.data[i + 2] = gray;
    imgData.data[i + 3] = Alpha;
  }
  ctx.putImageData(imgData, 0, 0);
  // console.log(c.toDataURL())
  // document.querySelector("#grey-img").src = c.toDataURL();
}