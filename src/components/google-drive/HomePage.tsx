import React, { useState } from 'react'
import { useRef } from 'react'
import { Form, Button, Card, FormLabel, FormControl, Alert, Navbar} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import NavbarComponent from './Navbar'
import Hero from './Hero'
import Footer from './Footer'

export default function HomePage() {

    return (
      <>
      <div className="flex flex-col min-h-screen">
        <NavbarComponent/>
        <Hero/>
        <div className="flex-grow">
           <Footer/> 
          
        </div>
        
      </div>
      
      </>
           
  )
}


