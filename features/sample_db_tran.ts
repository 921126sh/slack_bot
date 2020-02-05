import { App } from "@slack/bolt";
import { getUsers } from "../services/user-service";

export default (app: App) => {
    app.command("/test", async ({ command, ack, say }) => {
        getUsers().then((x: any) => {
            ack();
            console.log('xxxxcxcxcxcxcx', x);
            say(JSON.stringify(x));
        });
    });
}