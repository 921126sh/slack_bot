import fs from 'fs';
import { App } from '@slack/bolt';

export default (app: App) => {
    let employee: any;
    let role = ["먼지걸레", "먼지걸레", "물걸레", "물걸레", "빗자루", "빗자루", "청소기", "화분/물티슈", "분리수거"];
    let etcRole = "물티슈";

    app.command("/clean", async ({ command, ack, say }) => {
        console.log('command', command);
        employee = JSON.parse(fs.readFileSync(__dirname + "/employee.json", 'utf8'));

        let msg = "";
        let cmd = command.text.toUpperCase();

        if (cmd === "A") {
            let team = employee.A;

            // 역할보다 인원이 많으면 기타역할 추가
            if (role.length < team.length) {
                appendRole(team.length - role.length);
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

            say(msg);
        }
        else if (cmd === "B") {
            let team = employee.B;

            // 역할보다 인원이 많으면 기타역할 추가
            if (role.length < team.length) {
                appendRole(team.length - role.length);
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

            say(msg);
        }
        // help displays this message
        else if (cmd === "HELP") {
            say("\"/clean A\" 를 입력하면 A조 청소역할분담이 나옵니다. :robot_face:");
        }
        else {
            say("\"/clean help\" 로 명령을 확인해주세요! :robot_face:");
        }

        ack();
        console.log("Entered into the app.command for /clean");

    });

    function appendRole(len: number): void {
        for (let index = 0; index < len; index++) {
            role.push(etcRole);
        }
    }
}