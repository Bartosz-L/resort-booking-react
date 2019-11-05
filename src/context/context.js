import React, { createContext, useEffect } from "react";
// import items from "../data";
import useAsyncState from "../utils/useAsyncState";
import Client from "../contentful";

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [state, setState] = useAsyncState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  });

  // getData from contentful
  const getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResortRoom",
        order: "sys.createdAt"
      });

      let rooms = formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));

      setState(prevState => {
        return {
          ...prevState,
          rooms: rooms,
          featuredRooms: featuredRooms,
          sortedRooms: rooms,
          loading: false,
          price: maxPrice,
          maxPrice: maxPrice,
          maxSize: maxSize
        };
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const formatData = items => {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images: images, id };
      return room;
    });
    return tempItems;
  };

  const getRoom = slug => {
    let tempRooms = [...state.rooms];
    const singleRoom = tempRooms.find(room => room.slug === slug);
    return singleRoom;
  };

  const handleChange = async event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;

    await setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // filtering
  useEffect(() => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = state;

    // all the rooms
    let tempRooms = [...rooms];

    // transform value
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);

    // filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    // updating the state
    setState(prevState => {
      return { ...prevState, sortedRooms: tempRooms };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.type,
    state.capacity,
    state.rooms,
    state.price,
    state.minSize,
    state.maxSize,
    state.breakfast,
    state.pets
  ]);

  return (
    <RoomContext.Provider
      value={{ ...state, getRoom: getRoom, handleChange: handleChange }}
    >
      {children}
    </RoomContext.Provider>
  );
};

const RoomConsumer = RoomContext.Consumer;

const withRoomConsumer = Component => {
  const ConsumerWrapper = props => (
    <RoomConsumer>
      {value => <Component {...props} context={value} />}
    </RoomConsumer>
  );

  return ConsumerWrapper;
};

export { RoomProvider, RoomContext, withRoomConsumer };
