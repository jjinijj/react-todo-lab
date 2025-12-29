import React, { useEffect, useState } from "react";
import TodoStats from "./TodoStatus";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import type {Todo} from "../types/todo";
import type { FilterType } from "../types/filter";

const TodoApp = () => {
    // localStorage에서 데이터 호출
    const [todos, setTodos] = useState<Todo[]>(()=>{
        const saved = localStorage.getItem('todos');
        if(saved){
            return JSON.parse(saved);
        }
        return [];
    });

    const [filter, setFilter] = useState<FilterType>('all');
    const [searchText, setSearchText] = useState('');

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

    const editTodo = (id:number, newText: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? {...todo, text:newText} : todo
        ));
    };

    const deleteAllCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const filteredTodos = todos.filter(todo => {
        
        // 검색
        if(searchText && !todo.text.toLowerCase().includes(searchText.toLowerCase())){
            return false;
        }
        
        // 필터 적용
        if(filter === 'active') return !todo.completed;
        if(filter === 'completed') return todo.completed;

        return true; // all
    });

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

            {/*검색 창*/}
            <div style={{
                marginTop: '20px'
            }}>
                <input
                    type="text"
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    placeholder="검색"
                    style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #444',
                        backgroundColor: '#2e2e2e',
                        color: 'white'
                    }}
                />
            </div>

            {/* 필터 버튼*/}
            <div style={{
                display: 'flex',
                gap:'10px',
                marginTop: '30px',
                justifyContent: 'center'
            }}>
                <button
                    onClick={() => setFilter('all')}
                    className="btn"
                    style={{
                        padding: '8px 20px',
                        backgroundColor: filter === 'all' ? '#61dafb' : '#444',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: filter === 'all' ? 'bold' : 'normal'
                    }}
                >
                    전체
                </button>

                <button
                    onClick={() => setFilter('active')}
                    className="btn"
                    style={{
                        padding: '8px 20px',
                        backgroundColor: filter === 'active' ? '#ff9800' : '#444',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: filter === 'active' ? 'bold' : 'normal'
                    }}
                >
                    진행중
                </button>

                <button
                    onClick={() => setFilter('completed')}
                    className="btn"
                    style={{
                        padding: '8px 20px',
                        backgroundColor: filter === 'completed' ? '#4caf50' : '#444',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: filter === 'completed' ? 'bold' : 'normal'
                    }}
                >
                    완료
                </button>

            </div>

                {/*검색 결과 표시*/}
                {searchText &&(
                    <p style={{
                        textAlign:'center',
                        color: '#888',
                        marginTop: '15px',
                        fontSize: '14px'
                    }}>
                        "{searchText}" 검색 결과 : {filteredTodos.length}개
                    </p>
                )}

            <div style={{
                marginTop: '30px'
            }}>
                <TodoList
                    todos={filteredTodos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
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