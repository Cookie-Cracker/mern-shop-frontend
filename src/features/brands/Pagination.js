import React from 'react'
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, CardLink, Badge, Button } from 'reactstrap'

const Pagination = (props) => {
    const { page, pageSize, paginator, setPage, itemCount } = props

    const from = 1 + (pageSize) * (page - 1)
    // const to = (from + pageSize) - 1
    const to = paginator.pageCount === paginator.currentPage
        ? ((from - 1) + itemCount)
        : (from + pageSize) - 1


    let content = (
        <div>
            <span>{from} - {to}  / {paginator.itemCount}</span>
            {/* <span>{1 + (pageSize) * (page - 1)} - { }  / {paginator.itemCount}</span> */}



            {/* START */}
            <Button
                className='p-1 m-1'
                // color='white'
                onClick={() => setPage(1)}
                disabled={page === 1}
            >{"<|"}</Button>



            <Button
                className='p-1 m-1'
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
            // color='white'

            >{"<"}</Button>

            {/* NEXT PAGE */}
            <Button
                className='p-1 m-1'
                // color='white'

                onClick={() => setPage((prev) => prev + 1)}
                disabled={paginator.currentPage === (paginator.pageCount)}


            >{">"}</Button>


            <Button
                className='p-1 m-1'
                // color='white'
                disabled={paginator.currentPage === (paginator.pageCount)}
                onClick={() => setPage(paginator.pageCount)}
            >{"|>"}</Button>
        </div>
    )
    return content
}

export default Pagination