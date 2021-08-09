import React from "react";
import { Container, Button, TextField } from "@material-ui/core";
import axios from "axios";

class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      file: null,
      show: false,
      price: 0,
    };
  }
 
  handleSubmit = async () => {
    
    const { file, title, content, price } = this.state;
    // get API from AWS
    const config = await axios.get("/api/image/upload");
    //照片的地址
    const imageURL = config.data.key;
    //上传照片用的URL
    const API = config.data.url;
    // upload image into AWS by API
    await axios.put(API, file, {
      headers: {
        "Content-type": file.type,
      },
    });
    console.log("yoooooo!");
    // save URL and title, content into mongoDB
    await axios.post("/api/post/create", {  title, content, imageURL, price, });
    // redirect to user page
    window.location = "/user";
  };

  render() {
    return (
      <div>
          <Container>
            <TextField
            id="filled-basic" label="Title" variant="filled"
              color="secondary"
              style={{ margin: 10, width: 300 }}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            <TextField
              id="standard-basic"
              label="Price"
              color="secondary"
              variant="filled"
              style={{ margin: 10, width: 300 }}
              onChange={(e) => this.setState({ price: Number(e.target.value)})}
            />
            <br />
            <TextField
              id="standard-multiline-static"
              label="description"
              color="secondary"
              variant="filled"
              multiline
              rows={5}
              style={{ margin: 10, width: 300 }}
              onChange={(e) => this.setState({ content: e.target.value })}
            />
            <br />
            <input
              type="file"
              accept="image/*"
              label="choose file"
              style={{ margin: 10, width: 300 }}
              onChange={(e) => this.setState({ file: e.target.files[0] })}
            />
            <br />
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </Container>
      </div>
    );
  }
}

export default PostForm;
