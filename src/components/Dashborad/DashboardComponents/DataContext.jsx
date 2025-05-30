// DataContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context
const DataContext = createContext();

// 2. Create the provider
export const DataProvider = ({ children }) => {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  const [customersData, setCustomersData] = useState([
    {
      CustomerID: 1,
      FirstName: "ليلى",
      SecondName: "محمد",
      LastName: "الحلبي",
      DateOfBirth: "1985-03-15 00:00:00",
      Gender: true,
      PhoneNumber: "+963 955 019 81",
      DriverLicenseNumber: "DAM-AHMED-8503-215",
    },
    {
      CustomerID: 2,
      FirstName: "محمد",
      SecondName: "علي",
      LastName: "الدمشقي",
      DateOfBirth: "1990-07-22 00:00:00",
      Gender: false,
      PhoneNumber: "+963 933 016 73",
      DriverLicenseNumber: "DAM-MOHAM-9007-471",
    },
    {
      CustomerID: 9,
      FirstName: "هدى",
      SecondName: "ناديا",
      LastName: "الادلبية",
      DateOfBirth: "1989-02-14 00:00:00",
      Gender: true,
      PhoneNumber: "+963 988 015 63",
      DriverLicenseNumber: "IDL-HUDA-8902-284",
    },
  ]);

  return (
    <DataContext.Provider
      value={{
        customersData,
        setCustomersData,
        vehiclesData,
        setVehiclesData,
        usersData,
        setUsersData,
        paymentData,
        setPaymentData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// 3. Custom hook to use data
export const useData = () => useContext(DataContext);
