import React from "react";
import axios from "axios";
import TwitterIcon from '@material-ui/icons/Twitter';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FacebookIcon from '@material-ui/icons/Facebook';
import PinterestIcon from '@material-ui/icons/Pinterest';
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from '@material-ui/core/IconButton';

class Icons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLike = async() => {
      const {post} = this.props;
      const doc = await axios.post("/api/post/like/" + post._id);
      if(doc.data.err) 
      {
        console.log("----error detected")   
        return null;
      }
      else{
        window.location = "/post/" + post._id;
        console.log("----no error detected. Page rendered")
        return null;
      }
  };

  renderLike = () => {
    const {post, user} = this.props;
    const likesInPost = post.likes;
    const currentUserLike = likesInPost.filter((singleLike) => {return singleLike === user._id;})
    //if the currentUser liked this post, return a red FavoriteIcon.
    //Otherwise, a grey one
    if (currentUserLike.length !== 0) return (<FavoriteIcon color = "secondary" size = "large"/>);
    return (<FavoriteIcon/>); 
  }

  render() {
    const {post} = this.props;
    return (
        <div className = "col">
            <IconButton onClick = {this.handleLike}>
                {this.renderLike()}  
                <div>{post.likes.length}</div>
            </IconButton>
            <IconButton>
            <TwitterIcon color = "primary" fontSize = "large" onClick = {()=> {window.location = "https://twitter.com/"}}/><br/><br/>
            </IconButton>
            <IconButton>
            <FacebookIcon color = "primary" fontSize = "large" /><br/><br/>
            </IconButton> 
            <IconButton>
            <PinterestIcon color = "secondary" fontSize = "large"/><br/><br/>
            </IconButton>
            <IconButton>
            <InstagramIcon color = "secondary" fontSize = "large"/><br/><br/>
            </IconButton>  
        </div>
    );
  }
}

export default Icons;
