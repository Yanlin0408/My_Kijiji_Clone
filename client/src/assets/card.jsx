import React, {globalThis} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CardActionArea } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import UserInfo from './userInfo';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "90.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  tr: {
    background: "#f1f1f1",
    '&:hover': {
      background: "#f00",
    }
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const theId = props.post.userId;
  const theTB = props.theTB;
  // const likeNum = props.userLikeNumber(props.post.userId);
  // likeNum.then(value => {
  //   console.log("---",value); // Success!
  //   likeNumber = value;
  //   console.log("-likenumber--",likeNumber);
  // });
  return (
    <Card className={classes.root}>
      <Tooltip title={
      <React.Fragment>
        <UserInfo 
        userPhoto = {props.post.userPhoto} 
        userName = {props.post.userName}
        userEmail = {props.post.userEmail}
        postId = {props.post.userId}
        postLikeNum = {props.post.likes.length}
        totalLikeNum = {theTB[theId]}
        ></UserInfo>
      </React.Fragment>
    } interactive arrow placement = 'top'>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={props.post.userPhoto}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // title={props.post.userName}
        subheader={props.post.createAt}/>
    </Tooltip>
      <CardActionArea onClick = {()=> props.handleClick()}>
        <CardMedia
          style = {{width:"100%"}}
          className={classes.media}
          image={"https://kijijiclones3.s3.ca-central-1.amazonaws.com/" + String(props.post.image)}
          // image={"https://yuzeproject.s3.ca-central-1.amazonaws.com/" + String(props.post.image)}
          title={props.post.title}
        />
      </CardActionArea>
      
      <CardContent>
        <Typography className = " text-info" variant="body2" color="textSecondary" component="h2">
          {props.post.title} 
        </Typography>
        {/* <FavoriteIcon color = "secondary" style = {{ marginRight:10}}></FavoriteIcon> */}
        <Typography className = " text-info " variant="body2" color="textSecondary" component="h4">
          {"$ " + props.post.price}
        </Typography>


      </CardContent>
    </Card>
  );
}
