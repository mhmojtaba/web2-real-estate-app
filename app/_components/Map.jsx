"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  MarkerF,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import MarkerOverlay from "./MarkerOverlay";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px",
};

function Map({ coordinates, publishedData }) {
  const [selectedItem, setSelectedItem] = useState();
  // console.log(selectedItem);

  useEffect(() => {
    if (coordinates) {
      console.log(coordinates);
      setCenter({
        lat: coordinates?.lat,
        lng: coordinates?.lon,
      });
    }
    console.log(center);
  }, [coordinates]);

  const [center, setCenter] = useState({
    lat: 32.666606,
    lng: 51.672763,
  });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <div>
      <div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <>
            {publishedData.map((item, index) => (
              <MarkerF
                key={index}
                onClick={() => setSelectedItem(item)}
                position={{
                  lat: item?.coordinates.lat,
                  lng: item?.coordinates.lon,
                }}
                icon={{
                  url: "/mapPin.png",
                  scaledSize: {
                    width: 50,
                    height: 50,
                  },
                }}
              />
            ))}
            {selectedItem && (
              <OverlayView
                position={{
                  lat: selectedItem?.coordinates.lat,
                  lng: selectedItem?.coordinates.lon,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="text-white ">
                  <MarkerOverlay
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                  />
                </div>
              </OverlayView>
            )}
          </>
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
