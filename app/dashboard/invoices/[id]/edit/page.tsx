import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import EditInvoiceForm from "@/app/ui/invoices/edit-form"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title : "Edit Invoice",
  description : "Edit invoice here.",
  metadataBase : new URL("https://next-dashboard-mm.vercel.app/invoices/edit")
}

const Page = async (props : { params : Promise< {id : string} >}) => {
    const params = await props.params

    const id = params.id

    const invoice = await fetchInvoiceById(id)
    const customers = await fetchCustomers();
    
    const crumbs = [
      {
        label : 'Invoices',
        href : '/dashboard/invoices'
      },
      {
        label : 'Edit Invoice',
        href :'#',
        active : true
      }
    ]
  return (
    <main>
        <Breadcrumbs breadcrumbs={crumbs} />
        <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  )
}

export default Page