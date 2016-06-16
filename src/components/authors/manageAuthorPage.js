"use strict";

var React=require("react");
var Router=require('react-router');
var AuthorForm=require('./authorForm');
var toastr=require('toastr');
import {updateAuthor,createAuthor} from ('../../actions/authorActions');
import {connect} from 'react-redux'


var ManageAuthorPage=React.createClass({
    mixins:[
        Router.Navigation
    ],
    statics:{
        willTransitionFrom:function (transition,component) {

        }
    },
    getInitialState:function () {
        return{
            author:{id:'',firstName:'',lastName:''},
            errors:{},
            dirty:false
        };
    },
    componentWillMount:function () {
        var authorId=this.props.params.id;
        if(authorId){
            this.setState({author:AuthorStore.getAuthorById(authorId)});
        }
    },
    setAuthorState:function (event) {//called when key press
        this.setState({dirty:true});
        var field=event.target.name;
        var value=event.target.value;
        this.state.author[field]=value;
        return this.setState({author:this.state.author});
    },
    authorFormIsValid:function () {
        var formIsValid=true;
        this.state.errors={};
        if(this.state.author.firstName.length<3){
            this.state.errors.firstName='First name must be at least 3 characters.';
            formIsValid=false;
        }
        if(this.state.author.lastName.length<3){
            this.state.errors.lastName='Last name must be at least 3 characters.';
            formIsValid=false;
        }
        
        this.setState({errors:this.state.errors});
        return formIsValid;
    },
    saveAuthor:function (event) {
        event.preventDefault();
        
        if(!this.authorFormIsValid()){
            return;
        }
        if(this.props.author.id){
            this.props.updateAuthor(this.state.author);
        }else{
            this.props.createAuthor(this.state.author);
        }

        this.setState({dirty:false});
        toastr.success('Author saved.');
        this.transitionTo('authors');
    },
    render:function () {
        return (
            <AuthorForm author={this.props.author}
                        onChange={this.setAuthorState}
                        onSave={this.saveAuthor}
                        errors={this.state.errors}/>
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
        authors:state
    }
}

export default connect(
    mapStateToProps,
    {updateAuthor,createAuthor}
)(ManageAuthorPage)