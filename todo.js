class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList
          items={this.state.items}
          onDelete={this.handleDelete}
          onUpdate={this.handleUpdate}
        />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  handleDelete (itemId) {
    this.setState(state => ({
      items: state.items.filter(item => item.id != itemId)
    }))
  }

  handleUpdate (itemId, text) {
    const newItems = [...this.state.items]
    const editedItem = newItems.find(item => item.id == itemId)
    editedItem.text = text
    this.setState({ items: newItems })
  }
}

class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>
            <TodoItem
              item={item}
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
            />
          </li>
        ))}
      </ul>
    );
  }

  handleDelete (itemId) {
    this.props.onDelete(itemId)
  }

  handleUpdate (itemId, text) {
    this.props.onUpdate(itemId, text)
  }
}

class TodoItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editing: false, text: this.props.item.text };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render () {
    if (this.state.editing) {
      return (
        <React.Fragment>
          <form onSubmit={this.handleUpdate}>
            <input type='text' name='text' value={this.state.text} onChange={this.handleChange} />
            <input type='hidden' name='id' value={this.props.item.id} />
            <button>Save</button>
          </form>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {this.props.item.text}
        <button onClick={this.handleEdit} value={this.props.item.id}>Edit</button>
        <button onClick={this.handleDelete} value={this.props.item.id}>Delete</button>
      </React.Fragment>
    )
  }

  handleDelete (e) {
    e.preventDefault()
    this.props.onDelete(e.target.value)
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true })
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.onUpdate(this.props.item.id, this.state.text)
    this.setState({ editing: false })
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }
}

const domContainer = document.querySelector('#todo_app_container');
const root = ReactDOM.createRoot(domContainer);
root.render(<TodoApp />);
