import React, { useState } from 'react'
import { useRef } from 'react'
import { Form, Button, Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(e) {
      e.preventDefault()


      try {
        setError('')
        setLoading(true)
        await  login(emailRef.current.value, passwordRef.current.value)
        navigate('/user')
      } catch {
        setError('Failed to Log in')
      } 
      setLoading(false)
    }
    return (
    <CenteredContainer>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'> LOGIN </h2>
            {error && <Alert variant='danger'> {error}  </Alert>}
            <Form onSubmit={handleSubmit} >
                <Form.Group id="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" ref={emailRef} required/>
                </Form.Group>
                <Form.Group id="password" >
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" ref={passwordRef} required/>
                </Form.Group>
                
                <Button disabled={loading} className='text-center mt-3 w-100' type='submit'>
                    Login
                </Button>
            </Form>
            <div className='w-100 text-center mt-3'>
                  <Link to="/forgot-password">Forgot Password</Link>
            </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to="/">Sign Up</Link>
      </div>
    </CenteredContainer>
  )
}
