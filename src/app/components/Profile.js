'use client'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

export default function Profile() {
 const {data,status} = useSession()

 if (status === "loading") {
    return <span className=''></span>
 }
  return (
    <>
    { status === "authenticated" &&
    <div className="avatar btn btn-ghost btn-circle">
    <div className="w-10 rounded-full">
     {data.user.image && <Image src={data.user.image} width={32} height={32} alt='avtar'/>}
    </div>
  </div>
    }
    </>
  );
}
