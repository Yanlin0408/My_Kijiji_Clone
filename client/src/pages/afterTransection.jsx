import React from "react";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";

class AfterTransection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], user: null };
  }

  componentDidMount = async () => {
  };

  render() {
    return (
      <div>
        <div class="jumbotron">
          <Typography variant="h3">Congradulations! The deal is done </Typography>
        </div>
        <div style={{ marginLeft: 50 }}>
          <IconButton onClick={() => { window.location = "/" }}>
            <InsertEmoticonIcon fontSize="large"/>
              <div style={{ marginLeft: 10 }}>
                click here to go back
              </div>
          </IconButton>
        </div>
      </div>
    );
  }
}


export default AfterTransection;