import React from "react";
import { connect } from "react-redux";
import PostForm from "../post/postform";
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  render() {
    const { currentUser } = this.props;
    const { show } = this.state;
    return (
      <div>
        {
        currentUser === null ?
        null
        :
        currentUser === false
        ?
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/">KijijiClone</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li className="nav-item">
            <a className="nav-link" href="/auth/google" style={{ margin: 10, width: 80 }}>
              Google Login
            </a>
          </li>
            </ul>
          </div>
        </nav>
        :
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/">KijijiClone</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" href="/user" style={{ margin: 10, width: 100 }}>
                  My Posts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/auth/logout" style={{ margin: 10, width: 100 }}>
                  Log Out
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ margin: 10 }}>
                balance: 
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{ marginTop: 10, width: 100 }}>
                {Math.round(currentUser.balance)}
                </a>
              </li>
             <div>
               <a href="/checkFav">
               <button style={{ marginTop: 10 }} type="button" class="btn btn-light">My Favorites</button>
               </a> 
             </div>
             <div class="dropdown">
                <button style={{ marginTop: 10, marginLeft: 40 }} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort by
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
             </div>
             {/* <div>
               <a href="/checkFav">
                  <Button
                    variant="contained"
                    color="primary"
                    style = {{marginLeft: "auto", marginRight:20}}
                    endIcon={<SortIcon />}
                    // onClick = {()=> props.deleteFunc(props.comment._id)}
                    >
                      Remove
                  </Button>
               </a> 
             </div> */}
            </ul>
            <div>
               {show === true ?
                 (<div style={{ marginTop: 12 }}>
                   <button style={{ marginTop: 10 }} type="button" class="btn btn-light" onClick={() => this.setState({ show: !show })}>close</button>
                   <PostForm />
                 </div>
                 )
                 : 
                 (<button style={{ marginTop: 3 }} type="button" class="btn btn-light" onClick={() => this.setState({ show: !show })}>post Ad</button>)
               }
             </div>
          </div>
        </nav>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
