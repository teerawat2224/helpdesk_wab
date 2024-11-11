import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [cases, setCases] = useState([]);
  const [locations, setLocations] = useState([]);
  const [responsibles, setResponsibles] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchCases();
    fetchLocations();
    fetchResponsibles();
    fetchUsers();
    fetchReports();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/getAllCases');
      setCases(response.data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/getAllLocations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchResponsibles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/getAllResponsibles');
      setResponsibles(response.data);
    } catch (error) {
      console.error('Error fetching responsibles:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/getAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/getAllReports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <div className="admin-dashboard p-8 bg-gray-100 min-h-screen">
      <h1 className="text-center text-3xl font-semibold text-blue-600 mb-6">Admin Dashboard</h1>

      <div className="space-y-6">
        {/* Cases Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Cases</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <tr key={caseItem.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{caseItem.title}</td>
                    <td className="px-4 py-2">{caseItem.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Locations Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Locations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Address</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location) => (
                  <tr key={location.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{location.name}</td>
                    <td className="px-4 py-2">{location.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Responsibles Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Responsibles</h2>
          <ul className="space-y-2">
            {responsibles.map((responsible) => (
              <li key={responsible.id} className="p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-200">
                <p className="text-lg font-semibold">{responsible.name}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Users Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Reports</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{report.title}</td>
                    <td className="px-4 py-2">{report.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
