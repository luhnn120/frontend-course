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

// 图片下载
function saveImageHandle() {
  const c = document.querySelector("#grey-img");
  c.toBlob((blob) => {
    // 创建a标签，触发click实现下载
    const aDom = document.createElement('a')
    const downLoadUrl =  URL.createObjectURL(blob)
    aDom.href = downLoadUrl
    aDom.setAttribute('download','')
    aDom.click();
    URL.revokeObjectURL(downLoadUrl)
  })
}

// 灰度图转换
function changeImageHandle() {
  const c = document.querySelector("#grey-img");
  const ctx = c.getContext("2d");
  const imgSource = document.querySelector("#source");
  const h = imgSource.clientHeight,
    w = imgSource.clientWidth
  // 画布初始大小
  c.width = imgSource.naturalWidth;
  c.height = imgSource.naturalHeight;
  ctx.drawImage(imgSource, 0, 0, w ,h);
  const imgData = ctx.getImageData(0, 0, w, h);
  // 绘制完后，调整展示大小
  c.width = w
  c.height = h
  // 灰度转换
  for (let i = 0; i < imgData.data.length; i += 4) {
    const R = imgData.data[i]; //R(0-255)
    const G = imgData.data[i + 1]; //G(0-255)
    const B = imgData.data[i + 2]; //G(0-255)
    const Alpha = imgData.data[i + 3]; //Alpha(0-255)
    //浮点算法
    // const gray = R * 0.299 + G * 0.587 + B * 0.114;
    //整数算法
    //  const gray = (R*299 + G*587 + B*114 + 500) / 1000;　
    //移位算法
    //  const gray =(R*76+G*151+B*28)>>8;
    //平均值算法
    const gray = Math.floor((R + G + B) / 3);
    imgData.data[i] = gray;
    imgData.data[i + 1] = gray;
    imgData.data[i + 2] = gray;
    imgData.data[i + 3] = Alpha;
  }
  // 重新绘制
  ctx.putImageData(imgData, 0, 0);
}