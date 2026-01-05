import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data"
import EditInvoiceForm from "@/app/ui/invoices/edit-form"

const Page = async (props : { params : Promise< {id : string} >}) => {
    const params = await props.params

    const id = params.id

    const invoice = await fetchInvoiceById(id)
    const customers = await fetchCustomers();
    
    

  return (
    <main>
        <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  )
}

export default Page