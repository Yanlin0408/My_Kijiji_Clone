import React from "react";
import axios from "axios";
import Card from "../assets/card";
import { connect } from "react-redux";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class CheckUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], user: null };
  }

  componentDidMount = async () => {
  };

  render() {
    const { posts, user } = this.state;
    return (
      <div>
        <div class="jumbotron">
          <Typography variant="h3">{user}'s page</Typography>
        </div>
        <div className="row">
          {posts.length !== 0 ? (
            posts.map((post) => (
              <CardContent>
                <Card post={post} handleClick = {() => window.location="/post/"+post._id}/>
              </CardContent>
            ))
          ) : (
              <h1>nothing posted yet</h1>
            )}
        </div>
      </div>
    );
  }
}


export default CheckUserPage;