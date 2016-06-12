"user strict";

import api from '../api/authorApi'
import * as types from '../constants/ActionTypes'

function _initApp(){
    return {
        type:types.INITIALIZE,
        initialData:api.getAllAuthors()
    }
}

export function initApp() {
    return dispatch=>{
        dispatch(_initApp());
    }
}