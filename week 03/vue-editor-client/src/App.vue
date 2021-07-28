<template>
  <div>
    <h1>vue-editor</h1>
    <MonacoEditor
      width="800"
      height="500" 
      theme="vs-dark" 
      language="javascript" 
      :editorMounted="onEditorMounted" 
      :options="options"
    ></MonacoEditor>
    <button @click="choseFileHandle">get vue file</button>
    <button @click="saveFileHandle">save file</button>
    <button @click="runFileHandle">Run it</button>
  </div>
</template>

<script>
  import MonacoEditor from 'monaco-editor-vue';
  import Axios from 'axios';
  export default {
    name: "App",
    components: {
      MonacoEditor
    },
    data() {
      return {
        options: {
          value: '', // 初始值
          foldingStrategy: 'indentation', // 代码可分小段折叠
          automaticLayout: true, // 自适应布局
          overviewRulerBorder: false, // 不要滚动条的边框
          autoClosingBrackets: true,
          tabSize: 2, // tab 缩进长度
          minimap: {
            enabled: false, // 不要小地图
          },
        },
        editor: null, 
        monaco: null,
      }
    },
    methods: {
      // 运行文件
      async runFileHandle(){
        const formData = new FormData();
        formData.append('file', new Blob([this.editor.getValue()],{type:"text/plain;charset=utf-8"}))
        Axios.post('http://localhost:3000/generateComponents',formData,{
          header:{
           ' Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err);
        })
      },
      // 文件选择
      async choseFileHandle() {
        const pickerOpts = {
          types: [{
            description: 'file',
            accept: {
              'file/*': ['.vue']
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
          this.editor.setValue(event.target.result)
        }
        reader.readAsText(fileData)
      },
      // 文件保存
      async saveFileHandle(){
        const opts = {
          types: [{
            description: 'file',
            accept: {'file/*': ['.vue']},
          }],
        };
        let fileHandle;
        // 创建文件写入的writableStream
        fileHandle = await window.showSaveFilePicker(opts);
        const writable = await fileHandle.createWritable();
        // 将edtior内容转换为blob对象 
        const fileBolb = new Blob([this.editor.getValue()],{type:"text/plain;charset=utf-8"})
        // 写入文件
        await writable.write(fileBolb);
        await writable.close();
      },
      // 编辑器初始化
      onEditorMounted(editor, monaco) {
        this.editor = editor
        this.monaco = monaco
      },
    }
  };
</script>
<style scoped>
  button {
    outline: unset;
    border: unset;
    border-radius: 10px;
    background-color: coral;
    color: #f5f5f5;
    height: 40px;
    line-height: 40px;
    width: 100px;
    text-align: center;
    margin: 10px;
    padding: unset;
  }
</style>