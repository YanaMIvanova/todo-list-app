import React from 'react'
import FilterButtonContainer from '../containers/FilterButtonContainer'
import { visibilityFilters } from '../constants'
import PropTypes from "prop-types";

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
    blockId: PropTypes.string.isRequired
}

export default Filters