
import { RTMClient, LogLevel, WebClientEvent, TLSOptions, ErrorCode, UsersListArguments, WebAPICallOptions } from "@slack/client";
import SlackEventAdapter, { verifyRequestSignature, errorCodes } from "@slack/events-api";
import dotenv from 'dotenv';

dotenv.config();
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
  console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
  process.exit(1);
}


let token: string | any = process.env.SLACK_BOT_TOKEN;

const rtm = new RTMClient(token, {
  // logLevel: LogLevel.ERROR,
});

rtm.on('member_joined_channel', async (event) => {
  try {
    const reply = await rtm.sendMessage(`Welcome to the channel, <@${event.user}>`, event)
    console.log('Message sent successfully', reply.ts);
  } catch (error) {
    // Check the error code, and when its a platform error, log the whole response
    if (error.code === ErrorCode.SendMessagePlatformError) {
      console.log('error1', error.data);
    } else {
      // Some other error, oh no!
      console.log('Well1, that was unexpected.');
    }
  }
});

rtm.on('connecting', async (event) => {
  try {
    const reply = await rtm.sendMessage(`connecting`, 'DSX5KAFFV');
  } catch (error) {
    // Check the error code, and when its a platform error, log the whole response
    if (error.code === ErrorCode.SendMessagePlatformError) {
      console.log('error2', error.data);
    } else {
      // Some other error, oh no!
      console.log('Well2, that was unexpected.');
    }
  }
});

rtm.on('authenticated', async (event) => {
  try {
    const reply = await rtm.sendMessage(`authenticated`, 'DSX5KAFFV');
  } catch (error) {
    // Check the error code, and when its a platform error, log the whole response
    if (error.code === ErrorCode.SendMessagePlatformError) {
      console.log('error3', error.data);
    } else {
      // Some other error, oh no!
      console.log('Well3, that was unexpected.');
    }
  }
});

rtm.on('connected', async (event) => {
  try {
    const reply = await rtm.sendMessage(`connected`, 'DSX5KAFFV');
  } catch (error) {
    // Check the error code, and when its a platform error, log the whole response
    if (error.code === ErrorCode.SendMessagePlatformError) {
      console.log('error4', error.data);
    } else {
      // Some other error, oh no!
      console.log('Well4, that was unexpected.');
    }
  }
});

rtm.on('ready', async (event) => {
  try {
    const reply = await rtm.sendMessage(`ready`, 'DSX5KAFFV');
  } catch (error) {
    // Check the error code, and when its a platform error, log the whole response
    if (error.code === ErrorCode.SendMessagePlatformError) {
      console.log('error5', error.data);
    } else {
      // Some other error, oh no!
      console.log('Well5, that was unexpected.');
    }
  }
});

rtm.on('disconnecting', async (event) => {
  try {
    const reply = await rtm.sendMessage(`disconnecting`, 'DSX5KAFFV');
  } catch (error) {
    // Check the error code, and when its a platform error, log the whole response
    if (error.code === ErrorCode.SendMessagePlatformError) {
      console.log('error6', error.data);
    } else {
      // Some other error, oh no!
      console.log('Well6, that was unexpected.');
    }
  }
});

rtm.on('reconnecting', async (event) => {
  try {
    const reply = await rtm.sendMessage(`reconnecting`, 'DSX5KAFFV');
  } catch (error) {
    // Check the error code, and when its a platform error, log the whole response
    if (error.code === ErrorCode.SendMessagePlatformError) {
      console.log('error7', error.data);
    } else {
      // Some other error, oh no!
      console.log('Well7, that was unexpected.');
    }
  }
});

rtm.on('disconnected', async (event) => {
  try {
    const reply = await rtm.sendMessage(`disconnected`, 'DSX5KAFFV');
  } catch (error) {
    // Check the error code, and when its a platform error, log the whole response
    if (error.code === ErrorCode.SendMessagePlatformError) {
      console.log('error8', error.data);
    } else {
      // Some other error, oh no!
      console.log('Well8, that was unexpected.');
    }
  }
});


(async () => {
  await rtm.start();
})();