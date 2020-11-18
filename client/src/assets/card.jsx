import React from "react";
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
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={props.userPhoto}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.userName}
        subheader={props.createAt}
      />
      <CardActionArea>
        <CardMedia
          style = {{width:"100%"}}
          className={classes.media}
          image={props.image}
          title={props.title}
        />
      </CardActionArea>
      
      <CardContent>
        <Typography className = "text-center text-info bg-secondary" variant="body2" color="textSecondary" component="h3">
          {props.title}
        </Typography>
        <Typography className = "text-center text-info " variant="body2" color="textSecondary" component="h4">
          {"$ " + props.price}
        </Typography>
        <Typography paragraph multiline rows = {4} variant="body1" color="textSecondary" component="p">
          {props.content}
        </Typography> 
      </CardContent>
    </Card>
  );
}
