import { connect } from "react-redux";
import { setTodoBlockTitle } from "../actions/todoBlocks";
import ChangeTitleForm from "../components/ChangeTitleForm";

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    setTodoBlockTitle: title => dispatch(setTodoBlockTitle(title, ownProps.blockId)),
    toggleChangeTitleForm: () => ownProps.toggleChangeTitleForm()
})

const mapStateToProps = (_state, ownProps)=> ({
    BlockTitle: ownProps.BlockTitle
})

const ChangeTitleFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeTitleForm)

export default ChangeTitleFormContainer
