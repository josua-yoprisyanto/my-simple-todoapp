import React, { useEffect } from 'react'
import { DashboardForm, DashboardCard } from '../components/dashboard'
import { auth } from '../firebase'
import {useNavigate} from 'react-router-dom'

const Dashboard= () => {

  const navigate = useNavigate()

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(!user){
        navigate("/auth")
      }
    })
  },[])

  return (
    <div className='dashboard container mt-5'>
        <DashboardForm />
        <DashboardCard />
    </div>
  )
}

export default Dashboard