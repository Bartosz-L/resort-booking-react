import React from "react";
import { withRoomConsumer } from "../../context/context";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";
import Loading from "../Loading";

const RoomsContainer = ({ context }) => {
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
};

export default withRoomConsumer(RoomsContainer);
