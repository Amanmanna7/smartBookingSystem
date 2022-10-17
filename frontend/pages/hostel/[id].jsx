import { getURL } from 'next/dist/shared/lib/utils'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/router'

const PreviewRoleAction = ({
  hostel,
  setHostel,
  handleHostelBooking,
  setRoomCount,
  roomCount,
  setModelMessage,
  setModelStatus,
  OwnerId,
}) => {
  const [isOwner, setIsOwner] = useState(false)
  const [Deal, setDeal] = useState(false)
  const [search, setSearch] = useState(108)
  const { id } = useRouter().query

  useEffect(() => {
    setIsOwner(JSON.parse(localStorage.getItem('user'))._id == OwnerId)
  }, [])

  const handleBooking = () => {
    if (isOwner && search.length) {
      axios
        .get(
          `https://hostel-management-system-aman.herokuapp.com/hostel/${id}/${search}`,
          {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          if (Object.keys(res.data).includes('message')) {
            setModelMessage(res.data.message)
            setModelStatus('modal-open')
          } else {
            axios
              .get(
                `https://hostel-management-system-aman.herokuapp.com/auth/user/${res.data.userId}`,
                {
                  headers: {
                    'x-access-token': localStorage.getItem('token'),
                  },
                }
              )
              .then((user) => {
                setModelMessage(
                  <div className="flex flex-col">
                    <div>
                      <b>Name :</b> {user.data.username}
                    </div>
                    <div>
                      <b>College ID :</b> {user.data.collageId}
                    </div>
                    <div>
                      <b>Aadhar :</b> {user.data.aadhar}
                    </div>
                  </div>
                )
                setModelStatus('modal-open')
              })
          }
        })
    }
  }
  return (
    <section className="container">
      {isOwner ? (
        <>
          <h1>Search Student Details : </h1>
          <div className="flex gap-4">
            <input
              type="number"
              className="input input-bordered w-full max-w-xs"
              placeholder="room number"
              min="100"
              max="200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn" onClick={handleBooking}>
              <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </>
      ) : (
        <button className="btn" onClick={handleHostelBooking}>
          {Deal ? 'Booked' : 'Book Now'}
        </button>
      )}
    </section>
  )
}
function previewPage() {
  const [hostel, setHostel] = useState({})
  const [roomCount, setRoomCount] = useState(0)
  const dispatch = useDispatch()
  const [modelStatus, setModelStatus] = useState(false)
  const [modelMessage, setModelMessage] = useState('')
  const currentHostel = useSelector((state) => state.hostel.currentHostel)
  useEffect(() => {
    if (
      Object.keys(currentHostel).length === 0 ||
      hostel.hostelId !== currentHostel.hostelId
    ) {
      axios({
        method: 'GET',
        url: 'https://hostel-management-system-aman.herokuapp.com/hostel',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
      }).then((resp) => {
        let data = resp.data.filter(
          (hostelObj) => hostelObj._id === getURL().replace('/hostel/', '')
        )
        if (data) {
          setHostel(...data)
          setRoomCount(data[0]?.totalRoomsCount)
          dispatch({ type: 'setHostels', payload: resp.data })
          dispatch({ type: 'setHostelById', payload: data[0] })
        }
      })
    } else {
      setHostel(currentHostel)
    }

    if (hostel.OwnerId === JSON.parse(localStorage.getItem('user')).userId) {
      setHostel({
        ...hostel,
        OwnerName: JSON.parse(localStorage.getItem('user')).profile.name,
      })
    }
  }, [hostel])

  const handleHostelBooking = () => {
    if (hostel.totalRoomsCount > 0) {
      axios({
        method: 'POST',
        url: 'https://hostel-management-system-aman.herokuapp.com/hostel/booking',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token'),
        },
        data: {
          OwnerId: hostel.OwnerId,
          hostelId: hostel.hostelId,
          userId: JSON.parse(localStorage.getItem('user')).userId,
        },
      })
        .then((resp) => {
          setRoomCount(roomCount - 1)
          setModelStatus('modal-open')
          setModelMessage(
            "You've booked the hostel successfully, please wait for the owner's approval"
          )
        })
        .catch((err) => {
          setModelStatus('modal-open')
          setModelMessage(err.response.data.message)
        })
    } else {
      setModelStatus('modal-open')
      setModelMessage('No rooms available')
    }
  }

  return (
    <div>
      <Navbar />
      {Object.keys(hostel).length === 0 ? (
        <h1 className="p-5 text-3xl font-bold md:text-6xl">Loading...</h1>
      ) : (
        <section className="grid items-center p-5 md:h-[90vh]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <img
                src={hostel.image}
                alt={hostel.name}
                className="h-64 w-full md:h-96"
              />
              <section className="flex flex-col justify-between p-5 md:flex-row">
                <div className="flex space-x-5">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src="https://api.lorem.space/image/face?hash=92310"
                        className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {hostel.OwnerName || hostel.name}
                    </h2>
                    <p className="text-lg">{hostel.city}</p>
                  </div>
                </div>
                <div>Rooms Left: {roomCount}</div>
              </section>
            </div>
            <div className="grid justify-evenly gap-5">
              <section className="rounded-xl border px-5 py-2">
                <h2 className="text-2xl font-bold">About</h2>
                <p className="text-lg">{hostel.description}</p>
              </section>
              <section className="rounded-xl border px-5 py-2">
                <h2 className="text-2xl font-bold">Facilities</h2>
                <ul className="mt-5 grid grid-cols-2 gap-5 text-lg">
                  {hostel.facilities.wifi && (
                    <li>
                      <span className="font-bold">Wi-Fi</span>
                    </li>
                  )}
                  {hostel.facilities.ac && (
                    <li>
                      <span className="font-bold">Air Conditioning</span>
                    </li>
                  )}
                  {hostel.facilities.laundry && (
                    <li>
                      <span className="font-bold">Laundry</span>
                    </li>
                  )}
                  {hostel.facilities.kitchen && (
                    <li>
                      <span className="font-bold">Kitchen</span>
                    </li>
                  )}
                  {hostel.facilities.tv && (
                    <li>
                      <span className="font-bold">TV</span>
                    </li>
                  )}
                  {hostel.facilities.parking && (
                    <li>
                      <span className="font-bold">Parking</span>
                    </li>
                  )}
                  {hostel.facilities.washing_machine && (
                    <li>
                      <span className="font-bold">Washing Machine</span>
                    </li>
                  )}
                  {hostel.facilities.ironing_machine && (
                    <li>
                      <span className="font-bold">Ironing Machine</span>
                    </li>
                  )}
                  {hostel.facilities.gym && (
                    <li>
                      <span className="font-bold">GYM</span>
                    </li>
                  )}
                </ul>
              </section>
            </div>
            <PreviewRoleAction
              hostel={hostel}
              setHostel={setHostel}
              handleHostelBooking={handleHostelBooking}
              setRoomCount={setRoomCount}
              roomCount={roomCount}
              setModelMessage={setModelMessage}
              setModelStatus={setModelStatus}
              OwnerId={hostel.OwnerId}
            />
          </div>
        </section>
      )}

      <div className={`modal ${modelStatus}`}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Alert</h3>
          <p className="py-4">{modelMessage}</p>
          <div className="modal-action" onClick={() => setModelStatus('')}>
            <label for="my-modal" className="btn">
              Ok
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default previewPage
