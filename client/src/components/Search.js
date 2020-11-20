import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostsList } from './';
import { searchProperty } from '../actions/posts';
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      size: '',
      rent: '',
    };
  }

  handleLocationChange = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value,
    });
  };

  handleRentChange = (e) => {
    this.setState({
      rent: e.target.value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('this.state', this.state);
    const { location, size, rent } = this.state;

    if (location && rent && size) {
      this.props.dispatch(searchProperty(location, rent, size));
    }
  };

  render() {
    const { posts, inSearchProgress } = this.props;
    console.log('filtered posts:', posts);
    return (
      <div>
        <form className='login-form'>
          <span className='login-signup-header'>Search Property</span>

          <div className='field'>
            <input
              type='text'
              placeholder='Location'
              required
              onChange={this.handleLocationChange}
              value={this.state.location}
            />
          </div>
          <div className='field'>
            <input
              type='number'
              placeholder='SIZE-BHK'
              required
              // ref={this.passwordInputRef}
              onChange={this.handleSizeChange}
              value={this.state.size}
            />
          </div>
          <div className='field'>
            <input
              type='number'
              placeholder='Rent-Price'
              required
              // ref={this.passwordInputRef}
              onChange={this.handleRentChange}
              value={this.state.rent}
            />
          </div>
          <div className='field'>
            {inSearchProgress ? (
              <button
                onClick={this.handleFormSubmit}
                disabled={inSearchProgress}
              >
                Searching...
              </button>
            ) : (
              <button
                onClick={this.handleFormSubmit}
                disabled={inSearchProgress}
              >
                Search
              </button>
            )}
          </div>
        </form>
        <div className='main-container'>
         
          { posts &&   <PostsList posts={posts} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inSearchProgress: state.posts.inSearchProgress,
   
    posts:state.posts.SearchPosts
  };
}
export default connect(mapStateToProps)(Search);
