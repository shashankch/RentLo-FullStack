import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts, getAssetsbyUser } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup, Search, Profile } from './';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(getAssetsbyUser(user._id));
    }
  }
 

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Switch>
            <Route
              exact
              path='/'
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/search' component={Search} />
            <Route path='/profile' component={Profile} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.Posts,
    SearchPosts: state.posts.SearchPosts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
