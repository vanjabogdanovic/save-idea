import React, {useEffect, Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import IdeasBuilder from './containers/IdeasBuilder/IdeasBuilder';
import Logout from './containers/Auth/Logout';
import Auth from './containers/Auth/Auth';
import IdeasList from './containers/IdeasList/IdeasList'

const App = props => {
    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    let routes = (
        <Switch>
            <Route path="/your-ideas" render={(props) => <IdeasList {...props}/>}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/auth" render={(props) => <Auth {...props}/>}/>
            <Route path="/:id" exact component={IdeasBuilder}/>
            <Route path="/" exact component={IdeasBuilder}/>
            <Redirect to="/"/>
        </Switch>
    )

    return (
        <div>
            <Layout>
                <Suspense fallback={<Spinner/>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
