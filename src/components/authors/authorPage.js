"use strict";

var React = require('react');
var AuthorActions=require('../../actions/authorActions');
var AuthorStore=require('../../stores/authorStore');
var AuthorList = require('./authorList');
var Router=require('react-router');
var Link=Router.Link;

var Authors = React.createClass({
    getInitialState:function () {
        return {authors:AuthorStore.getAllAuthors()};
        //return {authors:[]};
    } ,
    // componentDidMount:function () {
    //     if(this.isMounted())
    //     {
    //        this.setState({authors:AuthorApi.getAllAuthors()});
    //     }
    // } ,
    componentWillMount:function () {//update UI
        AuthorStore.addChangeListener(this._onChange);
    },
    componentWillUnmount:function(){//update UI
        AuthorStore.removeChangeListener(this._onChange);
    },
    _onChange:function () {
        this.setState({authors:AuthorStore.getAllAuthors()});
    },
    render:function () {
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors = {this.state.authors}/>
            </div>
        );
    }
});

module.exports = Authors;