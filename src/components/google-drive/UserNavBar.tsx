import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function NavbarComponent(): JSX.Element {
  const [ error, setError ] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to log out')
    }
  }
  return (
   
 <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
 <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
 <a className="flex items-center text-3xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl" href="/home-page"> d<span className="bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">ddrive</span> </a>
   <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
       <span className="sr-only">Open main menu</span>
       <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
       </svg>
       
   </button>
   <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
     <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-100">
       <li>
         <a href="/home-page" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
       </li>
       <li>
         <a onClick={handleLogout} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Log Out</a>
       </li>
      
     </ul>
   </div>
 </div>
</nav> 

  )
}

//Facebook and Twitter
{/* <div className="container mx-auto w-full">
  <div className="flex w-full items-center justify-between">
    <a className="flex items-center text-2xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl" href="#"> dd<span className="bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">drive</span> </a>

    <div className="flex w-1/2 content-center justify-end">
      <a className="hover:text-underline inline-block h-10 transform p-2 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-pink-500 md:h-auto md:p-4" href="https://twitter.com/intent/tweet?url=#">
        <svg className="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"></path>
        </svg>
      </a>
      <a className="hover:text-underline inline-block h-10 transform p-2 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-pink-500 md:h-auto md:p-4" href="https://www.facebook.com/sharer/sharer.php?u=#">
        <svg className="h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path>
        </svg>
      </a>
    </div>
  </div>
</div> */}






// <Navbar bg="light" expand="sm">
//     <Navbar.Brand as={Link} to="/">
//       My Drive            
//     </Navbar.Brand>
//     <Nav>
//       <Nav.Link as={Link} to="/user">
//         Profile
//       </Nav.Link>
//     </Nav>
//   </Navbar>