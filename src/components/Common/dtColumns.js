
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
var Obj = {

    cols: [],


    getColumns: function (model) {
        // console.log('model', model)
        Object.keys(model).map((key) => {
            this.cols.push({ name: capitalize(key), selector: (row) => row[key], sortable: true })
        }

        )
        return this.cols;
    },


    // addActions: function (handleUpdate, handleDelete) {
    //     this.cols.push({
    //         name: 'Actions',
    //         cell: (row) => (
    //             <div>
    //                 <button
    //                  id="update"
    //                     className="btn btn-outline btn-xs"
    //                     onClick={() => handleUpdate(row._id)}
    //                 >
    //                     <i class="bi bi-pencil icon update"></i>
    //                 </button>
    //                 <button
    //                     id="delete"

    //                     className="btn btn-outline btn-xs"
    //                     onClick={() => handleDelete(row._id)}
    //                 >
    //                     <i class="bi bi-trash3 icon delete"></i>
    //                 </button>
    //             </div>



    //         ),
    //     })
    //     return this.cols;

    // }
}

export default Obj