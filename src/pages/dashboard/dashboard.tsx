import React, { useEffect, useState } from "react";
import {
  changeName,
  decrement,
  increment,
  incrementByAmount,
} from "../../redux/slices/counterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { fetchVehicles } from "../../redux/actions/vehicleActions";
import { ref, onValue } from "firebase/database";
import { firebaseDB } from "../../utils/firebase";
import { Button, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
const data = {
  deletedDate: null,
  id: 120,
  registrationNumber: "KA 01 MU 0586",
  type: "Car",
  make: null,
  model: null,
  chassisNumber: null,
  fuelDataSource: "No Fuel",
  immobilizer: "No Immobilizer",
  tankCapacity: null,
  llsCount: null,
  odometerReading: null,
  installationDate: "2020-01-10T00:00:00.000Z",
  trialEndDate: null,
  note: "",
  status: "Online",
  speedLimit: 0,
  driver: null,
};
const Dashboard = () => {
  const vehicleList = useAppSelector((state) => state.counter.vehicleList);

  const dispatch = useAppDispatch();
  const [selectedVehicleList, setSelectedVehicleList] = useState({
    selectedId: null,
    vehicleList: [],
  });
  useEffect(() => {
    dispatch(fetchVehicles());
  }, []);

  return (
    <div>
      <Grid
        style={{ marginTop: "20px" }}
        container
        justifyContent={"space-between"}
        gap={1}
      >
        <Grid item xs={9} md={9}>
          <span>
            <b>Organization List</b>
          </span>
          <Grid container style={{ marginTop: "10px" }}>
            {vehicleList.map((vehicleOrg) => {
              return (
                <Grid item xs={12} md={4} key={vehicleOrg.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 10,
                      margin: 10,
                      background: "cyan",
                      borderRadius: "8px",
                    }}
                  >
                    <div>
                      <b>Name: </b>
                      {vehicleOrg.name}
                    </div>

                    <Button
                      variant="contained"
                      onClick={() =>
                        setSelectedVehicleList({
                          selectedId: vehicleOrg.id,
                          vehicleList: vehicleOrg?.vehicles || [],
                        })
                      }
                      color={
                        selectedVehicleList.selectedId === vehicleOrg.id
                          ? "success"
                          : "primary"
                      }
                    >
                      {selectedVehicleList.selectedId === vehicleOrg.id
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </div>

                  {/* <ul>
                  {vehicleOrg?.vehicles && vehicleOrg?.vehicles?.length
                    ? vehicleOrg?.vehicles.map((vehicle: any) => (
                        <li key={vehicle.id}>{vehicle.registrationNumber}</li>
                      ))
                    : "No Vehicles"}
                </ul> */}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={2} md={2}>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "auto",
              padding: "10",
              background: "orange",
              borderRadius: "8px",
            }}
          >
            <div style={{ paddingTop: 10 }}>
              <b>Vehicle List</b>
            </div>
            <div style={{ marginTop: "6px" }}>
              {selectedVehicleList.selectedId ? (
                <div style={{ padding: "0 15px" }}>
                  <div style={{ padding: "8px", paddingTop: 0 }}>
                    Click on the registration number to see live location
                  </div>
                  {selectedVehicleList.vehicleList.length
                    ? selectedVehicleList.vehicleList.map(
                        (vehicle: any, index: number) => (
                          <Link
                            to={`/live-map?vehicleId=${vehicle.id}&registrationNumber=${vehicle.registrationNumber}`}
                            key={vehicle.id}
                          >
                            <div
                              style={{
                                marginBottom: 15,
                                background: "#f7e9d0",
                                borderRadius: 6,
                                padding: "5px",
                              }}
                            >
                              <b>{index + 1}.</b> {vehicle.registrationNumber}
                            </div>
                          </Link>
                        )
                      )
                    : "No Vehicles"}
                </div>
              ) : (
                "Please select an organization first"
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
