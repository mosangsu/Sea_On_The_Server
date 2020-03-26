const enableTrace = true;

// 메시지 및 처리 함수의 맵핑 관계 기록
const _cmdMap = {};

// websocket 소식 및 처리 함수의 맵핑 관계 기록합
const _socketCmdMap = {};

// 각각의 처리 함수에 소식 전송
function dispatchCommand(req, res, data)
{
    const cmd = data.cmd;
    if (enableTrace)
    {
        const time = new Date();
        console.log('-----------%s cmd : %s ----------\n%j\n',
            time.toLocaleString(), cmd, data);
    }

    const func = _cmdMap[cmd];
    if (!func)
    {
        console.error('cmd(%s)의 처리함수를 찾을 수 없습니다.', cmd);
        res.json({ ret : false, reason : 'no cmd' });
        return;
    }

    // 전용 메시지 처리 함수
    func(req, res, data);
}

// 지정된 연결에 대한 소식 관심
function dispatchSocketCommand(cmd, socket)
{
    socket.on(cmd, function() {
        dispatchSC(socket, cmd, arguments);
    });
}

// 각각의 처리함수에 socket 소식을 전송
function dispatchSC(socket, cmd, args)
{
    if (enableTrace)
    {
        const time = new Date();
        log('-----------%s cmd : %s ----------\n%j\n',
            time.toLocaleString(), cmd, args);
    }

    const func = _socketCmdMap[cmd];
    if (!func)
    {
        error('cmd(%s)의 처리함수를 찾을 수 없습니다.', cmd);
        return;
    }

    // 전용 메시지 처리 함수
    const argList = [socket];
    for (let i = 0; i < args.length; i++)
        argList.push(args[i]);
    func.apply(null, argList);
}

function registerCmd(cmd, func)
{
    if (_cmdMap[cmd])
        assert(false, util.format('消息(%s)重复注册', cmd));

    _cmdMap[cmd] = func;
}

function registerSocketCmd(cmd, func)
{
    if (_socketCmdMap[cmd])
        assert(false, util.format('socket 소식(%s) 중복 등록', cmd));

    _socketCmdMap[cmd] = func;
}

// export 모듈
// dispatchCommand : cmd 명령 실행
// dispatchSocketCommand : 소켓 명령 실행
// registerCmd : cmd 명령 생성
// registerSocketCmd : 소켓 명령 생성
global.COMMUNICATE_D = module.exports = {
    dispatchCommand : dispatchCommand,
    dispatchSocketCommand: dispatchSocketCommand,
    registerCmd : registerCmd,
    registerSocketCmd : registerSocketCmd,
};