import React from "react";
import axios from "axios";
import Card from "../assets/card";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = { 
      posts: [], 
    };
    
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/post/all/get");
    const posts = doc.data;
    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;
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
        <div className="row">
          {posts.length !== 0 ? (
            posts.map((post) => (
              <CardContent>
              <Card post={post} handleClick = {() => window.location="/post/"+post._id}/>
              </CardContent>
            ))
          ) : (
            <Typography variant="h3" style={{ marginLeft: 20 }}>processing ...</Typography>
          )}
        </div>
      </div>
    );
  }
}

export default MainPage;
