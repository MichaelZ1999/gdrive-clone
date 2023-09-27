import React, { useState, useRef } from 'react';
import { Form, Button, Card, FormLabel, FormControl, Alert } from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { currentUser, onUpdateEmail, onUpdatePassword} = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const promises: Promise<void>[] = [];
    setLoading(true);
    setError('');

    if (emailRef.current?.value !== currentUser.email) {
      promises.push(onUpdateEmail(emailRef.current?.value));
    }
    if (passwordRef.current?.value) {
      promises.push(onUpdatePassword(passwordRef.current?.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <FormLabel>Email</FormLabel>
              <FormControl
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <FormLabel>Password</FormLabel>
              <FormControl
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl
                type='password'
                ref={passwordConfirmRef}
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
        <Link to='/dashboard'>Cancel</Link>
      </div>
    </>
  );
}