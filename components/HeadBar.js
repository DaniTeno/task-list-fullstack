import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LoginButton } from './LoginButton';
import { useEffect, useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';

/*
  Component that shows the app title, contains the login/logout button, 
  and takes {user.nickname} from "/context/UserProvider.js" to show it 
  (if there is no user logged in shows "stranger" as {user.nickname})
 */

export const HeadBar = () => {
  const [userInfo, setUserInfo] = useState(null)
  const user = useUserContext()

  useEffect(() => {
    setUserInfo(user)
  }, [user])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex' }}>
          <Typography variant="h5" component="p" sx={{ px: ".2em", fontSize: '14px', flexGrow: 1 }}>
            Hi, {userInfo ? userInfo.nickname : 'stranger'}
          </Typography>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, maxWidth: '700px' }}>
            Rapid Task
          </Typography>
          <LoginButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
