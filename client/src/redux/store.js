import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

// store 就是用rootReducer create 一个 store 然后导出给index.js 就完事了
// 在创建 store的同时， 我们还要用一些 插件，比如 logger， 这个面试的时候可以提
// 好处 是 方便 debug，因为你每一个有关redux的操作，前后发生了什么都看得一清二楚
