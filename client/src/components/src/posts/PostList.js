import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getPosts} from "../../../actions/postsActions";
import Spinner from '../common/Spinner';
import {deletePost} from "../../../actions/postsActions";
import classnames from 'classnames';

class PostList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getPosts();
    }

    deletePost(id){
        this.props.deletePost(id)
    };

    render() {
        const {posts,loading} = this.props.posts;
        const {user} = this.props.auth;

        let postsContent;

        if (loading === true){
            postsContent = <Spinner/>
        }
        else{
            postsContent = posts.map((post,index) => (
                <div key={index} className="card card-body mb-3">
                    <div className="row">
                        <div className="col-md-2">
                            <a href={`/profile/${post.user.handle}`}>
                                <img className="rounded-circle d-none d-md-block"
                                     src={post.avatar}
                                     alt=""/>
                            </a>
                            <br/>
                            <p className="text-center">{post.name}</p>
                        </div>
                        <div className="col-md-10">
                            <p className="lead">{post.text}</p>
                            <button type="button" className="btn btn-light mr-1">
                                <i className={classnames('fas fa-thumbs-up',{
                                    'text-info': user.id === post.user,
                                    'text-secondary' : user.id !== post.user
                                })}/>
                                <span className="badge badge-light">4</span>
                            </button>
                            <button type="button" className="btn btn-light mr-1">
                                <i className="text-secondary fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                Comments
                            </Link>
                            {user.id === post.user ? (
                                <button onClick={this.deletePost.bind(this,post._id)} type="button" className="btn btn-danger mr-1">
                                    <i className="fas fa-times" />
                                </button>
                            ) : ""}
                        </div>
                    </div>
                </div>

            ))
        }

        return (
            <div className="posts">
                {postsContent}
            </div>
        )

    }
}

const mapStateToProps = state => ({
  posts:state.posts,
  auth:state.auth,
  errors:state.errors
});

export default connect(mapStateToProps,{getPosts,deletePost})(PostList)