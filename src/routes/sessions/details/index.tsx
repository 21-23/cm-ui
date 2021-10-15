// YOLO: on

import { FunctionalComponent, h } from 'preact';

type SessionDetailsPropsType = {
  sessionId: string,
};
const SessionDetails: FunctionalComponent<SessionDetailsPropsType> = ({ sessionId }) => {
  return (
    <div>
      SESSION DETAILS
      {sessionId}
    </div>
  );
}

export default SessionDetails;
