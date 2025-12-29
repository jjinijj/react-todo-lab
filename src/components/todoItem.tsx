import React, { useState, useRef, useEffect } from 'react';

type TodoItemProps = {
    id : number;
    text : string;
    completed : boolean;
    onToggle : (id:number) => void;
    onDelete : (id:number) => void;
    onEdit: (id:number, newText: string) => void;
};

const TodoItem = ({id, text, completed, onToggle, onDelete, onEdit} : TodoItemProps) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const editInputRef = useRef<HTMLInputElement>(null);
    
    // 수정모드 진입 시 자동 포커스, 전체 선택
    useEffect(()=>{
        if(isEditing && editInputRef.current){
            editInputRef.current.focus();
            editInputRef.current.select();
        }
    },[isEditing]);

    const handleEdit= () =>{
        if(editText.trim() === ''){
            alert('내용을 입력하세요.');
            return;
        }

        onEdit(id, editText.trim());
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            handleEdit();
        }else if(e.key === 'Escape'){
            setEditText(text);
            setIsEditing(false);
        }
    }

    if(isEditing){
        return(
            <li 
                style={{
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: '#2e2e2e',
                borderRadius: '8px',
                border: '2px solid #61dafb'
            }}>
                <input
                    ref={editInputRef}
                    type='text'
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleEdit}
                    onKeyDown={handleKeyDown}
                    style={{
                        width: '80%',
                        padding: '10px',
                        fontSize: '16ppx',
                        borderRadius: '4px',
                        border: '1px solid #61dafb',
                        backgroundColor: '#1e1e1e',
                        color: 'white',
                        marginBottom: '10px'
                    }}
                />
                
                <div
                    style={{
                        display:'flex',
                        gap:'10px',
                        justifyContent:'flex-end'
                    }}>

                    <button
                    onClick={handleEdit}
                    className='btn btn-green'
                    style={{
                        padding: '8px 20px', fontSize: '14px'
                    }}
                    >
                        저장
                    </button>

                    <button
                      onClick={() => {
                        setEditText(text);
                        setIsEditing(false);
                      }}
                      className="btn btn-red"
                      style={{ padding: '8px 20px', fontSize: '14px' }}
                    >
                      취소
                    </button>

                </div>
                <p style={{ 
                fontSize: '12px', 
                color: '#888', 
                marginTop: '8px',
                marginBottom: 0
                }}>
                    Enter: 저장 | Esc: 취소 | 포커스 잃으면 자동 저장
                </p>
            </li>
        );
    }
    
    return (
        <li 
            onDoubleClick={()=>setIsEditing(true)}
            style={{
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