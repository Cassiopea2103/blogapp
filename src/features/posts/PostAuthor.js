import {useSelector} from 'react-redux'
import { selectUserById } from '../users/usersSlice'
import { Link } from 'react-router-dom'

const PostAuthor= ({userId})=> {
    const postAuthor= useSelector(state=> selectUserById(state, Number(userId)))
    
    return <span>
        By {
            postAuthor
            ? <Link to={`/users/${postAuthor.id}`}>{postAuthor.name}</Link>
            : 'Unknown User'
        }
    </span>
}

export default PostAuthor