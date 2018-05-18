// Session 状态的表示

const SessionState = {
    WAIT_INTENT: 0,
    WAIT_CONFIRM: 1,
    WAIT_EVENT: 2,
    WAIT_TIME: 3
}

Object.freeze(SessionState);

exports.SessionState = SessionState;