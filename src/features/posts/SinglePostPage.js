import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'

import { useParams, Link } from 'react-router-dom'

const SinglePostPage= ()=> {

    const { postId }= useParams()

    const post= useSelector(state=> selectPostById(state, Number(postId)))
    
    let content;
    if (post){
        content=
            <article>
                <h4>{post.title}</h4>
                <p className= 'postExcerpt'>{post.body}</p>
                <p className='postCredit'>
                    <Link to={`/posts/editPost/${post.id}`}>Edit Post</Link>
                    <PostAuthor userId={post.userId}/>
                    <TimeAgo timestamp={post.date}/>
                </p>
            </article>
    } else {
        content= <p>Post Not Found!</p>
    }

    return (
        <section>{content}</section>
    )

}

export default SinglePostPage