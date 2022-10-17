import axios from 'axios'
import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'

const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const CardInputField = ({ title, type, id, placeholder, field, setField }) => {
  return (
    <div className="my-2">
      <label htmlFor={`id`} className="block text-gray-600">
        {title}
      </label>
      <input
        className="inline-block w-full rounded-md border border-gray-500 py-2 px-3 tracking-widest text-gray-600 outline-blue-500"
        type={type}
        name={title}
        id={id}
        placeholder={placeholder}
        value={field}
        onChange={(e) => setField(e.target.value)}
      />
    </div>
  )
}

const CardPriceField = ({ title, type, id, placeholder, field, setField }) => {
  return (
    <div className="my-2">
      <label htmlFor={id} className="block text-gray-600">
        {title}
      </label>
      <div className="flex w-full items-center rounded-md border border-gray-500 py-2 px-3 tracking-widest text-gray-600 outline-blue-500">
        <i className="fas fa-rupee-sign text-gray-600"></i>
        <input
          className="ml-3 w-full outline-none"
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
          value={field}
          onChange={(e) => setField(e.target.value)}
        />
      </div>
    </div>
  )
}

const Image_uploader = ({ image, setImage, setBaseImage }) => {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg bg-gray-50">
        <div className="m-4">
          <label className="mb-2 inline-block text-gray-500">
            Select Image
          </label>
          <div className="flex w-full items-center justify-center">
            <label className="flex h-32 w-32 flex-col border-4 border-dashed hover:border-gray-300 hover:bg-gray-100">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="uploaded"
                  className="h-full w-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
              )}
              <input
                type="file"
                className="opacity-0"
                onChange={(e) => {
                  imageToBase64(e.target.files[0]).then((data) => {
                    setBaseImage(data)
                    setImage(e.target.files[0])
                  })
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

function add_hostel() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [rooms, setRooms] = useState({
    withWashroom: 0,
    withoutWashroom: 0,
  })

  const [gender, setGender] = useState(0)
  const [image, setImage] = useState(null)
  const [baseimage, setBaseImage] = useState(null)
  const [location, setLocation] = useState({
    city: '',
    state: '',
    lat: 0,
    long: 0,
  })
  const [rating, setRating] = useState(0)
  const [roomCount, setRoomCount] = useState(50)
  const [fecilities, setFecilities] = useState({
    wifi: false,
    kitchen: false,
    ac: false,
    laundry: false,
    tv: false,
    parking: false,
    washing_machine: false,
    ironing_machine: false,
    gym: false,
  })

  const [modelStatus, setModelStatus] = useState(false)
  const [modelMessage, setModelMessage] = useState('')
  const handleHostelRegistration = (e) => {
    e.preventDefault()

    axios({
      method: 'post',
      url: 'https://hostel-management-system-aman.herokuapp.com/hostel',
      data: {
        name,
        description,
        address,
        totalRooms: {
          withWashroom: rooms.withWashroom,
          withoutWashroom: rooms.withoutWashroom,
        },
        genderAllowed: gender,
        fecilities,
        city: location.city,
        state: location.state,
        location: {
          longitude: location.long,
          latitude: location.lat,
        },
        price,
        image: baseimage,
        rating,
        totalRoomsCount: roomCount,
      },
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setModelMessage('Hostel added successfully')
          setModelStatus('modal-open')
        } else {
          setModelMessage('Hostel not added')
          setModelStatus('modal-open')
        }

        setName('')
        setAddress('')
        setDescription('')
        setPrice(0)
        setRooms({
          withWashroom: 0,
          withoutWashroom: 0,
        })
        setGender(0)
        setWifi(0)
        setKitchen(0)
        setImage(null)
        setBaseImage(null)
        setLocation({
          city: '',
          state: '',
          lat: 0,
          long: 0,
        })

        setRating(0)
        setRoomCount(50)
      })
      .catch((err) => {
        console.log(err)
        setModelMessage('Image too Big, Can not Add Hostel')
        setModelStatus('modal-open')
      })
  }

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <form onSubmit={handleHostelRegistration}>
        <section className="mx-auto grid gap-y-5 p-2 md:grid-cols-2 md:gap-5 md:p-5 lg:w-2/3">
          <section className="gap-2 rounded bg-white p-2 shadow">
            {useMemo(() => {
              return (
                <Image_uploader
                  image={image}
                  setImage={setImage}
                  setBaseImage={setBaseImage}
                />
              )
            }, [image, setImage, setBaseImage])}

            <header className="flex items-center gap-3 border-b py-2">
              <i className="fa fa-plus rounded-full bg-green-300 p-3 text-green-600"></i>
              <h1 className="text-2xl font-bold text-gray-600">
                Add New Hostel
              </h1>
            </header>
            <CardInputField
              title="Name"
              type="text"
              id="name"
              placeholder="Name"
              field={name}
              setField={setName}
            />
            <CardInputField
              title="Address"
              type="text"
              id="address"
              placeholder="Address"
              field={address}
              setField={setAddress}
            />

            <div className="flex justify-between gap-4">
              <div className="my-2">
                <label htmlFor={`id`} className="block text-gray-600">
                  city
                </label>
                <input
                  className="inline-block w-full rounded-md border border-gray-500 py-2 px-3 tracking-widest text-gray-600 outline-blue-500"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City Name.."
                  value={location.city}
                  onChange={(e) =>
                    setLocation({ ...location, city: e.target.value })
                  }
                />
              </div>

              <div className="my-2">
                <label htmlFor={`id`} className="block text-gray-600">
                  state
                </label>
                <input
                  className="inline-block w-full rounded-md border border-gray-500 py-2 px-3 tracking-widest text-gray-600 outline-blue-500"
                  type="text"
                  name="state"
                  id="state"
                  placeholder="state Name.."
                  value={location.state}
                  onChange={(e) =>
                    setLocation({ ...location, state: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                cols="10"
                rows="3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="inline-block w-full rounded-md border border-gray-500 py-2 px-3 tracking-widest text-gray-600 outline-blue-500"
              ></textarea>
            </div>
            <CardPriceField
              title="Price"
              type="number"
              id="price"
              placeholder="0.00"
              field={price}
              setField={setPrice}
            />

            <div className="flex justify-between">
              <CardInputField
                title="Rating"
                type="number"
                id="rating"
                placeholder="0"
                field={rating}
                setField={setRating}
              />
              <CardInputField
                title="roomCount"
                type="number"
                id="roomCount"
                placeholder="50"
                field={roomCount}
                setField={setRoomCount}
              />
            </div>
          </section>

          <section className="grid w-full gap-2 rounded bg-white p-5 shadow">
            <header className="flex items-center gap-3 border-b py-2">
              <i className="fa fa-home rounded-full bg-blue-300 p-3 text-blue-600"></i>
              <h1 className="text-2xl font-bold text-gray-600">
                Other Fecilities
              </h1>
            </header>

            <div className="flex flex-col gap-2">
              <label className="block text-gray-600">Longitude</label>
              <input
                type="text"
                id="longitude"
                placeholder="Longitude"
                value={location.long}
                onChange={(e) =>
                  setLocation({ ...location, long: e.target.value })
                }
                className="inline-block w-full rounded-md border border-gray-500 py-2 px-3 tracking-widest text-gray-600 outline-blue-500"
              />

              <label className="block text-gray-600">Latitude</label>
              <input
                type="text"
                id="latitude"
                placeholder="Latitude"
                value={location.lat}
                onChange={(e) =>
                  setLocation({ ...location, lat: e.target.value })
                }
                className="inline-block w-full rounded-md border border-gray-500 py-2 px-3 tracking-widest text-gray-600 outline-blue-500"
              />
            </div>

            <div>
              <label className="mb-3 block font-bold text-gray-600">
                Number of Rooms
              </label>
              <div className="grid justify-between gap-2 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="withWashroom"
                    className="mb-3 block text-gray-600"
                  >
                    With Washroom
                  </label>
                  <input
                    className="inline-block w-full rounded-md border border-gray-500 py-2 px-3 tracking-widest text-gray-600 outline-blue-500"
                    type="number"
                    id="withWashroom"
                    placeholder="withWashroom"
                    value={rooms.withWashroom}
                    onChange={(e) =>
                      setRooms({ ...rooms, withWashroom: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="withoutWashroom"
                    className="mb-3 block text-gray-600"
                  >
                    Without Washroom
                  </label>
                  <input
                    className="inline-block w-full rounded-md border border-gray-500 py-2 px-3 tracking-widest text-gray-600 outline-blue-500"
                    type="number"
                    id="withoutWashroom"
                    placeholder="withoutWashroom"
                    value={rooms.withoutWashroom}
                    onChange={(e) =>
                      setRooms({ ...rooms, withoutWashroom: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <section className="justify-left flex flex-wrap">
              <div className="h-fit border p-2">
                <label className="mb-3 block font-bold text-gray-600">
                  Gender
                </label>
                <div className="flex gap-3">
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onClick={() => setGender(1)}
                    />
                    male
                  </span>
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onClick={() => setGender(2)}
                    />
                    female
                  </span>
                </div>
              </div>

              {/* Fecilities */}
              <div className="grid w-full grid-cols-2 justify-between">
                {Object.keys(fecilities).map((fecilitieName) => {
                  return (
                    <div className="flex items-center justify-between border-2 p-2">
                      <label className="font-bold">
                        {fecilitieName.toUpperCase()}
                      </label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onClick={() => {
                          setFecilities({
                            ...fecilities,
                            [fecilitieName]: !fecilities[fecilitieName],
                          })
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </section>

            <button className="btn btn-primary" type="submit">
              Add Hostel
            </button>
          </section>
        </section>
      </form>

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

export default add_hostel
