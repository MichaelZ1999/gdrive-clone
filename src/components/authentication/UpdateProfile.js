import React, { useState } from 'react'
import { useRef } from 'react'
import { Form, Button, Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
      e.preventDefault()

      const promises = []
      setLoading(true)
      setError('')

      if ( emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value))
      }
      if ( passwordRef.current.value !== currentUser ) {
        promises.push(updatePassword(passwordRef.current.value))
      }

      Promise.all(promises).then(() => {
        navigate('/')
      }).catch (() => {
        setError('Failed to update account')
      }).finally(() => {
        setLoading(false)
      }) 

    }

    
    
    return (
    <CenteredContainer>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'> Update Profile </h2>
            {error && <Alert variant='danger'> {error}  </Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" ref={emailRef} required
                    defaultValue={currentUser.email}/>
                </Form.Group>
                <Form.Group id="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" ref={passwordRef}
                    
                    placeholder='Leave blank to keep the same'/>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <FormLabel>Password Confirmation</FormLabel>
                    <FormControl type="password" ref={passwordConfirmRef} 
                   
                    placeholder='Leave blank to keep the same'
                    />
                </Form.Group>
                <Button disabled={loading} className='text-center mt-3 w-100' type='submit'>
                    Update 
                </Button>
            </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
       <Link to= "/user">Cancel</Link>
      </div>
    </CenteredContainer>
  )
}
