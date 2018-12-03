import React,{Component} from 'react';

class CommentItem extends Component{
    render(){
        const {comment} = this.props;
        return(
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="#">
                            <img className="rounded-circle d-none d-md-block"
                                 src={comment.avatar} alt=""/>
                        </a>
                        <br/>
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead"> {comment.text}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentItem