import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Post from './components/posts/Post';
import Edit from './components/posts/Edit';
import Create from './components/posts/Create';

function App(): JSX.Element {
  return (
    <div className="App">
    <Navbar />
      <div className={'container'}>
        <Switch>
          <Route path={"/"} exact={true} component={Home} />
          <Route path={"/post/:postId"} component={Post}/>
          <Route path={"/edit/:postId"} component={Edit}/>
          <Route path={"/create"} component={Create} />
        </Switch>
      </div>
    </div>
  );
}
export default App;