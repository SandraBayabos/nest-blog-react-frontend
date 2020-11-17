import React, { Component, createContext, useContext } from "react";
import createAuth0Client, { Auth0ClientOptions } from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js";


/*
create an interface used to define the specific types of values that 
should be passed as an option when creating Auth0Context
*/

interface ContextValueType {
  isAuthenticated?: boolean,
  user?: any,
  isLoading?: boolean,
  handleRedirectCallback?: () => void,
  getIdTokenClaims?: (...p: any) => any,
  getTokenSilently?: (...p: any) => any,
  logout?: (...p: any) => any,
}

/*
To make auth0 available globally within any components of your application, 
you will use React Context. This provides a way to pass data through the 
component tree without having to pass props down to a child component.
*/

// create context
export const Auth0Context: any = createContext<ContextValueType | null>(null);

/*
Pass the Auth0Context to React’s useContext() hook. 
This is to create a global state of the Auth0Context and make it easy 
to share across all components in the application.
*/
export const useAuth0: any = () => useContext(Auth0Context);

/*
Create an interface for an Auth0Provider(), which extends the React component. 
The Auth0Provider() will be used to wrap the entire application so that 
the authentication functions can be called anywhere
*/

interface IState {
  auth0Client: any,
  isLoading: boolean,
  isAuthenticated: boolean,
  user?: any;
}

/*
Create an Auth0Provider component and initialized Auth0 SPA SDK by passing 
the appropriate configuration to it through the private config() method 
with a type of Auth0ClientOptions to the initializeAuth0() method. 
Then call the initializeAuth0() method once the component is mounted.

Auth0 authentication process works by redirecting a user to an Auth0 universal login page 
from your application. Once this is successful, the user will be redirected back to your application 
with some additional contents in the URL, such as an authentication code. 
To properly handle this redirection, you checked for code= in the URL. 
If it exists, you will then call a handleRedirectCallback() method
*/

export class Auth0Provider extends Component<{}, IState > {
  // initialising the Auth0 SPA SDK with the appropriate configuration options
  constructor(props: any) {
    super(props)
    this.state = {
      isLoading: true,
      isAuthenticated: false,
      user: null,
      auth0Client: Auth0Client
    };
  }
  config: Auth0ClientOptions = {
    domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
    client_id: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
    redirect_uri: window.location.origin
  };
  componentDidMount() {
    this.initializeAuth0();
  }
  // initialize the Auth0 library
  initializeAuth0 = async () => {
    const auth0Client = await createAuth0Client(this.config);
    this.setState({ auth0Client });
    // check to see if they have redirected after login
    if(window.location.search.includes('code=')) {
      return this.handleRedirectCallback();
    }
    const isAuthenticated = await auth0Client.isAuthenticated();
    const user = isAuthenticated ? await auth0Client.getUser() : null;
    this.setState({ isLoading: false, isAuthenticated, user });
  };
  render() {

  }
}