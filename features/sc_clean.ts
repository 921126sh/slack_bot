
export default (controller: any) => {
    // controller.on('slash_command', async (bot: SlackBotWorker, message: any) => {
        
    //     switch (message.command) {
    //         case "/clean":
    //             if (message.token !== process.env.VERIFICATION_TOKEN) {
    //                 return;
    //             }
    //             let cleanRole = ["먼지걸레", "먼지걸레", "물걸레", "물걸레", "빗자루", "빗자루", "청소기", "화분/물티슈", "분리수거"];

    //             if (message.text === "A") {
    //                 let teamA = [""];
    //                 let food1 = cleanRole[Math.floor(Math.random() * cleanRole.length)];
    //                 bot.replyPublic(message, "클린크린");
    //             }
    //             else if (message.text === "B") {
    //                 let teamB = ["조용범 부장님", "송은미 대리님", "권영화 주임님", "이재혁 부장님", "김영근 차장님", "박수정 차장님", "하연우 대리님", "김성현 주임님", "황광훈씨"];
    //                 let food1 = cleanRole[Math.floor(Math.random() * cleanRole.length)];
    //             }
    //             // /foodme help displays this message
    //             else if (message.text === "help") {
    //                 bot.replyPrivate(message, "\"/clean A\" 를 입력하면 A조 청소역할분담이 나옵니다.");
    //             }

    //             break;
    //         default:
    //             bot.replyPublic(message, "I'm sorry " + message.user +
    //                 ", I'm afraid I can't do that. :robot_face:");
    //     }
    // });
}