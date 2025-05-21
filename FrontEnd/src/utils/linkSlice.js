import { createSlice } from "@reduxjs/toolkit";

const linkSlice = createSlice({
    name: "connection",
    initialState: {
        connectionsList : null,
        requestsList : null
    },
    reducers: {
        addConnections: (state,action) => {
            state.connectionsList = action.payload;
        },
        pushNewConnectionToList: (state,action) => {
            state.connectionsList.push(action.payload)
        },
        addRequests: (state,action) => {
            state.requestsList = action.payload;
        },
        pushNewRequestToList: (state,action) => {
            state.requestsList.push(action.payload);
        },
        popRequestFromList: (state, action) => {
            const index = state.requestsList.findIndex(
                request => request.linkId === action.payload
            );
            if (index !== -1) {
                state.requestsList.splice(index, 1);
            } 
        },
        resetAllLinkLists: (state,action) => {
            state.connectionsList = null;
            state.requestsList = null;
        }
    }
})

export default linkSlice.reducer;
export const{ 
    addConnections,  
    addRequests,
    pushNewConnectionToList,
    pushNewRequestToList,
    popRequestFromList,
    resetAllLinkLists
    
} = linkSlice.actions;