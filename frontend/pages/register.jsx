import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

function checkAddhar(aadhar) {
  const regex = new RegExp('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$')
  const regexWithoutSpace = new RegExp('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')
  return regex.test(aadhar) || regexWithoutSpace.test(aadhar)
}

function RegistrationForm({ handleRegistration, setUser, user, isLoading }) {
  const router = useRouter()
  return (
    <form onSubmit={handleRegistration}>
      <p className="mb-4">Please register your account</p>
      <div className="mb-4 grid gap-4">
        <input
          type="text"
          className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input
          type="number"
          className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          placeholder="Phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
        <input
          type="text"
          className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          placeholder="College Id"
          value={user.collage}
          onChange={(e) => setUser({ ...user, collage: e.target.value })}
        />
        <div className="inline-flex items-center gap-3">
          <label>Gender : </label>
          <div className="inline-flex items-center gap-3">
            <input
              type="radio"
              name="gender"
              value="male"
              onClick={() => setUser({ ...user, gender: 'male' })}
            />{' '}
            Male
            <input
              type="radio"
              name="gender"
              value="female"
              onClick={() => setUser({ ...user, gender: 'female' })}
            />{' '}
            Female
          </div>
        </div>
        <input
          type="date"
          className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          placeholder="DOB"
          value={user.dob}
          onChange={(e) => setUser({ ...user, dob: e.target.value })}
        />
        <input
          type="text"
          className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
          placeholder="Aadhar"
          value={user.aadhar}
          onChange={(e) => setUser({ ...user, aadhar: e.target.value })}
        />
        {user.aadhar.length > 10 &&
          (checkAddhar(user.aadhar) ? 'Valid Aadhar' : 'Invalid Aadhar')}

        <select
          className='className="form-control focus:outline-none" m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700'
          placeholder="Role"
          defaultValue={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="owner">Owner</option>
          <option value="user">User</option>
        </select>
      </div>
      <div className="mb-12 pt-1 pb-1 text-center">
        <button
          className="mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
          type="submit"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          style={{
            background:
              'linear-gradient(to left,#ee7724,#d8363a,#dd3675,#b44593)',
          }}
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            'Register now'
          )}
        </button>
      </div>
      <div className="flex items-center justify-between pb-6">
        <p className="mb-0 mr-2">Already have an account?</p>
        <button
          type="button"
          className="inline-block rounded border-2 border-indigo-600 px-6 py-2 text-xs font-medium uppercase leading-tight text-indigo-600 transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      </div>
    </form>
  )
}

function Register() {
  const router = useRouter()

  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    gender: '',
    dob: '',
    collage: '',
    aadhar: '',
    role: 'owner',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleRegistration = (e) => {
    e.preventDefault()
    console.log(user)
    const formData = new FormData()
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('name', user.name)
    formData.append('phone', user.phone)
    formData.append('gender', user.gender)
    formData.append('dob', user.dob)
    formData.append('collage', user.collage)
    formData.append('aadhar', user.aadhar)
    formData.append('role', user.role)
    console.log(formData)

    axios
      .post(
        'https://hostel-management-system-aman.herokuapp.com/auth/register',
        formData
      )
      .then((data) => {
        if (data.status == 200) {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('user', JSON.stringify(data.data.userObj))
          router.push('/dashboard')
        } else {
          alert(data.statusText)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        // console.log(err)
        alert(err.message)
        setIsLoading(false)
      })
  }

  return (
    <section
      className="gradient-form h-full md:h-auto"
      style={{
        backgroundImage: 'url(hostel.bad931c0.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container h-full p-5 md:py-12 md:px-6">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="xl:w-10/12">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 flex-row-reverse lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-12 pb-1 text-xl font-semibold">
                        We are The EasyStay Team
                      </h4>
                    </div>
                    <RegistrationForm
                      handleRegistration={handleRegistration}
                      setUser={setUser}
                      user={user}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      'linear-gradient(to left,#ee7724,#d8363a,#dd3675,#b44593)',
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
