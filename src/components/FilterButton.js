import React from 'react'
import PropTypes from 'prop-types'

const FilterButton = ({ active, children, setVisibilityFilter }) => {
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

FilterButton.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    setVisibilityFilter: PropTypes.func.isRequired
}

export default FilterButton