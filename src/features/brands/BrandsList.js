import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SubPage from '../../components/Manager/SubPage'
import { useGetBrandsQuery, useGetBrandsByTitleQuery, useGetBrandsPaginatedQuery } from './brandsApiSlice'

import { Badge, Button } from 'reactstrap'
// import Brand from './Brand'
import { useSelector } from 'react-redux'
import BrandSearch from './BrandSearch'
import { selectCurrentSearch } from './brandSlice'
import BrandPag from './BrandPag'

const BrandsList = () => {
    const navigate = useNavigate()
    const searchTerm = useSelector(selectCurrentSearch);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const {
        data: searchResult,
        isFetching: isSearchLoading,
        isSuccess: isSearchSuceess,
        isError: isSearchError,
        error: searchError
    } = useGetBrandsPaginatedQuery({ brand: searchTerm, page, size: pageSize })

    console.log('searchResult', searchResult)
    // const {
    //     data: searchResult,
    //     isFetching: isSearchLoading,
    //     isSuccess: isSearchSuceess,
    //     isError: isSearchError,
    //     error: searchError
    // } = useGetBrandsByTitleQuery(brand)

    const {
        data: brands,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBrandsQuery('brandsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const pageSizesOptions = [5, 10, 15]

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
        // } else if (isSuccess) {
    } else if (isSearchSuceess) {
        // console.log('searchResult', searchResult.data)
        // console.log('',)
        const { itemsList, paginator } = searchResult.data
        // console.log('itemsList', itemsList)
        console.log('paginator', paginator)
        console.log('brands', searchResult)
        // const { ids } = searchResult

        // const list = brand === '' ?
        //     (
        //         ids.map(brandId => <Brand key={brandId} brandId={brandId} />)
        //     ) : (

        //         ids.map(brand => <h1 key={brand._id}>{brand.name}</h1>)
        //     )

        // const list = searchResult.map(brandId => <Brand key={brandId} brandId={brandId} />)
        const list = itemsList.map(brand => <BrandPag key={brand._id} brand={brand} />)

        const from = 1 + (paginator.perPage) * (page - 1)
        // const to = (from + pageSize) - 1
        const to = paginator.pageCount === paginator.currentPage
            ? ((from - 1) + searchResult.data.itemsList.length)
            : (from + paginator.perPage) - 1



        content = (
            <section className="brands">
                <SubPage
                    title="Brands"
                    actionName="Add"
                    handleAction={() => navigate("/dashboard/brands/new")}
                >
                    <BrandSearch />

                    <div className="pb-4">
                        Searching: {`${searchTerm}`}
                        <Badge color="success">{paginator.itemCount} </Badge>
                        {" brands"}
                    </div>

                    <div className='mb-2'>
                        <span className='p-1 m-1'>Per Page:</span>
                        <select className='p-1 m-1' onChange={(e) => setPageSize(e.target.value)}>
                            {pageSizesOptions.map((size) =>

                                <option key={size} value={size}>{size}</option>)}
                        </select>



                        <span>{from} - {to}  / {paginator.itemCount}</span>

                        {/* START */}
                        <Button
                            className='p-1 m-1'
                            onClick={() => setPage(1)}
                            disabled={page === 1}
                        >{"<|"}</Button>



                        <Button
                            className='p-1 m-1'
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}

                        >{"<"}</Button>

                        {/* NEXT PAGE */}
                        <Button
                            className='p-1 m-1'

                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={paginator.currentPage === (paginator.pageCount)}


                        >{">"}</Button>


                        <Button
                            className='p-1 m-1'
                            disabled={paginator.currentPage === (paginator.pageCount)}
                            onClick={() => setPage(paginator.pageCount)}
                        >{"|>"}</Button>
                        {/* 

                        <Pagination>
                            <PaginationItem
                                onClick={() => setPage(1)}
                                disabled={page === 1}
                            >
                                <PaginationLink
                                    first

                                />
                            </PaginationItem>
                            <PaginationItem
                                disabled={page === 1}
                                onClick={() => setPage((prev) => prev - 1)}
                            >
                                <PaginationLink
                                    previous
                                />
                            </PaginationItem>

                            <PaginationItem
                                onClick={() => setPage((prev) => prev + 1)}
                                disabled={paginator.currentPage === (paginator.pageCount)}

                            >
                                <PaginationLink
                                    next
                                />
                            </PaginationItem>
                            <PaginationItem

                                disabled={paginator.currentPage === (paginator.pageCount)}
                                onClick={() => setPage(paginator.pageCount)}
                            >
                                <PaginationLink
                                    last
                                />
                            </PaginationItem>
                        </Pagination> */}
                    </div>

                    <div className='b-list'>

                        {list}

                    </div>

                </SubPage>


            </section >
        );
    } else if (isError) {
        content = <p className="errmsg">{error.data}</p>;
    }
    return content;
}

export default BrandsList