import React, { useState } from 'react'
import { useRef } from 'react'
import { Form, Button, Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import CenteredContainer from './CenteredContainer'
import { ref } from 'firebase/storage';

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()

      try {
        setError('')
        setLoading(true)
        await  login(emailRef.current!.value, passwordRef.current!.value)
        navigate('/dashboard')
      } catch {
        setError('Failed to Log in')
      } 
      setLoading(false)
    }
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
          <div className="text-center">
              <img src="https://cdn.dribbble.com/userupload/6894190/file/original-96afecc1619321404c356017c09b17ee.jpg?resize=752x" width={150} className="mx-auto rounded-3xl" />
              <div className="mt-5 space-y-2">
                  <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                  <p className="">Don't have an account? <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
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
              <button
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                  type='submit'
              >
                  Sign in
              </button>
              <div className="text-center">
                  <a href="/forgot-password" className="hover:text-indigo-600">Forgot password?</a>
              </div>
          </form>
      </div>
  </main>
  )
}
{/* <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                        <p className="">Don't have an account? <a href="javascript:void(0)" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
                    </div>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
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
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Sign in
                    </button>
                    <div className="text-center">
                        <a href="javascript:void(0)" className="hover:text-indigo-600">Forgot password?</a>
                    </div>
                </form>
            </div>
        </main> */}

{/* <form>
  <label className="block">
    <span className="block text-sm font-medium text-slate-700">Username</span>
    <input type="text" value="tbone" disabled className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "/>
  </label>
</form> */}



{/* <div class="bg-[#F9FAFB] h-screen w-screen flex items-center">
        <div class="h-max mx-auto flex flex-col items-center">
            <img class="h-[40px] w-[47px] mb-5" src="https://i.ibb.co/YNfhJHM/K-MZ-04-2.png" alt="">
            <h1 class="text-xl font-bold text-center pb-10">Sign in to your account</h1>
            <div class="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
                <div>
                    <label class="text-gray-600 font-bold inline-block pb-2" for="email">Email</label>
                    <input class="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="email" name="email" placeholder="morenoalvaro@gmail.com">
                </div>
                <div>
                    <label class="text-gray-600 font-bold inline-block pb-2" for="password">Password</label>
                    <input class="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2" type="password" name="password" placeholder="***********">
                </div>
                <div class="flex"> 
                    <div class="w-1/2">
                        <a class="font-bold text-blue-600" href="">Forgot password ?</a>
                    </div>
                </div>
                <div>
                    <input class="bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]" type="submit" value="Login" >
                </div>
                
                <div class="flex gap-4">
                    <button class="bg-[#24292F] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]">Sign Up</button>
                </div>
            </div>
            <p class="text-sm text-gray-500 mt-10">Keep your Data safe </p>
        </div>
    </div> */}


    // <CenteredContainer>
    //   <Card>
    //     <Card.Body>
    //         <h2 className='text-center mb-4'> LOGIN </h2>
    //         {error && <Alert variant='danger'> {error}  </Alert>}
    //         <Form onSubmit={handleSubmit} >
    //             <Form.Group id="email">
    //                 <FormLabel>Email</FormLabel>
    //                 <FormControl type="email" ref={emailRef as React.RefObject<HTMLInputElement>} required/>
    //             </Form.Group>
    //             <Form.Group id="password" >
    //                 <FormLabel>Password</FormLabel>
    //                 <FormControl type="password" ref={passwordRef as React.RefObject<HTMLInputElement>} required/>
    //             </Form.Group>
                
    //             <Button disabled={loading} className='text-center mt-3 w-100' type='submit'>
    //                 Login
    //             </Button>
    //         </Form>
    //         <div className='w-100 text-center mt-3'>
    //               <Link to="/forgot-password">Forgot Password</Link>
    //         </div>
    //     </Card.Body>
    //   </Card>
    //   <div className='w-100 text-center mt-2'>
    //     Need an account? <Link to="/signup">Sign Up</Link>
    //   </div>
    // </CenteredContainer>