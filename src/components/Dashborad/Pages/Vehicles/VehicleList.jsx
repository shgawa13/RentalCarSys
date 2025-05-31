import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useData } from "../../DashboardComponents/DataContext";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

// Updated table headers for vehicles
const TABLE_HEAD = [
  "Vehicle ID",
  "Make",
  "Model",
  "Year",
  "Mileage",
  "Fuel Type",
  "Plate Number",
  "Category",
  "Price/Day",
  "Availability",
  "Image",
  "Edit",
  "Delete",
];

const VehicleList = () => {
  // Changed to vehiclesData and fetchVehicles
  const { vehiclesData, fetchVehicles } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  // Updated filter function for vehicles
  const filteredVehicles = useMemo(() => {
    if (!searchTerm.trim()) return vehiclesData;

    const term = searchTerm.toLowerCase();

    return vehiclesData.filter((vehicle) => {
      return (
        (vehicle.PlateNumber != null &&
          String(vehicle.PlateNumber).toLowerCase().includes(term)) ||
        (vehicle.Make != null &&
          String(vehicle.Make).toLowerCase().includes(term))
      );
    });
  }, [vehiclesData, searchTerm]);

  // Updated delete function for vehicles
  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );
    if (!userConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost/SmartKey/Backend/api/vehicles/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentLength = response.headers.get("content-length");
      let result = null;

      if (contentLength && parseInt(contentLength) > 0) {
        result = await response.json();
      }

      toast.success("Vehicle deleted successfully");
      fetchVehicles(); // Refresh vehicle list

      return result;
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete vehicle");
      throw error;
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Vehicles List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all vehicles
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" onClick={clearSearch}>
              View All
            </Button>
            <Link to={`/Dashboard/Vehicles/addnew`}>
              <Button className="flex items-center gap-3" size="sm">
                Add Vehicle
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search by Plate or Make"
              name="filter"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => {
              const isLast = index === filteredVehicles.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50 text-start";

              return (
                <tr key={vehicle.VehicleID}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vehicle.VehicleID}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vehicle.Make}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vehicle.Model}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vehicle.Year}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vehicle.Mileage}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vehicle.FuelType}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vehicle.PlateNumber}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {vehicle.CategoryName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      ${vehicle.PricePerDay}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color={vehicle.IsAvailableForRent ? "green" : "red"}
                      className="font-normal"
                    >
                      {vehicle.IsAvailableForRent ? "Available" : "Rented"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {vehicle.CarImage ? (
                      <img
                        src={vehicle.CarImage}
                        alt={`${vehicle.Make} ${vehicle.Model}`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Typography variant="small">No Image</Typography>
                      </div>
                    )}
                  </td>
                  <td className={classes}>
                    <Link
                      to={`/Dashboard/Vehicles/Update/${vehicle.VehicleID}`}
                    >
                      <Tooltip content="Edit Vehicle">
                        <IconButton variant="text">
                          <PencilIcon className="h-6 w-6 text-light-blue-800" />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Delete">
                      <IconButton
                        variant="text"
                        onClick={() => handleDelete(vehicle.VehicleID)}
                      >
                        <RiDeleteBack2Fill className="h-6 w-6 text-red-700" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VehicleList;
