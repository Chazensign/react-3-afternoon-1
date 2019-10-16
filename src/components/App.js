import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

const SOURCE = 'https://practiceapi.devmountain.com/api/posts'
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      newPost: {
        id: null,
        text: '',
        date: ''
      },
      searchVal: ''
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(SOURCE).then(result => {
      this.setState({ posts: result.data})})

  }

  updatePost(id, text) {
    axios
    .put(`${SOURCE}?id=${id}`, { text })
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err)
      })
  }

  deletePost(id) {
    axios.delete(`${SOURCE}?id=${id}`).then(result => this.setState({ 
      posts: result.data}))
    .catch(err => console.log(err)
    )
  }

  createPost(text) {
    axios.post(`${SOURCE}`, { text }).then(res => this.setState({ posts: res.data}))

  }
  handleChange = (value) => {
    this.setState({ searchVal: value });
    console.log(this.state.searchVal)
  }
  postSearch = () => {
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${encodeURI(this.state.searchVal)}`)
    .then(res => this.setState({ posts: res.data }))

  }

  render() {
    const { posts } = this.state;
    return (
      <div className="App__parent">
        <Header handleChangeFn={this.handleChange} postSearchFn={this.postSearch} />

        <section className="App__content">
          <Compose createPostFn={this.createPost}/>
          {posts.map((post) => <Post deletePostFn={this.deletePost} key={ post.id } id={post.id} updatePostFn={this.updatePost} posts={posts} text={post.text} date={post.date} />)}
        </section>
      </div>
    );
  }
}

export default App;
