import {
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit'

import {apiSlice} from '../api/apiSlice'

const usersAdapter= createEntityAdapter({
    sortComparer: (userA, userB)=> userA.id- userB.id
})

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
        })
    })
})

export const {
    useFetchUsersQuery
}= usersSlice


//users data selector:
const usersObject= usersSlice.endpoints.fetchUsers.select()
const usersData= createSelector(
    usersObject,
    users=> users.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
}= usersAdapter.getSelectors(state=> usersData(state) ?? initialState)