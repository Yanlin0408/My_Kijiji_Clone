import React from 'react';
import axios from "axios";
import Card from "../../assets/card";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";

class AllPosts extends React.Component {
    constructor(props) {
      super(props);
      this.state = JSON.parse(window.localStorage.getItem('state')) || { 
        posts: [], 
        sortingMethod: "normal",
        theTable:{},
      };
    }

    setState(state) {
        window.localStorage.setItem('state', JSON.stringify(state));
        super.setState(state);
    }

    componentDidMount = async() => {
      console.log("--componentdidmount");
        var userHash = {};
        this.sortByDiffMethods(this.state.sortingMethod);
        const doc = await axios.get("/api/allUserGoogleId");
        const googleIdTable = doc.data;
        for(let i of googleIdTable){
            const bitch = await axios.get("/api/totalLikesReceivedByUser/" + i);
            let singleTotalLike = bitch.data.countTotalLike;
            userHash[i] = singleTotalLike;
        };
        this.setState({theTable: userHash});
    };

    sortByDiffMethods = async(sortingMethod) => {
        switch(sortingMethod) {
          case "price Low To High":
            var doc = await axios.get("/api/post/sort/byPrice");
            var posts = doc.data;
            this.setState({posts:posts, sortingMethod:"price Low To High"});
            break;
          case "price High To Low":
            doc = await axios.get("/api/post/sort/byPriceHighToLow");
            posts = doc.data;
            this.setState({ posts:posts, sortingMethod: "price High To Low" });
            break;
          case "Latest First":
            doc = await axios.get("/api/post/sort/byDate");
            posts = doc.data;
            this.setState({ posts:posts, sortingMethod:"Latest First" });
            break;
          case "Popularity":
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

    getTotalLikeUserReceived = async (userGoogleId) => {
        console.log("--in func--",userGoogleId);
        const doc = await axios.get("/api/totalLikesReceivedByUser/" + userGoogleId);
        return doc.data.countTotalLike;
    }

    render() {
      console.log("--render",this.state.posts);
      const { posts } = this.state;
      const { theTable } = this.state;
      return (
        <div>
            <div className = "row">
                <div className="dropdown" >
                        <button style={{ marginTop: -5, marginLeft: 40 }} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort by
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("price Low To High")}}>By Price low to high</a>
                        <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("price High To Low")}}>By Price high to low</a>
                        <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("Latest First")}}>Latest</a>
                        <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("Oldest First")}}>Oldest</a>
                        <a class="dropdown-item" onClick = {() => {this.sortByDiffMethods("Popularity")}}>By popularity</a>
                        </div>
                </div>
                <p style = {{marginLeft:20}} className="lead text-monospace">
                    current sorting method: {this.state.sortingMethod}
                </p>
                </div>
                <div className="row">
                  {posts !== undefined && posts.length !== 0 && theTable !== undefined ? (
                    posts.map((post) => (
                      <CardContent>
                      <Card 
                      post={post} 
                      theTB = {theTable}
                      handleClick = {() => window.location="/post/"+post._id}/>
                      </CardContent>
                    ))
                  ) : (
                    <div className="row">
                        <Typography variant="h3" style={{ marginLeft: 20 }}>processing ...</Typography>
                    </div>
                  )}
                </div>
                {/* <div className="row">
                {posts.length !== 0 ? (
                    this.renderPost()
                    // posts.map((post) => (
                    // <CardContent>
                    // <Card 
                    // post = {post} 
                    // handleClick = {() => window.location="/post/"+post._id}/>
                    // </CardContent>
                    // ))
                ) : (
                    <Typography variant="h3" style={{ marginLeft: 20 }}>processing ...</Typography>
                )}

            </div> */}
        </div>
      );
    }
  }
  
export default AllPosts;




