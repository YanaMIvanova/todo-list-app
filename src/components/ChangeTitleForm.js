import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ChangeTitleForm extends Component {
    state = {
        title: ''
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value })
    }

    componentDidMount() {
        const { BlockTitle } = this.props

        this.setState({
            title: BlockTitle
        })
    }

    render() {
        const {
            setTodoBlockTitle,
            toggleChangeTitleForm
        } = this.props

        const {
            title
        } = this.state

        return <form
            className="todoblock-change-title-form"
            onSubmit={e => {
                e.preventDefault()
                if (title.trim()) {
                    setTodoBlockTitle(title)
                    toggleChangeTitleForm()
                }
            }}
        >
            <input
                type="text"
                value={title}
                onChange={this.handleTitleChange}
                autoFocus
            />
            <button type="submit">
                Apply
            </button>
        </form>
    }
}

ChangeTitleForm.propTypes = {
    BlockTitle: PropTypes.string.isRequired,
    setTodoBlockTitle: PropTypes.func.isRequired,
    toggleChangeTitleForm: PropTypes.func.isRequired
}

export default ChangeTitleForm