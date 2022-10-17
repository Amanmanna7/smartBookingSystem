/* global google */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps'

function MapWithMarkers({ zoom, center, locations, setPlaceFlag }) {
  const [places, setPlaces] = useState([])
  const router = useRouter()

  useEffect(() => {
    for (let i = 0; i < locations.length; i++) {
      setPlaces((places) => [
        ...places,
        {
          id: locations[i].id,
          name: locations[i].name,
          lat: locations[i].location.latitude,
          lng: locations[i].location.longitude,
        },
      ])
    }
  }, [locations])

  const addMarker = (e) => {
    console.log(e)
    const newPlace = {
      id: places.length,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      name: 'New Place',
    }
    setPlaces([...places, newPlace])
  }
  return (
    <GoogleMap onClick={addMarker} defaultZoom={zoom} defaultCenter={center}>
      {places.map((place) => {
        return (
          <Marker
            key={place.id}
            position={{ lat: place.lat, lng: place.lng }}
            label={place.name}
            onMouseOver={() => setPlaceFlag(place.name)}
            onMouseOut={() => setPlaceFlag('')}
            onClick={() => router.push(`/hostel/${place.id}`)}
          />
        )
      })}
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(MapWithMarkers))
