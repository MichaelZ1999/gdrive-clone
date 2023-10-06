import React, { useState, useEffect } from "react";
import UIExperimental from "../google-drive/UIExperimental";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { Form, FormControl, FormLabel } from "react-bootstrap";
import FormItem from "antd/es/form/FormItem";
import {
  doc,
  getFirestore,
  collection,
  Firestore,
  where,
  query,
} from "firebase/firestore";
import { database, firestore } from "../../firebase";
import { updateDoc } from "firebase/firestore";
import UpdateProfileDrawer from "../google-drive/UpdateProfileDrawer";
import { Card, Button } from "antd";
import { getDocs } from "firebase/firestore";
import { getDoc, onSnapshot } from "firebase/firestore";
export interface userFields {
  userz: {
    url: string;
    name: string;
    type: string;
    id: any;
  };
}
export default function Profile() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const { signup, currentUser } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  //Working without onsnapshot

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const userDocRef = doc(firestore, "users", currentUser.uid);
  //     const userDocSnapshot = await getDoc(userDocRef);

  //     if (userDocSnapshot.exists()) {
  //       const userData = userDocSnapshot.data();
  //       setUserData(userData);
  //     } else {
  //       console.log("User document not found!");
  //     }
  //   };

  //   if (currentUser) {
  //     fetchUserData();
  //   }
  // }, [currentUser]);
  useEffect(() => {
    let unsubscribe;

    const fetchUserData = async () => {
      const userDocRef = doc(firestore, "users", currentUser.uid);
      unsubscribe = onSnapshot(userDocRef, (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.data();
          setUserData(userData);
        } else {
          console.log("User document not found!");
        }
      });
    };
    if (currentUser) {
      fetchUserData();
    }

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser]);
  if (!userData) {
    return <div>Loading...</div>;
  }

  //

  async function handleLogout(): Promise<void> {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="flex justify-around ">
        <div>
          <Card
            hoverable
            title={userData.firstName + " " + userData.lastName}
            bordered={false}
            style={{ width: 300 }}
          >
            <div>
              <p>First Name: {userData.firstName}</p>
              <p>Last Name: {userData.lastName}</p>
              <p>Email: {currentUser.email}</p>
              <p>Age: {userData.age}</p>
              <p>Gender: {userData.gender}</p>
              <p>Phone Number: {userData.phoneNumber}</p>
            </div>
          </Card>
          <br />
          <div>
            <UpdateProfileDrawer />
            <Button className="hover:bg-sky-100 ml-5" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

// import React, { useState } from 'react'
// import UIExperimental from '../google-drive/UIExperimental'
// import { useAuth } from '../../contexts/AuthContext'
// import { useNavigate } from 'react-router'
// import { Button } from 'react-bootstrap'
// import { Form, FormControl, FormLabel } from 'react-bootstrap'
// import FormItem from 'antd/es/form/FormItem'
// import { doc, getFirestore, collection, Firestore } from 'firebase/firestore'
// import { database, firestore } from '../../firebase';
// import { updateDoc } from 'firebase/firestore'

// export default function Profile() {
//   const [ error, setError ] = useState('')
//   const { logout } = useAuth()
//   const { currentUser } = useAuth();
//   const navigate = useNavigate()

//   const [ firstName, setFirstName ] = useState('')
//   const [ lastName, setLastName ] = useState('')
//   const [ age, setAge ] = useState('')
//   const [ gender, setGender ] = useState('')
//   const [ phoneNumber, setPhoneNumber ] = useState('')

//   function handlesubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     return updateDoc(doc(firestore, 'users', currentUser.uid),  {
//       firstName: firstName,
//       lastName: lastName,
//       gender: gender,
//       age: age,
//       phoneNumber: phoneNumber,
//     });
//   }

//   //Log Out Function
//   async function handleLogout(): Promise<void> {
//     setError('')

//     try {
//         await logout()
//         navigate('/login')
//     } catch {
//         setError('Failed to log out')
//     }
//   }

//   return (
//     <>
//     <Button onClick={handleLogout}>Log Out</Button>
//     <UIExperimental/>
//     <Form onSubmit={handlesubmit}>
//       <FormLabel>First Name</FormLabel>
//       <FormControl value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//       <FormLabel>Last Name</FormLabel>
//       <FormControl value={lastName} onChange={(e) => setLastName(e.target.value)} />
//       <FormLabel>Age</FormLabel>
//       <FormControl value={age} onChange={(e) => setAge(e.target.value)} />
//       <FormLabel>Gender</FormLabel>
//       <FormControl value={gender} onChange={(e) => setGender(e.target.value)} />
//       <FormLabel>Phone Number</FormLabel>
//       <FormControl value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//     <Button type='submit'>
//       UPDATE
//     </Button>
//     </Form>

//     </>
//   )
// }

// // import React from 'react';

// // import { Button, Form, Input, InputNumber } from 'antd';

// // const layout = {
// //   labelCol: { span: 8 },
// //   wrapperCol: { span: 16 },
// // };

// // /* eslint-disable no-template-curly-in-string */
// // const validateMessages = {
// //   required: '${label} is required!',
// //   types: {
// //     email: '${label} is not a valid email!',
// //     number: '${label} is not a valid number!',
// //   },
// //   number: {
// //     range: '${label} must be between ${min} and ${max}',
// //   },
// // };
// // /* eslint-enable no-template-curly-in-string */

// // const onFinish = (values: any) => {
// //   console.log(values);
// // };

// // const App: React.FC = () => (
// //   <Form
// //     {...layout}
// //     name="nest-messages"
// //     onFinish={onFinish}
// //     style={{ maxWidth: 600 }}
// //     validateMessages={validateMessages}
// //   >
// //     <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
// //       <Input />
// //     </Form.Item>
// //     <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
// //       <Input />
// //     </Form.Item>
// //     <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
// //       <InputNumber />
// //     </Form.Item>
// //     <Form.Item name={['user', 'website']} label="Website">
// //       <Input />
// //     </Form.Item>
// //     <Form.Item name={['user', 'introduction']} label="Introduction">
// //       <Input.TextArea />
// //     </Form.Item>
// //     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
// //       <Button type="primary" htmlType="submit">
// //         Submit
// //       </Button>
// //     </Form.Item>
// //   </Form>
// // );

// // export default App;
