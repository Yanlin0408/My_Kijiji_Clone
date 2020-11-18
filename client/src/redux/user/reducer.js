import { UserActionTypes } from "./types";

// 这个 state 是初始化的，经过reducer 的作用最终进入到 store 里面
const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state, // 除了currentUser 其他的 state 都保持不变， 虽然我们现在只有一个， 但也规范点写
        currentUser:
          // 如果 user 是 undefined或者是 空字符串，我们就说他是 false
          action.payload === undefined || action.payload === ""
            ? false
            : action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

// 所以说 我们的 redux 里面的 currentUser 有三个阶段： null false 或者具体的user信息
// 对应到 header 里就是 null 的时候 我什么都不显示
// 如果是 false 证明我还没登陆，我显示 login
// 如果有 user信息里，我就显示 logout 和 我的主页
