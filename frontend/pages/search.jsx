import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { HostelCardLarge } from '../components/ShowHostels'
import { useSelector } from 'react-redux'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'
import { useRouter } from 'next/router'
import Map from '../components/Map'

const Searchbox = ({ hostels, placeFlag }) => {
  const [search, setSearch] = useState('')
  const [filteredHostels, setFilteredHostels] = useState([])

  useEffect(() => {
    const results = hostels.filter((hostel) => {
      return (
        hostel.name.toLowerCase().includes(search.toLowerCase()) ||
        hostel.address.toLowerCase().includes(search.toLowerCase()) ||
        hostel.description.toLowerCase().includes(search.toLowerCase())
      )
    })
    setFilteredHostels(results)
  }, [search, hostels])
  return (
    <div className="flex flex-col">
      <div className="flex max-w-7xl items-center justify-between">
        <input
          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-4">
          <div className="dropdown">
            <label
              tabIndex="0"
              className="flex items-center justify-center text-white"
            >
              <i className="fas fa-sort ml-2 text-gray-500"></i>
            </label>
            <ul
              tabIndex="0"
              className="card-compact dropdown-content menu rounded-box w-52 bg-base-100 bg-primary p-2 shadow"
            >
              <li>
                <a className="text-white">Name</a>
              </li>
              <li>
                <a className="text-white">Price</a>
              </li>
            </ul>
          </div>

          <i className="fas fa-filter ml-2 text-gray-500"></i>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5">
        {filteredHostels &&
          filteredHostels.map((hostel, index) => (
            <HostelCardLarge
              key={index}
              id={hostel._id}
              name={hostel.name}
              image={hostel.image}
              city={hostel.address}
              price={hostel.price}
              rating={hostel.rating}
              placeFlag={placeFlag}
            />
          ))}
      </div>
    </div>
  )
}

const LocationMap = ({ locations, setPlaceFlag }) => {
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 27.397, lng: 77.644 }}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {/* <Marker
          position={{ lat: 27.24, lng: 78.2164 }}
          label="Tyagi Hostel"
          onMouseOver={() => setPlaceFlag('Tyagi Hostel')}
          onMouseOut={() => setPlaceFlag('')}
          onClick={() =>
            locations.map((location) =>
              location.name === 'Tyagi Hostel'
                ? router.push(`/hostel/${location.id}`)
                : null
            )
          }
        />
        <Marker
          position={{ lat: 28, lng: 77.644 }}
          label="AB Hostel"
          onMouseOver={() => setPlaceFlag('AB HOSTELS')}
          onMouseOut={() => setPlaceFlag('')}
          onClick={() =>
            locations.map((location) =>
              location.name === 'AB Hostel'
                ? router.push(`/hostel/${location.id}`)
                : null
            )
          }
        /> */}
        {/* {locations.length > 0 &&
          locations.map((location) => {
            return (
              <Marker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                label={location.name}
                onMouseOver={() => setPlaceFlag(location.name)}
                onMouseOut={() => setPlaceFlag('')}
                onClick={() => router.push(`/hostel/${location.id}`)}
              />
            )
          })} */}
        {locations.map((place) => {
          return (
            <Marker
              key={place.id}
              position={{ lat: place.lat, lng: place.lng }}
            />
          )
        })}
      </GoogleMap>
    ))
  )

  return (
    <MapWithAMarker
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `70%` }} />}
    />
  )
}

function search() {
  const [hostels, setHostels] = useState([])
  const [locations, setLocations] = useState([])
  const [placeFlag, setPlaceFlag] = useState('')
  const router = useRouter()
  const hostel = useSelector((state) => state.hostel.allHostels)
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://hostel-management-system-aman.herokuapp.com/hostel',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    }).then((resp) => {
      setHostels(resp.data)
      setLocations(
        resp.data.map((hostel) => {
          return {
            location: hostel.location,
            name: hostel.name,
            id: hostel._id,
          }
        })
      )
    })
    setHostels(hostel)
  }, [locations.length])

  return (
    <div>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Page</h1>
        </div>
        <main className="container mx-auto grid min-h-screen grid-cols-2 px-4">
          <Searchbox hostels={hostels} placeFlag={placeFlag} />
          <aside>
            {/* {locations.length > 0 && (
              <LocationMap locations={locations} setPlaceFlag={setPlaceFlag} />
            )} */}
            {locations && (
              <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                center={{ lat: 27.397, lng: 77.644 }}
                zoom={8}
                locations={locations}
                setPlaceFlag={setPlaceFlag}
              />
            )}
          </aside>
        </main>
      </header>
    </div>
  )
}

export default search
