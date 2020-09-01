import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const saveIdeaStart = () => {
    return {
        type: actionTypes.SAVE_IDEA_START,
    }
};

export const saveIdeaSuccess = (id, data) => {
    return {
        type: actionTypes.SAVE_IDEA_SUCCESS,
        ideaId: id,
        ideaData: data,
    }
};

export const saveIdeaFail = (error) => {
    return {
        type: actionTypes.SAVE_IDEA_FAIL,
        error: error
    }
};

export const saveIdea = (ideaData, token) => {
    return dispatch => {
        dispatch(saveIdeaStart());
        axios.post('/ideas.json?auth=' + token, ideaData)
            .then(response => {
                dispatch(saveIdeaSuccess(response.data.id, ideaData));
            })
            .catch(error => {
                dispatch(saveIdeaFail(error));
            });
    }
};

export const fetchIdeaSuccess = idea => {
    return {
        type: actionTypes.FETCH_IDEA_SUCCESS,
        idea: idea
    }
};

export const fetchIdeaFail = error => {
    return {
        type: actionTypes.FETCH_IDEA_FAIL,
        error: error,
    }
};

export const fetchIdeaStart = () => {
    return {
        type: actionTypes.FETCH_IDEA_START
    }
};

export const fetchIdea = (token, ideaId) => {
    return dispatch => {
        dispatch(fetchIdeaStart());
        axios.get('/ideas/' + ideaId + '.json?auth=' + token)
            .then(res => {
                dispatch(fetchIdeaSuccess(res.data));
            })
            .catch(err => {
                dispatch(fetchIdeaFail(err));
            });
    }
};

export const fetchIdeasSuccess = ideas => {
    return {
        type: actionTypes.FETCH_IDEAS_SUCCESS,
        ideas: ideas
    }
};

export const fetchIdeasFail = error => {
    return {
        type: actionTypes.FETCH_IDEAS_FAIL,
        error: error,
    }
};

export const fetchIdeasStart = () => {
    return {
        type: actionTypes.FETCH_IDEAS_START
    }
};

export const fetchIdeas = (token, userId) => {
    return dispatch => {
        dispatch(fetchIdeasStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/ideas.json' + queryParams)
            .then(res => {
                const fetchedIdeas = [];
                for (let key in res.data) {
                    fetchedIdeas.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchIdeasSuccess(fetchedIdeas));
            })
            .catch(err => {
                dispatch(fetchIdeasFail(err));
            });
    }
};

export const deleteIdeaSuccess = (ideas, id) => {
    return {
        type: actionTypes.DELETE_IDEA_SUCCESS,
        ideas: ideas.filter(idea => idea.id !== id)
    }
};

export const deleteIdeaFail = error => {
    return {
        type: actionTypes.DELETE_IDEA_FAIL,
        error: error,
    }
};

export const deleteIdeaStart = () => {
    return {
        type: actionTypes.DELETE_IDEA_START
    }
};

export const deleteIdea = (token, ideaId, ideas) => {
    return dispatch => {
        dispatch(deleteIdeaStart());
        axios.delete('/ideas/' + ideaId + '.json?auth=' + token)
            .then(res => {
                dispatch(deleteIdeaSuccess(ideas, ideaId));
            })
            .catch(err => {
                dispatch(deleteIdeaFail(err));
            });
    }
};

export const updateInit = ideaData => {
    return {
        type: actionTypes.UPDATE_INIT,
        updateIdeaData: ideaData
    }
};

export const updateIdeaSuccess = (ideas, id) => {
    return {
        type: actionTypes.SAVE_IDEA_SUCCESS,
        ideaId: id,
        ideaData: ideas,
    }
};

export const updateIdeaFail = error => {
    return {
        type: actionTypes.UPDATE_IDEA_FAIL,
        error: error,
    }
};

export const updateIdeaStart = () => {
    return {
        type: actionTypes.UPDATE_IDEA_START
    }
};

export const updateIdea = (token, ideaId, ideaData) => {
    return dispatch => {
        dispatch(updateIdeaStart());
        axios.put('/ideas/' + ideaId + '.json?auth=' + token, ideaData)
            .then(res => {
                dispatch(updateIdeaSuccess(res.data, ideaId));
            })
            .catch(err => {
                dispatch(updateIdeaFail(err));
            });
    }
};