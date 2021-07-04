import React from 'react';
//BrowserRouter
import {Router, Route} from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

//185532324616-9md2o3f37mma3879slqg8tjttiasio1o.apps.googleusercontent.com
const App = () => {
    return (
       <div className="ui container"  >  
         <Router history={history}>
            <Header/>
             <div>
                <Route path="/" exact component={StreamList}/>
                <Route path="/streams/new" exact component={StreamCreate}/>
                <Route path="/streams/edit/:id" exact component={StreamEdit}/>
                <Route path="/streams/delete" exact component={StreamDelete}/>
                <Route path="/streams/show" exact component={StreamShow}/>
             </div>
         </Router>
       </div>
    );
};

export default App;