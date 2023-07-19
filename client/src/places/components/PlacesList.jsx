import React from "react";
import PlacesItem from "./PlacesItem";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/Card";

const PlacesList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card>
        <h1 className="text-xl font-bold mb-3">
          No places found for the user! Maybe create one?
        </h1>
        <Button to="/places/new">Share Place</Button>
      </Card>
    );
  }
  return (
    <ul className="flex flex-col justify-center items-center">
      {props.items.map((place) => (
        <PlacesItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
