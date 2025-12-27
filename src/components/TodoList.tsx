import React from "react";
import TodoItem from "./todoItem";

type Todo = {
    id : number;
    text: string;
    completed: boolean;
};

type TodoListProps = {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id:number) => void;
};

const TodoList = ({todos, onToggle, onDelete} : TodoListProps) => {
    if(todos.length === 0){
        return (
            <p style= {{
                textAlign: 'center',
                color: '#888',
                padding: '40px 0'
            }}>
                할 일이 없습니다. 추가해보세요!😄
            </p>
        );
    }

    return(
        <ul style={{
            listStyle: 'none',
            padding: 0
        }}
        >
            {todos.map((todo)=>(
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default TodoList;