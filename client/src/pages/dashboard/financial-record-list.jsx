/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useContext } from "react";
import { RecordsContext } from "../../App";
import axios from "axios";

function FinancialRecordList() {
  const [editingRecord, setEditingRecord] = useState(null);

  const { records, updateRecords } = useContext(RecordsContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/Records/getAllByUserId/123`)
      .then((response) => updateRecords(response.data))
      .catch((error) => console.error("Error fetching records:", error));
  }, [updateRecords, records]);

  const handleEditClick = (record) => {
    setEditingRecord(record);
  };

  const handleSaveClick = (id) => {
    axios
      .put(`http://localhost:3001/Records/${id}`, editingRecord)
      .then((response) => {
        updateRecords(
          records.map((record) => (record._id === id ? response.data : record))
        );
        setEditingRecord(null);
      })
      .catch((error) => console.error("Error saving record:", error));
  };

  const handleDeleteClick = (id) => {
    axios
      .delete(`http://localhost:3001/Records/${id}`)
      .then(() => updateRecords(records.filter((record) => record._id !== id)))
      .catch((error) => console.error("Error deleting record:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingRecord({ ...editingRecord, [name]: value });
  };

  return (
    <div className="financial-record-list">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              {editingRecord && editingRecord._id === record._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={editingRecord.description}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      value={editingRecord.amount}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <select
                      name="category"
                      value={editingRecord.category}
                      onChange={handleInputChange}
                    >
                      <option value="Entertainment">Entertainment</option>
                      <option value="Food">Food</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td>
                    <select
                      name="paymentMethod"
                      value={editingRecord.paymentMethod}
                      onChange={handleInputChange}
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </td>
                  <td>{new Date(editingRecord.date).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleSaveClick(record._id)}>
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{record.description}</td>
                  <td>{record.amount}</td>
                  <td>{record.category}</td>
                  <td>{record.paymentMethod}</td>
                  <td>{new Date(record.date).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEditClick(record)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(record._id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FinancialRecordList;
