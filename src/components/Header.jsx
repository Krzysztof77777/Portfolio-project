import React, { useEffect, useRef } from "react";
import { throttle } from "throttle-debounce";

let scrollY = 0;

const Header = () => {
  const navigationRef = useRef();
  const navigationElementsRef = useRef();
  const navigationMenuButton = useRef();
  const navigationExitButton = useRef();
  const headerMainRef = useRef();

  const menuHamburgerButtonSpan1 = useRef();
  const menuHamburgerButtonSpan2 = useRef();
  const menuHamburgerButtonSpan3 = useRef();

  const menuHamburgerExitButtonSpan1 = useRef();
  const menuHamburgerExitButtonSpan2 = useRef();

  useEffect(() => {
    navigationRef.current.classList.add("fixedMenu");
    headerMainRef.current.classList.add("header__main--animation");
    window.addEventListener("scroll", (e) => checkFixedMenu(e));
    return window.removeEventListener("scroll", (e) => checkFixedMenu(e));
  }, []);

  const checkFixedMenu = throttle(300, false, (e) => {
    if (window.scrollY > scrollY) {
      if (navigationRef.current.classList.contains("fixedMenu")) {
        if (!navigationExitButton.current.classList.contains("hide")) return;
        navigationRef.current.classList.remove("fixedMenu");
      }
    } else {
      if (!navigationRef.current.classList.contains("fixedMenu")) {
        navigationRef.current.classList.add("fixedMenu");
      }
    }
    scrollY = window.scrollY;
  });

  const showMenu = () => {
    navigationElementsRef.current.classList.add("showed");
    navigationMenuButton.current.classList.add("hide");
    navigationExitButton.current.classList.remove("hide");
    menuHamburgerExitButtonSpan1.current.className =
      "showExitMenuButtonAnimationSpan1";
    menuHamburgerExitButtonSpan2.current.className =
      "showExitMenuButtonAnimationSpan2";
    menuHamburgerButtonSpan1.current.className = "";
    menuHamburgerButtonSpan2.current.className = "";
    menuHamburgerButtonSpan3.current.className = "";
  };

  const hideMenu = () => {
    navigationElementsRef.current.classList.remove("showed");
    navigationMenuButton.current.classList.remove("hide");
    navigationExitButton.current.classList.add("hide");
    menuHamburgerExitButtonSpan1.current.className = "";
    menuHamburgerExitButtonSpan2.current.className = "";
    menuHamburgerButtonSpan1.current.className =
      "showMenuHamburgerButtonTransition";
    menuHamburgerButtonSpan2.current.className =
      "showMenuHamburgerButtonAnimation";
    menuHamburgerButtonSpan3.current.className =
      "showMenuHamburgerButtonTransition";
  };

  return (
    <header className="header" id="header">
      <div className="header__container">
        <nav ref={navigationRef} className="header__navigation navigation">
          <div className="navigation__container">
            <button
              ref={navigationMenuButton}
              onClick={showMenu}
              className="navigation__menuButton"
            >
              <span
                ref={menuHamburgerButtonSpan1}
                className="showMenuHamburgerButtonTransition"
              ></span>
              <span
                ref={menuHamburgerButtonSpan2}
                className="showMenuHamburgerButtonAnimation"
              ></span>
              <span
                ref={menuHamburgerButtonSpan3}
                className="showMenuHamburgerButtonTransition"
              ></span>
            </button>
            <button
              ref={navigationExitButton}
              onClick={hideMenu}
              className="navigation__exitButton hide"
            >
              <span ref={menuHamburgerExitButtonSpan1}></span>
              <span ref={menuHamburgerExitButtonSpan2}></span>
            </button>
            <div className="navigation__logo">
              <img src={require("../../public/assets/hexagon.svg")}></img>
              <span>K</span>
            </div>
            <ul ref={navigationElementsRef} className="navigation__elements">
              <li className="navigation__element">
                <a href="#header" onClick={hideMenu}>
                  Strona główna
                </a>
              </li>
              <li className="navigation__element">
                <a href="#portfolio" onClick={hideMenu}>
                  Portfolio
                </a>
              </li>
              <li className="navigation__element">
                <a href="#contact" onClick={hideMenu}>
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="navigationcontact">
          <li className="navigationcontact__element">
            <a
              className="fab fa-facebook-f"
              href="https://www.facebook.com/krzysztof.sluzewski"
            ></a>
          </li>
          <li className="navigationcontact__element">
            <a
              className="fab fa-github"
              href="https://github.com/Krzysztof77777"
            ></a>
          </li>
          <li className="navigationcontact__element">
            <a
              className="fab fa-linkedin-in"
              href="https://www.linkedin.com/in/krzysztof-sluzewski-868930225"
            ></a>
          </li>
          <li className="navigationcontact__element">
            <a
              className="fab fa-codepen"
              href="https://codepen.io/Krzysztof77777"
            ></a>
          </li>
        </ul>
        <div ref={headerMainRef} className="header__main">
          <p>ABOUT ME AS A FUTURE PROFESSIONAL</p>
          <h1>
            Krzysztof<br></br>
            <span>Front End Developer</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
