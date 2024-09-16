import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://ompatil-shield-api.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}
    
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 403) {
        api.dispatch(apiSlice.endpoints.sendLogout.initiate());
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Passwords', 'Notes', 'PersonalInformation'], // Shared tags for invalidation
    endpoints: builder => ({})
});