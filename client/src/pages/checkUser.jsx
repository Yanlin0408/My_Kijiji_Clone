import React from "react";
import axios from "axios";
import Card from "../assets/card";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class CheckUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], user: null };
  }

  componentDidMount = async () => {
    const user = await axios.get("/api/getAfterCheck/" + this.props.match.params.id);
    const posts = await axios.get("/api/getUser'sPosts/" + this.props.match.params.id);
    console.log("-----posts",posts.data);
    this.setState({ posts:posts.data,user:user.data.displayName});
  };

  render() {
    const { posts, user } = this.state;
    return (
      <div>
        <div className="jumbotron" style = {{marginTop:50}}>
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