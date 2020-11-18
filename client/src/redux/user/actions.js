import { UserActionTypes } from "./types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
// action 就是你定义一个动作，然后接下来会放到 reducer 处理器 处理这个动作。
// 格式就是 里面一个 type， 一个payload， payload就是信息，你传递进来的信息
