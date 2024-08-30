import PropTypes from 'prop-types'

export default function Error({errorMessage}) {
    return (
        <span className="text-red-500"> {errorMessage} </span>
    )
}

Error.propTypes = {
    errorMessage: PropTypes.string,
}