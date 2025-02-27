import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IssueSummary } from "src/types";

interface IssuesState {
  issues: IssueSummary[];
}

const initialState: IssuesState = {
  issues: [],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues(state, action: PayloadAction<IssueSummary[]>) {
      state.issues = action.payload;
    },
  },
});

export const { setIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
