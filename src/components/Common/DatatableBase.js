import DataTable from 'react-data-table-component';

import React from 'react'
import { NoData } from './NoData';

const DatatableBase = (props) => {
    const customStyles = {

        rows: {
            style: {
                minHeight: '50px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                backgroundColor: '#212121',

            },
        },
        header: {
            style: {
                fontSize: '22px',
                color: '#f7ca18',
                backgroundColor: '#212121',
                minHeight: '56px',
                paddingLeft: '16px',
                paddingRight: '8px',
                textAlign: "center",
                borderRadius: '5px'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    let noData = <NoData />

    let content = (
        <DataTable
            theme='ligth'
            style={customStyles}
            pagination
            noDataComponent={noData}
            dense
            highlightOnHover
            responsive
            {...props}
        />
    )

    return content
}

export default DatatableBase