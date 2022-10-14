import {Routes, Route} from 'react-router-dom'

import Layout from './Components/Layout'

//Posts components:
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from './features/posts/EditPostForm'
import SinglePostPage from './features/posts/SinglePostPage'

// Users Components:
import UsersList from './features/users/UsersList'
import SingelUserPage from './features/users/SingleUserPage'

const Main= ()=> {
  return (
    <Routes>

        <Route path='/' element={<Layout/>}>

          <Route index element={<PostsList/>} />

          {/* Posts routes */}
          <Route path='posts'>

            <Route index element={<AddPostForm/>}/>
            <Route path='editPost/:postId' element= {<EditPostForm/>}/>
            <Route path= ':postId' element={<SinglePostPage/>} />

          </Route>

          {/* Users Routes */}
          <Route path= 'users'>

            <Route index element= {<UsersList/>}/>
            <Route path=':userId' element= {<SingelUserPage/>} />

          </Route>

        </Route>

    </Routes>
  );
}

export default Main;
