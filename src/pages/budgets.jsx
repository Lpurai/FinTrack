import { useState } from "react"
import currentBudgets from "../data/budget"
import transactions from "../data/transaction";

const Budgets=({transactions})=>{
  const [budgets,setBudgets]=useState(currentBudgets);
  const [selectedCategory,setSelectedCategory]=useState(transactions[0].title);
  const [limitInput,setLimitInput]=useState('');

   const handleSetBudget = (e) => {
    e.preventDefault();
    if (!limitInput) return;

    const parsedLimit = parseFloat(limitInput);
    const existingBudgetIdx = budgets.findIndex(b => b.category === selectedCategory);

    if (existingBudgetIdx > -1) {

      const updatedBudgets = [...budgets];
      updatedBudgets[existingBudgetIdx].limit = parsedLimit;
      setBudgets(updatedBudgets);
    } else {
      const newBudget = {
        id: Date.now(),
        category: selectedCategory,
        limit: parsedLimit
      };
      setBudgets([...budgets, newBudget]);
    }

    setLimitInput('');
  };
  const getActualSpending = (categoryName) => {
    return transactions
      .filter(t => t.title === categoryName && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };
   const filteredBudgetList=transactions.filter(t=>t.type==="expense");
   console.log(filteredBudgetList)

  const getProgressBarColor = (percentage) => {
    if (percentage >= 100) return 'bg-rose-600'; 
    if (percentage >= 80) return 'bg-amber-500';  
    return 'bg-blue-600';                         
  };


  return(
    <div className="flex flex-col p-3">
    <h1 className="font-medium text-xl">Budget Limits</h1>
    <div className="flex space-x-5 max-md:flex-col max-md:space-y-3">
      <div className="grow-1 py-4 px-3 border-2 border-[#f3f4f6] rounded shadow space-y-5">
        <form action="" onSubmit={handleSetBudget} className="space-y-3">
        <h2 className="font-medium text-lg">Configure Target Limit</h2>
        <div className="flex flex-col  ">
          <label htmlFor="type" className="font-medium text-md">Category</label>
          <select value={selectedCategory}  name="category" id="category" className="border p-2 rounded-md border-2 border-[#9ca3af] outline-none" onChange={(e)=>{setSelectedCategory(e.target.value)}}>
            {
              
            filteredBudgetList.map((category)=>{

                return(
                  <option value={category.title} key={category.id} >
                    {category.title}
                  </option>
                
              )})
            }
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="limitAmount" className="font-medium text-md">Monthly Limit(KES)</label>
          <input type="number"  placeholder="eg.,500" className="border p-2 rounded-md border-2 border-[#9ca3af] outline-none" value={limitInput} onChange={(e)=>{setLimitInput(e.target.value)}} />
        </div>
        <button  className="bg-blue-700 rounded-md w-40 h-10 text-white font-medium cursor-pointer">Save Budget Rule</button>
        </form>
        </div>
      <div className=" grow-2 p-2 border-2 border-[#f3f4f6] rounded shadow">
        <h2 className="font-medium text-lg">Active Allocations Tracker</h2>

        <div className="space-y-6">
            {budgets.map((b) => {
              const actualSpent = getActualSpending(b.category);
            
              const percentUsed = b.limit > 0 ? Math.min((actualSpent / b.limit) * 100, 100) : 0;
              const formattedPercent = b.limit > 0 ? Math.round((actualSpent / b.limit) * 100) : 0;
              const remainingMoney = b.limit - actualSpent;

              return (
                <div key={b.id} className="space-y-2 border-b border-slate-50 pb-4 last:border-0 last:pb-0">

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-semibold text-slate-700">{b.category}</span>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        Spent KES {actualSpent.toLocaleString()} of KES {b.limit}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold text-sm ${formattedPercent >= 100 ? 'text-rose-600' : 'text-slate-700'}`}>
                        {formattedPercent}%
                      </span>
                      <span className={`text-xs block mt-0.5 ${remainingMoney < 0 ? 'text-rose-500 font-semibold' : 'text-slate-400'}`}>
                        {remainingMoney >= 0 ? `KES ${remainingMoney.toLocaleString()} left `: `Overby KES ${Math.abs(remainingMoney).toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressBarColor(formattedPercent)}`}
                      style={{ width: `${percentUsed}% `}}>
          
                    </div>
                  </div>
                </div>
              );
            })}
         </div>
         </div>

       </div>
    </div>
    
  )
}
export default Budgets;