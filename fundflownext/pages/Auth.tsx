import { useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Image from 'next/image';
import Login from './login';  // Assuming Login component is in the same directory

interface AuthPageProps {
  isAuthenticated: boolean;
  handleLogin: (token: string) => void;
}

export default function AuthPage({ isAuthenticated, handleLogin }: AuthPageProps) {
  if (isAuthenticated) {
    return null; // or redirect to dashboard
  }

  return (
    <div className="body">
      <Parallax pages={2}>
        {/* Hero Section */}
        <ParallaxLayer 
          offset={0} 
          speed={1} 
          className="h-screen m-0 p-0"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-[100px] h-[100px] mb-6">
              <Image
                src="/F__4_-removebg-preview.png"
                alt="FundFlow Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h1 className="font-Poleno text-6xl text-black text-shadow-md animate-fadeIn">
              Your Money Matters
            </h1>
            <h6 className="text-2xl text-[#d9d6ba] mt-4 animate-fadeIn delay-200">
              Let's turn Small Investments into Big Gains
            </h6>
          </div>
        </ParallaxLayer>

        {/* Buildings Background */}
        <ParallaxLayer 
          offset={1} 
          speed={0.1} 
          factor={1} 
          className="h-screen m-0 p-0 flex items-center justify-center"
        >
          <div className="absolute bottom-0 w-full h-[300px] relative">
            <Image
              src="/buildings.png"
              alt="Buildings"
              fill
              className="object-cover"
              priority
            />
          </div>
        </ParallaxLayer>

        {/* Login Form */}
        <ParallaxLayer 
          offset={1} 
          speed={2} 
          factor={1.5} 
          className="h-screen m-0 p-0"
        >
          <Login onLogin={handleLogin} />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}