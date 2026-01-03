import { fetchLatestInvoices } from "@/app/lib/data";
const page = async () => {
  const datas = await fetchLatestInvoices();

  return (
    <div>
      {
      datas?.map((invoice: any) => (
        <div key={invoice.id}>
          <p>
            {invoice.name} - {invoice.amount}
          </p>
        </div>
      ))
      }
    </div>
  );
};

export default page;
