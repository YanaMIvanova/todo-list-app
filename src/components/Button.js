import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ active, children, setVisibilityFilter }) => {
    return <button
        onClick={setVisibilityFilter}
        disabled={active}
        style={{
            marginLeft: '4px',
        }}
    >
        {children}
    </button>
}

Button.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    setVisibilityFilter: PropTypes.func.isRequired
}

export default Button