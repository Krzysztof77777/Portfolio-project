import React, { useEffect, useState, useRef } from "react";

import Joi from "joi";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isCorrectName, setIsCorrectName] = useState(false);
  const [isCorrectEmail, setIsCorrectEmail] = useState(false);
  const [isCorrectMessage, setIsCorrectMessage] = useState(false);
  const [formInfo, setFormInfo] = useState(false);
  const [formIsSend, setFormIsSend] = useState(false);

  const contactRef = useRef();
  const contactH2Ref = useRef();
  const contactPRef = useRef();
  const contactFORMRef = useRef();
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputMessageRef = useRef();

  const schema = Joi.object({
    email: Joi.string()
      .min(4)
      .required()
      .email({ tlds: { allow: false } }),
  });

  useEffect(() => {
    let observer1 = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            observer.disconnect();
            contactH2Ref.current.classList.add("animationFromLeft");
            contactPRef.current.style.transform = "translateX(0%)";
          }
        });
      },
      { threshold: 0.4 }
    );
    let observer2 = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            observer.disconnect();
            contactFORMRef.current.classList.add("animationFromRight");
          }
        });
      },
      { threshold: 0.55 }
    );
    observer1.observe(contactRef.current);
    observer2.observe(contactRef.current);
  }, []);

  const checkCorrectInput = (element, type) => {
    switch (type) {
      case "name":
        setName(element.value);
        if (element.value.length > 3) {
          setIsCorrectName(true);
          element.parentNode.querySelector("span").className = "";
        } else {
          element.parentNode.querySelector("span").className = "incorrect";
          setIsCorrectName(false);
        }
        break;
      case "email":
        setEmail(element.value);
        const { error } = schema.validate({ email: element.value });
        if (error === undefined) {
          setIsCorrectEmail(true);
          element.parentNode.querySelector("span").className = "";
          return;
        } else {
          setIsCorrectEmail(false);
          element.parentNode.querySelector("span").className = "incorrect";
        }
        break;
      case "message":
        setMessage(element.value);
        if (element.value.length > 3) {
          element.parentNode.querySelector("span").className = "";
          setIsCorrectMessage(true);
        } else {
          element.parentNode.querySelector("span").className = "incorrect";
          setIsCorrectMessage(false);
        }
        break;
    }
  };

  const checkCorrectInputs = () => {
    checkCorrectInput(inputNameRef.current, "name");
    checkCorrectInput(inputEmailRef.current, "email");
    checkCorrectInput(inputMessageRef.current, "message");
  };

  const sendForm = (e) => {
    e.preventDefault();
    if (isCorrectName && isCorrectEmail && isCorrectMessage) {
      fetch("/send/form", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromName: name,
          fromEmail: email,
          message: message,
        }),
      });
      setName("");
      setEmail("");
      setMessage("");
      setFormInfo(false);
      setFormIsSend(true);
      setFormInfo("Wiadomość została wysłana!");
      setTimeout(() => {
        setFormIsSend(false);
        setFormInfo(false);
      }, 3000);
    } else {
      setFormInfo(false);
      setFormIsSend(false);
      checkCorrectInputs();
      setFormInfo("Uzupełnij poprawnie formularz");
      setTimeout(() => {
        setFormInfo(false);
      }, 3000);
    }
  };

  return (
    <section className="contact" id="contact" ref={contactRef}>
      {formInfo && (
        <div className="contact__info info">
          {formIsSend ? (
            <span className="info__send">{formInfo}</span>
          ) : (
            <span className="info__span">{formInfo}</span>
          )}
        </div>
      )}
      <div className="custom-shape-divider-top-1635247080">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 0L0 0 598.97 114.72 1200 0z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <h2 ref={contactH2Ref}>Kontakt</h2>
      <p ref={contactPRef}>
        Jestem gotowy do działania i czekam na Twoją wiadomość.
      </p>
      <form
        ref={contactFORMRef}
        className="contact__form form"
        noValidate={true}
        onSubmit={(e) => sendForm(e)}
      >
        <div>
          <label className="form__text">
            <input
              onFocus={(e) => checkCorrectInput(e.target, "name")}
              onBlur={(e) => checkCorrectInput(e.target, "name")}
              onChange={(e) => checkCorrectInput(e.target, "name")}
              type="text"
              placeholder="Name"
              value={name}
              ref={inputNameRef}
              autoCorrect="off"
              autoComplete={false}
            ></input>
            <span></span>
          </label>
          <label className="form__email">
            <input
              onFocus={(e) => checkCorrectInput(e.target, "email")}
              onBlur={(e) => checkCorrectInput(e.target, "email")}
              onChange={(e) => checkCorrectInput(e.target, "email")}
              type="email"
              placeholder="Email"
              value={email}
              ref={inputEmailRef}
              autoCorrect="off"
              autoComplete={false}
            ></input>
            <span></span>
          </label>
        </div>
        <label className="form__textarea">
          <textarea
            onFocus={(e) => checkCorrectInput(e.target, "message")}
            onBlur={(e) => checkCorrectInput(e.target, "message")}
            onChange={(e) => checkCorrectInput(e.target, "message")}
            placeholder="Message"
            value={message}
            ref={inputMessageRef}
            autoCorrect="off"
            autoComplete={false}
          ></textarea>
          <span></span>
        </label>
        <label className="contact__submit">
          <span></span>
          <input type="submit" value="Send message" />
        </label>
      </form>
    </section>
  );
};

export default Contact;
