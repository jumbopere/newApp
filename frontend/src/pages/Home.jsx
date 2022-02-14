import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Catergories from '../components/Catergories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
const Home = () => {
  return (
    <div>
        <Announcement/>
<Navbar/>
<Slider/>
<Catergories/>
<Products/>
<Newsletter/>
<Footer/>
    </div>
  )
}

export default Home