import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
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
export class Auth0Provider extends Component<{}, IState > {}


