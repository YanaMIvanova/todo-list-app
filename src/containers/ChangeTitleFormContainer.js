import { connect } from "react-redux";
import { setTodoBlockTitle } from "../actions/todoBlocks";
import ChangeTitleForm from "../components/ChangeTitleForm";

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    setTodoBlockTitle: title => dispatch(setTodoBlockTitle(title, ownProps.blockId)),
    toggleChangeTitleForm: () => ownProps.toggleChangeTitleForm()
})

const ChangeTitleFormContainer = connect(
    null,
    mapDispatchToProps
)(ChangeTitleForm)

export default ChangeTitleFormContainer
