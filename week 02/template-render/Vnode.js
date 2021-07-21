let uuid = 0
class Vnode{
  constructor(tag, attr, children, parent, childrenTemplate){
    this.tag = tag
    this.attr = attr
    this.children = children
    this.parent = parent
    this.childrenTemplate = childrenTemplate
    this._uuid = this.uuid()
  }
  uuid(){
    return uuid++
  }
}