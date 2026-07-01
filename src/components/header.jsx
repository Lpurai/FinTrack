import { User,ArrowLeft,HomeIcon } from 'lucide-react';
import icon from '../assets/images/header.png'
const Header=({activePage,setActivePage})=>{
  return(
<div className=" w-full flex bg-card-background h-14  text-white-text font-medium text-2xl shadow-2xl">
  
  <img src={icon} alt="header icon" className='p-1 h-12 w-12 rounded-full object-cover border-2 border-[#16171d] ' />
  <span className='p-2 '>Comrade <span className='text-cyan-accent font-bold text-3xl'>FinTrack</span> </span>
  <span  className='ml-auto flex space-x-0 mr-5' onClick={()=>{setActivePage("dashboard")}}>
    <HomeIcon className='mt-3 text-secondary-text hover:text-active-cyan'/>
    <a href="" className=' text-sm text-cyan-accent p-4 font-bold  hover:text-' >Home </a>
  </span>
  <User className='mt-3 size-8 p-0.5 rounded-full bg-cyan-accent text-background   '/>
  <h1  className='text-sm p-4'>Hello<span className='p-1'>User</span></h1>
  </div>
  )
}
export default Header;