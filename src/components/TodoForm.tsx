import React,{useState} from "react";

type TodoFormProps ={
    onAdd: (text:string) => void;
};

const TodoForm = ({onAdd} : TodoFormProps) => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(inputText.trim() === ''){
            alert('할 일을 입력하세요.');
            return;
        }
        
        onAdd(inputText);
        setInputText('');
    };

    return(
        <form 
            onSubmit={handleSubmit}
            style={{
                marginTop: '30px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '10px'
                }}
            >
                <input
                    type="text"
                    value={inputText}
                    onChange={(e)=>setInputText(e.target.value)}    
                    placeholder="할 일을 입력하세요"
                    style={{
                        flex: 1,
                        padding: '12px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        border: '1px solid #444',
                        backgroundColor : '#2e2e2e',
                        color: 'white'
                    }}
                />
                <button
                    type="submit"
                    className="btn btn-green"
                    style={{
                        padding: '12px 24px'
                    }}
                >
                    추가
                </button>
            </div>
        </form>
    );
}

export default TodoForm;