import { MapPin } from "lucide-react";
import React from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
} from "react-google-places-autocomplete";
// import Autocomplete from "react-google-autocomplete";

function GoogleAddressSearch({ setSelectedAddress, setCoordinates }) {
  return (
    <div className="flex gap-3 items-center w-full">
      <MapPin className="h-10 w-10 p-2 rounded-full text-primary bg-slate-300" />
      {/* <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        onPlaceSelected={(place) => console.log(place)}
      /> */}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          isClearable: true,
          placeholder: "search the property address",
          className: "w-full",
          onChange: (place) => {
            console.log(place);
            setSelectedAddress(place?.label);
            geocodeByAddress(place?.label)
              .then((results) => getLatLng(results[0]))
              .then(({ lat, lng }) => {
                console.log("Successfully got latitude and longitude", {
                  lat,
                  lng,
                });
                setCoordinates({ lat, lng });
              });
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
