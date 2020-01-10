let HttpApi = 
{
    // GET /users/:user_id
    USER_CHECK: {
        reqJson: 
        {
            "user_id":""
        },
        resJson : {
            "code": "",
            "user_check": "",
        }
    },
    // POST /register
    REGISTER: {
        reqJson :  {
            "user_id":"",
            "user_pw":"",
            "user_name":"",
            "user_nickname":""
        },
        resJson : {
            "code": "",
            "msg": "",
        }
    }, 
    // POST /auth/login
    LOGIN: {
        reqJson : {
            "user_id": "",
            "user_pw": ""
        },
        resJson : {
            "code": "",
            "isLoggedIn": "",
        }
    }
}

module.exports = HttpApi;