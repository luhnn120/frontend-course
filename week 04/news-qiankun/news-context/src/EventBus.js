const eventEmitter = {};
eventEmitter.list = {};

eventEmitter.on = function (key, event) {
  if (!this.list[key]) {
    this.list[key] = [];
  }
  this.list[key].push(event);
};

eventEmitter.commit = function (...arg) {
  // 事件第一个参数为key
  const key = [].shift.call(arg);
  const fns = this.list[key];
  // 事件不存在返回空
  if (!fns || fns.length === 0) {
    return false;
  }
  fns.forEach(fn => {
    fn.apply(this, arg);
  });
  return null;
};

export default eventEmitter;
