import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <div>
                <h2>What to learn</h2>
                <input type="text"/>
                <button>+</button>
            </div>
            <div style={{display: "flex",justifyContent:"center",alignItems:"center"}}>
                <ul>
                    <li>
                        <input type="checkbox" checked={true}/> HTML&CSS
                    </li>
                    <li>
                        <input type="checkbox" checked={true}/> JS
                    </li>
                    <li>
                        <input type="checkbox" checked={false}/> REACT
                    </li>
                </ul>
            </div>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default App;
