import React from "react";
import axios from "axios";
import Header from "./components/header/header";
import MainPage from "./pages/main";
import UserPage from "./pages/user";
import PostPage from "./pages/post";
import CheckFavoritePage from "./pages/checkFav";
import AfterTransection from "./pages/afterTransection";
import CheckUserPage from "./pages/checkUser";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/actions";

class App extends React.Component {
  constructor() {
    super();
  }

  // componentDidMount 是这个Class Component一打开我们干的第一件事
  // 这个时候要注意，很多东西这里干不了，会造成整个app崩掉
  // 比如你在这个时候从redux里面往这里导入数据，但是redux导入数据有0.几秒的时间
  componentDidMount = async () => {
    // 后端我们用 express 做 api， 前端我们用 axios 去呼叫 api
    const doc = await axios.get("/auth/current_user");
    console.log(doc);
    // setCurrentUser 就是 把 react 里面的东西 往 redux 里面存
    this.props.setCurrentUser(doc.data);
  };

  render() {
    return (
      // 这个是基本的React App.js 写法，最外面是 <BrowserRouter> 其次是 <Header />
      // 因为 Header 是所有页面都要有所以放在所有的<Route />前面， 第6节课会讲到Route写法
      <div>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/checkFav" component={CheckFavoritePage} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/checkUser/:id" component={CheckUserPage} />
        </BrowserRouter>
      </div>
    ); 
  }
}
// 这个要像redux当中更新东西的固定模板
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  // 以后如果你有其他的东西要存到redux里面，比如你要存Image
  // setImageStorage: (image) => dispatch(setImageStorage(image))
  // 这种代码很难背得下来，而且面试也不会问你，只要能看得懂，会模仿就行
  // redux属于高级的用法，会了是加分，不理解也不用勉强自己
  // 但是基本三要素之间的关系，action, reducer, store 是一定要清楚的，面试的时候 要把这三点说出来
});
export default connect(null, mapDispatchToProps)(App);
// 一直到这