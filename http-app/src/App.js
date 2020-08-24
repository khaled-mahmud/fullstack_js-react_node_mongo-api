import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpServices";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    // asynchronus operation: pending > resolved (success) OR rejected (failure)
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
    //const response = await promise;
    //console.log(response);
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    await http.put(config.apiEndpoint + "/" + post.id, post);
    //http.patch(config.apiEndpoint + "/" + post.id, { title: post.title });
    //console.log(data);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete("s" + config.apiEndpoint + "/" + post.id);
      throw new Error("");
    } catch (e) {
      // e.request
      // e.response
      // Expected (404: not found, 400: bad request) - CLIENT ERRORS
      // Display a specific error message

      // console.log("HANDLE DELETE CATCH BLOCK");

      if (e.response && e.response.status === 404)
        alert("This post has alredy been deleted");
      // else {
      //   console.log("Logging the error", e);
      //   alert("an unexpected error occurred");
      // }
      //
      // Unexpected (network down, server down, db down, bug)
      // - Log them
      // - Display a generic and friendly error message

      //alert("Something failed while deleting a post");
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
