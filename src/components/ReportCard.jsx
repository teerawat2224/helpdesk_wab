export default function ReportCard({ report, onStatusChange, showActions = true }) {
    const statusColors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800'
    }
  
    return (
      <div className="border rounded-lg shadow-sm p-4 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{report.title}</h3>
            <p className="text-gray-600 mt-1">{report.description}</p>
            
            <div className="mt-3 space-y-1">
              {report.location && (
                <p className="text-sm">
                  <span className="font-medium">Location:</span> {report.location.name}
                </p>
              )}
              {report.category && (
                <p className="text-sm">
                  <span className="font-medium">Category:</span> {report.category}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-sm ${statusColors[report.status]}`}>
              {report.status}
            </span>
            
            {showActions && onStatusChange && (
              <select
                value={report.status}
                onChange={(e) => onStatusChange(report.id, e.target.value)}
                className="mt-2 border rounded p-1 text-sm"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          Created: {new Date(report.created_at).toLocaleDateString()}
        </div>
      </div>
    )
  }
  