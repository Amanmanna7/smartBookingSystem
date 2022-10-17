import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProfileSetting from '../components/ProfileSetting'

function profile() {
  const [profile, setProfile] = useState('')
  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem('user')).profile
    setProfile(userProfile)
  }, [])
  return (
    <>
      <Navbar />

      <main className="container mx-auto mt-5 bg-slate-300 p-4">
        <ProfileSetting profile={profile} setProfile={setProfile} />
      </main>
    </>
  )
}

export default profile
