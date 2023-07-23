import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export const useGlobalState = () => {
  return  useContext(AppContext)
}
