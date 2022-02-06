// YOLO: on

import { FunctionalComponent, h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { fetchFullSet } from '../../../services/set';
import { createSession } from '../../../services/session';
import Set from '../../../components/sets/Set';
import type { NewSessionStateType, FullSetType } from '../../../types/types';

import style from './style.css';

type NewSessionPropsType = {
  setId?: string,
};

const NewSession: FunctionalComponent<NewSessionPropsType> = (props) => {
  const _now = new Date();
  const [set, setSet] = useState<FullSetType | null>(null);
  const [session, setSession] = useState<NewSessionStateType>({
    setId: props.setId || '',
    name: { value: '', valid: false, message: 'Name can not be empty' },
    alias: { value: '', valid: false, message: 'Alias can not be empty' },
    date: { value: _now, internal: _now.toISOString(), valid: true, message: '' },
  });

  useEffect(() => {
    if (!session.setId) {
      setSet(null);
      return;
    }

    fetchFullSet(session.setId).then((puzzleSet) => {
      setSet(puzzleSet);
    }, (error) => {
      alert(JSON.stringify(error));
    })
  }, [session.setId]);

  function onNameChange(event: JSX.TargetedEvent<HTMLInputElement, Event>): void {
    const { value } = event.currentTarget;

    if (!value) {
      return setSession({ ...session, name: { value, valid: false, message: 'Name can not be empty' } });
    }

    return setSession({ ...session, name: { value, valid: true, message: '' } });
  }

  function onAliasChange(event: JSX.TargetedEvent<HTMLInputElement, Event>): void {
    const { value } = event.currentTarget;

    if (!value) {
      return setSession({ ...session, alias: { value, valid: false, message: 'Alias can not be empty' } });
    }

    if (!/^[A-Za-z0-9_-]+$/.test(value)) {
      return setSession({ ...session, alias: { value, valid: false, message: 'Alias can contain only letters, numbers, dash and underscore' } });
    }

    return setSession({ ...session, alias: { value, valid: true, message: '' } });
  }

  function onDateChange(event: JSX.TargetedEvent<HTMLInputElement, Event>): void {
    const { validity, valueAsDate } = event.currentTarget;

    if (!validity.valid || !valueAsDate) {
      return setSession({ ...session, date: { value: new Date(), valid: false, message: 'Invalid date' } });
    }

    return setSession({ ...session, date: { value: valueAsDate, internal: valueAsDate.toISOString(), valid: true, message: '' } });
  }

  async function createSessionClick() {
    try {
      const alias = await createSession(session);
      alert(`Session created! Session alias = ${alias}`);
    } catch(error) {
      alert(JSON.stringify(error));
    }
  }

  return (
    <>
      <div class={style.title}>
        NEW SESSION
      </div>
      <div class={style.actions}>
        <button className="-positive -bigger" onClick={createSessionClick}>Create</button>
      </div>
      <div class={style.inputs}>
        <div class={style.setId}>
          <div class={style.propName}>Set id:</div>
          <input value={session.setId} onInput={(event) => setSession({ ...session, setId: event.currentTarget.value })} class={style.setIdInput} />
        </div>
        <div class={style.name}>
          <div class={style.propName}>Name:</div>
          <input class={session?.name?.valid ? style.inputValid : style.inputInvalid} value={session?.name?.value || ''} onInput={onNameChange} />
          {session?.name?.message && <div class={style.errorMessage}>{session?.name?.message}</div>}
        </div>
        <div class={style.alias}>
          <div class={style.propName}>Alias:</div>
          <input class={session?.alias?.valid ? style.inputValid : style.inputInvalid} value={session?.alias?.value || ''} onInput={onAliasChange} />
          {session?.alias?.message && <div class={style.errorMessage}>{session?.alias?.message}</div>}
        </div>
        <div class={style.alias}>
          <div class={style.propName}>Date:</div>
          <input
            type="date"
            min={new Intl.DateTimeFormat('en-CA', {}).format(new Date())}
            class={session?.date?.valid ? style.inputValid : style.inputInvalid}
            value={new Intl.DateTimeFormat('en-CA', {}).format(session?.date?.value)}
            onInput={onDateChange}
          />
          {session?.date?.message && <div class={style.errorMessage}>{session?.date?.message}</div>}
        </div>
      </div>
      <div class={style.setContainer}>
        <div class={style.setContainerHeading}>Puzzle set:</div>
        <Set set={set} collapsed={true} />
      </div>
    </>
  );
}

export default NewSession;
