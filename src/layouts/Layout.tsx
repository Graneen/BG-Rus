import { Outlet } from 'react-router-dom';
import Header from '../header/Header.tsx'
import { FooterF } from '../footer/FooterF.tsx';



function Layout() {
    return ( 
    <>
      <Header/>
      <Outlet/>
      <FooterF/>
    </> 
    );
}

export default Layout;