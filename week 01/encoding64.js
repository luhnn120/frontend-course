// 64位编码码表 0-9A-Za-z+/
let codeArr = [];
for(let i = 0; i < 62; i++){
  if(i < 10){
    codeArr.push(i)
  }else if(i < 36){
    codeArr.push(String.fromCharCode(i+55))
  }else{
    codeArr.push(String.fromCharCode(i+61))
  }
}
codeArr = codeArr.concat(['+', '/'])

// 64位编码
function encode64(num){
  // 符号位
  const flag = num > 0 ? '' : '-';
  num = Math.abs(num);
  let interger = Math.trunc(num)
  let decimals = (num - interger).toPrecision(12)
  let result = '';
  // 整数部分
  while(interger > 0){
    result = codeArr[interger%64] + result
    interger = Math.trunc(interger/64)
  }
  if(decimals > 0){
    result = result === '' ? '0.' : result += '.'
  }
  let precision = 0
  // 小数部分
  while(decimals != 0 && precision < 12){
    let tmp = decimals*64
    result += codeArr[Math.trunc(tmp)]
    decimals = (tmp - Math.trunc(tmp)).toPrecision(12)
    precision++;
  }
  return flag+result
}

// 64位解码
function deCode64(str){
  let flag = ''
  if(str[0] === '-'){
    flag = '-'
    str = str.substring(1)
  }
  str = str.split('.')
  let interger = str[0]
  let decimals = str[1] || '';
  let result = 0;
  // 整数部分
  let i = 0
  while(interger.length > 0){
    let char = interger.slice(-1)
    interger = interger.substring(0, interger.length-1)
    result += codeArr.findIndex(el => el == char)*Math.pow(64, i)
    i++;
  }
  // 小数部分
  for(i = 0; i < decimals.length; i++){
    result += codeArr.findIndex(el => el == decimals[i])*Math.pow(64, -(i+1))
  }
  return parseFloat(flag+result)
}

console.log(encode64(-16519233.094726562))
console.log(deCode64('-/111.64'))