import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useFetch } from '../hooks/useFetch'

const FETCH_OPTIONS = (user) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: user
  })
})

const URL = 'http://localhost:3000/api/users'

export const userContext = createContext()

export const UserProvider = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth0()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      if (!isLoading) {
        setUserInfo({
          nickname: user.nickname,
          name: user.given_name ?? user.nickname,
          email: user.email,
          picture: user.picture ?? '/user-placeholder.png',
          id: user.sub
        })
      }
    }
  }, [isLoading, user])

  useEffect(() => {
    if(!userInfo) return
    useFetch(URL, FETCH_OPTIONS(userInfo)).then(res => console.log({ userActiveSession: res.data.nickname ?? 'Unknown' }))
  }, [userInfo])


  return (
    <userContext.Provider value={userInfo}>
      {children}
    </userContext.Provider>
  )
}



