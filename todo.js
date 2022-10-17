class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList
          items={this.state.items}
          onDelete={this.handleDelete}
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
}

class TodoList extends React.Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>
            <TodoItem
              item={item}
              onDelete={this.handleDelete}
            />
          </li>
        ))}
      </ul>
    );
  }

  handleDelete (itemId) {
    this.props.onDelete(itemId)
  }
}

class TodoItem extends React.Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  render () {
    return (
      <React.Fragment>
        {this.props.item.text}
        <button onClick={this.handleDelete} value={this.props.item.id}>Delete</button>
      </React.Fragment>
    )
  }

  handleDelete (e) {
    e.preventDefault()
    this.props.onDelete(e.target.value)
  }
}

const domContainer = document.querySelector('#todo_app_container');
const root = ReactDOM.createRoot(domContainer);
root.render(<TodoApp />);
