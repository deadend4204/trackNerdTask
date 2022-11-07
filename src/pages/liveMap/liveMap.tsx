import { Button } from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/useQueryHooks";
import { APPLICATION_ROUTES } from "../../utils/apiConstant";
import { firebaseDB } from "../../utils/firebase";
import Map from "./map";

const LiveMap = () => {
  const query = useQuery();
  const vehicleId = query.get("vehicleId") || "";
  const registrationNumber = query.get("registrationNumber") || "";
  const navigate = useNavigate();
  const [vehicleData, setVehicleData] = useState<any>(null);
  useEffect(() => {
    if (!vehicleId || !registrationNumber) {
      navigate(APPLICATION_ROUTES.HOME);
    }
    const dbRef = ref(
      firebaseDB,
      `${vehicleId}-${registrationNumber}/location`
    );
    onValue(dbRef, (snapshot) => {
      console.log("snapshot val", snapshot.val());
      const vehicleData = snapshot.val();
      setVehicleData(vehicleData);
    });
  }, []);

  return (
    <div>
      <h1>Live-Map</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate(APPLICATION_ROUTES.HOME)}
        >
          Back
        </Button>
        <div>
          <b>Vehicle ID: </b> {vehicleId}
        </div>
        <div>
          <b>Vehicle Registration Number: </b> {registrationNumber}
        </div>
      </div>
      {vehicleData && vehicleData?.latitude && vehicleData?.longitude ? (
        <Map
          calculatedData={[
            {
              Latitude: vehicleData.latitude,
              Longitude: vehicleData.longitude,
            },
          ]}
          lat={vehicleData.latitude}
          lng={vehicleData.longitude}
        />
      ) : (
        "No Data found. Please Try some other vehicle."
      )}
    </div>
  );
};

export default LiveMap;
