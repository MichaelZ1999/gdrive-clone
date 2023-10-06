import React from 'react'
import Footer from './Footer'
import appstoreicon from '../../assets/AppStore.png'
import playstoreicon from '../../assets/PlayStore.png'
import { Divider } from 'antd'

export default function Hero() {
  return (
    <>
    
        <div className='flex flex-col min-h-screen justify-between'>
            <div >
                <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8 ">
                    <div className="space-y-5 max-w-4xl mx-auto text-center">
                        <h1 className="text-sm text-indigo-600 font-medium">
                                        Have your files everywhere you go
                        </h1>
                        <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                                        Store your files using   <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">the largest and the Safest online storage</span>
                        </h2>
                        <p className="max-w-2xl mx-auto">
                                        Enjoy The best free cloud storage services for backup in 2023
                        </p>
                                <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                                    <a href="/signup" className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none">
                                        Get Started
                                    </a>
                                    <a href="/login" className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                                        Login
                                    </a>
                                </div>
                            </div>
                            
                            
                        </div> 

                        <Divider plain></Divider>      
                    </div>
                    <div className="mx-auto md:pt-16">
                    <p className="text-blue-400 font-bold pb-8 text-center">
                        Download our app:
                    </p>
                    <div className="flex w-full justify-center md:justify-start pb-24 fade-in">
                        <img src={appstoreicon} className="h-12 pr-12 transform hover:scale-125 duration-300 ease-in-out" />
                        <img src={playstoreicon} className="h-12 transform hover:scale-125 duration-300 ease-in-out" />
                    </div>
                    </div>
        </div>
        
    </>
    
  )
}
