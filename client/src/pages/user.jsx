import React from "react";
import axios from "axios";
import Card from "../assets/card";

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/post/user/get");
    const posts = doc.data;
    this.setState({ posts });
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <div class="jumbotron">UserPage</div>
        <div className="row">
          {posts.length !== 0 ? (
            posts.map((post) => (
              <Card
                userPhoto={post.userPhoto}
                userName={post.userName}
                createAt={post.createAt}
                title={post.title}
                image={post.image}
                // image={
                //   "https://picspie.s3.ca-central-1.amazonaws.com/" + post.image
                // }
                content={post.content}
              />
            ))
          ) : (
            <h1>nothing posted yet</h1>
          )}
        </div>
      </div>
    );
  }
}

export default UserPage;
