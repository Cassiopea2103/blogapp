const reactionEmojis= {
    like: '👍',
    wow: '😮',
    love: '❤',
    sad: '😢',
    laugh: '😂'
}

const ReactionButtons= ({postId})=>{

    const reactionButtons= Object.entries(reactionEmojis).map(([reactionName, reactionIcon])=>{
        return (
            <button
                
            ></button>
        )
    })

}

export default ReactionButtons