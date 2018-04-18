import { connect } from "react-redux";
import { setTodoBlockTitleToStorage } from "../actions/todoBlocks";
import ChangeTitleForm from "../components/ChangeTitleForm";

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    setTodoBlockTitle: title => dispatch(setTodoBlockTitleToStorage(title, ownProps.blockId)),
    toggleChangeTitleForm: () => ownProps.toggleChangeTitleForm()
})

const ChangeTitleFormContainer = connect(
    null,
    mapDispatchToProps
)(ChangeTitleForm)

export default ChangeTitleFormContainer
