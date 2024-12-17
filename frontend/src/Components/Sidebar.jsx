import React from 'react';
import { FaFileAlt, FaHome, FaPlusSquare, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <>
      <div className="bg-dark text-white vh-100" style={{ width: '250px' }}>
        <div className="p-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link to={'/dashboard'} className="nav-link text-white">
                <FaHome className="me-2" /> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/dashboard/manage-employees" className="nav-link text-white">
                <FaUsers className="me-2" /> Manage Employees
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to={'/dashboard/users'} className="nav-link text-white">
                <FaUsers className="me-2" /> Users
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to={'/dashboard/allposts'} className="nav-link text-white">
                <FaFileAlt className="me-2" /> Employees Datas
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to={'/dashboard/department'} className="nav-link text-white">
                <FaFileAlt className="me-2" /> Department
              </Link>
            </li>
            {/* New Salary Link */}
            <li className="nav-item mb-3">
              <Link to={'/dashboard/add-salary'} className="nav-link text-white">
                <FaMoneyBillWave className="me-2" /> Salary
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
