document.querySelector('#btn-list').addEventListener('click', ({target}) => {
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
    default:break;
  }
})

async function getImageHandle(){
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

function saveImageHandle(){

}

function changeImageHandle(){

}