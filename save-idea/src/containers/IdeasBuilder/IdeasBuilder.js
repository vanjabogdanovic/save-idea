import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import * as actions from '../../store/actions/index';
import {updateObject} from "../../components/updateObject";
import {checkValidity} from "../../components/checkValidity";
import styles from './IdeasBuilder.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import errorHandler from '../../hoc/errorHandler';
import Rating from 'react-rating';


const IdeasBuilder = props => {
    const [ideaForm, setIdeaForm] = useState({
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Title'
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
            },
            valid: false,
            touched: false
        },
        description: {
            elementType: 'textarea',
            elementConfig: {
                placeholder: 'Description..',
            },
            value: '',
            validation: {
                required: true,
                minLength: 10,
                maxLength: 100,
            },
            valid: false,
            touched: false
        },
        category: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'personalLife', displayValue: 'Personal Life'},
                    {value: 'job', displayValue: 'Job'},
                    {value: 'education', displayValue: 'Education'},
                    {value: 'fun', displayValue: 'Fun'},
                    {value: 'travel', displayValue: 'Travel'},
                    {value: 'other', displayValue: 'Other'},
                ]
            },
            value: 'personalLife',
            validation: {},
            valid: true
        },
        expectations: {
            elementType: 'textarea',
            elementConfig: {
                placeholder: 'Expectations..'
            },
            value: '',
            validation: {
                required: true,
                minLength: 10,
                maxLength: 100,
            },
            valid: false,
            touched: false
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (props.update) {
            let inputs = {...ideaForm};
            inputs.title.value = props.updatedIdeaData.ideaData.title;
            inputs.category.value = props.updatedIdeaData.ideaData.category;
            inputs.expectations.value = props.updatedIdeaData.ideaData.expectations;
            inputs.description.value = props.updatedIdeaData.ideaData.description;
            inputs.title.valid = true;
            inputs.category.valid = true;
            inputs.expectations.valid = true;
            inputs.description.valid = true;
            setIdeaForm(inputs);
            setRating(props.updatedIdeaData.ideaData.rating)
            setFormIsValid(true);
        } else if (props.match.params.id) {
            if(!props.idea){
                props.onFetchIdea(props.token, props.match.params.id);
            } else{
                let inputs = {...ideaForm};
                inputs.title.value = props.idea.ideaData.title;
                inputs.category.value = props.idea.ideaData.category;
                inputs.expectations.value = props.idea.ideaData.expectations;
                inputs.description.value = props.idea.ideaData.description;
                inputs.title.valid = true;
                inputs.category.valid = true;
                inputs.expectations.valid = true;
                inputs.description.valid = true;
                setIdeaForm(inputs);
                setRating(props.idea.ideaData.rating)
                setFormIsValid(true);
            }
        }
    }, [props.idea]);

    const ideaHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in ideaForm) {
            formData[formElementIdentifier] = ideaForm[formElementIdentifier].value;
        }
        formData.date = new Date();
        formData.rating = rating;
        const idea = {
            ideaData: formData,
            userId: props.userId,
        };
        if (!props.update) {
            props.onSaveIdea(idea, props.token);
        } else {
            props.onUpdate(props.token, props.updatedIdeaData.id, idea);
        }
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(ideaForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, ideaForm[inputIdentifier].validation),
            touched: true,
        });
        const updatedIdeaData = updateObject(ideaForm, {
            [inputIdentifier]: updatedFormElement
        });
        updatedIdeaData[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedIdeaData) {
            formIsValid = updatedIdeaData[inputIdentifier].valid && formIsValid;
        }
        setFormIsValid(formIsValid);
        setIdeaForm(updatedIdeaData);
    };

    const formElementsArray = [];
    for (let key in ideaForm) {
        formElementsArray.push({
            id: key,
            config: ideaForm[key]
        });
    }
    let form;
    form = (
        <form onSubmit={ideaHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}/>
            ))}
            <Rating
                stop='10'
                initialRating={rating}
                onClick={(value) => setRating(value)}/>
            {props.update
                ? <Button
                    btnType="Success"
                    disabled={!formIsValid}>UPDATE IDEA</Button>
                : <Button
                    btnType="Success"
                    disabled={!formIsValid}>SAVE IDEA</Button>
            }
        </form>
    );


    if (props.loading) {
        form = <Spinner/>;
    }

    return (
        <div className={styles.IdeasBuilder}>
            <h2>{props.update ? 'Update Idea' : 'Create New Idea'}</h2>
            {form}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.ideasBulider.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        update: state.ideasBulider.update,
        updatedIdeaData: state.ideasBulider.updateIdeaData,
        idea: state.ideasBulider.idea,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveIdea: (ideaData, token) => dispatch(actions.saveIdea(ideaData, token)),
        onUpdate: (token, ideaId, ideaData) => dispatch(actions.updateIdea(token, ideaId, ideaData)),
        onUpdateInit: (ideaData) => dispatch(actions.updateInit(ideaData)),
        onFetchIdea: (token, ideaId) => dispatch(actions.fetchIdea(token, ideaId)),
    }
};

export default errorHandler(connect(mapStateToProps, mapDispatchToProps)(IdeasBuilder), axios);