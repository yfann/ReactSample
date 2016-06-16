
var React = require('react');
var Router=require('react-router');
var routes=require('./routes');
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux'
import reducer from './reducers'

Router.run(routes,Router.HistoryLocation,function(Handler){
    React.render(
       <Provider store={store}>
        <Handler/>
       </Provider>,
      document.getElementById('app'));
});


