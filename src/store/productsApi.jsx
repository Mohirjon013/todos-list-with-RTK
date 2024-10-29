import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath:"productsApi",
    tagTypes:["products"],
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3000"}),
    endpoints:(builder) => ({
        getAllProducts:builder.query({
            query:() => "/products",
            providesTags: (result) =>
                result ? [ ...result.map(() => ({ type: 'products' })),{ type: 'products'}] : [{ type: 'products'}],
        }),
        addProducts:builder.mutation({
            query:(newValue) => ({
                url:"/products",
                method:"post",
                body:newValue
            }),
            invalidatesTags: ['products']
        }),
        deleteProducts:builder.mutation({
            query:(id) => ({
                url:`/products/${id}`,
                method:"delete"
            }),
            invalidatesTags: ['products']
        }),
        updateProducts:builder.mutation({
            query:(id, newValue) => ({
                url:`/products/${id}`,
                method:"put",
                body:newValue
            }),
            invalidatesTags: ['products']
        })
    })
})
export const {useGetAllProductsQuery, useAddProductsMutation, useDeleteProductsMutation} = productsApi