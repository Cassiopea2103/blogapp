import {useFetchUsersQuery} from './usersSlice'
import { Link } from 'react-router-dom';

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
            <h2>Users</h2>
            <ul>
                {content}
            </ul>
        </section>
    )
}

export default UsersList