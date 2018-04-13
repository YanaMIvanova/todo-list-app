import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => {
    const todoBlock = state.todoBlocks.find(block => block.id === ownProps.blockId)

    return {
        active: ownProps.filter === todoBlock.visibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => dispatch(setVisibilityFilter(ownProps.filter, ownProps.blockId))
    }
}

const FilterButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(Button)

export default FilterButton