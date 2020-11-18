import React from "react";
import axios from "axios";
import Card from "../assets/card";

class PostPage extends React.Component {
  constructor() {
    super();
    this.state = { posts: null};
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/post/" + this.props.params.id);
    const posts = doc.data;
    this.setState({ posts });
  };

  render() {
    const { post } = this.state;
    return (
        <div class="jumbotron">PostAdPage
            <img src="https://tpc.googlesyndication.com/simgad/4880340395375037383" border="0" width="728" height="90" alt="" class="img_ad"></img>
        </div>
    );
  }
}

export default PostPage;