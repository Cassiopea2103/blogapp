import {apiSlice} from '../api/apiSlice'

import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit'

import { sub } from 'date-fns'

const postsAdapter= createEntityAdapter({
    sortComparer: (a, b)=> b.date.localeCompare(a.date)
})

const initialState= postsAdapter.getInitialState()

export const postsSlice= apiSlice.injectEndpoints({
    endpoints: builder=>({
        fetchPosts: builder.query({
            query: ()=> '/posts',
            transformResponse: responseData=>{
                let min= 1;
                const loadedPosts= responseData.map((post)=>{
                    if (!post?.date) post.date= sub (new Date(), {minutes: min++}).toISOString()
                    if (!post?.reactions) post.reactions= {
                        like: 0,
                        wow: 0,
                        love: 0,
                        sad: 0,
                        laugh: 0
                    }
                    return post
                })
                return postsAdapter.setAll(initialState, loadedPosts)
            }, providesTags: (result, error, arg)=>[
                {type: 'POSTS', id: 'LIST'},
                ...result.ids.map((id)=> ({type: 'POSTS', id}))
            ]
        }),

        fetchPostsByUser: builder.query({
            query: ( userId )=> `/posts/?userId=${userId}`,
            transformResponse: userPosts=>{
                const loadedPosts= userPosts.map((userPost)=>{
                    let min= 1;
                    if (!userPost.date) userPost.date= sub (new Date(), {minutes: min++}).toISOString()
                    if (!userPost.reactions) userPost.reactions= {
                        like: 0,
                        wow: 0,
                        love: 0,
                        sad: 0,
                        laugh: 0
                    }
                })
                return postsAdapter.setAll(initialState, userPosts)
            },
            providesTags: (result, error, arg)=>[
                {type: 'POSTS', id: 'LIST'},
                ...result.ids.map((id)=> ({type: 'POSTS', id: 'LIST'}))
            ]
        }),
        
        addPost: builder.mutation({
            query: (initialPost)=>({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    date: new Date().toISOString(),
                    userId: Number(initialPost.userId),
                    reactions: {
                        like: 0,
                        wow: 0,
                        love: 0,
                        sad: 0,
                        laugh: 0
                    },
                }
            }),
            invalidatesTags: [
                {type: 'POSTS', id: 'LIST'}
            ]
        }),

        updatePost: builder.mutation({
            query: ( initialPost )=>({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    //override the ancient post date
                    date: new Date().toISOString()
                }
            }),
            invalidatesTags: (result, error, arg)=>[
                {type: 'POSTS', id: arg.id}
            ]
        })
        ,
        deletePost: builder.mutation({
            query: ({postId})=>({
                url: `/posts/${postId}`,
                method: 'DELETE',
                body: {postId}
            }),
            invalidatesTags: (result, error, arg)=> [
                {type: 'POSTS', id: arg.id}
            ]
        })
        ,
        addReactions: builder.mutation({
            query: ({ postId, reactions })=>({
                url: `/posts/${postId}`,
                method: 'PATCH',
                body: { reactions }
            }),
            async onQueryStarted({postId, reactions}, {dispatch, queryFulfilled}){
                const patchResult= await dispatch(postsSlice.util.updateQueryData(
                    'fetchPosts', undefined, draft=>{
                        const post= draft.entities[postId]
                        if (post) post.reactions= reactions
                    }
                ))

                try{
                    await queryFulfilled
                } catch{
                    patchResult.undo()
                }
            }
        })
    })
})

export const {
    useFetchPostsQuery,
    useFetchPostsByUserQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation, 
    useAddReactionsMutation
}= postsSlice

const fetchPostsQueryObj= postsSlice.endpoints.fetchPosts.select()

const fetchPostsQueryData= createSelector(
    fetchPostsQueryObj,
    posts=> posts.data
)

export const {
    selectall: selectAllPosts,
    selectById: selectPostById
}= postsAdapter.getSelectors(state=> fetchPostsQueryData(state) ?? initialState)