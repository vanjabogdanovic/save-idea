import React, {useState, useEffect} from 'react';
import styles from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import {checkValidity} from "../../components/checkValidity";
import {updateObject} from "../../components/updateObject";

const Auth = props => {
    const [register, setRegister] = useState({
        email: {
            type: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false
        },
        password: {
            type: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
            },
            valid: false,
            touched: false
        }
    });
    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        if (props.authRedirectPath !== '/') {
            props.onSetAuthRedirectPath();
        }
    });

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(register, {
            [controlName]: updateObject(register[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, register[controlName].validation),
                touched: true,
            })
        });
        setRegister(updatedControls);
    };

    const submitHandler = event => {
        event.preventDefault();
        props.onAuth(register.email.value, register.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    };

    const formElementsArray = [];
    for (let key in register) {
        formElementsArray.push({
            id: key,
            config: register[key]
        });
    }
    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
        />
    ));

    return (
        <div className={styles.Auth}>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>SUBMIT</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType='Success'>SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectedPath('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);