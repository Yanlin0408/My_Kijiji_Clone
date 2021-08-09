import React from 'react';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CommentCard from "./commentCard";

class AllComments extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        allComments:"",
        };
    }

    UNSAFE_componentWillReceiveProps = async(props) => {
      console.log(props);
      const doc = await axios.get("/api/comment/get/"+props.postId);
      const comments = doc.data;
      this.setState({allComments: comments});
    }

    componentDidMount = async() => {
        const doc = await axios.get("/api/comment/get/"+this.props.postId);
        const comments = doc.data;
        this.setState({allComments: comments});
    };

    handleDelete = async (commentId) => {
      const doc = await axios.post("/api/comment/delete/" + commentId);
      const docc = await axios.get("/api/comment/get/"+this.props.postId);
      const comments = docc.data;
      this.setState({allComments: comments});
    }

    render() {
    const {allComments} = this.state;
      return (
        <div  id = "commentPart">
            {
                allComments.length !== 0 ? (
                    allComments.map((oneComment) => (
                        <CommentCard comment = {oneComment} deleteFunc = {this.handleDelete}></CommentCard>
                      ))
                ):(
                  <div>
                  {
                    this.props.postId !== undefined
                    ?
                    <div>
                      <div className="row">
                        <Typography variant="h6" style={{ marginLeft: 20 }}>no comment made yet</Typography>
                      </div>
                    </div>
                    :
                    <div>
                      <div className="row">
                        <HourglassEmptyIcon fontSize="large" style={{ marginTop: 20 }}></HourglassEmptyIcon>
                        <Typography variant="h6" style={{ marginLeft: 20 }}>processing ...</Typography>
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
  
export default AllComments;
