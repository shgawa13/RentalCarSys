import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context
const DataContext = createContext();

// 2. Create the provider
export const DataProvider = ({ children }) => {
  const [vehiclesData, setVehiclesData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [customersData, setCustomersData] = useState([]);

  // Fetching Customers data form API
  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "http://localhost/SmartKey/Backend/api/customers/"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setCustomersData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
    }
  };

  // Fetching Vehicles data form API
  const fetchVehicles = async () => {
    try {
      const response = await fetch(
        "http://localhost/SmartKey/Backend/api/vehicles/"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setVehiclesData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
    }
  };

  const fetchBookingData = async () => {
    try {
      const response = await fetch(
        "http://localhost/SmartKey/Backend/api/rentalbooking/"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setBookingsData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchVehicles();
    fetchBookingData();
  }, []);

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
        fetchCustomers,
        fetchVehicles,
        bookingsData,
        fetchBookingData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// 3. Custom hook to use data
export const useData = () => useContext(DataContext);
