
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
// import '../styles/public.css';

const DefaultLayout = (props) => (

    <div className="App">
        <div className="container">
            <Navbar />

            {props.children}

            <Footer />
        </div>

    </div>

);

export default DefaultLayout;