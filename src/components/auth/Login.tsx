'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { mockAccounts } from '../mockData/MockData';
import Header from '../header/Header';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userAccount = mockAccounts.find(account => account.holder.username === username);
    if (!userAccount) {
      setError('User not found');
      return;
    }
    if (userAccount.holder.password !== password) {
      setError('Invalid password');
      return;
    }
    // Store user data in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(userAccount));
    router.push('/dashboard');
  };

  const date = new Date();
  const hour = date.getHours();

  return (
    <div className="">
      <Header />
      <div className="h-screen bg-[white] p-4 pt-12">
        <div className="bg-white p-5 mx-auto border rounded-xl max-w-[350px] py-7">
          <div className="mb-12">
            <Image src="https://i.imgur.com/ni1UGuE.png" width={253} height={75} alt="logo" />
          </div>
          <div className="my-3">{error && <p className="text-[16px] text-center mx-auto max-w-[200px] rounded-md flex items-center justify-center text-red-600">{error}</p>}</div>

          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6 rounded-lg">
              <div className="relative flex flex-col gap-3">
                <label htmlFor="Username" className="text-[#5c5c5c] absolute top-2 left-3 text-[14px]">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  className="p-4 pb-3 pt-8 rounded-[10px] text-[#5c5c5c] bg-transparent border border-gray-300 outline-none"
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="relative flex flex-col gap-3">
                <label htmlFor="password" className="text-[#5c5c5c] absolute top-2 left-3 text-[14px]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  className="p-4 pb-3 pt-8 rounded-[10px] text-[#5c5c5c] bg-transparent border border-gray-300 outline-none"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full items-center justify-between gap-2 mt-3">
                <button type="submit" className="p-4 bg-[#56b445] w-full text-black font-semibold rounded-[50px]">
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
