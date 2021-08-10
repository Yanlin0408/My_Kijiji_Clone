import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EmailIcon from '@material-ui/icons/Email';
import EventIcon from '@material-ui/icons/Event';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Icons from "../components/post/icons"
import Button from '@material-ui/core/Button';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { connect } from "react-redux";
import Timer from "../assets/timer";
import CommentForm from "../components/comment/commentForm"
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Popup from "../assets/alertPop"

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    { post: null,
      trigger: false,
      balance: 0,
    };
  }

  componentDidMount = async () => {
    const doc = await axios.get("/api/post/" + this.props.match.params.id);
    const post = doc.data;
    this.setState({ post });
  };

  handleDelete = async () => {
    const doc = await axios.post("/api/post/" + this.props.match.params.id);
  }

  handleBuy = async () => {
    this.setState({trigger:true});
    const doc = await axios.post("/api/buy/" + this.props.match.params.id);
    this.setState({balance:doc.data.buyerBalance})
    // console.log(doc.data.buyerBalance);
  }

  handleCheckEachOther = async() => {
    const doc = await axios.get("/api/getUserIdBasedOnPost/" + this.props.match.params.id);
    console.log(doc);
    window.location = "/checkUser/"+doc.data;
  }

  handleLocation = () => {
    window.location = "/auth/google";
  }

  render() {
    const { post } = this.state;
    const { currentUser } = this.props;
    console.log(this.props.match.params.id);
    
    return (
      <div class="jumbotron" style={{ height: 1800, marginTop:50 }}>
        <Timer/>
        <hr />
        {
          currentUser && post ?
            (
              <div className="row">
                {/* for resend section */}
                <div className="col-1">
                  <Icons post={post} user={currentUser} id={this.props.match.params.id}/>
                </div>
                {/* for AD main section */}
                <div className="col-7">
                  <div>
                    <img className = "myImg" src={"https://kijijiclones3.s3.ca-central-1.amazonaws.com/" + post.image} width="100%"></img>
                  </div>
                  <CommentForm postId = {this.props.match.params.id}></CommentForm>
                </div>
                {/* for comment section */} 
                <div className="col-4" style={{position:"-webkit-sticky", position:"sticky", top: 0}}>
                  <Paper variant="outlined" style={{padding:50, backgroundColor:"#E9ECEF"}}>
                    <h1> {post.title} </h1>
                    <AnchorLink href='#commentPart'>click to see comments</AnchorLink>
                    <h3 className="text-success"> $ {post.price} </h3>
                    <div>
                      {currentUser.googleId === post.userId?
                      <Button variant="contained" color="secondary" onClick={this.handleDelete}>
                        <a className="navbar-brand" href="/user">Delete this post</a>
                      </Button>
                      :
                      <div>
                        <Button variant="contained" color="primary" onClick={this.handleBuy}>
                         <a className="navbar-brand" ><p class="text-light">BUY</p></a>
                        </Button>
                        <Popup balance = {this.state.balance} postId = {this.props.match.params.id} trigger = {this.state.trigger}>
                          <h3>My popuppp</h3>
                        </Popup>
                      </div>
                      }                    
                    </div>
                    <h3 style={{ marginTop: 35 }}>Description</h3>
                    <h6 class="text-justify">{post.content}</h6>
                    <Paper elevation={1} style={{ backgroundColor:"#E9ECEF", padding:10 }}>
                      <div style={{ marginLeft: 10, marginTop: 15 }}>
                        <h4 class="text-center">Owner Info <PeopleAltIcon fontSize="medium" /></h4>
                        <div className="row" style={{ marginTop: 10, marginLeft: 10 }}><Avatar src={post.userPhoto} /> <Button variant="contained" color="primary" style = {{marginLeft:8}} onClick={this.handleCheckEachOther}>{post.userName}</Button></div>
                        <div className="row" style={{ marginTop: 15, marginLeft: 10 }}><EmailIcon fontSize="large" /> <div style={{ marginLeft: 10 }}>{post.userEmail}</div></div>
                        <div className="row" style={{ marginTop: 15, marginLeft: 10 }}><EventIcon fontSize="large" /> <div style={{ marginLeft: 10 }}>{post.createAt}</div></div>
                      </div>
                    </Paper>
                  </Paper>
                </div>
              </div>
            )
            :
            (  
              <div>
                {
                  post && currentUser === false
                  ?
                  // handle the situation when user is not loged in
                  <div>
                    <div className="row">
                      <Typography variant="h3" style={{ marginLeft: 20 }}>redirecting to google login ...</Typography>
                      {
                      setTimeout(() => {
                      this.handleLocation()
                      }, 1500)}
                    </div>
                  </div>
                  :
                  //handle the situation when nothing is rendered out
                  <div>
                    <div className="row">
                      <HourglassEmptyIcon fontSize="large" style={{ marginTop: 20 }}></HourglassEmptyIcon>
                      <Typography variant="h3" style={{ marginLeft: 20 }}>processing ...</Typography>
                    </div>
                  </div>
                }
              </div>
            )
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PostPage);
