import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import CommentIcon from '@material-ui/icons/Comment';
import AllComments from "./comments";

class CommentForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        commentContent:"",
        rating:0,
        allComments:"",
        };
    }

    componentDidMount = async() => {
      const doc = await axios.get("/api/comment/get/"+this.props.postId);
      const comments = doc.data;
      // console.log(comments);
      this.setState({allComments: comments});
  };
  
    handleSendComment = async() => {
        const {commentContent,rating} = this.state;
        const doc = await axios.post("/api/comment/create",{commentContent,rating,postId:this.props.postId});
    }

    handleKeyPress = async(event) => {
      if(event.key === 'Enter'){
        const {commentContent,rating} = this.state;
        const bb = await axios.post("/api/comment/create",{commentContent,rating,postId:this.props.postId});
      }
    }

    render() {
      const {allComments} = this.state;
      return (
        <form style={{marginTop:30}} noValidate autoComplete="off" onSubmit={(e) => {e.preventDefault()}}>
            <TextField
                fullWidth
                id="outlined-secondary"
                label="make comment about this stuff"
                variant="outlined"
                color="secondary"
                onChange={(e) => this.setState({ commentContent: e.target.value })}
                onKeyUp={this.handleKeyPress}
            />
            <Button
                variant="contained"
                color="primary"
                style = {{marginTop: 10}}
                endIcon={<CommentIcon />}
                onClick = {()=> {this.handleSendComment()}}
            >
                Send
            </Button>
            <AllComments postId = {this.props.postId} commentsPassed = {allComments}></AllComments>
        </form>
      );
    }
  }
  
export default CommentForm;
