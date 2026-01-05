import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import EditInvoiceForm from "@/app/ui/invoices/edit-form"
import { notFound } from "next/navigation"

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