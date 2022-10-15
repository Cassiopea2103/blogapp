import { useFetchPostsByUserQuery } from '../posts/postsSlice'
import {useUpdateUserMutation, useDeleteUserMutation} from './usersSlice'
import { selectUserById } from './usersSlice'

import { useParams, Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { useSelector } from 'react-redux'

const SingleUserPage= ()=> {

    const {userId}= useParams()
    const navigate= useNavigate()

    const user= useSelector(state=> selectUserById(state, Number(userId)))

    const [updateUser, {isLoading: updateLoading}]= useUpdateUserMutation()
    const [deleteUser]= useDeleteUserMutation()

    const [name, setName]= useState(user?.name)

    const onNameChange= (e)=> setName(e.target.value)

    const {
        data: userPosts,
        isLoading,
        isSuccess,
        isError,
        error
    }= useFetchPostsByUserQuery(userId)

    const canUpdate= Boolean(name) && !updateLoading

    let content;
    
    if (isLoading){
        content= <p>Loading User Posts...</p>
    } else if (isSuccess){
        content= userPosts.ids.map((userPostId)=> (
            <li key= {userPostId}>
                <Link to={`/posts/${userPostId}`}>{userPosts.entities[userPostId].title}</Link>
            </li>
        ))
    } else if (isError){
        content= <p>{error}</p>
    }

    const onEditUserClick= async(e)=>{
        e.preventDefault()

        try{
            await updateUser({id: user.id, name}).unwrap()
            navigate(`/users`)
            
        } catch(error){
            console.log(error)
        }
    }

    const onDeleteUserClick= async ()=> {
        try{
            await deleteUser({userId})
            setName('')
            navigate(`/users`)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <section className= 'singleUserPage'>

            <form>
                <label htmlFor="editUserName">Edit User</label>
                <input 
                    type="text" 
                    id='editUserName'
                    placeholder= 'User Name'
                    value= {name}
                    onChange= {onNameChange}
                />

                <button
                    type= 'button'
                    disabled= {!canUpdate}
                    className= 'editUser'
                    onClick= {onEditUserClick}
                >
                    Edit User
                </button>

                <button
                    type= 'button'
                    className= 'deleteUser'
                    onClick= {onDeleteUserClick}
                >
                    Delete User
                </button>
            </form>

            {user? <h2>{user.name}</h2> : ''}
            {content}
        </section>
    )
}

export default SingleUserPage