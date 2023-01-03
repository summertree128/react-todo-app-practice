class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.itemKey = "todos";
  }

  componentDidMount() {
    const items = this.fetchTodos();
    this.setState({ items: items });
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList
          items={this.state.items}
          onDelete={this.handleDelete}
          onSave={this.handleSave}
        />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo" className="todo-item-add-label">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
            className="todo-item-add-input"
          />
          <button className="todo-item-add-button">
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
      id: Date.now(),
    };

    const newItems = this.state.items.concat(newItem);

    this.saveTodos(newItems);
    this.setState({ items: newItems, text: "" });
  }

  handleDelete(e) {
    e.preventDefault();
    const itemId = e.target.value;
    const newItems = this.state.items.filter((item) => item.id !== itemId);
    this.saveTodos(newItems);
    this.setState({ items: newItems });
  }

  handleSave(e, itemId, text) {
    e.preventDefault();
    const newItems = [...this.state.items];
    const editedItem = newItems.find((item) => item.id === itemId);
    editedItem.text = text;
    this.saveTodos(newItems);
    this.setState({ items: newItems });
  }

  fetchTodos() {
    const todos = localStorage.getItem(this.itemKey);
    return todos === null ? [] : JSON.parse(todos);
  }

  saveTodos(todos) {
    localStorage.setItem(this.itemKey, JSON.stringify(todos));
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  render() {
    return (
      <ul>
        {this.props.items.map((item) => (
          <li key={item.id}>
            <TodoItem
              item={item}
              onDelete={this.handleDelete}
              onSave={this.handleSave}
            />
          </li>
        ))}
      </ul>
    );
  }

  handleDelete(e) {
    this.props.onDelete(e);
  }

  handleSave(e, itemId, text) {
    this.props.onSave(e, itemId, text);
  }
}

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, text: this.props.item.text };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    if (this.state.editing) {
      return (
        <div className="todo-item">
          <form onSubmit={(e) => this.handleSave(e, this.props.item.id, this.state.text)} className="todo-item-edit-form">
            <input
              type="text"
              name="text"
              value={this.state.text}
              onChange={this.handleChange}
              className="todo-item-edit-input"
            />
            <button className="todo-item-button">Save</button>
          </form>
        </div>
      );
    }

    return (
      <div className="todo-item">
        <div className="todo-item-text">{this.props.item.text}</div>
        <button
          onClick={this.handleEdit}
          value={this.props.item.id}
          className="todo-item-button"
        >
          Edit
        </button>
        <button
          onClick={this.handleDelete}
          value={this.props.item.id}
          className="todo-item-button"
        >
          Delete
        </button>
      </div>
    );
  }

  handleDelete(e) {
    this.props.onDelete(e);
  }

  handleEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  handleSave(e, itemId, text) {
    this.props.onSave(e, itemId, text);
    this.setState({ editing: false });
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }
}

const domContainer = document.querySelector("#todo_app_container");
const root = ReactDOM.createRoot(domContainer);
root.render(<TodoApp />);
