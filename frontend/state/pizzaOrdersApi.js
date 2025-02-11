import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzaOrdersApi = createApi ({
    reducerPath: 'pizzaOrdersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    endpoints: build => ({
        getOrders: build.query({
            query: () => 'history'
        }),
        createOrder: build.mutation({
            
        })
    })
})

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
} = pizzaOrdersApi