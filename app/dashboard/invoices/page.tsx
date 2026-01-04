import { fetchInvoicesPages } from '@/app/lib/data'
import { lusitana } from '@/app/ui/fonts'
import { CreateInvoice } from '@/app/ui/invoices/buttons'
import Pagination from '@/app/ui/invoices/pagination'
import InvoicesTable from '@/app/ui/invoices/table'
import Search from '@/app/ui/search'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'
import React, { Suspense } from 'react'

const Page = async (props : {
  searchParams? : Promise<{ query?: string, page?:number }>
}) => {

  const searchParams = await props.searchParams;
  const totalPages = await fetchInvoicesPages(searchParams?.query ?? '')
  return (
    <div className='w-full'>
      <div className='flex items-center w-full justify-between'>
         <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
         <Search placeholder='Search Invoices...' />
         <CreateInvoice />
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Suspense key={(searchParams?.query ?? '') + (searchParams?.page ?? 1)} fallback={<InvoicesTableSkeleton />}>
          <InvoicesTable query={searchParams?.query ?? ''} currentPage={searchParams?.page ?? 1}/>
        </Suspense>
      </div>

      <div className='mt-5 w-full flex justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}

export default Page