import React from "react";
import axios from "axios";
import Card from "../assets/card";
import { connect } from "react-redux";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class CheckFavoritePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], userName: null };
  }

  componentDidMount = async () => {
    try {
      const doc = await axios.get("/api/like/fav");
      this.setState({ posts: doc.data });
    } catch (e) {
      console.log("frontend error", e);
    }
  };

  render() {
    const { posts } = this.state;
    const { currentUser } = this.props;
    return (
      <div>
        <div class="jumbotron" style = {{marginTop:50}}>
          <Typography variant="h3">{currentUser ? currentUser.displayName : null}'s favorite items</Typography>
        </div>
        <div className="row">
          {posts.length !== 0 ? (
            posts.map((post) => (
              <CardContent>
                <Card post={post} handleClick = {() => window.location="/post/"+post._id}/>
              </CardContent>
            ))
          ) : (
              <h1>   you haven't liked any post yet</h1>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(CheckFavoritePage);