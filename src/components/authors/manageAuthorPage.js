"use strict";

var React=require("react");
var Router=require('react-router');
var AuthorForm=require('./authorForm');
var toastr=require('toastr');
import {updateAuthor,createAuthor} from ('../../actions/authorActions');
import {connect} from 'react-redux'


var ManageAuthorPage=React.createClass({
    saveAuthor:function (event) {
        event.preventDefault();

        if(this.props.author.id){
            this.props.updateAuthor(this.state.author);
        }else{
            this.props.createAuthor(this.state.author);
        }
        toastr.success('Author saved.');
    },
    setAuthor:function(){
        
    },
    render:function () {
        return (
            <AuthorForm author={this.props.author}
                        onChange={this.setAuthor}
                        onSave={this.saveAuthor}
                        errors={this.props.errors}/>
        );
    },
    propTypes:{
        authors:React.PropTypes.array.isRequired,
        updateAuthor:React.PropTypes.func.isRequired,
        createAuthor:React.PropTypes.func.isRequired
    }
});


const mapStateToProps=(state)=>{
    return {
        author:{},
        errors:{}
    }
}

export default connect(
    mapStateToProps,
    {updateAuthor,createAuthor}
)(ManageAuthorPage)