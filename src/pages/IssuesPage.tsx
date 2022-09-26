import { useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { differenceInCalendarDays, differenceInHours } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/UI/Button";
import Chip from "../components/UI/Chip";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useIssuesQuery from "../fetch_modules/issues/useIssuesQuery";
import { theme } from "../styles/theme";
import { Issue, IssueOptions, IssueOpenOrClosedStatus, ISSUE_STATE } from "../types/data";
import { sortByDate } from "../utils/sort";

const getTimePassedText = (today: Date, past: Date) => {
  if (today instanceof Date === false || past instanceof Date === false) return undefined;
  const differenceInDays = differenceInCalendarDays(today, past);
  if (differenceInDays === 1) return "yesterday";
  if (differenceInDays > 1) return differenceInDays + " days ago";
  if (differenceInDays === 0) return differenceInHours(today, past) + " hours ago";
};

export default function IssuesPage() {
  const { repoId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState<IssueOptions>({
    selectedRepoId: repoId,
    openOrClosed: ISSUE_STATE.OPEN,
    page: 1,
  });

  const { results, hasNextPage } = useIssuesQuery(selectedOptions);
  const today = new Date();
  const queryClient = useQueryClient();

  const toggleIssueStateFilter = (issueState: IssueOpenOrClosedStatus) => {
    setSelectedOptions({ ...selectedOptions, openOrClosed: issueState, page: 1 });
  };

  const getIsLoading = (results: UseQueryResult[]) =>
    results.length > 0 ? results.some((result) => result.isLoading) : false;

  const getIssues = (results: UseQueryResult<Issue[]>[]): (Issue | undefined)[] => {
    const allIssues = results.map((result) => result.data).flat();
    return selectedOptions.selectedRepoId
      ? queryClient.getQueryData([
          "issues",
          Number(selectedOptions.selectedRepoId),
          selectedOptions.openOrClosed,
          selectedOptions.page,
        ]) || []
      : sortByDate(allIssues, "created_at", "desc");
  };

  useEffect(() => {
    setSelectedOptions({ ...selectedOptions, selectedRepoId: repoId });
  }, [repoId]);

  return (
    <Container>
      <IssuesContainer>
        <ToolBar>
          <div>Issue State: </div>
          <ChooseStateButtons>
            <IssueStateButton
              selected={selectedOptions.openOrClosed === ISSUE_STATE.OPEN}
              onClick={() => toggleIssueStateFilter(ISSUE_STATE.OPEN)}
            >
              OPEN
            </IssueStateButton>
            <IssueStateButton
              selected={selectedOptions.openOrClosed === ISSUE_STATE.CLOSED}
              onClick={() => toggleIssueStateFilter(ISSUE_STATE.CLOSED)}
            >
              CLOSED
            </IssueStateButton>
          </ChooseStateButtons>
        </ToolBar>
        {results && getIsLoading(results) && "Loading..."}
        {results &&
          !getIsLoading(results) &&
          getIssues(results)?.map(
            (issue: Issue | undefined) =>
              issue && (
                <Item key={issue.id}>
                  <a href={issue.html_url} target="blank">
                    <TitleWrapper>
                      <Title>{issue.title}</Title>
                      {issue.labels.map((label) => (
                        <IssueLabel key={label.id} color={"#" + label.color}>
                          {label.name}
                        </IssueLabel>
                      ))}
                    </TitleWrapper>
                    <div>Repository: {issue.repoFullName}</div>
                    <div>
                      #{issue.number} opened {getTimePassedText(today, new Date(issue.created_at))}
                    </div>
                    <div>{issue.state}</div>
                  </a>
                </Item>
              )
          )}
        <PageNav>
          {selectedOptions.page > 1 && (
            <PrevButton
              onClick={() =>
                setSelectedOptions({ ...selectedOptions, page: selectedOptions.page - 1 })
              }
            >
              &lt; Previous Page
            </PrevButton>
          )}
          Page {selectedOptions.page}
          {hasNextPage && (
            <NextButton
              onClick={() =>
                setSelectedOptions({ ...selectedOptions, page: selectedOptions.page + 1 })
              }
            >
              Next Page &gt;
            </NextButton>
          )}
        </PageNav>
      </IssuesContainer>
    </Container>
  );
}

const Container = styled.main`
  width: 100%;
  padding: 1rem;
  max-height: 100%;
  overflow: auto;
`;
const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.3rem 0.5rem;
  align-items: center;
`;
const ChooseStateButtons = styled.div`
  display: inline;
  width: 10rem;
  height: 2rem;
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
const IssuesContainer = styled.div`
  width: 90%;
  border: 1px solid ${theme.borderColor};
  border-radius: 5px;
  margin: auto;
  > * {
    border-bottom: 0.5px solid ${theme.borderColor};
    padding: 0.5rem;
  }
  > *:last-child {
    border-bottom: none;
  }
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.li`
  a {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    * {
      line-height: 1.1;
    }
  }
`;

const TitleWrapper = styled.div`
  word-wrap: break-word;
`;
const Title = styled.h3`
  display: inline;
  max-width: 70%;
`;

const IssueLabel = styled(Chip)`
  display: inline-block;
  margin: 0.2rem 0.25rem;
`;

const PageNav = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 2rem;
`;

const PrevButton = styled(Button)`
  position: absolute;
  left: 1rem;
  font-size: 0.8rem;
`;
const NextButton = styled(Button)`
  position: absolute;
  right: 1rem;
  font-size: 0.8rem;
`;
