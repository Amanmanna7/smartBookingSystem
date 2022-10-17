import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const DropDownRight = () => {
  return (
    <div className="flex justify-center">
      <div>
        <div className="dropstart relative">
          <i
            className="fas fa-bell fa-2x"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <ul
            className="
          dropdown-menu
          absolute
          z-50
          float-left
          m-0
          mt-1
          hidden
          min-w-max
          list-none
          rounded-lg
          border-none
          bg-white
          bg-clip-padding
          py-2
          text-left
          text-base
          shadow-lg
        "
            aria-labelledby="dropdownMenuButton1s"
          >
            <li>
              <a className="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-gray-700 hover:bg-gray-100">
                Test Notification
              </a>
            </li>
            <li>
              <a className="dropdown-item block w-full whitespace-nowrap bg-red-400 py-2 px-4 text-sm font-normal text-gray-700 hover:bg-gray-100">
                Got an offer
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function Navbar() {
  const router = useRouter()
  const [profile, setProfile] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      router.push('/')
    } else {
      setProfile(JSON.parse(localStorage.getItem('user')))
    }
  }, [])
  return (
    <nav className="navbar-expand-lg navbar relative flex w-full items-center justify-between bg-white py-2 shadow-md">
      <div className="flex w-full flex-wrap items-center justify-between px-6">
        <div className="flex items-center">
          <button
            className="navbar-toggler mr-2 border-0 bg-transparent py-3 text-xl leading-none text-gray-600 transition-shadow duration-150 ease-in-out hover:text-gray-700 focus:text-gray-700 lg:hidden"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContentY"
            aria-controls="navbarSupportedContentY"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              className="w-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="collapse navbar-collapse grow items-center"
          id="navbarSupportedContentY"
        >
          <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
            <li className="nav-item">
              <Link href="/dashboard">
                <a
                  className="nav-link block py-2 pr-2 text-gray-600 transition duration-150 ease-in-out hover:text-gray-700 focus:text-gray-700 lg:px-2"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Home
                </a>
              </Link>
            </li>
            {profile.role === 'owner' && (
              <li className="nav-item">
                <Link href="/add_hostel">
                  <a
                    className="nav-link block py-2 pr-2 text-gray-600 transition duration-150 ease-in-out hover:text-gray-700 focus:text-gray-700 lg:px-2"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Add Hostel
                  </a>
                </Link>
              </li>
            )}

            <li className="nav-item mb-2 lg:mb-0">
              <Link href="/search">
                <a
                  className="nav-link block py-2 pr-2 text-gray-600 transition duration-150 ease-in-out hover:text-gray-700 focus:text-gray-700 lg:px-2"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Search Hostel
                </a>
              </Link>
            </li>
          </ul>
          <ul className="flex items-center gap-4">
            <li className="nav-item">
              <DropDownRight />
              <Link href="/notification">notify</Link>
            </li>
            <li className="nav-item">
              <Link href="/profile">
                <a
                  className="nav-link block py-2 pr-2 text-gray-600 transition duration-150 ease-in-out hover:text-gray-700 focus:text-gray-700 lg:px-2"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <img
                    src={profile.image || 'https://placeimg.com/100/100/people'}
                    alt="profile"
                    className="ml-2 h-8 w-8 rounded-full"
                  />
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <span
                className="nav-link block py-2 pr-2 text-gray-600 transition duration-150 ease-in-out hover:text-gray-700 focus:text-gray-700 lg:px-2"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={() => {
                  localStorage.clear()
                  router.push('/')
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

const Navbar_new = () => {
  const router = useRouter()
  const [profile, setProfile] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      router.push('/')
    } else {
      setProfile(JSON.parse(localStorage.getItem('user')))
    }
  }, [])
  return (
    <div className="navbar border bg-base-100 bg-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {profile.role === 'owner' && (
              <li>
                <Link href="/add_hostel">
                  <a data-mdb-ripple="true" data-mdb-ripple-color="light">
                    Add Hostel
                  </a>
                </Link>
              </li>
            )}

            <li>
              <Link href="/search">
                <a>Search</a>
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/dashboard">
          <a className="btn btn-ghost text-xl normal-case">EasyStay</a>
        </Link>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal hidden p-0 lg:flex">
          {profile.role === 'owner' && (
            <li title="Add Hostel">
              <Link href="/add_hostel">
                <a data-mdb-ripple="true" data-mdb-ripple-color="light">
                  <i className="fa fa-plus"></i>
                </a>
              </Link>
            </li>
          )}

          <li title="Search Hostel">
            <Link href="/search">
              <a>
                <i className="fa fa-search"></i>
              </a>
            </Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end" title="Profile">
          <label tabIndex="0" className="btn avatar btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {/* <li>
              <Link href="/profile">
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </Link>
            </li> */}
            <li>
              <Link href="/notification">
                <a>Notification</a>
              </Link>
            </li>
            <li className="mt-2 text-white">
              <button
                className="btn"
                onClick={() => {
                  localStorage.clear()
                  router.push('/')
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar_new
