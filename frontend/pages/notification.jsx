import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const RequestCard = ({ room, name, hostelId, setNotifications }) => {
  const [roomNumber, setRoomNumber] = useState('')

  const reloadHostels = () => {
    axios({
      method: 'POST',
      url: 'https://hostel-management-system-aman.herokuapp.com/hostel/owner',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      data: {
        OwnerId: JSON.parse(localStorage.getItem('user'))._id,
      },
    }).then((resp) => {
      if (Object.keys(resp.data).includes('message')) {
        alert(resp.data.message)
      } else {
        setNotifications(resp.data)
      }
    })
  }
  const handleAcceptDeal = () => {
    axios({
      method: 'PUT',
      url: 'https://hostel-management-system-aman.herokuapp.com/hostel/booking/',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      data: {
        hostelId: hostelId,
        userId: room.userId,
        roomNumber: roomNumber,
      },
    })
      .then((resp) => {
        alert('Deal Accepted')
        setRoomNumber('')
        reloadHostels()
      })
      .catch((err) => {
        alert(err.response.data)
        setRoomNumber('')
        reloadHostels()
      })
  }
  const handleRejectDeal = () => {
    axios({
      method: 'DELETE',
      url: 'https://hostel-management-system-aman.herokuapp.com/hostel/booking/',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
      data: {
        hostelId: hostelId,
        userId: room.userId,
      },
    })
      .then((resp) => {
        alert('Deal Rejected')
      })
      .catch((err) => {
        alert(err.response.data)
      })
  }
  return (
    <>
      <div className="card font-bold">
        <div className="card-body text-center">
          <p className="card-text text-center text-xl">{name}</p>
          <p className="card-text text-center">{room.status}</p>
          <p className="card-text text-center">{room.userId}</p>
          {room.status !== 'Accepted' && (
            <label for="my-modal" className="modal-button btn">
              Action
            </label>
          )}
        </div>
      </div>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Got Hostel Room Offer?</h3>
          <p className="py-4">You have a room offer from {name}</p>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
          <div className="modal-action">
            <label for="my-modal" className="btn" onClick={handleAcceptDeal}>
              Accept
            </label>
            <label
              for="my-modal"
              className="btn btn-error"
              onClick={handleRejectDeal}
            >
              Reject
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

function notification() {
  const [notifications, setNotifications] = useState([])
  const [usernames, setUsernames] = useState([])

  const getUsernames = () => {
    axios({
      method: 'GET',
      url: 'https://hostel-management-system-aman.herokuapp.com/auth/allUsernames',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    }).then((resp) => {
      setUsernames(resp.data)
    })
  }

  const getNotifications = () => {
    axios({
      method: 'POST',
      url: 'https://hostel-management-system-aman.herokuapp.com/hostel/owner',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      data: {
        OwnerId: JSON.parse(localStorage.getItem('user'))._id,
      },
    }).then((resp) => {
      if (Object.keys(resp.data).includes('message')) {
        alert(resp.data.message)
      } else {
        setNotifications(resp.data)
      }
    })
  }

  const getName = (userId) => {
    const info = usernames.filter((user) => user.userId == userId)
    return info[0].name
  }

  useEffect(() => {
    getUsernames()
    getNotifications()
  }, [notifications.length, usernames.length])

  console.log(usernames)
  console.log(notifications)

  return (
    <div>
      <Navbar />
      <h1 className="p-5 text-3xl font-bold md:text-6xl">notification</h1>
      <main>
        {notifications.length > 0 ? (
          <div className="container mx-auto flex flex-col gap-4 bg-green-500 p-5">
            {usernames.length > 0 &&
              notifications.map((msg, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="text-2xl font-bold">{msg.name}</div>
                      <div key={index} className="flex justify-between gap-4">
                        {msg.bookedRooms.length > 0 &&
                          msg.bookedRooms.map((room) => (
                            <div
                              className={
                                room.status === 'Accepted'
                                  ? 'hover:pointer border-2 p-5 hover:cursor-pointer hover:bg-slate-200 hover:text-black'
                                  : 'hover:pointer border-2 p-5 hover:cursor-pointer hover:bg-red-500 hover:text-black'
                              }
                            >
                              <RequestCard
                                name={getName(room.userId)}
                                room={room}
                                hostelId={msg.hostelId}
                                setNotifications={setNotifications}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No Hostels Found</p>
        )}
      </main>
    </div>
  )
}

export default notification
