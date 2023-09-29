import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, InputNumber } from 'antd';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../../firebase';
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth,  } from '../../contexts/AuthContext'
import { getAuth } from "firebase/auth";

const { Option } = Select;

export default function UpdateProfileDrawer() {  
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const [profilepicture, setProfilePicture] = useState('');
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

 

  
  function handleSubmit() {
   
    updateDoc(doc(firestore, 'users', currentUser.uid),  {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      age: age,
      phoneNumber: phoneNumber,
    });
    onClose();
  }

  return (
    <>
      <Button  className='h-8 w-8' onClick={showDrawer} icon={<PlusOutlined />}>
        Profile
      </Button>
      <Drawer
        title="Update you Account"
        width={500}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} type="primary" className='bg-black text-white hover:bg-green-400' >
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstname"
                label="First Name"
                rules={[{ required: true, message: 'Enter your First Name' }]}
              >
                <Input placeholder="John" value={firstName}  onChange={(e) => setFirstName(e.target.value)} required />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[{ required: true, message: 'Enter your Last Name' }]}
              >
                <Input placeholder="Doe" value={lastName}  onChange={(e) => setLastName(e.target.value)} required />
              </Form.Item>
            </Col>
            
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select your Gender' }]}
              >
                <Select placeholder="Please select your Gender" value={gender} onChange={(value) => setGender(value)} >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age" 
                rules={[{ type: 'number', min: 1, max: 99 }]}
              >
                <InputNumber value={age} onChange={(value) => setAge(value)} required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input  style={{ width: '100%' }}  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              {/* addonBefore={prefixSelector} */}
            </Form.Item>
            </Col>
            
          </Row>
          
          
        </Form>
      </Drawer>
    </>
  );
};
