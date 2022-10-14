import { useState } from 'react'

import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

import { useParams, useNavigate } from  'react-router-dom'

import { useUpdatePostMutation, useDeletePostMutation } from './postsSlice'

const EditPostForm= ()=> {

    const { postId }= useParams()

    const navigate= useNavigate()

    const users= useSelector(selectAllUsers)
    
    const post= useSelector((state)=> selectPostById(state, Number(postId)))

    const [updatePost, {isLoading}]= useUpdatePostMutation()
    const [deletePost]= useDeletePostMutation()

    const [editTitle, setEditTitle]= useState(post?.title)
    const [editUserId, setEditUserId]= useState(post?.userId)
    const [editBody, setEditBody]= useState(post?.body)

    const onEditTitleChange= (e)=> setEditTitle(e.target.value)
    const onEditUserIdChange= (e)=> setEditUserId(e.target.value)
    const onEditBodyChange= (e)=> setEditBody(e.target.value)

    const canSave= [editTitle, editUserId, editBody].every(Boolean) && !isLoading

    const userOptions= users.map((user)=>(
        <option value= {user.id} key={user.id}>
            {user.name}
        </option>
    ))

    const onEditPostClick= async()=> {
        try{
            if (!isLoading){
                await updatePost({id: post.id, userId: editUserId, body: editBody, title: editTitle}).unwrap()
                setEditTitle('')
                setEditBody('')
                setEditUserId('')
                navigate(`/`)
            } 
        } catch (error){
            console.log(error)
        }
    }

    const onDeleteButtonClick= async()=>{
        try{
            await deletePost({postId: postId}).unwrap()
            navigate('/')
        }catch (error){
            console.log(error)
        }
    }

    return (
        <section className='EditPost'>

            <h2 style={{textAlign: 'center'}}>
                Edit Post
            </h2>

            <form>
                
                <label htmlFor="postTitle">Title</label>
                <input 
                    type="text" 
                    id='postTitle'
                    placeholder= 'Post Title'
                    value= {editTitle}
                    onChange= {onEditTitleChange}
                />

                <select 
                    name="postAuthor" 
                    id="postAuthor"
                    defaultValue= {editUserId}
                    onChange= { onEditUserIdChange }
                >
                        {userOptions}
                </select>

                <label htmlFor="postContent">Content</label>
                <textarea
                    id='postContent'
                    name= 'postContent'
                    placeholder= "Post Content"
                    value= {editBody}
                    onChange= {onEditBodyChange}
                />

                <button
                    type= "button"
                    className= 'editButton'
                    disabled= {!canSave}
                    onClick= {onEditPostClick}
                >
                    Edit Post
                </button>

                <button
                    type= "button"
                    className= "deleteButton"
                    onClick= {onDeleteButtonClick}
                >
                    Delete Post
                </button>
            

            </form>
        </section>
    )
}

export default EditPostForm