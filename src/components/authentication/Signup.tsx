import React, { useState } from 'react'
import { useRef } from 'react'
import { Form, Button, Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'

export default function Signup() {
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
        navigate('/')
      } catch {
        setError('Failed to create an account')
      } 
      setLoading(false)
    }
    return (
    <CenteredContainer>
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
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to= "/">Login</Link>
      </div>
    </CenteredContainer>
  )
}

// import React, { useState } from 'react'
// import { useRef } from 'react'
// import { Form, Button, Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
// import { useAuth } from '../../contexts/AuthContext'
// import { Link, useNavigate } from 'react-router-dom'
// import CenteredContainer from './CenteredContainer'
// import firebase from 'firebase/compat'
// import { database } from '../../firebase'

// export default function Signup() {
//     const emailRef = useRef<HTMLInputElement>(null)
//     const passwordRef = useRef<HTMLInputElement>(null)
//     const passwordConfirmRef = useRef<HTMLInputElement>(null)
//     const { signup } = useAuth()
//     const [error, setError] = useState('')
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()

//     async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
//       e.preventDefault()

//       if ( passwordRef.current!.value !== passwordConfirmRef.current!.value) {
//         return setError('Passwords do not match')
//       }

//       try {
//         setError('');
//         setLoading(true);
//         const { user } = await signup(emailRef.current!.value, passwordRef.current!.value);
      
//         // Get the generated user ID
//         const userId = user.currentUser;
      
//         // Get form input values
//         const firstName = firstNameRef.current!.value;
//         const lastName = lastNameRef.current!.value;
//         const age = ageRef.current!.value;
//         const gender = genderRef.current!.value;
//         const phoneNumber = phoneNumberRef.current!.value;
//         const profilePicture = profilePictureRef.current!.value;
      
//         // Save user data to Firestore
//         const userData = {
//           userId, // Associate the user ID with the userdata
//           firstName,
//           lastName,
//           age,
//           gender,
//           phoneNumber,
//           profilePicture,
//           // Add more fields as needed
//         };
      
//         // Access Firestore instance
        
      
//         // Save user data in the 'users' collection with the user ID as the document ID
//         await firebase.firestore.collection('users').doc(userId).set(userData);
      
//         navigate('/');
//       } catch {
//         setError('Failed to create an account');
//       }
//       setLoading(false)
//     }
//     return (
//     <CenteredContainer>
//       <Card>
//         <Card.Body>
//             <h2 className='text-center mb-4'> SIGN UP </h2>
//             {error && <Alert variant='danger'> {error}  </Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group id="first-name">
//                     <FormLabel>First Name</FormLabel>
//                     <FormControl type="name" ref={firstNameRef as React.RefObject<HTMLInputElement>} required
//                     />
//                 </Form.Group>
//                 <Form.Group id="last-name">
//                     <FormLabel>First Name</FormLabel>
//                     <FormControl type="name" ref={lastNameRef as React.RefObject<HTMLInputElement>} required
//                     />
//                 </Form.Group>
//                 <Form.Group id="age">
//                     <FormLabel>Age</FormLabel>
//                     <FormControl type="age" ref={ageRef as React.RefObject<HTMLInputElement>} required
//                     />
//                 </Form.Group>
//                 <Form.Group id="phone-number">
//                     <FormLabel>Phone Number</FormLabel>
//                     <FormControl type="name" ref={phoneNumberRef as React.RefObject<HTMLInputElement>} required
//                     />
//                 </Form.Group>
//                 <Form.Group id="gender">
//                     <FormLabel>Gender</FormLabel>
//                     <FormControl type="name" ref={genderRef as React.RefObject<HTMLInputElement>} required
//                     />
//                 </Form.Group>
//                 <Form.Group id="email">
//                     <FormLabel>Email</FormLabel>
//                     <FormControl type="email" ref={emailRef as React.RefObject<HTMLInputElement>} required/>
//                 </Form.Group>
//                 <Form.Group id="password">
//                     <FormLabel>Password</FormLabel>
//                     <FormControl type="password" ref={passwordRef as React.RefObject<HTMLInputElement>} required/>
//                 </Form.Group>
//                 <Form.Group id="password-confirm">
//                     <FormLabel>Password Confirmation</FormLabel>
//                     <FormControl type="password" ref={passwordConfirmRef as React.RefObject<HTMLInputElement>} required
//                     />
//                 </Form.Group>
//                 <Button disabled={loading} className='text-center mt-3 w-100' type='submit'>
//                     Sign Up
//                 </Button>
//             </Form>
//         </Card.Body>
//       </Card>
//       <div className='w-100 text-center mt-2'>
//         Already have an account? <Link to= "/">Login</Link>
//       </div>
//     </CenteredContainer>
//   )
// }
