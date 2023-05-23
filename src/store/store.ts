import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootreducer  from "./reducer/root.reducer";

const store = createStore(
    rootreducer,
    {},
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)
store.subscribe(()=>store.getState())

export default store;