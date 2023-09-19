import React, { useState } from 'react'
import { useRef } from 'react'
import { Form, Button, Card, FormLabel, FormControl, Alert} from 'react-bootstrap'

import { Link, useNavigate } from 'react-router-dom'
import logoFile from '../../assets/File3.png'
import { useAuth } from '../../contexts/AuthContext'

import { DocumentData, DocumentReference, doc, setDoc } from "firebase/firestore";
import { firestore } from '../../firebase';
import { getAuth } from "firebase/auth";




export default function SignupComponent() {
      const emailRef = useRef<HTMLInputElement>(null)
      const passwordRef = useRef<HTMLInputElement>(null)
      const passwordConfirmRef = useRef<HTMLInputElement>(null)
      const { signup } = useAuth()
      const [error, setError] = useState('')
      const [loading, setLoading] = useState(false)
      const navigate = useNavigate()
      

      async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
      e.preventDefault()

      if ( passwordRef.current!.value !== passwordConfirmRef.current!.value) {
        return setError('Passwords do not match')
      }

      try {
        setError('')
        setLoading(true)
        await  signup(emailRef.current!.value, passwordRef.current!.value)

        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user?.uid;
        const userRef = doc(firestore, "Users");
        
        await AddDoc(userRef, {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            age: null,
            gender: "",
            profilePicture: "",
        });
        navigate('/login')
      } catch {
        setError('Failed to create an account')
      } 
      setLoading(false)
    }
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
          <div className="text-center">
          
              <div className="mt-5 space-y-2">
                <a className="flex items-center text-4xl font-bold text-indigo-400 no-underline hover:no-underline lg:text-4xl justify-center" href="/home-page"> 
                    <img src={logoFile} width={120} height={50} alt="Float UI logo" />
                </a>
                  <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
                  <p className="">Already have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</a></p>
              </div>
          </div>
          {error && <Alert variant='danger'> {error}  </Alert>}
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
              <div>
                  <label className="font-medium">
                      Password
                  </label>
                  <input
                      type="password"
                      required
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      ref={passwordRef as React.RefObject<HTMLInputElement>}
                  />
              </div>
              <div>
                  <label className="font-medium">
                      Confirm Password
                  </label>
                  <input
                      type="password"
                      required
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      ref={passwordConfirmRef as React.RefObject<HTMLInputElement>}
                  />
              </div>
              <button
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                  type='submit'
                  disabled={loading}
              >
                  Sign up
              </button>
              
          </form>
      </div>
  </main>
  )
}


{/* <CenteredContainer>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'> SIGN UP </h2>
            {error && <Alert variant='danger'> {error}  </Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" ref={emailRef} required/>
                </Form.Group>
                <Form.Group id="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" ref={passwordRef} required/>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <FormLabel>Password Confirmation</FormLabel>
                    <FormControl type="password" ref={passwordConfirmRef} required
                    />
                </Form.Group>
                <Button disabled={loading} className='text-center mt-3 w-100' type='submit'>
                    Sign Up
                </Button>
            </Form>
        </Card.Body>
      </Card>
      
    </CenteredContainer> */}
function AddDoc(userRef: DocumentReference<DocumentData, DocumentData>, arg1: { firstName: string; lastName: string; phoneNumber: string; age: null; gender: string; profilePicture: string }) {
    throw new Error('Function not implemented.')
}

