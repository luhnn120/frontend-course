class Engine{
  constructor() {
    // 根据uuid 查找vnode
    this.nodeMap = new Map()
    // 全局的data
    this.scopeGolbal = null
  }
  render(template, data) {
    this.scopeGolbal = data
    // 闭合标签
    const regxClosedTag = /<(\w+)\s*([^>]*)>([^<]*)<\/\1>/gm;
    // 自闭合标签
    const regxSelfClosedTag = /<(\w+)\s*([^(/>)]*)\/>/gm;
    // 去除换行
    template = template.replace(/\n/gm, "");
    while(regxClosedTag.test(template) || regxSelfClosedTag.test(template)){
      template = template.replace(regxClosedTag, (match, p1, p2,p3) => {
        return this.replaceTemplateToNode(p1,p2,p3)
      })
      template = template.replace(regxSelfClosedTag, (match, p1, p2) => {
        return this.replaceTemplateToNode(p1,p2)
      })
    }
    let dom;
    // 生成根元素
    template.replace(/\$\((.*?)\)/, (match, p1) => {
      dom = this.createdChildren(p1)
      return '';
    })
    return dom
  }
  replaceTemplateToNode(tag, attr, content){
    let children = []
    while(/\$\((.*?)\)/.test(content)){
      // 存在children
      content = content.replace(/\$\((.*?)\)/, (match, p1) => {
        // 直接生成dom保存
        children.push(this.createdChildren(p1))
        return '';
      })
    }
    while(/\{\{(.*?)\}\}/gm.test(content)){
      // 存在{{}}变量
      content = this.variablesHandle(content)
    }
    // 处理属性
    attr = attr.split(' ')
    attr = attr.map(el => {
      el = el.split('=')
      let key = el[0],
        value = el[1].replace(/"/g, '')
      value = this.variablesHandle(value)
      // 属性为指令
      if (/^v-/.test(key)) {
        value = this.variablesHandle(`{{${value}}}`);
        ({ key, value} = this.directiveHandle(key,value))
      }
      return {
        key,
        value
      }
    })
    const node = new Vnode(tag, attr, children, null, content)
    this.nodeMap.set(node._uuid+'', node)
    return `$(${node._uuid})`
  }
  directiveHandle(key, value) {
    // 简略的指令处理方式
    if (key === 'v-if') {
      key = 'style'
      value = value !== "false" ? "" : "display: none;";
    }
    return {key, value}
  }
  variablesHandle(str) {
    // 存在{{}}变量
    return str.replace(/\{\{(.*?)\}\}/gm, (match, p1) => {
      const keyList = p1.trim().split('.');
      let result = this.scopeGolbal;
      for (let i = 0; i < keyList.length; i++) {
        result = result[keyList[i]];
      }
      return result
    })
  }
  createdChildren(uuid) {
    // 生成子元素dom
    const node = this.nodeMap.get(uuid)
    return node.render()
  }
}