import { fetchCustomers } from "@/app/lib/data"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import Form from "@/app/ui/invoices/create-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title : "Create Invoice",
  description : "Create invoice here.",
  metadataBase : new URL("https://next-dashboard-mm.vercel.app/invoices/create")
}

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