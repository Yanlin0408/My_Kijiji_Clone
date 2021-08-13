import React from "react";
import axios from "axios";
import Card from "../assets/cardBackup";
import { CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from '@material-ui/icons/Favorite';

class CheckUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], user: null, theTable:{},userGoogleId:null };
  }

  componentDidMount = async () => {
    const user = await axios.get("/api/getAfterCheck/" + this.props.match.params.id);
    const posts = await axios.get("/api/getUser'sPosts/" + this.props.match.params.id);
    this.setState({ 
      posts:posts.data,
      user:user.data.displayName,
      userGoogleId:user.data.googleId,
    });
    var userHash = {};
    const docc = await axios.get("/api/getHashTable");
    userHash = docc.data;
    this.setState({theTable: userHash});
  };

  render() {
    const { posts, user, theTable, userGoogleId } = this.state;
    return (
      <div>
        <div className="jumbotron" style = {{marginTop:50}}>
          <Typography variant="h3">{user}'s page</Typography>
          <div>
            {userGoogleId ? (
              <p style = {{marginLeft:10}} className="lead text-monospace">
              {theTable[userGoogleId]} likes <FavoriteIcon color = "secondary" size = "large"/> received in total
              </p>
            ):(
            <Typography variant="h3" style={{ marginLeft: 20 }}>processing ...</Typography>
            )
        }
        </div>
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