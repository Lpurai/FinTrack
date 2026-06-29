const Settings=()=>{
  return(
    <div className="flex flex-col p-2">
      <div className="flex flex-col ">
        <h2 className="font-medium text-xl">Application Settings</h2>
        <p className="text-sm ">Update your profile info,change the appearance,or reset data counters.</p>
      </div>
      <div className="grid grid-cols-2 space-x-3">
        
        <form className="flex flex-col p-2 border-[#f3f4f6] rounded shadow space-y-2">
           <label htmlFor="profile-setting" className="text-lg font-medium py-2">User Profile</label>
          <div className="flex flex-col  space-y-2">
            <label htmlFor="name">Display Name</label>
            <input type="text" name="username" id="user" placeholder="eg.,James" className="p-2 border-2 border-[#f3f4f6] rounded outline-blue-400" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Registered Email</label>
            <input type="text" name="email" id="email"  placeholder="eg.,james24@gmail.com" className="p-2 border-2 border-[#f3f4f6] rounded outline-blue-400"/>
          </div>
          <button className="bg-blue-600 p-3 rounded-lg cursor-pointer">Update Profile</button>
        </form>
        <form action="" className="flex flex-col p-2 border-[#f3f4f6] rounded shadow space-y-2">
          <label htmlFor="">Preferences</label>
         <div className="flex flex-col py-2 space-y-2">
           <label htmlFor="currency">Primary currency</label>
           <select name="currency" id="currency" className="p-2 border-2 border-[#f3f4f6] rounded outline-blue-400">
            <option value="ksh">Kenyan Shilling(KES)</option>
            <option value="usd">US Dollar ($)</option>
            <option value="euro">Euro(&#8364;)</option>
           </select>
           </div>
        </form>

      </div>

    

    </div>
  )
}
export default Settings;