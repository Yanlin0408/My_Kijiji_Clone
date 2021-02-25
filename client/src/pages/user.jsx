import React from "react";
import axios from "axios";
import Card from "../assets/card";
import { connect } from "react-redux";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], user:null};
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/post/user/get");
    const theUser = await axios.get("/auth/current_user");
    const posts = doc.data;
    const user = theUser.data.displayName;
    this.setState({ posts,user });
  };

  render() {
    const { posts, user } = this.state;
    //const { currentUser } = this.props;
    //console.log("---------current ",currentUser.balance);
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
            <div className="row">
                <HourglassEmptyIcon fontSize="large" style={{ marginTop: 20 }}></HourglassEmptyIcon>
                <Typography variant="h3" style={{ marginLeft: 20 }}>processing ...</Typography>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(UserPage);
