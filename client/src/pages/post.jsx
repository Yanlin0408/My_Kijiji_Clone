import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import TwitterIcon from '@material-ui/icons/Twitter';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import EventIcon from '@material-ui/icons/Event';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Card from "../assets/card";

class PostPage extends React.Component {
  constructor() {
    super();
    this.state = { post: null};
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/post/" + this.props.match.params.id);
    const post = doc.data;
    this.setState({ post });
  };



  render() {
    const { post } = this.state;
    return (
        <div class="jumbotron" style={{height: 1800}}>
            <img src="https://tpc.googlesyndication.com/simgad/4880340395375037383" border="0" width="728" height="90" alt="" class="img_ad"></img>
            <hr />  
            {
              post?
              (
                <div className="row">
                  {/* for resend section */}
                  <div className="col-2">
                    <FavoriteBorderIcon color = "default" fontSize = "large"/><br/><br/>
                    <TwitterIcon color = "primary" fontSize = "large" onClick = {()=> {window.location = "https://twitter.com/"}}/><br/><br/>
                    <FacebookIcon color = "primary" fontSize = "large" /><br/><br/>
                    <PinterestIcon color = "secondary" fontSize = "large"/><br/><br/>
                    <InstagramIcon color = "secondary" fontSize = "large"/><br/><br/>
                  </div>
                  {/* for AD main section */}
                  <div className="col-6">
                    <div>
                      <h3> {post.title} </h3>
                      <h3 className = "text-success"> $ {post.price} </h3>
                      <img src = {"https://picspie.s3.ca-central-1.amazonaws.com/" + post.image}  width = "100%"></img>
                      <h3 style = {{marginTop: 35}}>Description</h3>
                      <h6 class="text-justify">{post.content}</h6>
                    </div>
                  </div>
                  {/* for comment section */}
                  <div className="col-4">
                    <Paper elevation={3} style={{backgroundColor:"#fbf6f0"}}>
                    <h4 class="text-center">Owner Info</h4>
                    <div className = "row" style = {{marginTop: 5, marginLeft:10}}><Avatar src={post.userPhoto} /> {post.userName}</div>
                    <div className = "row" style = {{marginTop: 5, marginLeft:10}}><EmailIcon fontSize = "large"/> {post.userEmail}</div>
                    <div className = "row" style = {{marginTop: 5, marginLeft:10}}><EventIcon fontSize = "large"/> {post.createAt}</div>
                    </Paper>
                  </div>
                </div>
                ) 
              :
              (<div>no page</div>)
            }
        </div>
        
    );
  }
}

export default PostPage;