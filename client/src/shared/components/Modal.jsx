import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";

const ModelOverlay = (props) => {
  const content = (
    <div
      className={`flex flex-col justify-center items-center ${props.className}`}
    >
      <header className={props.headerClass}>
        <h2>{props.header}</h2>
      </header>
      <form
        className="w-[100%] m-0 p-0"
        onSubmit={
          props.onSubmit
            ? props.onSubmit
            : (event) => {
                event.preventDefault();
              }
        }
      >
        <div className={props.contentClass}>{props.children}</div>
        <footer className={props.footerClass}>{props.footer}</footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.show && <ModelOverlay {...props} />}
      {props.show && <Backdrop onClick={props.onCancel} />}
    </>
  );
};

export default Modal;
