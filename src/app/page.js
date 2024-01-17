'use client';
import { useState } from 'react';
import GetDataButton from '@/components/GetDataButton';
import GoogleAuthButton from '@/components/GoogleAuthButton';
import DisplayData from '@/components/DisplayData';

export default function Home() {
  const [data, setData] = useState('');

  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GoogleAuthButton />
      <GetDataButton setData={setData} />
      {data ? <DisplayData consoleData={data} /> : null}
    </main>
  );
}
