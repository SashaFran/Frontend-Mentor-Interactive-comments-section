import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import './App.css';
import CommentList from './components/CommentList';
function App() {
    return (_jsx(_Fragment, { children: _jsx("main", { children: _jsx(CommentList, {}) }) }));
}
export default App;
