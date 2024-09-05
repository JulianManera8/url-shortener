/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./database/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {

    const {data: user, loading, fn: fetchUser } = useFetch(getCurrentUser)

    const isAuth = user?.role === 'authenticated'

    useEffect( () => {
        fetchUser()
    },[])

  return <UrlContext.Provider value={{user, fetchUser, isAuth, loading}}>{children}</UrlContext.Provider>;
};

UrlProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};

export const UrlState = () => {
    return useContext(UrlContext)
}

export default UrlProvider;

