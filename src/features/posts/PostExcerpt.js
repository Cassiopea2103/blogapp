import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

import {Link} from 'react-router-dom'

const PostExcerpt= ({post})=>{

    return (
        <article>
            <h2>{post.title}</h2>
            <p className= 'postExcerpt'>{post.body.substring(0, 50)}</p>
            <p className= 'postCredit'>
                <Link to={`/users/${post.userId}`}><PostAuthor userId= {post.userId}/></Link>
                <TimeAgo timestamp= {post.date}/>
            </p>

        </article>
    )

}

export default PostExcerpt