import React from "react";
import { connect } from "react-redux";
import PostForm from "../post/postform";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show : false};
  }

  renderHeader = () => {
    const { currentUser } = this.props;
    const { show } = this.state;
    console.log(currentUser);
    switch (currentUser) {
      case null:
        return null;
      case false:
        return (
          <li class="nav-item">
            <a class="nav-link" href="/auth/google" style={{ margin: 10, width: 80 }}>
              Google Login
            </a>
          </li>
        );
      default:
        return (
          <div className="row">
            <div className = "col-4">
            <li class="nav-item">
                <a class="nav-link" href="/user" style={{ margin: 10, width: 100 }}>
                  My Posts
                </a>
              </li>
            </div>
            <div className = "col-4">
            <li class="nav-item">
                <a class="nav-link" href="/auth/logout" style={{ margin: 10, width: 100 }}>
                  Log Out
                </a>
              </li>
            </div>
            <div className = "col-4">
            {show === true ?
              (<div style = {{marginTop: 12 }}>
                <button type="button" class="btn btn-outline-secondary bg-light" variant="outlined" onClick = {() => this.setState({show: !show})}>close</button>
                <PostForm/>
              </div>
              )
              :(<button style = {{marginTop: 12 }} type="button" class="btn btn-outline-secondary bg-light" variant="outlined" onClick = {() => this.setState({show: !show})}>post Ad</button>)
              }
            </div>
          </div>
        );
    }
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          kijijiClone
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div style={{width:2000}}>
          { <ul className="navbar-nav">{this.renderHeader()}</ul> }
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
