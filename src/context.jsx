import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import useFetch from "./HOOKS/use-fetch";
import { getCurrentUser } from "./DATABASE/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {

    const {data: user, loading, fn: fetchUser } = useFetch(getCurrentUser)

    const isAuth = user?.role === 'authenticated'

    useEffect( () => {
        fetchUser()
    },[fetchUser])

  return <UrlContext.Provider value={{user, fetchUser, isAuth, loading}}>{children}</UrlContext.Provider>;
};

UrlProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};

export const UrlState = () => {
    return useContext(UrlContext)
}

export default UrlProvider;

