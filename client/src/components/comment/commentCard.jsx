import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimeDiff from "./timeDiff";
import Paper from '@material-ui/core/Paper';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {Avatar} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    width: 350,
    margin: 10,
  },
  pos: {
    fontSize: 25,
  },
  avatar: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#5c2a9d",
  },
});

export default function SimpleCard(props) {
    const classes = useStyles();

    return (
      <Paper elevation={0} style={{ backgroundColor:"#E9ECEF",paddingLeft:0,paddingTop:30, paddingRight:10, paddingBottom:20}}>
          <div className = "row" >
              <div className = "col-1">
              <Avatar className={classes.avatar} src={props.comment.userPhoto} />
              </div>
              <div className = "col-11">
                  <div className = "row">
                      <h5 >{props.comment.userName}</h5>
                      <h6 style = {{marginLeft:10}}>{TimeDiff(new Date(props.comment.createAt),new Date())}</h6>
                  </div>
              <h6>{props.comment.commentContent}</h6>
              <div className = "row" style = {{display: 'flex', justifyContent: 'flex-end'}}>
                  {/* <ThumbUpIcon style = {{marginLeft:15,marginTop:5}}></ThumbUpIcon>
                  <ThumbDownIcon style = {{marginLeft:15,marginTop:6}}></ThumbDownIcon> */}
                    <Button
                    variant="contained"
                    color="primary"
                    style = {{marginTop: -30, marginLeft: "auto", marginRight:20}}
                    endIcon={<DeleteIcon />}
                    onClick = {()=> props.deleteFunc(props.comment._id)}
                    >
                      Remove
                    </Button>               
              </div>
              </div> 
          </div>
      </Paper>
    );
}

