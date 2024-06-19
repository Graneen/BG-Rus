import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return ( 
        <>
        <footer>
          <div className="footer_content container">
            <div className="footer_description">
            <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "logo active" : "logo unactive"}
                    >
                        BGRUS
                    </NavLink>
              <div className="footer_text">Играй, побеждай, наслаждайся!</div>
              <div className="copyright">2024, BGRus</div>
            </div>
            <div className="footer_links">
              <div className="footer_blog-links">
                <a href="#" className="footer_link">About MNTN</a>
                <a href="#" className="footer_link">Contributors & Writers</a>
                <a href="#" className="footer_link">Write For Us</a>
                <a href="#" className="footer_link">Contact Us</a>
                <a href="#" className="footer_link">Privacy Policy</a>
              </div>
              <div className="footer_mntn-links">
                <a href="#" className="footer_link">The Team</a>
                <a href="#" className="footer_link">Jobs</a>
                <a href="#" className="footer_link">Press</a>
              </div>
            </div>
          </div>
        </footer>
        </>
     );
}

export default Footer;