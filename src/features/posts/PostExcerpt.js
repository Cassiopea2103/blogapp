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
                <Link to={`/posts/${post.id}`}>View Post</Link>
                <PostAuthor userId= {post.userId}/>
                <TimeAgo timestamp= {post.date}/>
            </p>
            
            <ReactionButtons  post={post}/>
            

        </article>
    )

}

export default PostExcerpt