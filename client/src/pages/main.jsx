import React from "react";
import axios from "axios";
import Card from "../assets/card";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = JSON.parse(window.localStorage.getItem('state')) || { 
      posts: [], 
      sortingMethod: "normal",
    };
  }

  // override setState to retain the previous state no matter how page refresh
  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }

  componentDidMount = async () => {
    console.log(this.state.sortingMethod);
    this.sortByDiffMethods(this.state.sortingMethod);
  };

  sortByDiffMethods = async(sortingMethod) => {
    switch(sortingMethod) {
      case "priceLowToHigh":
        var doc = await axios.get("/api/post/sort/byPrice");
        var posts = doc.data;
        this.setState({posts:posts, sortingMethod:"price Low To High"});
        break;
      case "priceHighToLow":
        doc = await axios.get("/api/post/sort/byPriceHighToLow");
        posts = doc.data;
        this.setState({ posts:posts, sortingMethod: "price High To Low" });
        break;
      case "byDate":
        doc = await axios.get("/api/post/sort/byDate");
        posts = doc.data;
        this.setState({ posts:posts, sortingMethod:"Latest First" });
        break;
      case "byPopularity":
        doc = await axios.get("/api/post/sort/byPopularity");
        posts = doc.data;
        this.setState({ posts:posts, sortingMethod:"Popularity" });
        break;
      default:
        doc = await axios.get("/api/post/all/get");
        posts = doc.data;
        this.setState({ posts:posts, sortingMethod:"Oldest First"});
    }
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <div className="jumbotron" style = {{marginTop:50}}>
          <h1>Welcome to KijijiClone</h1>
          <hr />
            <p className="lead text-monospace">
              KijijiClone is an online advertising platform for people to buy and sell commodities!
            </p>
          <hr/>
        </div>
        <div className = "row">
        <div class="dropdown" >
                <button style={{ marginTop: -5, marginLeft: 40 }} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort by
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("priceLowToHigh")}}>By Price low to high</a>
                  <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("priceHighToLow")}}>By Price high to low</a>
                  <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("byDate")}}>Newest</a>
                  <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("byDateOldest")}}>Oldest</a>
                  <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("byPopularity")}}>By popularity</a>
                </div>
        </div>
        <p style = {{marginLeft:20}} className="lead text-monospace">
              current sorting method: {this.state.sortingMethod}
        </p>
        </div>
        
        <div className="row">
          {posts.length !== 0 ? (
            posts.map((post) => (
              <CardContent>
              <Card post={post} handleClick = {() => window.location="/post/"+post._id}/>
              </CardContent>
            ))
          ) : (
            <Typography variant="h3" style={{ marginLeft: 20 }}>processing ...</Typography>
          )}
        </div>
      </div>
    );
  }
}

export default MainPage;
