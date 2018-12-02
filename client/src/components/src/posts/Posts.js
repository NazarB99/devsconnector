import React,{Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import PostForm from './PostForm';
import PostList from './PostList';

class Posts extends Component{
    render(){
        return(
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm/>
                            <PostList/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Posts