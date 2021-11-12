import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__main">
        <nav className="footer__social">
          <ul>
            <li>
              <a href="https://www.facebook.com/krzysztof.sluzewski">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/krzysztof-sluzewski-868930225">
                Linkedin
              </a>
            </li>
            <li>
              <a href="https://github.com/Krzysztof77777">Github</a>
            </li>
            <li>
              <a href="https://codepen.io/Krzysztof77777">Codepen</a>
            </li>
          </ul>
        </nav>
        <div className="footer__version">
          <p>2021 version</p>
          <a>Back to top</a>
        </div>
      </div>
      <div className="footer__copy">
        <p>© 2021 Krzysztof Sluzewski</p>
      </div>
    </footer>
  );
};

export default Footer;
