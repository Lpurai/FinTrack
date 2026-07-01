import { User,LayoutDashboard,ArrowLeftRight,Wallet,BarChart3,Settings, History, Scale } from "lucide-react";
const NavBar=({activePage,setActivePage})=>{
  const navItem=[
    {
     title:"Dashboard",
     icon:<LayoutDashboard className="text-cyan-accent"/>,
    },
    {
     title:"Transactions",
     icon:<ArrowLeftRight className="text-cyan-accent"/>,
    },
    {
     title:"Budgets",
     icon:<Scale className="text-cyan-accent"/>,
    },
    {
     title:"Reports",
     icon:<BarChart3 className="text-cyan-accent"/>,
    },
    {
     title:"Settings",
     icon:<Settings className="text-cyan-accent"/>,
    }
    
  ];
  

  return(
<div className="w-40 p-1  bg-secondary border-r  border-border text-secondary-text  flex flex-col  space-y-5 ">
{
  navItem.map((item,index)=>
  {
    const getActivePage=()=>{
    switch(item.title){
      case "Dashboard":return "dashboard";
      case "Transactions":return "transactions";
      case "Budgets":return "budgets";
      case "Reports":return "reports";
      case "Settings":return "settings";
      default:return "dashboard"
    }

  };
    return(
      <div key={index} className="flex space-x-2 hover:bg-card-background active:border-muted-accent active:border-1  active:bg-active-cyan active:text-white-text  cursor-pointer rounded-md p-2" onClick={
        ()=>{setActivePage(getActivePage)
        }
      }>
        <span>{item.icon}</span><span>{item.title}</span>
      </div>
    )
  }
    
  )
}
<div className=" cursor-pointer flex space-x-2 mt-auto   border-t border-[#9ca3af] p-2 rounded-md" onClick={()=>{setActivePage("settings")}}>
  <Settings/><span>Settings</span></div>
</div>
  )
}
export default NavBar;