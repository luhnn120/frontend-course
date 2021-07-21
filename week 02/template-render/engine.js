class Engine{
  constructor(){}
  render(templte, data){
    // StringToNode
    // 处理闭合标签
    const regxClosedTag = /<(\w+)\s*([^>]*)>([^<]*)<\/\1>/gm;
    // 处理自闭合标签
    const regxSelfClosedTag = /<(\w+)\s*([^(/>)]*)\/>/gm;
    // 去除换行
    template = template.replace(/\n/gm, "");
    while(regxClosedTag.test(templte) || regxSelfClosedTag.test(templte)){
      templte = templte.replace(regxClosedTag, (match, p1, p2,p3) => {
        return this.replaceTemplateToNode(p1,p2,p3)
      })
      templte = templte.replace(regxSelfClosedTag, (match, p1, p2) => {
        return this.replaceTemplateToNode(p1,p2)
      })
    }
    // 处理变量
    // templte = templte.replace(/\{\{(.*?)\}\}/gm, (match, p1, offset, string) => {
    //   const key = p1.trim();
    //   return data[key]
    // })
    // console.log(templte)
    // 构建 vnode tree
    // vnode tree => dom tree
    return document.createElement('div')
  }
  mounted(){}
  replaceTemplateToNode(tag, attr, content){
    let children = []
    while(/\$\((.*?)\)/.test(content)){
      // 存在children
      content = content.replace(/\$\((.*)\)/, (match, p1) => {
        children.push(this.createdChildren(p1))
        return '';
      })
    }
    const node = new Vnode(tag, attr, children, null, content)
    return `$(${node._uuid})`
  }
  createdChildren(uuid){
    console.log(uuid)
    return uuid
  }
}