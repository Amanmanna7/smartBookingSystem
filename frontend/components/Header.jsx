import Link from 'next/link'

function Header() {
  return (
    <header>
      <div className="flex h-screen flex-col justify-center bg-gray-50 py-20 px-6 text-center text-gray-800">
        <h1 className="mt-0 mb-6 text-5xl font-bold">EasyStay</h1>
        <h3 className="mb-8 text-3xl font-bold">Book Your Stay</h3>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <a
              className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              role="button"
            >
              Login
            </a>
          </Link>
          <Link href="/register">
            <a
              className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              role="button"
            >
              Register
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
