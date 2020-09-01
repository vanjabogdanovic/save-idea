import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../components/updateObject";

const initialState = {
    ideas: [],
    loading: false,
    purchased: false,
    update: false,
    updateIdeaData: null,
    idea: null,
};

const saveIdeaStart = state => {
    return updateObject(state, {loading: true});
};

const saveIdeaSuccess = (state, action) => {
    const newIdea = updateObject(action.ideaData, {id: action.ideaId});
    return updateObject(state, {
        loading: false,
        ideas: state.ideas.concat(newIdea),
        purchased: true,});
};

const saveIdeaFail = state => {
    return updateObject(state, {loading: false});
};

const fetchIdeasStart = state => {
    return updateObject(state, {loading: true});
};

const fetchIdeasSuccess = (state, action) => {
    return updateObject(state, {ideas: action.ideas, loading: false});
};

const fetchIdeasFail = state => {
    return updateObject(state, {loading: false});
};

const fetchIdeaStart = state => {
    return updateObject(state, {loading: true});
};

const fetchIdeaSuccess = (state, action) => {
    return updateObject(state, {idea: action.idea, loading: false});
};

const fetchIdeaFail = state => {
    return updateObject(state, {loading: false});
};

const deleteIdeaStart = state => {
    return updateObject(state, {loading: true});
};

const deleteIdeaSuccess = (state, action) => {
    return updateObject(state, {ideas: action.ideas, loading: false});
};

const deleteIdeaFail = state => {
    return updateObject(state, {loading: false});
};

const updateIdeaStart = state => {
    return updateObject(state, {loading: true});
};

const updateIdeaSuccess = (state, action) => {
    return updateObject(state, {ideas: action.ideas, loading: false, update: false});
};

const updateIdeaFail = state => {
    return updateObject(state, {loading: false});
};

const updateInit = (state, action) => {
    return updateObject(state, {update: true, updateIdeaData: action.updateIdeaData})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_IDEA_START : return saveIdeaStart(state);
        case actionTypes.SAVE_IDEA_SUCCESS : return saveIdeaSuccess(state, action);
        case actionTypes.SAVE_IDEA_FAIL : return saveIdeaFail(state);
        case actionTypes.FETCH_IDEAS_START :return fetchIdeasStart(state);
        case actionTypes.FETCH_IDEAS_SUCCESS : return fetchIdeasSuccess(state, action);
        case actionTypes.FETCH_IDEAS_FAIL : return fetchIdeasFail(state);
        case actionTypes.FETCH_IDEA_START :return fetchIdeaStart(state);
        case actionTypes.FETCH_IDEA_SUCCESS : return fetchIdeaSuccess(state, action);
        case actionTypes.FETCH_IDEA_FAIL : return fetchIdeaFail(state);
        case actionTypes.DELETE_IDEA_START :return deleteIdeaStart(state);
        case actionTypes.DELETE_IDEA_SUCCESS : return deleteIdeaSuccess(state, action);
        case actionTypes.DELETE_IDEA_FAIL : return deleteIdeaFail(state);
        case actionTypes.UPDATE_IDEA_START :return updateIdeaStart(state);
        case actionTypes.UPDATE_IDEA_SUCCESS : return updateIdeaSuccess(state, action);
        case actionTypes.UPDATE_IDEA_FAIL : return updateIdeaFail(state);
        case actionTypes.UPDATE_INIT : return updateInit(state, action);
        default : return state;
    }
};

export default reducer;