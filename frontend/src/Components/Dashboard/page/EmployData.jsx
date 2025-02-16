import React, { useEffect, useState } from 'react';
import { getVerifiedEmployees } from '../../../services/employeeServices';


const EmployeeList = () => {
    const [emp,setEmp] = useState("")
    useEffect(()=>{
        const fetchemp  = async ()=>{
          try {
            const response=   await getVerifiedEmployees()
            // console.log("emoloyee",response.data)
            const sortedEmployees = response.data.sort((a, b) => 
                a.user.name.localeCompare(b.user.name)
            );
            setEmp(sortedEmployees)
          } catch (error) {
          toast.error("Failed to fetch employee");              
          }
        }
        fetchemp()
      },[])
      
  return (
    <div className="w-[400px] h-[350px] overflow-y-auto px-6 py-2 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Employee List</h2>
      <ul className="space-y-4">
        {emp && emp.map((employee) => (
          <li
            key={employee._id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-6">
              {/* Employee Image */}
              <img
                src={employee.image.url}
                alt={employee.user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              {/* Employee Details */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{employee.user.name}</h3>
                <p className="text-sm text-gray-600">{employee.user.email}</p>
                <p className="text-sm text-gray-600">Phone: {employee.user.phoneNo}</p>
                <p className="text-sm text-gray-600">
                  Designation: {employee.designation}
                </p>
                <p className="text-sm text-gray-600">
                  Address: {employee.address.city}, {employee.address.state}, {employee.address.country} - {employee.address.pincode}
                </p>
                <p className="text-sm text-gray-600">
                  Role: {employee.role ? employee.role.name : 'No Role Assigned'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;