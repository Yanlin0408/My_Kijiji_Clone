import React, { useDebugValue } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from "axios";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



export default function SimpleCard(props) {
  const classes = useStyles();

  const handleCheckEachOther = async() => {
    console.log("doing shit");
    const doc = await axios.get("/api/getUserIdFromGoogleId/" + props.postId);
    console.log("---",doc.data);
    window.location = "/checkUser/"+doc.data;
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className = "row">
        <Avatar  style = {{marginLeft:10, width: 60,height: 60}} src={props.userPhoto} />
        <div className = "col">
        <Typography style = {{marginLeft:3}} variant="h5" component="h2">
          {props.userName}
        </Typography>
        <div style = {{marginLeft:3}} className = "row">
        <FavoriteIcon color = "secondary" size = "large"/>
        <Typography className={classes.pos} color="textSecondary">
        {props.postLikeNum}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        /{props.totalLikeNum} likes in total
        </Typography>
        </div>
        <Typography style = {{marginTop:-10, marginLeft:3}} variant="body2" component="p">
          {props.userEmail}
        </Typography>
        </div>
        </div>
      </CardContent>
      <CardActions>
        <Button onClick = {() => {handleCheckEachOther()}} size="small">Learn More About Him</Button>
      </CardActions>
    </Card>
  );
}
