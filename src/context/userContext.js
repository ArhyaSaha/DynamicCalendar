import React from "react";

const userContext = React.createContext({
    user: null,
    setUser: () => { },
    eventModal: false,
    setEventModal: () => { },
    daySelected: null,
    setDaySelected: () => { },
    events: [],
    addEvent: () => { },
});
export default userContext;