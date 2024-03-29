import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "../../shared/components/Modal";
import Map from "../../shared/components/Map";
import Button from "../../shared/components/FormElements/Button";

import { Authcontext } from "../../shared/context/auth-context";

const PlacesItem = (props) => {
  const { isLoggedIn } = useContext(Authcontext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = () => {
    console.log("DELETED!");
    setShowConfirmModal(false);
  };
  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        className="fixed w-[80%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg bg-white z-20 border-2 border-black rounded-lg "
        headerClass="font-semibold bg-orange-300 w-full text-lg rounded-t-md text-center p-3 "
        footerClass="justify-center"
        footer={
          <button
            className="flex w-[75px] mx-auto p-3 my-2 py-1 bg-[#b81c0e] hover:bg-[#fe002f] font-medium text-md text-white rounded-sm"
            onClick={closeMapHandler}
          >
            CLOSE
          </button>
        }
      >
        <div className="w-[100%] h-[30vh]">
          <Map center={props.coordinates} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        className="fixed w-[80%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg  font-semibold text-lg bg-white z-20 border-2 border-black rounded-lg "
        headerClass="font-semibold bg-orange-300 w-full text-lg rounded-t-md text-center p-2 "
        header={"Are you sure?"}
        footerClass="justify-center text-right my-2"
        footer={
          <>
            <button
              className="mr-3 px-3 py-1 border border-[#fe002f] bg-white hover:bg-[#fe002f] font-medium text-md text-[#fe002f] hover:text-white rounded-sm"
              onClick={cancelDeleteHandler}
            >
              CANCEL
            </button>
            <button
              className="mr-3 px-3 py-1 bg-[#b81c0e] hover:bg-[#fe002f] font-medium text-md text-white rounded-sm"
              onClick={confirmDeleteHandler}
            >
              DELETE
            </button>
          </>
        }
      >
        <p className="mx-3 py-7">
          Do you really want to delete the place. Please note that once deleted,
          the place will not be recovered!
        </p>
      </Modal>
      <li className="w-[40%] rounded-md bg-[#fde2cd] m-3">
        <img
          className="w-[100%] h-auto p-2 rounded-lg"
          src={props.image}
          alt={props.title}
        />
        <div className="flex flex-col justify-center items-center p-2 border-b-2 border-gray-300">
          <h2 className="text-xl font-bold">{props.title}</h2>
          <h2 className="text-lg font-semibold">{props.address}</h2>
          <p className="text-lg p-1">{props.description}</p>
        </div>
        <div className="flex flex-wrap justify-center items-center my-2">
          <button
            className="mx-2 my-2 px-3 py-1 border border-[#33b5e5] hover:bg-[#33b5e5]  font-medium  hover:text-white text-md text-[#0099CC] rounded-sm"
            onClick={openMapHandler}
          >
            VIEW ON MAP
          </button>
          {isLoggedIn && (
            <Link to={`places/${props.id}`}>
              <button className="mx-2 my-2 px-3 py-1 bg-[#FF8800] hover:bg-[#ffaa49] font-medium text-md text-white rounded-sm">
                EDIT
              </button>
            </Link>
          )}
          {isLoggedIn && (
            <button
              className="mx-2 my-2 px-3 py-1 bg-[#b81c0e] hover:bg-[#fe002f] font-medium text-md text-white rounded-sm"
              onClick={showDeleteWarningHandler}
            >
              DELETE
            </button>
          )}
        </div>
      </li>
    </>
  );
};

export default PlacesItem;
