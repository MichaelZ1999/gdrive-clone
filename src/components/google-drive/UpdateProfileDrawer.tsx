import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, InputNumber } from 'antd';
import { doc, setDoc } from "firebase/firestore";
import { firestore } from '../../firebase';
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../../contexts/AuthContext'
import { getAuth } from "firebase/auth";

const { Option } = Select;

export default function UpdateProfileDrawer() {  
  
  const [open, setOpen] = useState(true);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 75 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="+251">+251</Option>
      </Select>
    </Form.Item>
  );
  const handleUpdateProfile = async (values: any) => {
    try {
      const auth = getAuth(); // Retrieve the Firebase auth instance
      const user = auth.currentUser; // Get the currently logged in user object
      const uid = user?.uid; // Access the UID property from the user object
      console.log("UID:", uid);

      // Update the user document in Firestore with the form values
      const userRef = doc(firestore, "Users", uid);
      await setDoc(userRef, values, { merge: true });
      // Close the drawer
      setOpen(false);
    } catch (error) {
      // Handle any errors
      console.log("Error updating profile:", error);
    }
  };


  return (
    <>
      <Button  className='' onClick={showDrawer} icon={<PlusOutlined />}>
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
            <Button onClick={onClose} type="primary" className='bg-black text-white hover:bg-green-400' >
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark onFinish={handleUpdateProfile}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstname"
                label="First Name"
                rules={[{ required: true, message: 'Enter your First Name' }]}
              >
                <Input placeholder="John"  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                label="Last Name"
                rules={[{ required: true, message: 'Enter your Last Name' }]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </Col>
            {/* <Col span={12}>
              <Form.Item
                name="recoveryemail"
                label="Recovery Email"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter your Email"
                />
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select your Gender' }]}
              >
                <Select placeholder="Please select your Gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['user', 'age']} 
                label="Age" 
                rules={[{ type: 'number', min: 1, max: 99 }]}
              >
                <InputNumber />
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
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            </Col>
            
          </Row>
          
          
        </Form>
      </Drawer>
    </>
  );
};
