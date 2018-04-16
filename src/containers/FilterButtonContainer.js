import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/todos'
import Button from '../components/Button'
import { blocksSelector } from "../reducers";

const mapStateToProps = (state, ownProps) => {
    const todoBlock = blocksSelector(state).find(block => block.id === ownProps.blockId)

    return {
        active: ownProps.filter === todoBlock.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setVisibilityFilter: () => dispatch(setVisibilityFilter(ownProps.filter, ownProps.blockId))
    }
}

const FilterButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Button)

export default FilterButtonContainer