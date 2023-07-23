import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { endpoints } from '../settings/endpoints';
import { useGlobalState } from './useGlobalState';

export const useFetchPublications = () => {
  const { isLogin, user } = useGlobalState();
  const [publications , setPublications] =  useState([]);
  const [isLoading , setIsLoading] =  useState(true);

  const getPublication = async ()=>{
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    const { data } = await axios.get(endpoints.publication,config);
    setIsLoading(false);
    setPublications([...data]);
  }

  useEffect(()=>{
    if(isLogin){
      getPublication();
    }
  },[isLogin]);

  return {
    isLoading,
    publications,
    getPublication
  }
    
  
}
  