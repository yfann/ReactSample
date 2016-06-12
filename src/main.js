
$ = jQuery = require('jquery');
var React = require('react');
var Router=require('react-router');
var routes=require('./routes');
var InitializeActions=require('./actions/initializeActions');

InitializeActions.initApp();

//Router.HistoryLocation is optional
Router.run(routes,Router.HistoryLocation,function(Handler){
    React.render(<Handler/>,document.getElementById('app'));
});


