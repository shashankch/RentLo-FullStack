import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { applyOnProperty, fetchPosts } from '../actions/posts';
class PostsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  applyProperty = (asset, user, e) => {
    e.preventDefault();
    console.log('asset and user:', asset, user);
    this.props.dispatch(applyOnProperty(user, asset));
  };

  checkApplied = (user, post, AppliedPosts) => {
    let index = post.tenant.findIndex((item) => item.id === user);

    let result = post.tenant.filter((tenant) => tenant.id === user);
    if (result.length > 0) {
      return {
        apply: true,
        stat:
          post.tenant[index].stat != null ? post.tenant[index].stat : 'Pending',
      };
    }

    if (AppliedPosts) {
      let val = AppliedPosts.indexOf(post._id);
      if (val !== -1) {
        return {
          apply: true,
          stat: 'Pending',
        };
      }
    }
    return { apply: false, stat: 'Not Applied' };
  };

  componentDidUpdate() {}

  render() {
    const { posts, auth, AppliedPosts } = this.props;
    console.log('POST$$', this.props);
    return (
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post._id} className='movie-card'>
              <div className='left'>
                <img
                  alt='movie-poster'
                  src={
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80'
                  }
                />
              </div>
              <div className='right'>
                <div className='title'>City : {post.location}</div>
                <div className='plot'>Owner : {post.owner.name}</div>
                <div className='plot'>Email : {post.owner.email}</div>

                <div className='plot'>Size : {post.size} BHK</div>
                <div className='plot'>Rent : {post.rent}</div>

                <div className='footer'>
                  <div className='rating'>
                    Status:{' '}
                    {auth.isLoggedin
                      ? this.checkApplied(auth.user._id, post, AppliedPosts)
                          .stat
                      : 'NA'}
                  </div>
                  {auth.isLoggedin &&
                    !this.checkApplied(auth.user._id, post).apply && (
                      <div>
                        <button
                          onClick={(e) =>
                            this.applyProperty(post._id, auth.user._id, e)
                          }
                          disabled={
                            this.checkApplied(auth.user._id, post, AppliedPosts)
                              .apply
                          }
                          className={this.checkApplied(auth.user._id, post, AppliedPosts)
                              .apply ?'unfavourite-btn':'favourite-btn'}
                        >
                        {this.checkApplied(auth.user._id, post, AppliedPosts)
                              .apply ?'Applied':'Apply'}
                         
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,

    apply: state.posts.apply,
    AppliedPosts: state.posts.AppliedPosts,
  };
}
export default connect(mapStateToProps)(PostsList);
