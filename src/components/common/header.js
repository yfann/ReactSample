"use strict";

var React=require('react');

var Header=React.createClass({
    
    render:function () {
        
        var imageStyle={
            width:'50px',
            height:'50px'
        }
        
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">
                        <img style={imageStyle} src="images/logo.jpg" alt="" />
                    </a>
                    <ul className="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/#authors">Authors</a></li>
                        <li><a href="/#about">About</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports=Header;
