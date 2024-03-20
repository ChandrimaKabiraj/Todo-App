// App.js File 
import React, { useState, useEffect } from "react"; 
import "bootstrap/dist/css/bootstrap.css"; 
import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import FormControl from "react-bootstrap/FormControl"; 
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from 'react-bootstrap/Spinner';
import AuthLogin from './authLogin.jsx';
import AuthLogout from './authLogout.jsx';
import Profile from './Profile.jsx';
import './styles.css';

function TodoList() {
    const [userInput, setUserInput] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [change, setChange] = useState(false);
	const [isLogin, setIsLogin] = useState(false);	
	useEffect(() => {
		showTodos();
	},[change])
		

	// Set a user input value 
	const updateInput = (value) => { 
		setUserInput(value);
	}
	
	const showTodos = () => {
		const options = {
			method: 'GET',
			headers: {
				"Content-Type": "application/json"
			  }
		  };
		fetch('https://9b97q4kcjk.execute-api.ap-south-1.amazonaws.com/dev/todos', options)
		.then((response) => response.json())
		.then((data) => {
			let array = [];
			data.todos.map((item) => array.push(item));
			setTodoList(array); 
		});
	}

	// Add item if user input in not empty 
	const addItem = () => {
		setChange(!change); 
		if (userInput !== "") { 
			const options = {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				  },
				body: JSON.stringify({ 
					todoId: `${Math.floor(Math.random() * 1000) + 1}`, 
					todoName: `${userInput}`, 
				}),
			  };
			fetch('https://9b97q4kcjk.execute-api.ap-south-1.amazonaws.com/dev/todo', options)
			.then((response) => response.json())
			.then((data) => console.log(data));

			setUserInput("");
		} 
		showTodos();

	} 

	// Function to delete item from list use id to delete 
	const deleteItem = (index) => {
		setChange(!change); 
		const options = {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json"
			  },
			body: JSON.stringify({ 
				todoId: `${index}`
			}),
		  };
		fetch('https://9b97q4kcjk.execute-api.ap-south-1.amazonaws.com/dev/todo', options)
		.then((response) => response.json())
		.then((data) => console.log(data));

		showTodos();

	} 

	const editItem = (index) => { 
		setChange(!change); 
	const editedTodo = prompt('Edit the todo:');
	if (editedTodo !== null && editedTodo.trim() !== '') { 
	const options = {
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json"
		  },
		body: JSON.stringify({
			todoId: `${index}`,
			updateKey: "todoName",
			updateValue: `${editedTodo}`
		}),
	  };
	fetch('https://9b97q4kcjk.execute-api.ap-south-1.amazonaws.com/dev/todo', options)
	.then((response) => response.json())
	.then((data) => console.log(data));
    }
    showTodos();
	} 

	
		return ( 
			<Container>
				<span>
				<Row 
					style={{ 
						display: "flex", 
						justifyContent: "center", 
						alignItems: "center", 
						fontSize: "3rem", 
						fontWeight: "bolder", 
					}} 
				> 
					TODO LIST
					 
				</Row> 
				</span>
				<span>
				<div className="auth">
						{isLogin === false ? <AuthLogin setIsLogin={setIsLogin} isLogin={isLogin}/> : ''}
						{isLogin === true ? <AuthLogout/> : ''}
						<Profile/>
				</div>
				</span>
				{todoList.length === 0 && <Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
				</Spinner>}
				<hr />
				<div>Number of ToDo's: {todoList.length}</div>
				<span>&nbsp;</span> 
				<Row> 
					<Col md={{ span: 5, offset: 4 }}> 
						<InputGroup className="mb-3"> 
							<FormControl 
								placeholder="add item . . . "
								size="lg"
								value={userInput} 
								onChange={(item) => updateInput(item.target.value)} 
								aria-label="add something"
								aria-describedby="basic-addon2"
							/> 
							<InputGroup> 
								<Button 
									variant="dark"
									className="button-add"
									onClick={addItem} 
								> 
									ADD 
								</Button> 
							</InputGroup> 
						</InputGroup> 
					</Col> 
				</Row> 
				<Row> 
					<Col md={{ span: 5, offset: 4 }}> 
						<ListGroup> 
							{todoList.map((item, index) => { 
								return ( 
								<div key = {item.todoId} > 
									<ListGroup.Item
									    className="item" 
										variant="dark"
										action 
										style={{display:"flex", 
												justifyContent:'space-between'
									}} 
									> 
										{item.todoName} 
										<span> 
										<Button style={{marginRight:"10px"}} 
										variant = "light"
										onClick={() => deleteItem(item.todoId)}> 
										Delete 
										</Button> 
										<Button variant = "light"
										onClick={() => editItem(item.todoId)}> 
										Edit 
										</Button> 
										</span> 
									</ListGroup.Item> 
								</div> 
								); 
							})} 
						</ListGroup> 
					</Col> 
				</Row> 
			</Container> 
		); 
	 
} 


export default TodoList; 