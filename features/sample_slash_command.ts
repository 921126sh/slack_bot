
export default (controller: any) => {
    // controller.on('slash_command', async function (bot: SlackBotWorker, message: any) {
    //     switch (message.command) {
    //         case "/foodme":
    //             if (message.token !== process.env.VERIFICATION_TOKEN) {
    //                 return;
    //             } 
    //             if (message.text === "") {
    //                 let foodmoji = [":coffee:", ":tea:", ":sake:", ":baby_bottle:",
    //                     ":beer:", ":beers:", ":cocktail:", ":tropical_drink:",
    //                     ":wine_glass:", ":fork_and_knife:", ":pizza:", ":hamburger:",
    //                     ":fries:", ":poultry_leg:", ":meat_on_bone:", ":spaghetti:",
    //                     ":curry:", ":fried_shrimp:", ":bento:", ":sushi:", ":fish_cake:",
    //                     ":rice_ball:", ":rice_cracker:", ":rice:", ":ramen:", ":stew:",
    //                     ":oden:", ":dango:", ":egg:", ":bread:", ":doughnut:", ":custard:",
    //                     ":icecream:", ":ice_cream:", ":shaved_ice:", ":birthday:",
    //                     ":cake:", ":cookie:", ":chocolate_bar:", ":candy:", ":lollipop:",
    //                     ":honey_pot:", ":apple:", ":green_apple:", ":tangerine:",
    //                     ":lemon:", ":cherries:", ":grapes:", ":watermelon:",
    //                     ":strawberry:", ":peach:", ":melon:", ":banana:", ":pear:",
    //                     ":pineapple:", ":sweet_potato:", ":eggplant:", ":tomato:",
    //                     ":corn:"
    //                 ];
    //                 let food1 = foodmoji[Math.floor(Math.random() * foodmoji.length)];
    //                 let food2 = foodmoji[Math.floor(Math.random() * foodmoji.length)];
    //                 let food3 = foodmoji[Math.floor(Math.random() * foodmoji.length)];

    //                 bot.replyPublic(message, "How about having " + food1 + " + " + food2 + " + " + food3 + " tonight?");
    //             }

    //             // /foodme help displays this message
    //             if (message.text === "help") {
    //                 bot.replyPrivate(message, "Foodme is a Slack command" +
    //                     " that helps you find something to eat. Just type `/foodme`" +
    //                     " to start.")
    //             }

    //             break;
    //         default:
    //             bot.replyPublic(message, "I'm sorry " + message.user +
    //                 ", I'm afraid I can't do that. :robot_face:");
    //     }
    // });
}