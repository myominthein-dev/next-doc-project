'use client';

import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import Image from 'next/image';
import { authenticate } from './lib/actions';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
export default function Page() {
  const searchParam = useSearchParams();
  const callBackUrl = searchParam.get('callBackUrl') || '/dashboard';
  const [ errorMessage, formAction, isPending ] = useActionState(authenticate,undefined)
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className={styles.shape}></div>
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> Click login to get to dashboard
            
          </p>
        
          {/* <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link> */}

          <form action={formAction}>
            <input name='email' value="user@nextmail.com" type="hidden" />
            <input name='password' value="123456" type="hidden" />
            <input type="hidden" name='redirectTo' value={callBackUrl} />
            <button className={` ${isPending ? 'cursor-wait bg-blue-300' : 'bg-blue-500 hover:bg-blue-400'} flex items-center gap-5 self-start rounded-lg  px-6 py-3 text-sm font-medium text-white transition-colors  md:text-base`}
          >
            {
              isPending ? 'Logging in..' : 'Log in'
            }
          </button>
          </form>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />

          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
