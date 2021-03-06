import React from 'react';
import "./App.css";
import AppRouter from "./router";
import { Provider } from "react-redux";
import { store } from './store/configureStore';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
}
export default App;