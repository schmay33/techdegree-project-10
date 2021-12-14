import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

    state = {
        authenticatedUser: Cookies.get('authenticatedUser') || null,
    };

    constructor() {
        super();
        this.data = new Data();
    }

    // Render the value properties object
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

    // Function to sign in 
    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if (user !== null && user.id) {
            console.dir({ ...user, ...{ password } });
            this.setState(() => {
                return {
                    authenticatedUser: { ...user, ...{ password } }
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(this.state.authenticatedUser), { expires: 1 });
        }
        return user;
    }
    
    // function signOut
    signOut = () => {
        this.setState({
            authenticatedUser: null,
        });
        Cookies.remove('authenticatedUser');
    }
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


