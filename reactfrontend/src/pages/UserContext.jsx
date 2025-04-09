import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
    const [userDetails, setUserDetails] = useState(null);
    const updateUser = (newDetails) => {
        setUserDetails(newDetails);
      };
    
    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails)); 
        }
    }, []); 

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails,updateUser }}>
            {children}
        </UserContext.Provider>
    );
};                                                      