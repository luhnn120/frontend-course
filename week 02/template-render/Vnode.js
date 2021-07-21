let uuid = 0
class Vnode{
  constructor(tag, attr, children, parent, context){
    this.tag = tag
    this.attr = attr
    this.children = children
    this.parent = parent
    this.context = context
    this._uuid = this.uuid()
  }
  render() {
    // 生成dom对象
    const dom = document.createElement(this.tag)
    this.setAttr(dom)
    // 子元素
    for (let i = 0; i < this.children.length; i++) {
      dom.appendChild(this.children[i])
    }
    // 文本内容
    if (this.context) {
      dom.appendChild(document.createTextNode(this.context));
    }
    return dom;
  }
  setAttr(dom) {
    // 设置属性
    for (let i = 0; i < this.attr.length; i++) {
      dom.setAttribute(this.attr[i].key, this.attr[i].value)
    }
  }
  uuid(){
    return uuid++
  }
}