import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getPost} from "../../../actions/postsActions";
import TextAreaGroup from '../common/TextAreaComponent';
import {addComment} from "../../../actions/postsActions";
import CommentItem from './CommentItem';
import isEmpty from "../../../validation/is-empty";

class Post extends Component{
    constructor(props){
        super(props);

        this.state = {
            text:'',
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }

    componentDidMount(){
        this.props.getPost(this.props.match.params.id)
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();

        const {user} = this.props.auth;
        const {post} = this.props.posts;

        const newComment ={
            text:this.state.text,
            name:user.name,
            avatar:user.avatar,
        };

        this.props.addComment(newComment,post._id);

    };

    render(){
        const {post,loading} = this.props.posts;
        const {errors} = this.state;

        return(
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-body mb-3">
                                <div className="row">
                                    <div className="col-md-2">
                                        <a href="#">
                                            <img className="rounded-circle d-none d-md-block"
                                                 src={post.avatar}
                                                 alt=""/>
                                        </a>
                                        <br/>
                                        <p className="text-center">{post.name}</p>
                                    </div>
                                    <div className="col-md-10">
                                        <p className="lead">{post.text}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="post-form mb-3">
                                <div className="card card-info">
                                    <div className="card-header bg-info text-white">
                                        Say Somthing...
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <TextAreaGroup name="text" className="form-control form-control-lg"
                                                               placeholder="Leave your comment here" value={this.state.text}
                                                               onChange={this.onChange} error={errors.text} />
                                            </div>
                                            <button type="submit" className="btn btn-dark">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="comments">
                                {isEmpty(post.comments) ? "" : (
                                    post.comments.map((comment,index) => (
                                        <CommentItem key={index} comment={comment} />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts:state.posts,
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps,{getPost,addComment})(Post);