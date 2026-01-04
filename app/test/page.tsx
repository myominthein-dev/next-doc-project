import { fetchRevenue } from "../lib/data"

const Page = async () => {
 
  const revenue = await fetchRevenue();
  const maxHeight = 400;
  const yAxix = [];
  const highestRevenue = Math.max(...revenue.map (r => r.revenue));
  const topLabel = Math.ceil(highestRevenue / 1000);

  for(let i = topLabel; i >= 0; i -= 1) {
    yAxix.push(i);
  }

  return (
    <div className="p-5">
        <div className="flex gap-2 h-full">
            <div className="flex flex-col justify-between pb-5">
                {yAxix.map((label, index) => (
                <div key={index}>{label}K</div>
               ))}
            </div>

            <div style={{ height: `${maxHeight}px` }} className="flex gap-4  items-end">
               {
                revenue.map((data) => {
                    return (
                        <div className="flex flex-col" key={data.month}>
                            <div className="bg-blue-400 w-10" style={{ height: `${maxHeight *  data.revenue / 5000}px` }}>

                            </div>
                            <div>
                                {data.month}
                            </div>
                        </div>
                    )
                })
               }
            </div>
        </div>
    </div>
  )
}

export default Page