import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
    //TODO: Setup state
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    };
    //TODO: Constructor
    constructor() {
        super();
        this.data = new Data();
    }

    //TODO: Render the value properties object
    render() {
        const { authenticatedUser } = this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
            },
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        )
    }

    //TODO: Create funciton signIn

    //TODO: Create function signOut
}

// Context Consumer
export const Consumer = Context.Consumer;

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

const contextObjects = {withContext, Context};
export default contextObjects;


