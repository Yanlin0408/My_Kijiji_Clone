import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EmailIcon from '@material-ui/icons/Email';
import EventIcon from '@material-ui/icons/Event';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Icons from "../components/post/icons"
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { connect } from "react-redux";

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: null };
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
    const doc = await axios.post("/api/buy/" + this.props.match.params.id);
    console.log("---------------it is doing shit")
    // return (<Button variant="contained" color="secondary">Secondary</Button>);
  }

  handleCheckEachOther = async() => {
    const doc = await axios.get("/api/getUserIdBasedOnPost/" + this.props.match.params.id);
    console.log(doc);
    window.location = "/checkUser/"+doc.data;
  }

  render() {
    const { post } = this.state;
    const { currentUser } = this.props;
    return (
      <div class="jumbotron" style={{ height: 1800 }}>
        <img src="https://tpc.googlesyndication.com/simgad/4880340395375037383" border="0" width="740" height="90" alt="" class="img_ad"></img>
        <img src="https://s0.2mdn.net/9096388/LaysLunarNewYear6V3728X90EN.gif" border="0" width="740" height="90" alt="" class="img_ad" style={{ marginLeft: 30 }}></img>
        <hr />
        {
          currentUser && post ?
            (
              <div className="row">
                {/* for resend section */}
                <div className="col-1">
                  <Icons post={post} user={currentUser} />
                  {/* {console.log(post._id)} */}
                </div>
                {/* for AD main section */}
                <div className="col-7">
                  <div>
                    <h3> {post.title} </h3>
                    <h3 className="text-success"> $ {post.price} </h3>
                    <img src={"https://picspie.s3.ca-central-1.amazonaws.com/" + post.image} width="100%"></img>
                    <h3 style={{ marginTop: 35 }}>Description</h3>
                    <h6 class="text-justify">{post.content}</h6>
                  </div>
                </div>
                {/* for comment section */}
                <div className="col-4" style={{ marginTop: 79 }}>
                  <Paper elevation={5} style={{ backgroundColor: "#fbf6f0" }}>
                    <div style={{ marginLeft: 10 }}>
                      <h4 class="text-center">Owner Info</h4>
                      <div className="row" style={{ marginTop: 5, marginLeft: 10 }}><Avatar src={post.userPhoto} /> <div style={{ marginLeft: 5 }}>{post.userName}</div></div>
                      <div className="row" style={{ marginTop: 15, marginLeft: 10 }}><EmailIcon fontSize="large" /> <div style={{ marginLeft: 10 }}>{post.userEmail}</div></div>
                      <div className="row" style={{ marginTop: 15, marginLeft: 10 }}><EventIcon fontSize="large" /> <div style={{ marginLeft: 10 }}>{post.createAt}</div></div>
                      <IconButton  onClick={this.handleCheckEachOther}>
                        <PeopleAltIcon fontSize="large" />
                        <div style={{ marginLeft: 10 }}>
                          click to check his page
                        </div>
                      </IconButton>
                    </div>
                  </Paper>
                  <div>
                    {currentUser.googleId === post.userId?
                    <Button variant="contained" color="secondary" onClick={this.handleDelete}>
                      <a className="navbar-brand" href="/user">Delete this post</a>
                    </Button>
                    :
                    <div>
                      <Button variant="contained" color="primary" onClick={this.handleBuy}>
                        <a className="navbar-brand" href="/afterTransection"><p class="text-light">BUY</p></a>
                      </Button>
                    </div>
                    }                    
                  </div>
                </div>
              </div>
            )
            :
            (<div>
              <div className="row">
                <HourglassEmptyIcon fontSize="large" style={{ marginTop: 20 }}></HourglassEmptyIcon>
                <Typography variant="h3" style={{ marginLeft: 20 }}>processing ...</Typography>
              </div>
            </div>)
        }
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PostPage);