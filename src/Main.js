import {Routes, Route} from 'react-router-dom'

import Layout from './Components/Layout'

import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

const Main= ()=> {
  return (
    <Routes>

        <Route path='/' element={<Layout/>}>

          <Route index element={<PostsList/>} />

          <Route path='posts'>

            <Route index element={<AddPostForm/>}/>

          </Route>

        </Route>

    </Routes>
  );
}

export default Main;
