import fs from 'fs';
import { App } from '@slack/bolt';

export default (app: App) => {
    let employee: any;
    let team = [""];
    let msg = "";
    let role = ["먼지걸레", "먼지걸레", "물걸레", "물걸레", "빗자루", "빗자루", "청소기", "화분/먼지털이", "분리수거"];
    let etcRole = "물티슈";

    // // 모달에 대한 콜백아이디로 submit 요청을 처리한다.
    // app.view('clean-modal', async ({ ack, body, view, context }) => {
    //     ack();
    //     console.log(JSON.stringify(view.state));

    //     const user = body.user.id;

    //     app.client.chat.postMessage({
    //         token: context.botToken,
    //         channel: user,
    //         text: msg
    //     });
    // });

    app.action('clean-modal_action', ({ body, action, ack, say, context }) => {
        ack();
        if (action.type === "radio_buttons") {
            let val = action.selected_option.value;
            if (val === "A") {
                team = employee.A;
                msg = randomClean();
            }
            else if (val === "B") {
                team = employee.B;
                msg = randomClean();
            }
        }
        else if (action.type === "button") {
            if ("random" === action.value) {
                app.client.chat.postMessage({
                    token: context.botToken,
                    channel: body.user.id,
                    text: msg
                });
            }
        }

    });

    app.command("/ikoob", async ({ payload, ack, context, say }) => {
        ack();
        let fnNm = payload.text.split(' ')[0];
        if (fnNm === "청소") {
            let cmd = payload.text.split(' ')[1];
            if (cmd === "?") {
                msg = "\"/청소 A\" 를 입력하면 A조 청소역할분담이 나옵니다. :robot_face:";
            }
            else if (undefined === cmd) {
                employee = JSON.parse(fs.readFileSync(__dirname + "/employee.json", 'utf8'));

                const result = await app.client.views.open({
                    token: context.botToken,
                    trigger_id: payload.trigger_id,
                    view: {
                        "type": "modal",
                        "callback_id": "clean-modal",
                        "title": {
                            "type": "plain_text",
                            "text": "청소를 합시다",
                            "emoji": true
                        },
                        "close": {
                            "type": "plain_text",
                            "text": "취소",
                            "emoji": true
                        },
                        "blocks": [
                            {
                                "type": "section",
                                "text": {
                                    "type": "mrkdwn",
                                    "text": "This is a section block with radio button accessory"
                                },
                                "accessory": {
                                    "action_id": "clean-modal_action",
                                    "type": "radio_buttons",
                                    "options": [
                                        {
                                            "text": {
                                                "type": "plain_text",
                                                "text": "A조"
                                            },
                                            "value": "A",
                                        },
                                        {
                                            "text": {
                                                "type": "plain_text",
                                                "text": "B조"
                                            },
                                            "value": "B"
                                        }
                                    ]
                                }
                            },
                            {
                                "type": "actions",
                                "elements": [
                                    {
                                        "action_id": "clean-modal_action",
                                        "type": "button",
                                        "text": {
                                            "type": "plain_text",
                                            "text": "GO!",
                                            "emoji": true
                                        },
                                        "value": "random"
                                    }
                                ]
                            }
                        ]
                    }
                });
            }
            else {
                msg = "\"/청소 help\" 로 명령을 확인해주세요! :robot_face:";
            }
        }
    });

    /**
     * 청소 역할 랜덤으로 만들기
     */
    function randomClean(): string {
        let msg = "";
        // 역할보다 인원이 많으면 기타역할 추가
        if (role.length < team.length) {
            let len = role.length - team.length;
            for (let index = 0; index < len; index++) {
                role.push(etcRole);
            }
        }

        for (let index = 0, length = team.length; index < length; index++) {
            // 인덱스, 직원, 역할
            let rRoleIdx: number = 0;
            let member: string = "";
            let mRole: string = etcRole;

            // 랜덤으로 역할 할당
            member = team[index];
            if (0 < role.length) {
                rRoleIdx = Math.floor(Math.random() * role.length);
                mRole = role[rRoleIdx];
            }

            // 뽑힌 역할 제거
            role.splice(rRoleIdx, 1);

            // 메시지 조립
            msg += `${member} ===> ${mRole}\n`;
        }

        return msg;
    }
}