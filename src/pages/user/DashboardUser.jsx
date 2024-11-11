import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function UserDashboard() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    const response = await axios.get('http://localhost:4000/user/reports')
    setReports(response.data)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <div className="space-x-4">
        <Link to="/user/create-report" className="bg-green-500 text-white px-4 py-2 rounded">
          Create New Report
        </Link>
        <Link to="/user/reports" className="bg-blue-500 text-white px-4 py-2 rounded">
          View All Reports
        </Link>
      </div>

      <h2 className="text-xl font-bold mt-8">Recent Reports</h2>
      <div className="grid gap-4">
        {reports.map(report => (
          <div key={report.id} className="border p-4 rounded">
            <h3 className="font-bold">{report.title}</h3>
            <p>{report.description}</p>
            <p className="text-sm text-gray-500">Status: {report.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
