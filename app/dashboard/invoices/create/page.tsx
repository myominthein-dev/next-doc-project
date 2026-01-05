import { fetchCustomers } from "@/app/lib/data"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import Form from "@/app/ui/invoices/create-form"

const Page = async () => {

  const breadCrumbs = [
    {
        label: 'Invoices',
        href: '/dashboard/invoices',
    },
    {
        label: 'Create Invoice',
        href: '/dashboard/invoices/create',
        active: true,
    }
  ]

  const customers = await fetchCustomers();
  return (
    <main>
        <Breadcrumbs breadcrumbs={breadCrumbs} />

        <Form customers={customers} />
    </main>
  )
}

export default Page