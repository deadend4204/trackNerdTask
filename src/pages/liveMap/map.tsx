import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import startIcon from "./location-pin.png";

const containerStyle = {
  width: "100%",
  height: "500px",
};

let map: google.maps.Map;
type Maptype = {
  calculatedData: any[];
  lat: any;
  lng: any;
};
const Map = ({ calculatedData, lat, lng }: Maptype) => {
  const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";

  const icons = {
    icon: iconBase + "info-i_maps.png",
    startIcon,
    // locationIcon,
    // endIcon,
    // start,
    // end,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY || "",
  });

  const [pathArray, setPathArray] = useState<any[]>([]);
  const [markers, setMarkers] = useState<any>();
  const [center, setCenter] = useState({
    lat: lat,
    lng: lng,
  });
  const onLoad = useCallback(async function callback(map: any) {}, []);
  const onUnmount = useCallback(function callback(map: any) {}, []);
  useEffect(() => {
    const pathArray: any[] = [];
    for (let i = 0; i < calculatedData.length; i++) {
      const element = calculatedData[i];
      pathArray.push({ lat: element.Latitude, lng: element.Longitude });
    }

    setPathArray(pathArray);

    setMarkers(
      pathArray.map(
        (path, index) =>
          (index === pathArray.length - 1 || index === 0) && (
            <Marker icon={icons.startIcon} key={index} position={path}></Marker>
          )
      )
    );
  }, [calculatedData]);

  useEffect(() => {
    setCenter({
      lat: lat,
      lng: lng,
    });
  }, [lat, lng]);

  const options = {
    strokeColor: "black",
    strokeOpacity: 0.8,
    strokeWeight: 5,
    fillColor: "black",
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: pathArray,
    zIndex: 1,
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={21}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <>
          <Polyline onLoad={onLoad} path={pathArray} options={options} />

          {markers && markers}
        </>
      </GoogleMap>
      <br />
      <br />
    </>
  ) : (
    <></>
  );
};

export default Map;
