"use strict";

var React=require('react');

var About=React.createClass({
    statics:{
        willTransitionTo:function (transition,params,query,callback) {
            console.log('Welcome to about page!');
            callback();
        },
        willTransitionFrom:function (transition,component) {
            console.log('You leave about page!');
        }
    },
    render:function () {
        return (
            <div>
                <h1>About</h1>
                <p>This application uses the following technologies:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                        <li>Node</li>
                        <li>Gulp</li>
                    </ul>
                </p>
            </div>
        );
    }
});

module.exports=About;
