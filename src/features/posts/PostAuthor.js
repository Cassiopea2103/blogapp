import {useSelector} from 'react-redux'
import { selectUserById } from '../users/usersSlice'

const PostAuthor= ({userId})=> {
    const postAuthor= useSelector(state=> selectUserById(state, Number(userId)))
    
    return <span>By {postAuthor? postAuthor.name : 'Unknown Author'}</span>
}

export default PostAuthor