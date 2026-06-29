import { User,ArrowLeft } from 'lucide-react';
import icon from '../assets/images/header.png'
const Header=({activePage,setActivePage})=>{
  return(
<div className=" w-full flex bg-surface-card h-14  text-[#16171d] font-medium text-2xl shadow-2xl">
  <a href="" className={`flex text-lg py-3 px-1 font-bold hover:text-brand-blue hover:underline ${activePage==="dashboard"?"hidden":""}`} > <ArrowLeft className='size-5 my-1  '/>Back</a>
  <img src={icon} alt="header icon" className='p-1 h-12 w-12 rounded-full object-cover border-2 border-[#16171d] ' />
  <span className='p-2 '>Comrade FinTrack</span>
  <a href="" className='ml-auto text-sm text-blue-500 p-4 font-bold hover:underline hover:text-red-400' onClick={()=>{setActivePage("dashboard")}}>Home </a>
  <User className='mt-3 rounded-full bg-red-300  '/>
  <h1  className='text-sm p-4'>Hello<span className='p-1'>User</span></h1>
  </div>
  )
}
export default Header;