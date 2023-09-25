import React, { useState } from 'react'
import { useRef } from 'react'
import { Form, Button, Card, FormLabel, FormControl, Alert} from 'react-bootstrap'

import { Link, useNavigate } from 'react-router-dom'
import logoFile from '../../assets/File3.png'
import { useAuth, User } from '../../contexts/AuthContext';

import { DocumentData, DocumentReference, doc, setDoc, addDoc } from "firebase/firestore";
import { firestore } from '../../firebase';
import { getAuth } from "firebase/auth";
import { database } from '../../firebase'
import { user } from '../../models/User';



export default function SignupComponent() {
      const emailRef = useRef<HTMLInputElement>(null)
      const passwordRef = useRef<HTMLInputElement>(null)
      const passwordConfirmRef = useRef<HTMLInputElement>(null)
      const { signup, currentUser } = useAuth()
      const [error, setError] = useState('')
      const [loading, setLoading] = useState(false)
      const navigate = useNavigate()
      const [ firstname, setFirstName ] = useState("")
      const [ lastname, setLastName ] = useState("")
      const [ age, setAge ] = useState("")
      const [ phonenumber, setPhoneNumber ] = useState("")
      const [ gender, setGender ] = useState("")
      const [ profilepicture, setProfilePicture ] = useState("")
      

      async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
      e.preventDefault()

      if ( passwordRef.current!.value !== passwordConfirmRef.current!.value) {
        return setError('Passwords do not match')
      }

      try {
        setError('')
        setLoading(true)
        const response = await signup(emailRef.current!.value, passwordRef.current!.value)
        const newUser = response.user;
        
        if (newUser)
                    {   await addDoc(database.addUsers,
                            { 
                            userId: newUser.uid,
                            firstName: firstname, // Initialize with empty values
                            lastName: lastname,
                            phoneNumber: phonenumber,
                            age: age,
                            gender: gender,
                            profilePicture: profilepicture,
                            createdAt: database.getCurrentTimestamp(),

                            
                            })
                    }
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


