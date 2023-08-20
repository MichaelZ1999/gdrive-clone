import React from 'react'
import Navbar from './Navbar'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import { useFolder } from '../../hooks/useFolder'

export default function Dashboard() {
  const state = useFolder()
  console.log(state) 
    
  return (
    <>
    <Navbar/>
    <Container fluid>
            <AddFolderButton />
     </Container>
    
    </>
    
  )
}
