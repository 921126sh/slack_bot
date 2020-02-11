import fs from 'fs';
import { App, RadioButtonsAction } from '@slack/bolt';

export default (app: App) => {
    let employee: any;
    let team = [""];
    let msg = "";
    let role = ["먼지걸레", "먼지걸레", "물걸레", "물걸레", "빗자루", "빗자루", "청소기", "화분/물티슈", "분리수거"];
    let etcRole = "물티슈";

    app.action('button_click', ({ body, ack, say }) => {
        console.log('button_click');
        ack();
    });

    app.action('clean-modal_option_click', ({ action, ack }) => {
        console.log('clean-modal_option_click action ::: ', action);
        if (action.type === "radio_buttons") {
            action.selected_option.value;
            console.log('action::: ', action);
            console.log('action.selected_option.value ::: ', action.selected_option.value);
        }
        else if (action.type === "button") {
            console.log('action::: ', action);
            console.log('action.value ::: ', action.value);
        }

        ack();
    });

    // 모달에 대한 콜백아이디로 submit 요청을 처리한다.
    app.view('clean-modal', async ({ ack, body, view, context }) => {
        ack();
        console.log(JSON.stringify(view.state));

        const user = body.user.id;

        app.client.chat.postMessage({
            token: context.botToken,
            channel: user,
            text: msg
        });
    });

    app.command("/ikoob", async ({ payload, ack, context, say }) => {
        ack();
        let fnNm = payload.text.split(' ')[0];
        if (fnNm === "청소") {
            // let cmd = payload.text.split(' ')[1].toUpperCase();
            // employee = JSON.parse(fs.readFileSync(__dirname + "/employee.json", 'utf8'));

            // if (cmd === "A") {
            //     team = employee.A;
            //     msg = randomClean();
            // }
            // else if (cmd === "B") {
            //     team = employee.B;
            //     msg = randomClean();
            // }
            // else if (cmd === "HELP") {
            //     msg = "\"/청소 A\" 를 입력하면 A조 청소역할분담이 나옵니다. :robot_face:";
            // }
            // else {
            //     msg = "\"/청소 help\" 로 명령을 확인해주세요! :robot_face:";
            // }



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
                                "action_id": "clean-modal_option_click",
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
                                    "action_id": "clean-modal_option_click",
                                    "type": "button",
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Button",
                                        "emoji": true
                                    },
                                    "value": "click_me_123"
                                }
                            ]
                        }
                    ]
                }
            });

            // const result = await app.client.views.open({
            //     token: context.botToken,
            //     trigger_id: payload.trigger_id,
            //     view: {
            //         "type": "modal",
            //         "callback_id": "clean-modal",
            //         "title": {
            //             "type": "plain_text",
            //             "text": "청소를 합니다",
            //             "emoji": true
            //         },
            //         "submit": {
            //             "type": "plain_text",
            //             "text": "역할배정",
            //             "emoji": true
            //         },
            //         "close": {
            //             "type": "plain_text",
            //             "text": "취소",
            //             "emoji": true
            //         },
            //         "blocks": [
            //             {
            //                 "type": "divider"
            //             },
            //             {
            //                 "type": "input",
            //                 "label": {
            //                     "type": "plain_text",
            //                     "text": "User(s)"
            //                 },
            //                 "element": {
            //                     "type": "multi_users_select",
            //                     "placeholder": {
            //                         "type": "plain_text",
            //                         "text": "Where should the poll be sent?"
            //                     }
            //                 }
            //             },
            //             {
            //                 "block_id": "section-clean",
            //                 "type": "actions",
            //                 "elements": [
            //                     {
            //                         "action_id": "button_click",
            //                         "type": "button",
            //                         "text": {
            //                             "type": "plain_text",
            //                             "text": "Button",
            //                             "emoji": true
            //                         },
            //                         "value": "click_me_123"
            //                     },
            //                     {
            //                         "action_id": "clean-modal_option_click",
            //                         "type": "radio_buttons",
            //                         "options": [
            //                             {
            //                                 "text": {
            //                                     "type": "plain_text",
            //                                     "text": "Option 1"
            //                                 },
            //                                 "value": "option 1",
            //                                 "description": {
            //                                     "type": "plain_text",
            //                                     "text": "Description for option 1"
            //                                 }
            //                             },
            //                             {
            //                                 "text": {
            //                                     "type": "plain_text",
            //                                     "text": "Option 2"
            //                                 },
            //                                 "value": "option 2",
            //                                 "description": {
            //                                     "type": "plain_text",
            //                                     "text": "Description for option 2"
            //                                 }
            //                             },
            //                             {
            //                                 "text": {
            //                                     "type": "plain_text",
            //                                     "text": "Option 3"
            //                                 },
            //                                 "value": "option 3",
            //                                 "description": {
            //                                     "type": "plain_text",
            //                                     "text": "Description for option 3"
            //                                 }
            //                             }
            //                         ]
            //                     }
            //                 ]
            //             }
            //         ]
            //     }
            // });
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