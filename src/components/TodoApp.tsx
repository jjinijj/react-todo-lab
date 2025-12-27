import React, { useEffect, useState } from "react";
import TodoStats from "./TodoStatus";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import {Todo} from "../types/todo";
import exp from "constants";

const TodoApp = () => {
    // localStorage에서 데이터 호출
    const [todos, setTodos] = useState<Todo[]>(()=>{
        const saved = localStorage.getItem('todos');
        if(saved){
            return JSON.parse(saved);
        }
        return [];
    });

    // todo 리스트가 변경될 때마다 자동 저장
    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text : string) => {
        const newTodo : Todo = {
            id : Date.now(),
            text: text,
            completed: false
        };

        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id : number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    };

    const deleteTodo = (id : number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const deleteAllCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const totalCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = totalCount - completedCount;

    return (
        <div 
            style={{
                maxWidth: '600px',
                margin: '200px auto',
                padding: '30px',
                border: '2px solid #61dafb',
                borderRadius: '12px',
                backgroundColor: '#1e1e1e'
            }}
        >
            <h1 style={{
                textAlign: 'center',
                color: '#61dafb'
            }}>
                Todo List
            </h1>

            <TodoStats
                total={totalCount}
                active={activeCount}
                completed={completedCount}
            />

            <TodoForm onAdd={addTodo}/>

            <div style={{
                marginTop: '30px'
            }}>
                <TodoList
                    todos={todos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                />

                {completedCount > 0 &&(
                    <button
                        onClick={deleteAllCompleted}
                        className="btn btn-blue"
                        style={{
                            width: '100%',
                            marginTop: '20px'
                        }}
                        >
                            완료된 항목 삭제 ({completedCount}개)
                    </button>
                )}
            </div>

                <p
                    style={{
                        marginTop: '30px',
                        textAlign : 'center',
                        color: '#888',
                        fontSize: '14px',
                        borderTop: '1px solid #444',
                        paddingTop: '20px'
                    }}
                >
                    자동 저장 됨
                </p>
        </div>
    );
};

export default TodoApp;