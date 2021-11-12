import React, { useEffect, useRef, useState } from "react";

import Isotope from "isotope-layout";
import { debounce } from "debounce";

import Modal from "./Modal.jsx";

let iso;

const Portfolio = () => {
  const portfolioRef = useRef();
  const portfolioProjectsRef = useRef();
  const portfolioButtonsRef = useRef();
  const menuPortfolioSpanRef = useRef();
  const [indexOfProjectToShow, setIndexOfProjectToShow] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const portfolioH2Ref = useRef();

  const handleSetIndexOfProject = (index) => {
    setIndexOfProjectToShow(index);
  };

  useEffect(() => {
    let observer1 = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            observer.disconnect();
            portfolioH2Ref.current.classList.add("animationFromLeft");
          }
        });
      },
      { threshold: 0.1 }
    );

    let observer2 = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            portfolioProjectsRef.current.classList.add("visible");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer1.observe(portfolioRef.current);
    observer2.observe(portfolioRef.current);

    iso = new Isotope(portfolioProjectsRef.current, {
      itemSelector: ".portfolio__project",
      transitionDuration: "0.8s",
      masonry: {
        columnWidth: 390,
        fitWidth: true,
      },
    });
    moveSpanToActiveMenuElement();

    window.addEventListener(
      "resize",
      debounce(() => {
        moveSpanToActiveMenuElement();
        filterProjectsToShow();
      }),
      400
    );

    return window.removeEventListener(
      "resize",
      debounce(() => {
        moveSpanToActiveMenuElement();
        filterProjectsToShow();
      }),
      400
    );
  }, []);

  const handleIsModalOpen = () => {
    setIsModalOpen(false);
  };

  const filterProjectsToShow = (element) => {
    var filterValue;
    if (element) {
      filterValue = element.getAttribute("data-filter");
    } else {
      filterValue = "*";
    }
    iso.arrange({ filter: filterValue });
  };

  const moveSpanToActiveMenuElement = (element) => {
    let ELEMENT;
    if (!element) {
      ELEMENT = portfolioButtonsRef.current.children[1];
    } else {
      ELEMENT = element.parentNode;
    }
    changeFontColor(ELEMENT);
    menuPortfolioSpanRef.current.style.transform = `translate(${ELEMENT.offsetLeft}px, ${ELEMENT.offsetTop}px)`;
    menuPortfolioSpanRef.current.style.width = `${ELEMENT.clientWidth}px`;
  };

  const changeFontColor = (element) => {
    const elements = [...element.parentNode.children];
    for (const el of elements) {
      el.classList.remove("whitefont");
    }
    element.classList.add("whitefont");
  };

  return (
    <main className="portfolio" id="portfolio" ref={portfolioRef}>
      <h2 ref={portfolioH2Ref}>Portfolio</h2>
      <ul className="portfolio__buttons" ref={portfolioButtonsRef}>
        <span ref={menuPortfolioSpanRef} className="activeElement"></span>
        <li>
          <button
            data-filter="*"
            onClick={(event) => {
              filterProjectsToShow(event.target);
              moveSpanToActiveMenuElement(event.target);
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            data-filter=".react"
            onClick={(event) => {
              filterProjectsToShow(event.target);
              moveSpanToActiveMenuElement(event.target);
            }}
          >
            React
          </button>
        </li>
        <li>
          <button
            data-filter=".vanilla"
            onClick={(event) => {
              filterProjectsToShow(event.target);
              moveSpanToActiveMenuElement(event.target);
            }}
          >
            Vanilla JS
          </button>
        </li>
        <li>
          <button
            data-filter=".node"
            onClick={(event) => {
              filterProjectsToShow(event.target);
              moveSpanToActiveMenuElement(event.target);
            }}
          >
            Node
          </button>
        </li>
      </ul>
      <div className="portfolio__main">
        <div ref={portfolioProjectsRef} className="portfolio__projects">
          <div className="portfolio__project project project1 react node">
            <div className="project__container">
              <div className="project__image"></div>
              <div className="project__name">
                <h3>Aplikacja do chatowania</h3>
                <p>React/SCSS/Node</p>
              </div>
              <div className="project__button">
                <button
                  onClick={() => {
                    handleSetIndexOfProject(0);
                    setIsModalOpen(true);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="portfolio__project project project2 vanilla node">
            <div className="project__container">
              <div className="project__image"></div>
              <div className="project__name">
                <h3>System zarządzania pracownikami i rejestracji klientów</h3>
                <p>VanillaJS/CSS/Node</p>
              </div>
              <div className="project__button">
                <button
                  onClick={() => {
                    handleSetIndexOfProject(1);
                    setIsModalOpen(true);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="portfolio__project project project3 react">
            <div className="project__container">
              <div className="project__image"></div>
              <div className="project__name">
                <h3>ToDoList</h3>
                <p>React/CSS</p>
              </div>
              <div className="project__button">
                <button
                  onClick={() => {
                    handleSetIndexOfProject(2);
                    setIsModalOpen(true);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="portfolio__project project project4 react">
            <div className="project__container">
              <div className="project__image"></div>
              <div className="project__name">
                <h3>Gra Saper</h3>
                <p>React/SCSS</p>
              </div>
              <div className="project__button">
                <button
                  onClick={() => {
                    handleSetIndexOfProject(3);
                    setIsModalOpen(true);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="portfolio__project project project5 react node">
            <div className="project__container">
              <div className="project__image"></div>
              <div className="project__name">
                <h3>Portfolio project</h3>
                <p>React/SCSS/Node</p>
              </div>
              <div className="project__button">
                <button
                  onClick={() => {
                    handleSetIndexOfProject(4);
                    setIsModalOpen(true);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="portfolio__project project project6 vanilla">
            <div className="project__container">
              <div className="project__image"></div>
              <div className="project__name">
                <h3>Gra tenis</h3>
                <p>VanillaJS/CSS/Canvas</p>
              </div>
              <div className="project__button">
                <button
                  onClick={() => {
                    handleSetIndexOfProject(5);
                    setIsModalOpen(true);
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        handleOnClose={handleIsModalOpen}
        isOpen={isModalOpen}
        shouldBeCloseOnOutsideClick={true}
        indexOfProject={indexOfProjectToShow}
      ></Modal>
    </main>
  );
};

export default Portfolio;
