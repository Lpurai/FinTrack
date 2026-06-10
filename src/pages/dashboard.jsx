import { useState } from "react";
import NavBar from "../components/navbar";
import { use } from "react";
import { ArrowBigDown, ArrowUpRight, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import transactions from "../data/transaction";
const Dashboard=({activePage,setActivePage,transactions,setTransactions})=>{
const [amount,setAmount]=useState("");
const [description,setDescription]=useState("");
const [category,setCategory]=useState("");
const totalInflow=parseFloat(transactions.filter(t =>t.type=="income").reduce((acc,t)=>acc+t.amount,0));
const totalOutFlow=parseFloat(transactions.filter(t=>t.type=="expense").reduce((acc,t)=>acc+t.amount,0));
const balance=parseFloat(totalInflow-totalOutFlow);
const saveTransaction=(e)=>{
  e.preventDefault;
  if(!description||!amount){return;};
 ;

  const type=category==="Income"?"income":"expense";
  const newTransaction=[
    {
      id:Date.now,
      title:description,
      amount:parseAmount,
      date:new Date().toLocaleDateString('en-Us',{month:'short',day:'numeric',year:'numeric'}),
      type:category
    }
  ];
  setTransactions([...transactions,newTransaction]);
  setDescription("");
  setAmount("");
  setCategory("")
  console.log(transactions);
}
const flows=[
  {
    icon:<Wallet/>,
    title:"Net Wallet Balance",
    amount:balance,
  },
   {
    icon:<TrendingUp/>,
    title:"Total Inflow",
    amount:totalInflow,
  },
   {
    icon:<TrendingDown/>,
    title:"Total Outflow",
    amount:totalOutFlow,
  },
]
return(
<div className="flex lg:h-screen">
  
  <NavBar  activePage={activePage} setActivePage={setActivePage}/>
  <div className="flex flex-col">
    <h1 className="text-2xl font-bold p-2">Dashboard</h1>
    <div className="grid items-start space-y-4 p-3 md:grid-cols-2 md:space-x-2 lg:grid-cols-3  ">
      {
        flows.map((flow,index)=>
          {
            return(
          <div key={index} className=" p-7 w-70  bg-[#ffffff] shadow-lg  rounded-md hover:border-2 hover:border-[ #2e303a] space-y-3">
            <div key={index} className="flex space-x-2">
              <span className={`p-1 rounded ${flow.title==="Net Wallet Balance"?'bg-slate-100 text-slate-400':flow.title==="Total Inflow"?'bg-emerald-50 text-emerald-300':'bg-rose-50 text-rose-300'}`} >{flow.icon}</span>
              <span className="font-medium">{flow.title}</span>
            </div>
            <span className={`text-2xl font-bold ${flow.title==="Total Outflow"?"text-red-600":"text-emerald-600"}`}>KES <span className={`${flow.title !="Total Outflow"?"hidden":""}`}>-</span>{flow.amount.toLocaleString()}</span>
          </div>)
        })
      }

    </div>
    <div className="grid p-3  space-y-3 lg:grid-cols-2   lg:space-x-3">
      <form onSubmit={saveTransaction} className="flex flex-col space-y-2 rounded shadow-md p-4 ">
        <label className="text-xl font-medium">Log New Record</label>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-medium text-md">Description</label>
          <input type="text" placeholder="eg.,Hostel Rent" className="border p-2 rounded-md border-2 border-[#9ca3af] outline-none" onChange={(e)=>{setDescription(e.target.value)}}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="font-medium text-md">Amount</label>
          <input type="number" placeholder="eg.,500" className="border p-2 rounded-md border-2 border-[#9ca3af] outline-none" onChange={(e)=>{setAmount(e.target.value)}}/>
        </div>
        <div className="flex flex-col  ">
          <label htmlFor="type" className="font-medium text-md">Category</label>
          
          <select name="category" id="category" className="border p-2 rounded-md border-2 border-[#9ca3af] outline-none" onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="">Select Category</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button className="bg-blue-700 rounded-md w-40 h-10 text-white font-medium cursor-pointer">Save Transaction</button>
        </form>
      <div>
      <div className="flex flex-col  rounded shadow-lg p-5 ">
        <h1 className="font-medium text-lg">Recent Ledger History</h1>
        <div className="divide-y divide-[#9ca3af] ">
         {
          transactions.map((trans,index)=>{
            return(
              <div key={index} className="flex p-2">
                <div className="">
                  <span className="font-medium">{trans.title}</span>
                  <div className="flex "><span className="p-1 font-medium text-[#9ca3af]">{trans.date}</span><span className={`p-1 rounded-xl ${trans.type==="expense"?"bg-red-300":"bg-green-300"}`}>{trans.type}</span></div>
                </div>
                <div className={`ml-auto p-3 text-2xl font-bold ${trans.type==="expense"?"text-red-600":"text-emerald-600"}`}><span className={`${trans.type!="income"?"hidden":""}`}>+</span><span className={`${trans.type!="expense"?"hidden":""}`} >-</span>{trans.amount.toLocaleString()}</div>
              </div>
            )
          })
         }
         </div>
      </div>
      </div>

    </div>
    
  </div>

  </div>
)
}
export default Dashboard;