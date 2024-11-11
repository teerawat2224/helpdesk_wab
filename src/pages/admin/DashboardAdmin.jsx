// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [cases, setCases] = useState([]);
    const [locations, setLocations] = useState([]);
    const [responsibles, setResponsibles] = useState([]);
    const [users, setUsers] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [reports, setReports] = useState([]);

    // ดึงข้อมูลทั้งหมด
    useEffect(() => {
        axios.get('http://localhost:4000/admin/cases')
            .then(response => setCases(response.data))
            .catch(error => console.error('Error fetching cases:', error));

        axios.get('http://localhost:4000/admin/locations')
            .then(response => setLocations(response.data))
            .catch(error => console.error('Error fetching locations:', error));

        axios.get('http://localhost:4000/admin/responsibles')
            .then(response => setResponsibles(response.data))
            .catch(error => console.error('Error fetching responsibles:', error));

        axios.get('http://localhost:4000/admin/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));

        axios.get('http://localhost:4000/admin/calendar')
            .then(response => setCalendarEvents(response.data))
            .catch(error => console.error('Error fetching calendar events:', error));

        axios.get('http://localhost:4000/admin/reports')
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

            {/* เคส */}
            <div className="mb-4">
                <h2 className="text-xl">Cases</h2>
                <ul>
                    {cases.map(caseItem => (
                        <li key={caseItem.id}>
                            {caseItem.title}: {caseItem.description}
                        </li>
                    ))}
                </ul>
            </div>

            {/* สถานที่ */}
            <div className="mb-4">
                <h2 className="text-xl">Locations</h2>
                <ul>
                    {locations.map(location => (
                        <li key={location.id}>
                            {location.name}: {location.address}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ผู้รับผิดชอบ */}
            <div className="mb-4">
                <h2 className="text-xl">Responsibles</h2>
                <ul>
                    {responsibles.map(responsible => (
                        <li key={responsible.id}>
                            {responsible.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ผู้ใช้งาน */}
            <div className="mb-4">
                <h2 className="text-xl">Users</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name}: {user.role}
                        </li>
                    ))}
                </ul>
            </div>

            {/* ปฏิทิน */}
            <div className="mb-4">
                <h2 className="text-xl">Calendar Events</h2>
                <ul>
                    {calendarEvents.map(event => (
                        <li key={event.id}>
                            {event.name}: {event.date}
                        </li>
                    ))}
                </ul>
            </div>

            {/* รายงาน */}
            <div className="mb-4">
                <h2 className="text-xl">Reports</h2>
                <ul>
                    {reports.map(report => (
                        <li key={report.id}>
                            {report.title}: {report.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
