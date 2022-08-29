import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react'
import { useUserContext } from '../hooks/useUserContext';

/*
  Component that use the Auth0 login method to authenticate the users
*/

export const LoginButton = () => {
  const { loginWithRedirect, logout } = useAuth0()
  const user = useUserContext()

  return (
    <Button
      variant='contained'
      onClick={user ? logout : loginWithRedirect} color="secondary" sx={{
        bgcolor: '#a0bd44',
        borderRadius: '0',
        fontSize: '.7em'
      }}>
      {user ? "Log out" : "Log in"}
    </Button>
  )
}