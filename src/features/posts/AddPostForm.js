import { useSelector } from 'react-redux'
import {selectAllUsers} from '../users/usersSlice'
import { useAddPostMutation } from '../posts/postsSlice'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const AddPostForm= ()=>{

    const [addPost, { isLoading }]=useAddPostMutation()

    const users= useSelector(selectAllUsers)

    const navigate= useNavigate()

    const [title, setTitle]= useState('')
    const [body, setBody]= useState('')
    const [userId, setUserId]= useState('')

    const onTitleChange= (e)=> setTitle(e.target.value)
    const onBodyChange= (e)=> setBody(e.target.value)
    const onUserIdChange= (e)=> setUserId(e.target.value)

    const canSave= [userId, title, body].every(Boolean) && !isLoading

    const userOptions= users.map((user)=> (
        <option value= {user.id} key= {user.id}>
            {user.name}
        </option>
    ))

    const onSavePostClicked= async()=>{
        try{
            await addPost({userId, body, title}).unwrap()
            setTitle('')
            setBody('')
            setUserId('')
            navigate('/')
        } catch(error){
            console.log('failed to add a new Post', error )
        }
    }

    return (
        <section>
            <form>

                <label htmlFor="postTitle">Title</label>
                <input 
                    type="text"
                    name='postTitle' 
                    id='postTitle'
                    placeholder= 'Post Title'
                    value= {title}
                    onChange= {onTitleChange}
                />

                <select 
                    name="postAuthor"
                    id="postAuthor"
                    value= {userId}
                    onChange= {onUserIdChange}
                >
                    <option value="">Selct Post Author</option>
                    {userOptions}
                </select>

                <label htmlFor="postContent">Content</label>
                <textarea
                    id='postContent'
                    name= 'postContent'
                    placeholder= 'Post Content'
                    value= {body}
                    onChange= {onBodyChange}
                />

                <button
                    type= "button"
                    disabled= {!canSave}
                    onClick= {onSavePostClicked}
                >
                    <FontAwesomeIcon
                        icon={faSave}
                    />
                </button>

            </form>
        </section>
    )

}

export default AddPostForm