import { Trash2 } from "lucide-react";
import { useState } from "react";
const Transactions=({transactions,setTransactions})=>{
  const [searchTerm,setSearchTerm]=useState('');
  const [selectedCategory,setSelectedCategory]=useState('All');

  
  
  const filteredTransactions =transactions.filter(
    (t)=>{
      const matchesSearch=t.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());
      const matchedCategory=selectedCategory==="All" || t.type ===selectedCategory;
      return matchesSearch && matchedCategory;
    }
  )
  return(
    <div className="flex flex-col p-3">
      <div className="flex ">
        <div className="flex-col">
          <h1 className="font-bold text-2xl text-cyan-accent">Master Ledger</h1>
          <p className="text-white-text">View,Search,and manage your complete historical records</p>
        </div>
        <div className="w-35 ml-auto mt-3 text-background font-medium rounded-full h-10 p-2 bg-active-cyan">
          Total Records: <span>{filteredTransactions.length}</span>
        </div>
        
      </div>
      <div className="mx-2 my-4 grid grid-cols-2 p-3 border-1 border-border bg-card-background shadow-md rounded space-x-2">
        <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Search by description (eg.,Rent,Fees)" className="p-1 border-1 border-border text-white-text rounded-lg  hover:ring-1 hover:ring-muted-cyan active:ring-1 active:ring-active-cyan outline-none"/>
        <select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)} name="filterByCategory" id="filter" className="p-2 border-1 border-border rounded-lg appearance-none bg-card-background  text-white-text rounded-lg  hover:ring-1 hover:ring-muted-cyan active:ring-1 active:ring-active-cyan outline-none">
          <option value="All">All Categories</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>

        </select>

      </div>
      <div className="flex flex-col border-2 border-border bg-card-background rounded-lg py-3 px-2">
        <table className="w-full text-left ">
          <thead >
            <tr className="grid grid-cols-5  bg-secondary rounded py-3 border-1 border-border text-white-text">
              <th className="mr-auto ml-3">Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
         <tbody>
           {filteredTransactions.length > 0 ?(
            filteredTransactions.map((data,idx)=>{
              return(
                <tr key={idx} className="grid grid-cols-5 p-2 ">
                  <td className=" font-extralight">{data.date}</td>
                  <td className="text-white-text">{data.title}</td>
                  <td className={`px-2 py-1 w-30 rounded-lg  bg-secondary font-bold ${data.type==="income"?"text-gauge-safe":"text-gauge-warning"}`}>{data.type.toUpperCase()}</td>
                  <td className={`font-medium text-xl ${data.type==="expense"?"text-gauge-danger":"text-primary-green"}`}><span className={`${data.type!="income"?"hidden":""}`}>+</span><span className={`${data.type!="expense"?"hidden":""}`} >-</span>{data.amount}</td>
                  <td className="flex border rounded-md hover:bg-gauge-danger text-white-text cursor-pointer border-muted-cyan w-30  py-2 px-3 tex" ><Trash2 />Delete</td>

                </tr>
              )

            })
           ):(
            <td colSpan="5" className="font-medium p-3 text-center italic">
              No transaction entries matched your criteria
            </td>
           )
            
           }
          </tbody>
        </table>
      </div>
     
              
    </div>
  )
}
export default Transactions;