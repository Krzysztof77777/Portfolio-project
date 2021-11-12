import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const projects = [
  {
    title: "Aplikacja do chatowania",
    description:
      "Aplikacja pozwalająca chatować z użytkowikami, projekt zawiera jeden globalny chat oraz każdy użytkownik może prywatnie rozmawiać z innymi uzytkownikami. Aplikacja pozwala zarządząć swoim własnym profilem, w tym zmieniać swoje dane oraz dodać swój własny avatar. Jest to pełnoprawna aplikacja , która posiada możliwość przypomnienia hasła, zmiana hasła, veryfikacje podczas rejestracji.",
    technology: ["scss", "react", "node", "webpack", "express", "mongoDB"],
    buttons: [
      { name: "Uruchom", link: "https://chattingpeople.herokuapp.com/" },
      {
        name: "Github",
        link: "https://github.com/Krzysztof77777/Application-for-Chatting-with-People",
      },
      {
        name: "Uruchom jako zalogowany",
        link: "https://chattingpeople.herokuapp.com/615a239b06eebf4694c6fd1b",
      },
    ],
  },
  {
    title: "System zarządzania pracownikami i rejestracji klientów",
    description:
      "Aplikacja umożliwia zarządzniem godzinami roboczymi pracowników, rejestrowanie klientów oraz zarządzanie nimi. Aplikacja dodatkowo posiada panel administratora, baze danych klientów na stronie oraz modyfikację pozwalającą przejrzeć pieć najbliższych wolnych terminów.",
    technology: ["html", "css", "javascript", "Node", "express", "mongoDB"],
    buttons: [
      {
        name: "Uruchom",
        link: "https://applicationrejestration.herokuapp.com/",
      },
      {
        name: "Github",
        link: "https://github.com/Krzysztof77777/Employee-managment-and-customers-registration-system",
      },
      {
        name: "Uruchom jako zalogowany",
        link: "https://applicationrejestration.herokuapp.com/615a239b06eebf4694c6fd1b",
      },
    ],
  },
  {
    title: "ToDoList",
    description:
      "Prosta aplikacja w stylu ToDoList, umożliwia dodawanie i usuwanie tasków oraz zarządzanie oznaczonych jako ukończone.",
    technology: ["css", "react"],
    buttons: [
      {
        name: "Github",
        link: "https://github.com/Krzysztof77777/Simple-ToDo-List-in-React",
      },
    ],
  },
  {
    title: "Gra saper",
    description:
      "Klasyczna jednoosobowa gra, polega na odkrywaniu na planszy poszczególnych pól w taki sposób, aby nie natrafić na minę.",
    technology: ["scss", "react", "webpack"],
    buttons: [
      { name: "Github", link: "https://github.com/Krzysztof77777/Minesweeper" },
    ],
  },
  {
    title: "Portfolio project",
    description:
      "Jest to dokładnie ten projekt , który widnieje na tej stronie.",
    technology: ["scss", "react", "webpack", "Node", "express"],
    buttons: [
      {
        name: "Github",
        link: "https://github.com/Krzysztof77777/Portfolio-project",
      },
    ],
  },
  {
    title: "Gra tenis",
    description:
      "Prosta gra stworzona w canvasie, polega na odbijaniu rakietką piłeczki. Gra zostanie zakończona jeśli piłeczka dotknie bocznej ścianki boiska.",
    technology: ["html", "css", "javascript", "canvas"],
    buttons: [
      {
        name: "Github",
        link: "https://github.com/Krzysztof77777/Tenis",
      },
    ],
  },
];

const Modal = ({
  handleOnClose,
  isOpen,
  shouldBeCloseOnOutsideClick,
  indexOfProject,
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    const { current: modal } = modalRef;

    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      showModal();
    } else if (previousActiveElement.current) {
      closeModal();
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  const showModal = () => {
    modalRef.current.classList.remove("none");
    modalRef.current.classList.add("block");
  };

  const closeModal = () => {
    modalRef.current.classList.remove("block");
    modalRef.current.classList.add("none");
  };

  useEffect(() => {
    const { current: modal } = modalRef;

    const handleCancel = (event) => {
      event.preventDefault();
      handleOnClose();
    };

    modal.addEventListener("cancel", handleCancel);

    return () => {
      modal.removeEventListener("cancel", handleCancel);
    };
  }, [handleOnClose]);

  const handleOutsideClick = ({ target }) => {
    const { current } = modalRef;

    if (shouldBeCloseOnOutsideClick && target === current) {
      handleOnClose();
    }
  };

  return ReactDOM.createPortal(
    <div ref={modalRef} onClick={handleOutsideClick} className="modal">
      {isOpen && indexOfProject >= 0 && indexOfProject <= projects.length - 1 && (
        <div className="modal__container">
          <article className="article">
            <div className="article__exit" onClick={handleOnClose}>
              <i className="far fa-times-circle"></i>
            </div>
            <h3 className="article__title">{projects[indexOfProject].title}</h3>
            <p className="article__description">
              {projects[indexOfProject].description}
            </p>
            <p className="article__technologiesName">Technologie</p>
            <p className="article__technologiesContainer">
              {projects[indexOfProject].technology.map((e, index) => {
                return <span key={index}>{e}</span>;
              })}
            </p>
            <div className="article__buttons">
              {projects[indexOfProject].buttons.map((e, index) => {
                return (
                  <a key={index} href={e.link}>
                    {e.name}
                  </a>
                );
              })}
            </div>
          </article>
        </div>
      )}
    </div>,
    document.body
  );
};

export default Modal;
