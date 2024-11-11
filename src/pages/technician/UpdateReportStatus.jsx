import React, { useState } from 'react';
import axios from 'axios';

const UpdateReportStatus = () => {
  const [reportId, setReportId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleStatusChange = async () => {
    try {
      const response = await axios.patch(
        'http://localhost:4000/user/getUserReports',
        { reportId, status },
        { withCredentials: true }
      );
      setMessage(`Report status updated to: ${response.data.status}`);
    } catch (err) {
      setMessage('Error updating report status');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Update Report Status</h2>
      <div>
        <label>Report ID:</label>
        <input
          type="text"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <button onClick={handleStatusChange}>Update Status</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateReportStatus;
