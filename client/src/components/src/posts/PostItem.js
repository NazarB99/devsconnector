import React,{Component} from 'react';
import {connect} from 'react-redux';
import classnames from "classnames";
import {Link} from 'react-router-dom';
import {deletePost} from "../../../actions/postsActions";
import {likePost, dislikePost} from "../../../actions/postsActions";


class PostItem extends Component{
    constructor(props){
        super(props);
    }

    deletePost(id){
        this.props.deletePost(id)
    };

    likePost(id){
        this.props.likePost(id);
        let like = document.getElementById(id);
        like.value += 1;
    }

    dislikePost(id){
        this.props.dislikePost(id);
        let like = document.getElementById(id);
        like.value -= 1;
    }

    checkIfLikeExist(post_id,likes, search){
        for (let i = 0; i < likes.length; i++){
            if (likes[i].user === search){
                this.dislikePost(post_id);
                return true;
            }
        }
        this.likePost(post_id);
        return false;
    }

    render(){
        const {post} = this.props;
        const {user} = this.props.auth;

        return(
            <div className="card card-body mb-3">
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
                        <button type="button" className="btn btn-light mr-1" onClick={this.checkIfLikeExist.bind(this,post._id,post.likes, user.id)}>
                            <i className={classnames('fas fa-thumbs-up',{
                                'text-info': user.id === post.user,
                                'text-secondary' : user.id !== post.user
                            })}/>
                            <span id={post._id} className="badge badge-light">{post.likes.length}</span>
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
        )
    }
}

const mapStateToProps = state => ({
   auth:state.auth,
});

export default connect(mapStateToProps,{deletePost, likePost, dislikePost})(PostItem)