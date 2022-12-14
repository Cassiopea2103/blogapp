import {useAddReactionsMutation} from '../posts/postsSlice'

const reactionEmojis= {
    like: '👍',
    wow: '😮',
    love: '❤',
    sad: '😢',
    laugh: '😂'
}

const ReactionButtons= ({post})=>{

    const [addReactions]= useAddReactionsMutation()

    const reactionButtons= Object.entries(reactionEmojis).map(([reactionName, reactionIcon])=>{
        return (
            <button
                key= {reactionName}
                type= "button"
                className= "reactionButton"
                onClick= {()=> {
                    const newValue= post.reactions[reactionName]+ 1
                    addReactions({postId: post.id, reactions: {...post.reactions, [reactionName]: newValue}})
                }}
            >
                {reactionIcon} {post.reactions[reactionName]}
            </button>
        )
    })


    return <div>{reactionButtons}</div>

}

export default ReactionButtons