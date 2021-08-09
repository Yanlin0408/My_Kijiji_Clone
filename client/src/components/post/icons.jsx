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
    this.state = {
      theLike:"",
      post:"",
    };
  }

  componentDidMount = async() => {
    const doc = await axios.get("/api/post/" + this.props.id);
    const post = doc.data;
    this.renderLike();
    this.setState({post:post});
  }

  //handle both like and unlike
  handleLike = async() => {
      const {post} = this.props;
      const doc = await axios.post("/api/post/like/" + post._id);
      this.renderLike();
  };

  renderLike = async() => {
    const doc = await axios.get("/api/post/" + this.props.id);
    const post = doc.data;
    this.setState({post:post});
    const {user} = this.props;
    const likesInPost = post.likes;
    const currentUserLike = likesInPost.filter((singleLike) => {return singleLike === user._id;})
    if(currentUserLike.length !== 0){
      this.setState({theLike:true});
    }else{
      this.setState({theLike:false});
    }
  }

  //inspect the state in constructor to tell if the currentUser liked this post
  //if yes, return a red FavoriteIcon.
  //Otherwise, a grey one
  renderIcon = () => {
    if(this.state.theLike === true){
      return (<FavoriteIcon color = "secondary" size = "large"/>)
    }else{return (<FavoriteIcon/>)}
  }

  render() {
    const {post} = this.state;
    return (
          <div className = "col" >
            <IconButton onClick = {this.handleLike}>
                {this.renderIcon()}
                {post
                ?
                  <div>{post.likes.length}</div>
                :
                  <div>0</div>
                }  
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
