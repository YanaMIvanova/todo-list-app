import React from 'react'
import FilterButton from '../containers/FilterButton'
import { visibilityFilters } from '../constants'

const Filters = () => (
    <p>
        <span>Show:</span>
        {' '}
        <FilterButton filter={visibilityFilters.SHOW_ALL}>
            All
        </FilterButton>
        <FilterButton filter={visibilityFilters.SHOW_ACTIVE}>
            Active
        </FilterButton>
        <FilterButton filter={visibilityFilters.SHOW_COMPLETED}>
            Completed
        </FilterButton>
    </p>
)

export default Filters