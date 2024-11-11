import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssignedReportsPage() {
  const [reports, setReports] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignedReports();
  }, []);

  const fetchAssignedReports = async () => {
    try {
      const response = await axios.get('http://localhost:4000/reports/assigned');
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      const response = await axios.put('http://localhost:4000/reports/update-status', {
        reportId,
        status: newStatus,
      });
      setReports(reports.map(report => report.id === reportId ? { ...report, status: newStatus } : report));
      setStatusUpdate('');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">Assigned Reports</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-4">
          {reports.map(report => (
            <div key={report.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-700">{report.title}</h2>
              <p className="text-gray-600 mt-2">{report.description}</p>
              <p className="text-sm text-gray-500 mt-2">Location: {report.location.name}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-semibold">{report.status}</span>
                {report.status !== 'Completed' && (
                  <select
                    className="p-2 border rounded-md"
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                )}
                <button
                  onClick={() => handleStatusUpdate(report.id, statusUpdate)}
                  className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssignedReportsPage;
