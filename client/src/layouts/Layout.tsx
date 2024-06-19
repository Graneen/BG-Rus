import { Outlet } from 'react-router-dom';
import Header from '../header/Header.tsx'
import Footer from '../footer/Footer.tsx';


function Layout() {
    return ( 
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </> 
    );
}

export default Layout;