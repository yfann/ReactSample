"use strict";

var React = require('react');
var AuthorStore=require('../../stores/authorStore');
var AuthorList = require('./authorList');
var Router=require('react-router');
var Link=Router.Link;
import {deleteAuthor} from ('../../actions/authorActions');
import {connect} from 'react-redux'

var Authors = React.createClass({
    propTypes:{
        authors:React.PropTypes.array.isRequired,
        deleteAuthor:React.PropTypes.func.isRequired
    },
    render:function () {
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors = {this.props.authors} deleteAuthor={()=>this.props.deleteAuthor()}/>
            </div>
        );
    }
});

const mapStateToProps=(state)=>{
    return {
        authors:state
    }
}

export default connect(
    mapStateToProps,
    {deleteAuthor}
)(Authors)