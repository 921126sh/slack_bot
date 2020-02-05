1. git clone xxxx
2. https://api.slack.com/apps -> create app 
3. .env 설정값 셋팅
4. perimission -> scrope -> chat:write(봇 글쓰기) 설정
5. install app to workspace (bot token generate됨)
6. event subscription ON -> ngRok hosting url
7. Subscribe to bot events -> message.im추가
8. reinstall


# 참고
https://api.slack.com/scopes
https://api.slack.com/events-api
https://slack.dev/bolt/concepts#message-listening
---

.env
SLACK_TOKEN
CLIENT_ID
CLIENT_SECRET
CLIENT_SIGNING_SECRET
VERIFICATION_TOKEN
PORT
REDIRECT_URI