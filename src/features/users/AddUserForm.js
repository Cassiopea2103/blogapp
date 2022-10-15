import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {useAddUserMutation} from './usersSlice'

const AddUserForm= ()=>{

    const [addUser]= useAddUserMutation()

    const navigate= useNavigate()
    
    const [name, setName]= useState('')

    const onNameChange= (e)=> setName(e.target.value)

    const canSave= Boolean(name)

    const onSaveUserClick= async()=> {
        
        try{
            await addUser({name}).unwrap()
            setName('')
            navigate('/users')
        } catch(error){
            console.log(error)
        }
    }
    return (
        <section className= 'addUserSection'>
            <h2>Add New User</h2>

            <form>
                <label htmlFor="userName">Name</label>
                <input 
                    type="text"
                    id='userName'
                    value= {name}
                    onChange= {onNameChange}
                    placeholder= 'User Name'
                    
                />

                <button
                    type='button'
                    disabled= {!canSave}
                    onClick= {onSaveUserClick}
                >
                    Save User
                </button>

            </form>

           

        </section>
    )

}

export default AddUserForm