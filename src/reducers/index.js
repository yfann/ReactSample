import {
    CREATE_AUTHOR,
    UPDATE_AUTHOR,
    DELETE_AUTHOR,
    GET_AUTHORS
} from '../constants/actionTypes.js'
var _=require('lodash');

export default function author(state=[],action) {
    switch(action.type){
        case CREATE_AUTHOR:
            return [...state,action.author]
        case UPDATE_AUTHOR:
            var existingAuthor=_.find(state,{id:action.author.id});
            var existingAuthorIndex=_.indexOf(state,existingAuthor);
            return [...state.splice(existingAuthorIndex,1,action.author)];
        case DELETE_AUTHOR:
            var existingAuthor=_.find(state,{id:action.id});
            var existingAuthorIndex=_.indexOf(state,existingAuthor);
            return [...state.splice(existingAuthorIndex,1)];
        case GET_AUTHORS:
            return [...action.authors]
        default:
            return state;
    }
}
