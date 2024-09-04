import FinancialRecordForm from "./financial-record-form";
import FinancialRecordList from "./financial-record-list";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome! Here are your finances</h1>
      <FinancialRecordForm />
      <FinancialRecordList />
    </div>
  );
}

export default Dashboard;
