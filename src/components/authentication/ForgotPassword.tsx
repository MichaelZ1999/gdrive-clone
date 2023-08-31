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
    <CenteredContainer>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'> Password Reset </h2>
            {error && <Alert variant='danger'> {error}  </Alert>}
            {message && <Alert variant='success'> {message}  </Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" ref={emailRef} required/>
                </Form.Group>
                <Button disabled={loading} className='text-center mt-3 w-100' type='submit'>
                    Reset Password
                </Button>
            </Form>
            <div className='w-100 text-center mt-3'>
                  <Link to="/">Log in</Link>
            </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </CenteredContainer>
  )
}

