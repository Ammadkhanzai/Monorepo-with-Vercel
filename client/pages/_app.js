import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
// import LayoutWrapper from "../layouts/layout-wrapper"
import DefaultLayout from '../layouts/public'
import Router from 'next/router'
import ProgressBar from "@badrap/bar-of-progress"

const progress = new ProgressBar({
  size: 4,
  color: "#FF0000",
  className: "bar-of-progress",
  delay: 5,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on("routeChangeComplete", progress.finish)
Router.events.on("routeChangeError", progress.finish)

function MyApp({ Component, pageProps }) {
  
  return (
    <DefaultLayout {...pageProps}>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}

export default MyApp