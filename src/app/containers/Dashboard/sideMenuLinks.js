module.exports = {
    admin: [
        { to: "/dashboard/accountdetails", name: "Account Details", prefix: "/dashboard" },
        { to: "/dashboard/products", name: "Products", prefix: "/dashboard" },
        { to: "/dashboard/categories", name: "Categories", prefix: "/dashboard" },
        { to: "/dashboard/brands", name: "Brand", prefix: "/dashboard" },
        { to: "/dashboard/users", name: "Users", prefix: "/dashboard" },
        { to: "/dashboard//orders", name: "Orders", prefix: "/dashboard" },

    ],
    moderator: [
        { to: "/dashboard/categories", name: "Categories", prefix: "/dashboard" },
        { to: "/dashboard/brand", name: "Brand", prefix: "/dashboard" },
    ]

}