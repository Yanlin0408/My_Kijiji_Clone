import React from "react";
import AllPosts from "../components/post/postInMain"

class MainPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="jumbotron" style = {{marginTop:50}}>
          <h1>Welcome to KijijiClone</h1>
          <hr />
            <p className="lead text-monospace">
              KijijiClone is an online advertising platform for people to buy and sell commodities!
            </p>
          <hr/>
        </div>
        <AllPosts></AllPosts>
      </div>
    );
  }
}

export default MainPage;
