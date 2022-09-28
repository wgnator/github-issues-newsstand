import { differenceInCalendarDays, differenceInHours } from 'date-fns';
import styled from 'styled-components';
import { MOBILE_WIDTH } from '../../consts/consts';
import { Issue } from '../../types/data';
import Chip from '../UI_common/Chip';

const getTimePassedText = (today: Date, past: Date) => {
  if (today instanceof Date === false || past instanceof Date === false) return undefined;
  const differenceInDays = differenceInCalendarDays(today, past);
  if (differenceInDays === 1) return 'yesterday';
  if (differenceInDays > 1) return differenceInDays + ' days ago';
  if (differenceInDays === 0) return differenceInHours(today, past) + ' hours ago';
};

export default function IssueItem({
  data,
  backgroundColor,
}: {
  data?: Issue;
  backgroundColor?: string;
}) {
  const today = new Date();

  return data ? (
    <Container backgroundColor={backgroundColor}>
      <a href={data.html_url} target="blank">
        <TitleWrapper>
          <Title>{data.title}</Title>
          {data.labels.map((label) => (
            <IssueLabel key={label.id} color={'#' + label.color}>
              {label.name}
            </IssueLabel>
          ))}
        </TitleWrapper>
        <div>
          #{data.number} opened {getTimePassedText(today, new Date(data.created_at))}
        </div>
      </a>
    </Container>
  ) : (
    <Container>
      <div>
        <TitleWrapper>
          <Title>
            <Dummy />
          </Title>

          <IssueLabel>
            <Dummy />
          </IssueLabel>
        </TitleWrapper>
        <div>
          <Dummy />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.li<{ backgroundColor?: string }>`
  background-color: ${(props) => props.backgroundColor};
  a {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    * {
      line-height: 1.1;
    }
  }
  @media (max-width: ${MOBILE_WIDTH}px) {
    font-size: 0.8rem;
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

const Dummy = styled.div`
  width: 100%;
  height: 1rem;
  animation: skeleton-gradient 1s infinite;
`;
