import { ISSUE_STATE } from '../consts/consts';

export type MediaType = 'mobile' | 'desktop/tablet';
export type IssueOpenOrClosedState = typeof ISSUE_STATE[keyof typeof ISSUE_STATE];
