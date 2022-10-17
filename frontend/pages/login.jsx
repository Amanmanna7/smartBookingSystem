import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'

function Login() {
  const router = useRouter()

  const [user, setUser] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = (e) => {
    e.preventDefault()

    axios
      .post(
        // 'http://localhost:5000/auth/login',
        'https://hostel-management-system-aman.herokuapp.com/auth/login',
        user
      )
      .then((data) => {
        console.dir(data)
        if (data.status == 200) {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('user', JSON.stringify(data.data.userInfo))
          router.push('/dashboard')
        } else {
          alert(data.statusText)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.dir(err)
        alert(err.response.statusText)
        setIsLoading(false)
      })
  }
  return (
    <section className="gradient-form h-full bg-gray-200 md:h-screen">
      <div className="container h-full py-12 px-6">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
          <div className="xl:w-10/12">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
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
                    <form onSubmit={handleLogin}>
                      <p className="mb-4">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          type="email"
                          className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Email"
                          value={user.email}
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Password"
                          value={user.password}
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-12 pt-1 pb-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                          type="submit"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          style={{
                            background:
                              'linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)',
                          }}
                        >
                          Log in
                          {isLoading ? (
                            <i className="fas fa-spinner fa-spin ml-2"></i>
                          ) : null}
                        </button>
                        <a className="text-gray-500" href="#!">
                          Forgot password?
                        </a>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                          type="button"
                          className="inline-block rounded border-2 border-red-600 px-6 py-2 text-xs font-medium uppercase leading-tight text-red-600 transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          onClick={() => router.push('/register')}
                        >
                          Signup
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      'linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)',
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

export default Login
