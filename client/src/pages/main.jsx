import React from "react";
import axios from "axios";
import Card from "../assets/card";
import PostForm from "../components/post/postform";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = { 
      posts: [], 
    };
    
  }

  componentDidMount = async () => {
    // const doc = await axios.get("/api/post/all/get");
    // const posts = doc.data;
    // this.setState({ posts });
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <div class="jumbotron">
          <h1>Main page</h1>
          <div className = "row">
            <PostForm/>
            <Card
              userPhoto={null}
              userName={"syndra"}
              //createAt={new Date()}
              createAt = {new Date().toString()}
              title={"my first post"}
              price={800}
              image={
                "https://i.ebayimg.com/00/s/NjAwWDgwMA==/z/-foAAOSwZSBesatw/$_59.JPG"
                }
              content={"this is my wify syndraaaaaa"}
            />
          </div>
          <hr/>
        </div>

        <div className="row">
          {posts.length !== 0 ? (
            posts.map((post) => (
              <Card
                userPhoto={post.userPhoto}
                userName={post.userName}
                createAt={post.createAt}
                title={post.title}
                image={
                  "https://picspie.s3.ca-central-1.amazonaws.com/" + post.image
                }
                content={post.content}
              />
            ))
          ) : (
            <process />
          )}
        </div>
      </div>
    );
  }
}

export default MainPage;
