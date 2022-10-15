import {useFetchUsersQuery} from './usersSlice'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const UsersList= ()=> {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    }= useFetchUsersQuery()


    let content;
    
    if (isLoading){
        content= <p>Loading Users...</p>
    } else if (isSuccess){
        content= users.ids.map((userId)=> (
                <li key= {userId}>
                    <Link to={`/users/${userId}`}>{users.entities[userId].name}</Link>
                </li>
        ))
    } else if (isError){
        content= <p>{error}</p>
    }

    return (
        <section className= "usersList">
            
            <h2>
                Users List
            </h2>
            
            <Link to={`/users/addUser`}>
                    
            <button
                type= 'button'
                className='addUserButton'
            >
                <FontAwesomeIcon
                    className= 'addUserIcon'
                    icon= {faPlus}
                />
                <span>Add New User</span>
            </button>
            </Link>

            <ul>
                {content}
            </ul>
        </section>
    )
}

export default UsersList