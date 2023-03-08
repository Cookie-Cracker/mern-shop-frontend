import React from 'react'
import BrandPag from './BrandPag'

const List = ({ brands }) => {
    let content = (
        <div>
            {brands.map(brand => <BrandPag key={brand._id} brand={brand} />
            )}

        </div>
    )
    return content
}

export default List