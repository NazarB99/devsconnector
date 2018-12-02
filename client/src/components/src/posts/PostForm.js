import React,{Component} from 'react';
import {connect} from 'react-redux';
import TextAreaGroup from '../common/TextAreaComponent';
import {addPost} from "../../../actions/postsActions";

class PostForm extends Component{
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

    onChange = (e) => {
        return this.setState({[e.target.name] : e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {name,avatar} = this.props.auth.user;

        const newPost = {
            name:name,
            avatar:avatar,
            text:this.state.text
        };

        this.props.addPost(newPost);

    };

    render(){
        const {errors} = this.state;
        return(
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Say Somthing...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaGroup placeholder="Create a post" error={errors.text} name="text" value={this.state.text} onChange={this.onChange}/>
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
   auth:state.auth,
   errors:state.errors,
   posts:state.posts
});

export default connect(mapStateToProps,{addPost})(PostForm)