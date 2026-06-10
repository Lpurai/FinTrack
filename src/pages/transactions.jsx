import { Trash2 } from "lucide-react";
import transactionsData from "../data/transaction";
const Transactions=()=>{
  
  return(
    <div className="flex flex-col p-3">
      <div className="flex ">
        <div className="flex-col">
          <h1 className="font-bold text-2xl">Master Ledger</h1>
          <p>View,Search,and manage your complete historical records</p>
        </div>
        <div className="w-35 ml-auto mt-3 text-slate-50 font-medium rounded-full h-10 p-2 bg-blue-700">
          Total Records: <span>{transactionsData.length}</span>
        </div>
        
      </div>
      <div className="m-2 grid grid-cols-2 p-3 border-2 border-[#f3f4f6] shadow-md rounded space-x-2">
        <input type="text" placeholder="Search by description (eg.,Rent,Fees)" className="p-1 border-2 border-[#9ca3af] rounded-md outline-blue-300"/>
        <select name="filterByCategory" id="filter" className="p-2 border-2 border-[#9ca3af] rounded-md outline-blue-300">
          <option value="">All Categories</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>

        </select>

      </div>
      <div className="flex flex-col border-2 border-[#f3f4f6]">
        <table className="w-full text-left ">
          <thead >
            <tr className="grid grid-cols-5  bg-[#d8dadd] rounded p-1.5 border border-[#f3f4f6]">
              <th className="mr-auto ml-3">Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
         <tbody>
           {
            transactionsData.map((data,idx)=>{
              return(
                <tr key={idx} className="grid grid-cols-5 p-2 ">
                  <td className="mr-auto ml-3 font-extralight">{data.date}</td>
                  <td >{data.title}</td>
                  <td className={`px-2 py-1 rounded-full w-20 ${data.type==="income"?"bg-emerald-300":"bg-gray-300"}`}>{data.type}</td>
                  <td className={`font-medium text-lg ${data.type==="expense"?"text-red-600":"text-emerald-600"}`}><span className={`${data.type!="income"?"hidden":""}`}>+</span><span className={`${data.type!="expense"?"hidden":""}`} >-</span>{data.amount}</td>
                  <td className="flex border rounded-md hover:bg-red-300 cursor-pointer border-[#9ca3af] w-20  p-1"><Trash2/>Delete</td>

                </tr>
              )

            })
           }
          </tbody>
        </table>
      </div>
     
              
    </div>
  )
}
export default Transactions;