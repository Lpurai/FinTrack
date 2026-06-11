const Budgets=()=>{
  return(
    <div className="flex flex-col p-3">
    <h1 className="font-medium text-xl">Budget Limits</h1>
    <div className="flex space-x-5 max-md:flex-col max-md:space-y-3">
      <div className="grow-1 py-4 px-3 border-2 border-[#f3f4f6] rounded shadow space-y-5">
        <h2 className="font-medium text-lg">Configure Target Limit</h2>
        <div className="flex flex-col  ">
          <label htmlFor="type" className="font-medium text-md">Category</label>
          <select name="category" id="category" className="border p-2 rounded-md border-2 border-[#9ca3af] outline-none" onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="">Select Category</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="limitAmount" className="font-medium text-md">Monthly Limit(KES)</label>
          <input type="number" placeholder="eg.,500" className="border p-2 rounded-md border-2 border-[#9ca3af] outline-none" onChange={(e)=>{setDescription(e.target.value)}}/>
        </div>
        <button  className="bg-blue-700 rounded-md w-40 h-10 text-white font-medium cursor-pointer">Save Budget Rule</button>
        
        </div>
      <div className=" grow-2 p-2 border-2 border-[#f3f4f6] rounded shadow">
        <h2 className="font-medium text-lg">Active Allocations Tracker</h2>
        </div>

    </div>
    </div>
  )
}
export default Budgets;