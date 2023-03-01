import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import RequireAuth from './features/auth/RequireAuth'
import UsersList from './features/users/UsersList'
import SignIn from './features/auth/SignIn'
import DashLayout from './app/containers/Dashboard/DashLayout'
import PersistLogin from './features/auth/PersistLogin'
import { ROLES } from './config/roles'
import Categories from './components/Manager/Categories'
import NewUserForm from './features/users/NewUserForm'
import Page404 from './components/Common/Page404'
import Account from './components/Manager/Account'
import { ProductsList } from './features/products/ProductsList'
import NewProductForm from './features/products/NewProductForm'
import BrandsList from './features/brands/BrandsList'
import NewBrandForm from './features/brands/NewBrandForm'
import Shop from './components/User/Shop'
import EditBrand from './features/brands/EditBrand'

function App() {

  return (
    <Routes>

      <Route path='/' element={<Layout />} >
        {/* public routes */}

        <Route path='/' element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path='shop' element={<Shop />} />
        <Route path='*' element={<Page404 />} />


        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            {/* <Route index path='home' element={<HomePage />} /> */}

            <Route path='dashboard' element={<DashLayout />}>
              {/* <Route index element={<Welcome />} /> */}
              <Route index element={<Account />} />
              <Route path='categories'>
                <Route index element={<Categories />} />
              </Route>
              <Route path='products'>
                <Route index element={<ProductsList />} />
                <Route path='new' element={<NewProductForm />} />

              </Route>
              <Route path='brands'>
                <Route index element={<BrandsList />} />
                <Route path='new' element={<NewBrandForm />} />
                <Route path=':id' element={<EditBrand />} />

              </Route>

              {/* Admin ONLY */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path='users'>
                  <Route index element={<UsersList />} />
                  <Route path='new' element={<NewUserForm />} />
                </Route>

              </Route>
              <Route path='*' element={<Page404 />} />

            </Route>   {/* End DashBoard */}
          </Route>
          {/* <Route path='*' element={<p>Error2</p>} /> */}
          <Route path='*' element={<Page404 />} />
        </Route>
        {/* End protected routes */}
        <Route path='/404' element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
