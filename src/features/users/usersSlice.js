import {
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit'

import {apiSlice} from '../api/apiSlice'

const usersAdapter= createEntityAdapter()

const initialState= usersAdapter.getInitialState()

export const usersSlice= apiSlice.injectEndpoints({
    endpoints: builder=>({
        fetchUsers: builder.query({
            query: ()=> '/users',
            transformResponse: responseData=>{
                return usersAdapter.setAll(initialState, responseData)
            }
            ,
            providesTags: (result, error, arg)=>[
                {type: 'USERS', id: 'LIST'},
                ...result.ids.map((id)=>({type: 'USERS', id: 'LIST'}))
            ]
        }),
        addUser: builder.mutation({
            query: (userInfos)=>({
                url: `/users`,
                method: 'POST',
                body: {
                    ...userInfos
                }
            }),
            invalidatesTags: [
                {type: 'USERS', id: 'LIST'}
            ]
        }),
        updateUser: builder.mutation({
            query: (userInfos)=>({
                url: `/users/${userInfos.id}`,
                method: 'PUT',
                body: { userInfos }
            }),
            invalidatesTags: (result, error, arg)=>[
                {type: 'USERS', id: arg.id}
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ userId })=> ({
                url: `/users/${userId}`,
                method: "DELETE",
                body: {userId}
            }),
            invalidatesTags: (result, error, arg)=> [
                {type: 'USERS', id: arg.id}
            ]
        })
    })
})

export  const {
    useFetchUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
}= usersSlice

const usersObj= usersSlice.endpoints.fetchUsers.select()

export const usersData= createSelector(
    usersObj,
    users=> users.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
}= usersAdapter.getSelectors(state=> usersData(state) ?? initialState)