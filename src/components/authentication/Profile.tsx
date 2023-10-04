import React, { useState } from 'react'
import UIExperimental from '../google-drive/UIExperimental'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router'
import { Button } from 'react-bootstrap'
import { Form, FormControl, FormLabel } from 'react-bootstrap'
import FormItem from 'antd/es/form/FormItem'
import { doc, getFirestore, collection, Firestore } from 'firebase/firestore'
import { database, firestore } from '../../firebase';
import { updateDoc } from 'firebase/firestore'


export default function Profile() {
  const [ error, setError ] = useState('')
  const { logout } = useAuth()
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ age, setAge ] = useState('')
  const [ gender, setGender ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')

  function handlesubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    return updateDoc(doc(firestore, 'users', currentUser.uid),  {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      age: age,
      phoneNumber: phoneNumber,
    });
  }
  
  //Log Out Function
  async function handleLogout(): Promise<void> {
    setError('')
  
    try {
        await logout()
        navigate('/login')
    } catch {
        setError('Failed to log out')
    }
  }

  return (
    <>
    
    <UIExperimental/>
    <Form onSubmit={handlesubmit}>
      <FormLabel>First Name</FormLabel>
      <FormControl value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <FormLabel>Last Name</FormLabel>
      <FormControl value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <FormLabel>Age</FormLabel>
      <FormControl value={age} onChange={(e) => setAge(e.target.value)} />
      <FormLabel>Gender</FormLabel>
      <FormControl value={gender} onChange={(e) => setGender(e.target.value)} />
      <FormLabel>Phone Number</FormLabel>
      <FormControl value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
    <Button type='submit'>
      UPDATE
    </Button>
    </Form>
    <Button onClick={handleLogout}>Log Out</Button>
    </>
  )
}





















// import React from 'react';

// import { Button, Form, Input, InputNumber } from 'antd';

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

// /* eslint-disable no-template-curly-in-string */
// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not a valid email!',
//     number: '${label} is not a valid number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };
// /* eslint-enable no-template-curly-in-string */

// const onFinish = (values: any) => {
//   console.log(values);
// };

// const App: React.FC = () => (
//   <Form
//     {...layout}
//     name="nest-messages"
//     onFinish={onFinish}
//     style={{ maxWidth: 600 }}
//     validateMessages={validateMessages}
//   >
//     <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
//       <Input />
//     </Form.Item>
//     <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
//       <Input />
//     </Form.Item>
//     <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
//       <InputNumber />
//     </Form.Item>
//     <Form.Item name={['user', 'website']} label="Website">
//       <Input />
//     </Form.Item>
//     <Form.Item name={['user', 'introduction']} label="Introduction">
//       <Input.TextArea />
//     </Form.Item>
//     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );

// export default App;