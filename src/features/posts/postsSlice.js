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
        })
    })
})

export const {
    useFetchPostsQuery,
    useAddPostMutation
}= postsSlice