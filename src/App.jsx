import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dashboard from './pages/dashboard'
import Header from './components/header'
import Transactions from './pages/transactions'
import Budgets from './pages/budgets'
import Reports from './pages/reports'
import Settings from './pages/settings'
import transactionsData from './data/transaction'

function App() {
  const [count, setCount] = useState(0);
  const [activePage,setActivePage]=useState("dashboard");
  const [transactions,setTransactions]=useState(transactionsData);
  const renderPage=()=>{
    switch(activePage){
      case "dashboard": return <Dashboard activePage={activePage} setActivePage={setActivePage} transactions={transactions} setTransactions={setTransactions}/>;
      case "transactions":return <Transactions transactions={transactions} setTransactions={setTransactions}/>;
      case "budgets":return <Budgets/>;
      case "reports": return <Reports/>;
      case "settings":return <Settings/>;
      default :return <Dashboard/>

    }

  }

  return (
  <div className='flex flex-col h-screen'>
    <Header activePage={activePage} setActivePage={setActivePage}/>
    <main>
      {renderPage()}
      </main>
    </div>
    )
}

export default App
