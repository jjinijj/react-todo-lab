import React from 'react';

type TodoItemProps = {
    id : number;
    text : string;
    completed : boolean;
    onToggle : (id:number) => void;
    onDelete : (id:number) => void;
};

const TodoItem = ({id, text, completed, onToggle, onDelete} : TodoItemProps) => {
    return (
        <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '15px',
            marginBottom: '10px',
            backgroundColor: '#2e2e2e',
            borderRadius: '8px',
            border: '1px solid #444'
        }}
        >
            <input
                type="checkbox"
                checked={completed}
                onChange={()=>{onToggle(id)}}
                style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                }}
            />

            <span
                style={{
                    flex: 1,
                    fontSize: '18px',
                    textDecoration: completed ? 'line-through' : 'none',
                    color: completed ? '#888' : 'white'
                }}
            >
                {text}
            </span>

            <button
                onClick={() => onDelete(id)}
                className='btn btn-red'
                style={{padding : '8px 16px'}}
            >
                삭제
            </button>
        </li>
    );
}

export default TodoItem;