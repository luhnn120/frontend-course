# vue-editor-server
vue编辑器服务端代码，通过接口请求获取到代码文件后，通过webpack结合vue-loader-pulgin进行构建。demo中通过生成uuid作为唯一标识，将构建结果保存到public下的uuid目录下。并返回uuid。实际应该保存到文件服务，以fileId作为标识

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

See [Configuration Reference](https://cli.vuejs.org/config/)
