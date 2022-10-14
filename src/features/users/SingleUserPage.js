import { useFetchPostsByUserQuery } from '../posts/postsSlice'

import { useParams, Link } from 'react-router-dom'

const SingleUserPage= ()=> {
    const { userId } = useParams()

    const {
        data: userPosts,
        isLoading,
        isSuccess,
        isError,
        error
    }= useFetchPostsByUserQuery(userId)

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

    return (
        <section>
            <ul>
                {content}
            </ul>
        </section>
    )
}

export default SingleUserPage