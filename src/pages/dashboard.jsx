import { useState } from "react";
import NavBar from "../components/navbar";
import { use } from "react";
import { ArrowBigDown, ArrowUpRight, TrendingDown, TrendingUp, Wallet } from "lucide-react";
const Dashboard=({activePage,setActivePage,transactions,setTransactions})=>{
const [amount,setAmount]=useState("");
const [description,setDescription]=useState("");
const [category,setCategory]=useState("");
const totalInflow=parseFloat(transactions.filter(t =>t.type=="income").reduce((acc,t)=>acc+t.amount,0));
const totalOutFlow=parseFloat(transactions.filter(t=>t.type=="expense").reduce((acc,t)=>acc+t.amount,0));
const balance=parseFloat(totalInflow-totalOutFlow);

const saveTransaction=(e)=>{
  e.preventDefault();
  if(!description||!amount)return;
  const type=category==="Income"?"income":"expense";
  const newTransaction=
    {
      id:Date.now(),
      title:description,
      amount:parseFloat(amount),
      date:new Date().toLocaleDateString('en-Us',{month:'short',day:'numeric',year:'numeric'}),
      type:category
    };
  setTransactions([newTransaction, ...transactions]);
  setDescription("");
  setAmount("");
  setCategory("");
  e.target.reset(); 
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
  
  <NavBar  activePage={activePage} setActivePage={setActivePage} />
  <div className="flex flex-col">
    <h1 className="text-2xl font-bold p-2">Dashboard</h1>
    <div className="grid items-start space-y-4 p-3 md:grid-cols-2 md:space-x-2 lg:grid-cols-3  ">
      {
        flows.map((flow,index)=>
          {
            return(
          <div key={index} className=" p-7 w-70  bg-secondary shadow-lg  rounded-md hover:border-1 hover:border-muted-cyan hover:bg-card-background hover:text-white-text border-1 border-border space-y-3">
            <div key={index} className="flex space-x-2">
              <span className={`p-1 rounded bg-muted-cyan ${flow.title==="Net Wallet Balance"?' text-cyan-accent':flow.title==="Total Inflow"?' text-gauge-safe':' text-gauge-danger'}`} >{flow.icon}</span>
              <span className="font-medium">{flow.title}</span>
            </div>
            <span className={`text-2xl font-bold ${flow.title==="Total Outflow"?"text-gauge-danger":"text-primary-green"}`}>KES <span className={`${flow.title !="Total Outflow"?"hidden":""}`}>-</span>{flow.amount.toLocaleString()}</span>
          </div>)
        })
      }

    </div>
    <div className="grid p-3  space-y-3 lg:grid-cols-2   lg:space-x-3">
      <form onSubmit={saveTransaction} className="flex flex-col space-y-2 rounded-lg border-border border-1 shadow-md p-4 bg-card-background text-secondary-text hover:border-muted-cyan hover:border-1">
        <label className="text-xl text-cyan-accent font-medium">Log New Record</label>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-medium text-md">Description</label>
          <input type="text" placeholder="eg.,Hostel Rent" className="border-1 p-2 rounded-md  border-muted-cyan outline-none" onChange={(e)=>{setDescription(e.target.value)}}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="font-medium text-md">Amount</label>
          <input type="number" placeholder="eg.,500"  className="border-1 p-2 rounded-md  border-muted-cyan outline-none" onChange={(e)=>{setAmount(e.target.value)}}/>
        </div>
        <div className="flex flex-col  ">
          <label htmlFor="type" className="font-medium text-md">Category</label>
          
          <select name="category" id="category"  className="border-1 p-2 rounded-md  border-muted-cyan outline-none text-white-text bg-card-background appearance-none " onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="" >Select Category</option>
            <option value="income" >Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button type="submit" className="bg-active-cyan rounded-md w-40 h-10 text-background font-medium cursor-pointer">Save Transaction</button>
        </form>
      <div>
      <div className="flex flex-col  rounded-lg  border-1 border-border shadow-lg p-5 bg-card-background hover:border-muted-cyan ">
        <h1 className="font-medium text-xl text-white-text">Recent Ledger History</h1>
        <div className="divide-y divide-border ">
         {
          transactions.map((trans,index)=>{
            return(
              <div key={index} className="flex p-2">
                <div className="">
                  <span className="font-medium text-white-text">{trans.title}</span>
                  <div className="flex "><span className="p-1 font-medium text-secondary-text ">{trans.date}</span><span className={`p-1 rounded-xl bg-muted-cyan font-bold ${trans.type==="expense"?"text-gauge-warning":"text-gauge-safe"}`}>{trans.type.toUpperCase()}</span></div>
                </div>
                <div className={`ml-auto p-3 text-2xl font-bold ${trans.type==="expense"?"text-gauge-danger":"text-primary-green"}`}><span className={`${trans.type!="income"?"hidden":""}`}>+</span><span className={`${trans.type!="expense"?"hidden":""}`} >-</span>{trans.amount}</div>
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