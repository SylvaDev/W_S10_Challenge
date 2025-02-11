import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzaOrdersApi = createApi({
    reducerPath: 'pizzaOrdersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    endpoints: build => ({
        getOrders: build.query({
            query: () => 'history',
            providesTags: ['Orders']
        }),
        createOrder: build.mutation({
            query: order => ({
                url: 'order',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['Orders']
        })
    })
})

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
} = pizzaOrdersApi