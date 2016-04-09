
$ = jQuery = require('jquery');
var React = require('react');
var Router=require('react-router');
var routes=require('./routes');
var InitializeActions=require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(routes,Router.HistoryLocation,function(Handler){
    React.render(<Handler/>,document.getElementById('app'));
});

// 
// var Home = require('./components/homePage');
// var About = require('./components/about/aboutPage');
// var Authors=require('./components/authors/authorPage');

// //simple route
// var App = React.createClass({
//     render:function(){
//         var Child;
        
//         switch(this.props.route){
//             case 'about':Child=About;break;
//             case 'authors':Child=Authors;break;
//             default:Child=Home;
//         }
        
//         return(
//             <div>
//                <Header/>
//                <Child/>
//             </div>
//         );
//     }
// });

// function render(){
//     var route = window.location.hash.substr(1);
//     React.render(<App route={route}/>,document.getElementById('app'));
// }

// window.addEventListener('hashchange',render);
// render();

