import { ISSUE_STATE, VIEW_MODE } from '../consts/consts';

export type ViewMode = typeof VIEW_MODE[keyof typeof VIEW_MODE];
export type IssueOpenOrClosedState = typeof ISSUE_STATE[keyof typeof ISSUE_STATE];
