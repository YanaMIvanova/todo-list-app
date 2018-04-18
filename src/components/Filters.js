import React from 'react'
import PropTypes from "prop-types";
import { visibilityFilters } from '../constants'
import FilterButtonContainer from '../containers/FilterButtonContainer'

const Filters = ({ blockId }) => (
    <p>
        <span>Show:</span>
        &nbsp;
        <FilterButtonContainer blockId={blockId} filter={visibilityFilters.SHOW_ALL}>
            All
        </FilterButtonContainer>
        <FilterButtonContainer blockId={blockId} filter={visibilityFilters.SHOW_ACTIVE}>
            Active
        </FilterButtonContainer>
        <FilterButtonContainer blockId={blockId} filter={visibilityFilters.SHOW_COMPLETED}>
            Completed
        </FilterButtonContainer>
    </p>
)

Filters.propTypes = {
    blockId: PropTypes.number.isRequired
}

export default Filters