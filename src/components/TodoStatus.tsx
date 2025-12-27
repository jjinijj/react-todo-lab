import React from "react";

type TodoStateProps = {
    total : number;
    active: number;
    completed: number;
};

const TodoStats = ({total, active, completed} : TodoStateProps) => {
    return(
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#2e2e2e',
                borderRadius:'8px'
            }}
        >
            <div style={{textAlign: 'center'}}>
                <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#61dafb'
                }}>
                    {total}
                </div>
                <div style={{
                    fontSize: '14px',
                    color: '#888'
                }}>
                    전체
                </div>
            </div>

            <div style={{textAlign: 'center'}}>
                <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#ff9800'
                }}>
                    {active}
                </div>
                <div style={{
                    fontSize: '14px',
                    color: '#888'
                }}>
                    진행중
                </div>
            </div>

            <div style={{textAlign: 'center'}}>
                <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#4caf50'
                }}>
                    {completed}
                </div>
                <div style={{
                    fontSize: '14px',
                    color: '#888'
                }}>
                    완료
                </div>
            </div>
        </div>
    );
}

export default TodoStats;