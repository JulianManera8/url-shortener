import {useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import {useEffect} from 'react'
import { UrlState } from '@/context'

export default function RequireAuth({children}) {
    const navigate = useNavigate()

    const { isAuth } = UrlState()

    useEffect(() => {
      if (!isAuth) return navigate('/auth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isAuth])
    
    if (isAuth) return children

    return
}

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired
}