import React from 'react'
import { useParams } from 'react-router-dom'
import LoadingBar from '../../components/Common/Spinner/Loading'
import { useGetBrandsPaginatedQuery, useGetBrandsQuery, useGetBrandByIdQuery } from '../brands/brandsApiSlice'
import EditBrandForm from './EditBrandForm'

const EditBrand = () => {

    const { id } = useParams()
    console.log('id', id)

    const { data: brand,
        isLoading, isSuccess, isFetching, isError, error
    } = useGetBrandByIdQuery(id)
    console.log('brande', brand)
    let content
    if (isLoading) content = <LoadingBar />
    else if (isSuccess) {
        console.log('brand', brand)
        content = <EditBrandForm brand={brand.brand} />
    }
    else if (isError) content = <p>{error?.message}</p>

    // const { brand } = useGetBrandsPaginatedQuery('brandsList', {
    //     const { brand } = useGetBrandsQuery('brandsList', {
    //     selectFromResult: ({ data }) => ({
    //         brand: data?.entities[id]
    //     })
    // })



    // const content = <EditBrandForm brand={brand} />
    return content
}

export default EditBrand