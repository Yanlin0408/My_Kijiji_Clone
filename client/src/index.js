import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

// redux在这里要给整个React 提供这个便利商店 store
// 还是那句话 index。js永远是文件的核心，这里只不过东西少而已，但是它包括了<App />
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
// 说一下 index.js App.js 有什么区别，为什么不放在一起写
// index.js 主要存储redux 的 store 没别的东西，他是直接和DOM文件相连的
// App.js 我们喜欢在App.js 里面更新redux store，另外一个重要功能就是 分配页面

// 这里再说一下，React DOM 和 真是的browser DOM 有什么区别。
