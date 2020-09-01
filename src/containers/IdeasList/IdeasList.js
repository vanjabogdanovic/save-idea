import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-config';
import * as actions from '../../store/actions/index';
import errorHandler from '../../hoc/errorHandler';
import IdeaListItem from '../../components/IdeaListItem/IdeaListItem';
import Spinner from '../../components/UI/Spinner/Spinner';


const IdeasList = props => {

    useEffect(() => {
        props.onFetchIdeas(props.token, props.userId);
    }, []);

    let ideas = <Spinner/>;
    if (!props.loading) {
        ideas = props.ideas.map(idea => (
            <IdeaListItem
                key={idea.id}
                data={idea}
                clicked={() => props.onDelete(props.token, idea.id, props.ideas)}
                updated={() => props.onUpdateInit(idea)}/>
        ))
    }

    return (
        <div>
            {ideas}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ideas: state.ideasBulider.ideas,
        loading: state.ideasBulider.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchIdeas: (token, userId) => dispatch(actions.fetchIdeas(token, userId)),
        onDelete: (token, ideaId, ideas) => dispatch(actions.deleteIdea(token, ideaId, ideas)),
        onUpdateInit: (ideaData) => dispatch(actions.updateInit(ideaData)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(IdeasList, axios));