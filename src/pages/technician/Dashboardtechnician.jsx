import { useState, useEffect } from 'react'
import axios from 'axios'

export default function TechnicianDashboard() {
  const [assignedReports, setAssignedReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAssignedReports()
  }, [])

  const fetchAssignedReports = async () => {
    try {
      const response = await axios.get('http://localhost:4000/technician/reports/assigned')
      setAssignedReports(response.data)
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (reportId, status) => {
    try {
      await axios.patch('http://localhost:4000/technician/reports/status', {
        reportId,
        status
      })
      fetchAssignedReports()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Assigned Reports</h1>
      <div className="grid gap-4">
        {assignedReports.map(report => (
          <div key={report.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{report.title}</h3>
                <p className="text-gray-600">{report.description}</p>
                <div className="mt-2">
                  <p><span className="font-semibold">Location:</span> {report.location?.name}</p>
                  <p><span className="font-semibold">Category:</span> {report.category}</p>
                  <p><span className="font-semibold">Reported by:</span> {report.users?.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <select
                  value={report.status}
                  onChange={(e) => handleStatusUpdate(report.id, e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
