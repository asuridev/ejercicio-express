import React from 'react'
import {Route, Routes} from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { MainLayout } from '../layout/MainLayout';
import { Register } from '../pages/Register';
import { ChangePassword } from '../pages/ChangePassword';
import { RequireAuth } from '../components/RequireAuth';

export const MainRoter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index  element={<Login/>}/>
        <Route path='home'  element={
          <RequireAuth>
            <Home/>
        </RequireAuth>
        }/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='changePassword' element={<ChangePassword/>}/>
      </Route>
   </Routes>
  )
}
