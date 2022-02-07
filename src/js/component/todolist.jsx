import React, { useState } from "react";

const Todolist = () => {
	const [todo, setTodo] = useState("");
	const [todolist, setTodolist] = useState([]);
	const [hover, setHover] = useState(-1);

	const newtodo = e => {
		if (e.key == "Enter") {
			if (todo.trim() != "") {
				setTodolist([...todolist, todo]);
			}
			setTodo("");
		}
	};
	const borrar = id => {
		const newToDo = todolist.filter((task, index) => index != id);
		setTodolist(newToDo);
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
								value={todo}
								name="text"
								onChange={e => setTodo(e.target.value)}
								onKeyDown={newtodo}></input>
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
									{task}
									<div
										onClick={() => {
											borrar(i);
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
