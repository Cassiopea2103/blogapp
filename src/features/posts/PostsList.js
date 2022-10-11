import {useFetchPostsQuery} from './postsSlice'
import PostExcerpt from './PostExcerpt'

const PostsList= ()=>{
    
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    }= useFetchPostsQuery()

    let content;
    if (isLoading) content= <p>Loading Posts...</p>
    else if (isSuccess) {
        const {ids, entities}= posts
        content= ids.map((postId)=> <PostExcerpt key={postId} post= {entities[postId]} />)
    } else if (isError){
        content= {error}
    }

    return (
        <section>
            <h2 style={{textAlign: 'center'}}>Posts</h2>
            {content}
        </section>
    )

}


export default PostsList