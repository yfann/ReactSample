"user strict";

import api from '../api/authorApi'
import * as types from '../constants/ActionTypes'

function _createAuthor(author) {
    return {
        type:types.CREATE_AUTHOR,
        author:api.saveAuthor(author)
    }
}

export function createAuthor(author) {
    return dispatch=>{
        dispatch(_createAuthor(author));
    }
}


function _updateAuthor(author) {
    return {
        type:types.UPDATE_AUTHOR,
        author:api.saveAuthor(author)
    }
}

export function updateAuthor(author) {
    return dispatch=>{
        dispatch(_updateAuthor(author));
    }
}

function _deleteAuthor(id) {
    return {
        type:types.DELETE_AUTHOR,
        id:id
    }
}

export function deleteAuthor(id){
    return dispatch=>{
        dispatch(_deleteAuthor(id));
    }
}