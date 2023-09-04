import React, { useState, useRef, FormEvent } from 'react'
import { Form, Button, Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'
import firebase from 'firebase/compat'



export default function ForgotPassword(): JSX.Element {
    const emailRef = useRef<HTMLInputElement>(null);
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault()


       try {
        setError('')
        setLoading(true)
        const email = emailRef.current?.value;
        if (email !== undefined) {
          await  resetPassword(email)
          setMessage ('check your inbox for further instructions')
        } else {
          setError('Email is required');
        }
          

      } catch {
        setError('Failed to Reset Password')
      } 
      setLoading(false) 
    }
    return (
    
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
          <div className="text-center">
          <a className="flex items-center text-4xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl justify-center" href="/home-page"> d<span className="bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">ddrive</span> </a>
              <div className="mt-5 space-y-2">
                  <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Password Reset</h3>
              </div>
          </div>
          {error && <Alert variant='danger'> {error}  </Alert>}
          {message && <Alert variant='success'> {message}  </Alert>}
          <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
          >
              <div>
                  <label className="font-medium">
                      Email
                  </label>
                  <input
                      type="email"
                      required
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      ref={emailRef as React.RefObject<HTMLInputElement>}
                  />
              </div>
              <button
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                  type='submit'
              >
                  Reset Password
              </button>
              
          </form>
      </div>
  </main>
  )
}





// <CenteredContainer>
//       <Card>
//         <Card.Body>
//             <h2 className='text-center mb-4'> Password Reset </h2>
//             {error && <Alert variant='danger'> {error}  </Alert>}
//             {message && <Alert variant='success'> {message}  </Alert>}

//             <Form onSubmit={handleSubmit}>
//                 <Form.Group id="email">
//                     <FormLabel>Email</FormLabel>
//                     <FormControl type="email" ref={emailRef} required/>
//                 </Form.Group>
//                 <Button disabled={loading} className='text-center mt-3 w-100' type='submit'>
//                     Reset Password
//                 </Button>
//             </Form>
//             <div className='w-100 text-center mt-3'>
//                   <Link to="/">Log in</Link>
//             </div>
//         </Card.Body>
//       </Card>
//       <div className='w-100 text-center mt-2'>
//         Need an account? <Link to="/signup">Sign Up</Link>
//       </div>
//     </CenteredContainer>