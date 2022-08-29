import '../styles/globals.css'
import { Auth0Provider } from "@auth0/auth0-react"

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider domain={'dev-jorjyazo.us.auth0.com'} clientId={'E33ZzU6ow6qjqnGzY75kErnBfg8YSNC0'} redirectUri={'http://localhost:3000'}>
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
