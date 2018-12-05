import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getPosts} from "../../../actions/postsActions";
import Spinner from '../common/Spinner';
import {deletePost} from "../../../actions/postsActions";
import classnames from 'classnames';
import PostItem from './PostItem';

class PostList extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getPosts();
    }



    render() {
        const {posts,loading} = this.props.posts;

        let postsContent;

        if (loading === true){
            postsContent = <Spinner/>
        }
        else{
            postsContent = posts.map((post,index) => (
                <PostItem key={index} post={post} />
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