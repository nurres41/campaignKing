import './App.css';
import CampaignsTable from './components/table/Table';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import DateFilter from './components/dateFilter/DateFilter';

function App() {
  return (
    <div className="app">
      <Header />
      <div>
        <DateFilter />
        <CampaignsTable />
      </div>
      <Footer />
    </div>
  );
}

export default App;
