import { combineReducers } from "redux";

import userReducer from "./user/reducer";

export default combineReducers({
  user: userReducer,
});
// reducer 是 处理器。
// 所有reducer 都到这里来，先导入，在combineReducers就完事了
