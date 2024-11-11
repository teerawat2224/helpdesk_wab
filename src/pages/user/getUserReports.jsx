import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/getUserReports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching user reports:', error.response?.data || error.message);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>User Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <p>Category: {report.category}</p>
            <p>Location ID: {report.location_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserReports;
