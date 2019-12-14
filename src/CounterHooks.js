import React, { useState, useContext } from 'react';
import { ThemeContext } from './App';
//export default function CounterHooks(props){
export default function CounterHooks({ initialCount }){
    //const [state, setState] = useState({ count: initialCount })
    const [count, setCount] = useState(initialCount)
    const style = useContext(ThemeContext)

    return (
        <div>
            <button style={style} onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <span>{count}</span>
            <button style={style} onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            {/*<button onClick={() => setState({count: state.count - 1})}>-</button>*/}
            {/*<button onClick={() => setState(prevState => {
                return { count: prevState.count -1}
            })}>-</button>*/}
            {/* <span>{props.initialCount}</span> */}
            {/*<span>{initialCount}</span>*/}

            {/* <span>{state.count}</span>*/}
            {/*<button onClick={() => {setState(prevState => {return {count: state.count + 1}})}}>+</button>*/}
        </div>
    )
}