import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux';
import {store} from './app/store'
import {postsSlice} from './features/posts/postsSlice'
import { usersSlice } from './features/users/usersSlice';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Main from './Main';

store.dispatch(postsSlice.endpoints.fetchPosts.initiate())
store.dispatch(usersSlice.endpoints.fetchUsers.initiate())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
    <Provider store= {store}>

      <Router>
        <Routes>
          <Route path= '/*' element= {<Main/>}/>
        </Routes>
      </Router>
      
    </Provider>

  </React.StrictMode>
);
