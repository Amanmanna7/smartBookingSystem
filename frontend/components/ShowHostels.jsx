import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const HostelCard = ({ id, name, image, city, price }) => {
  return (
    <div className="flex justify-center">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img src={image} alt={name} className="h-[200px] w-[300px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>

          <div className="card-actions w-full items-center justify-end">
            <div className="flex w-full items-end gap-2">
              <div className="badge badge-outline hover:bg-slate-500 hover:text-white">
                {city}
              </div>
              <div className="badge badge-outline hover:bg-slate-500 hover:text-white">
                ₹{price}
              </div>
            </div>
            <Link href="/hostel/[id]" as={`/hostel/${id}`}>
              <button type="button" className="btn">
                Visit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
const HostelCardLarge = ({
  id,
  name,
  image,
  city,
  price,
  rating,
  placeFlag,
}) => {
  return (
    <div className="flex justify-center">
      <div
        className={
          placeFlag === name
            ? 'flex flex-col rounded-lg bg-slate-300 shadow-lg md:flex-row'
            : 'flex flex-col rounded-lg bg-white shadow-lg md:flex-row'
        }
      >
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={image}
          alt={name}
        />
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-2 text-xl font-medium text-gray-900">{name}</h5>
          <p className="mb-4 text-base text-gray-700">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <div className="flex gap-4">
            <div className="badge badge-outline hover:bg-slate-500 hover:text-white">
              {city}
            </div>
            <div className="badge badge-outline hover:bg-slate-500 hover:text-white">
              ₹{price}
            </div>
          </div>
          <section>
            <div className="rating">
              {[...Array(Math.round(rating))].map((star) => (
                <input
                  type="radio"
                  className="mask mask-star-2 bg-orange-400"
                />
              ))}
            </div>
          </section>
          <p className="text-xs text-gray-600">
            Last updated {Math.floor(Math.random() * 60)} mins ago
          </p>
          <Link href="/hostel/[id]" as={`/hostel/${id}`}>
            <a className="btn my-2">See More</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

function ShowHostels() {
  const [hostels, setHostels] = useState([])
  const dispatch = useDispatch()
  const hostel = useSelector((state) => state.hostel.allHostels)
  useEffect(() => {
    if (Object.keys(hostel).length === 0) {
      // dispatch({ type: 'FETCH_HOSTELS', payload: hostel })
      axios({
        method: 'GET',
        // url: 'https://hostel-management-system-aman.herokuapp.com/hostel',
        url: 'https://hostel-management-system-aman.herokuapp.com/hostel',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      }).then((resp) => {
        setHostels(resp.data)
        dispatch({ type: 'setHostels', payload: resp.data })
      })
    } else {
      setHostels(hostel)
    }
  }, [hostel])
  return (
    <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3 lg:grid-cols-5">
      {hostels.map((hostel) => (
        <HostelCard
          key={hostel.hostelId}
          id={hostel._id}
          name={hostel.name}
          image={hostel.image}
          city={hostel.address}
          price={hostel.price}
        />
      ))}
    </div>
  )
}

export default ShowHostels
export { HostelCardLarge }
