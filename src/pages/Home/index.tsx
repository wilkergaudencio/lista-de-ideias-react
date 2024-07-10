import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import ButtonAdd from '../../components/ButtonAdd'
import SideBar from '../../containers/SideBar'
import TasksList from '../../containers/TasksList'

const Home = () => {
  const { isAuthenticated } = useAuth()

  // if (!isAuthenticated) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      <SideBar showFilters={true} />
      <TasksList />
      <ButtonAdd />
    </>
  )
}

export default Home
