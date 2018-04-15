import React from 'react'
import FilterButton from '../containers/FilterButton'
import { visibilityFilters } from '../constants'
import PropTypes from "prop-types";

const Filters = ({ blockId }) => (
    <p>
        <span>Show:</span>
        &nbsp;
        <FilterButton blockId={blockId} filter={visibilityFilters.SHOW_ALL}>
            All
        </FilterButton>
        <FilterButton blockId={blockId} filter={visibilityFilters.SHOW_ACTIVE}>
            Active
        </FilterButton>
        <FilterButton blockId={blockId} filter={visibilityFilters.SHOW_COMPLETED}>
            Completed
        </FilterButton>
    </p>
)

Filters.propTypes = {
    blockId: PropTypes.number.isRequired
}

export default Filters