## IDE配置

推荐使用[VSCode](https://code.visualstudio.com/)，安装以下2个扩展
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- 如果以前安装过Vetur，请禁用掉

## 安装和使用

### 安装
```sh
yarn
```

### 开发环境

```sh
yarn dev
```

### 编译

```sh
yarn build
```

需要注意的是：编译后的文件会额外`import huijiwiki.css`，需要手工移除，目前没找到更好的方法
