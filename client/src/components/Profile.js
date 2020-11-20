import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssetsbyUser } from '../actions/posts';
import { PostsList } from './';
class Profile extends Component {
  componentDidUpdate(props) {
    if (!this.props.auth.isLoggedin) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.props.dispatch(getAssetsbyUser(this.props.auth.user._id));
  }

  render() {
    const { auth, posts } = this.props;

    return (
      <div className='main-container'>
        <div className='settings'>
          <div className='img-container'>
            <img src='https://www.flaticon.com/svg/static/icons/svg/3237/3237472.svg' />
          </div>
          <div className='user-text'>Name : {auth.user.name}</div>
          <div className='user-text'>Email : {auth.user.email}</div>
        </div>
        <PostsList posts={posts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    posts: state.posts.UserPosts,
  };
}
export default connect(mapStateToProps)(Profile);
