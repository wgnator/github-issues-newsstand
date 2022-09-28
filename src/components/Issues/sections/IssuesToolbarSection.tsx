import { Dispatch } from 'react';
import styled from 'styled-components';
import { ISSUE_STATE } from '../../../consts/consts';
import { theme } from '../../../styles/theme';
import { IssueOpenOrClosedState } from '../../../types/states';
import { IssueOptions } from './../IssuesBox';

export default function IssuesToolbarSection({
  optionsState,
  setOptionsState,
}: {
  optionsState: IssueOptions;
  setOptionsState: Dispatch<IssueOptions>;
}) {
  const toggleIssueStateFilter = (issueState: IssueOpenOrClosedState) => {
    setOptionsState({
      openOrClosed: issueState,
      page: 1,
    });
  };

  return (
    <Container>
      <div>Issue State: </div>
      <ChooseStateButtons>
        <IssueStateButton
          selected={optionsState.openOrClosed === ISSUE_STATE.OPEN}
          onClick={() => toggleIssueStateFilter(ISSUE_STATE.OPEN)}
        >
          OPEN
        </IssueStateButton>
        <IssueStateButton
          selected={optionsState.openOrClosed === ISSUE_STATE.CLOSED}
          onClick={() => toggleIssueStateFilter(ISSUE_STATE.CLOSED)}
        >
          CLOSED
        </IssueStateButton>
      </ChooseStateButtons>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  height: 2rem;
  gap: 1rem;
  padding: 0.3rem 0.5rem;
  align-items: center;
`;
const ChooseStateButtons = styled.div`
  display: inline;
  width: 10rem;
  height: 1.3rem;
  border: 1px solid ${theme.borderColor};
  border-radius: 10px;
  display: flex;
  justify-content: stretch;
  align-items: center;
  overflow: hidden;

  > * {
    border-right: 1px solid ${theme.borderColor};
  }
  > *:last-child {
    border-right: none;
  }
`;
const IssueStateButton = styled.div<{ selected: boolean }>`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  cursor: pointer;
  background-color: ${theme.shadowColor};
  ${(props) =>
    props.selected &&
    `  
  box-shadow: inset 1px 2px 5px #777;
  background: #e5e5e5;
  `}
`;
