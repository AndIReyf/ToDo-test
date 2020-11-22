import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Header} from "../navbar/Navbar";
import {Todo} from "../todolist/TodoList";
import {Container} from 'reactstrap';
import {useDispatch} from "react-redux";
import {fetchItems} from "../../thunk/thunk.items";

export function App() {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(fetchItems())
    }, [dispatch])

    return (
        <div className="App">
            <Header/>
            <Container>
                <Todo/>
            </Container>
        </div>
    )
}
