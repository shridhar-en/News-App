import React from 'react';
import './App.css';

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            todos: []
        }
    }
    handleChange = (event) => {
        //console.log(event);
        this.setState({
            value: event.target.value
        });
    }

    handleClick = () => {
        //console.log('was clicked');
        // let value = this.state.value;
        // let todos = this.state.todos;
        let [value, todos] = [this.state.value, this.state.todos];
        let newTodos = [...todos, value];
        this.setState({
            todos: newTodos,
            value: ''
        })
    }
    handleDelete = (outIndex) => {
        let todos = this.state.todos;
        let newTodos = todos.filter((element, index) => {
            return index !== outIndex;
        });
        this.setState({
            todos: newTodos
        })
    }
    render() {
        return (
            <div>
                <h2>To_Do_App</h2>
                <input type='text' 
                value={this.state.value} 
                onChange={this.handleChange}
                placeholder='Enter Here' 
                autoFocus />
                <button className='button' onClick={this.handleClick}>ADD</button>
                <table>
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>To_Do</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map((element, index) => {
                                return <tr>
                                    <td>{index + 1}</td>
                                    <td>{element}</td>
                                    <td><button onClick={() => { this.handleDelete(index) }}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ToDoApp;