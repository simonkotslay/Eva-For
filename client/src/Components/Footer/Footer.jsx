import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from '../../images/evangadi-logo.png';
import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={classes.footer_container}>
      <div className={classes.footer_content}>
        <div className={classes.footer_section}>
          <h3 className={classes.footer_heading}><img src={logo} alt="Enangadi Logo" /></h3>
          <div className={classes.social_icons}>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className={classes.footer_section}>
          <h3 className={classes.footer_heading}>Useful link</h3>
          <ul className={classes.footer_links}>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a href="#">Terms of service</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>

        <div className={classes.footer_section}>
          <h3 className={classes.footer_heading}>Contact Info</h3>
          <ul className={classes.footer_contact}>
            <li>Evangadi Network</li>
            <li>Support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
      </div>

      <div className={classes.footer_bottom}>
        <p>
          &copy; {new Date().getFullYear()} Evangadi Forum. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
