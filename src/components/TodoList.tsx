import * as React from 'react';

type Props = {};
export const TodoList = (props: Props) => {
    return (
        <div>
            <h2>What to learn</h2>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={true}/> <span>HTML&CSS</span>
                </li>
                <li>
                    <input type="checkbox" checked={true}/> <span>JS</span>
                </li>
                <li>
                    <input type="checkbox" checked={false}/> <span>React</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
