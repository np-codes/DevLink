import { createSlice } from "@reduxjs/toolkit";

const linkSlice = createSlice({
    name: "connection",
    initialState: {
        connectionsList : null,
        requestList : null
    },
    reducers: {
        addConnections: (state,action) => {
            state.connectionsList = action.payload;
        },
        removeConnections: (state,action) => {
            state.connectionsList = null;
        },
        addRequests: (state,action) => {
            state.requestList = action.payload;
        },
        removeRequests: (state,action) => {
            state.requestList = null;
        }
    }
})

export default linkSlice.reducer;
export const{ addConnections, removeConnections, addRequests, removeRequests} = linkSlice.actions;