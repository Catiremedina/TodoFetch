import React, { useEffect, useState } from "react";

const Todolist = () => {
	// const [todo, setTodo] = useState("");
	const [todolist, setTodolist] = useState([]);
	const [hover, setHover] = useState(-1);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/";

	const onKeypress = e => {
		if (e.key === "Enter" && e.target.value !== "") {
			todolist.push({ label: e.target.value, done: false });
			setTodolist([...todolist]);
			todolist.length == 1 ? createCatirem() : updateTodo();
			e.target.value = "";
		}
	};

	const createCatirem = () => {
		fetch(`${url}Catirem`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(todolist)
		})
			.then(response => response.json())
			.then(data => {
				updateTodo();
			})
			.catch(error => console.log(error));
	};

	useEffect(() => {
		getTodolist();
	}, []);
	const getTodolist = () => {
		fetch(`${url}Catirem`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (Array.isArray(data)) {
					setTodolist(data);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	const updateTodo = () => {
		fetch(`${url}Catirem`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(todolist)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => console.log(error));
	};

	const Nuke = () => {
		fetch(`${url}Catirem`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {})
			.catch(error => console.log(error));
	};

	return (
		<div className="card text-center">
			<div className="card text-center">
				<div className="card-header">
					<h1>TODO LIST</h1>
				</div>
				<form onSubmit={e => e.preventDefault()}>
					<div className="card-body">
						<h5 className="card-title">
							<input
								className=""
								type="text"
								placeholder="Escribe aqui"
								name="text"
								onKeyUp={e => onKeypress(e)}></input>
						</h5>
						<p className="card-text">
							Escribe un todo y presiona Enter
						</p>
					</div>
				</form>
				<div className="card-footer text-muted">
					<ul className="list-group list-group-flush">
						{todolist.map((task, i) => {
							return (
								<li
									className="list-group-item d-flex justify-content-between"
									key={i}
									onMouseEnter={() => setHover(i)}
									onMouseLeave={() => setHover(-1)}>
									{task.label}
									<div
										onClick={() => {
											todolist.splice(i, 1);
											setTodolist([...todolist]);

											todolist.length === 0
												? Nuke()
												: updateTodo();
										}}
										className={
											hover === i
												? "text-danger"
												: "invisible"
										}>
										<i>
											<i className="fas fa-calendar-times"></i>
										</i>
									</div>
								</li>
							);
						})}
						<li className="tasklefttext">
							{`${todolist.length} Tareas`}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Todolist;
