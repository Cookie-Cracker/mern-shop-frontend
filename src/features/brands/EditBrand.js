import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetBrandsQuery } from '../brands/brandsApiSlice'
import EditBrandForm from './EditBrandForm'

const EditBrand = () => {

    const { id } = useParams()
    const { brand } = useGetBrandsQuery('brandsList', {
        selectFromResult: ({ data }) => ({
            brand: data?.entities[id]
        })
    })


    const content = <EditBrandForm brand={brand} />
    return content
}

export default EditBrand