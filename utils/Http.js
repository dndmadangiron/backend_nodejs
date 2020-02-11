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
            "result": {
				"user_check": ""
			}
        }
    },
    // GET /users/nickname/:user_id
    NICKNAME_CHECK: {
        reqJson: 
        {
            "nickname":""
        },
        resJson : {
            "code": "",
			"result": {
                "nickname_check": "",
			}
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
			"result": {
                "isRegister": ""
			}
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
			"result": {
                "isLoggedIn": ""
			}
        }
    },

    // 카테고리 전체 조회
    // GET /category/all
    CATE_ALL: {
        reqJson : { },
        resJson : {
            "code": "",
			"result": {
                "category": {}
			}
        }
    },

    // 카테고리 대분류 조회
    // GET /category/bg
    CATE_BG: {
        reqJson : { },
        resJson : {
            "code": "",
			"result": {
                "category": {}
			}
        }
    },

    // 카테고리 중분류 조회
    // GET /category/md
    CATE_MD: {
        reqJson : { 
            "cate_bg": ""
        },
        resJson : {
            "code": "",
			"result": {
                "category": {}
			}
        }
    },

    // 카테고리 소분류 조회
    // GET /category/sm
    CATE_SM: {
        reqJson : {
            "cate_bg": "",
            "cate_md": ""
         },
        resJson : {
            "code": "",
			"result": {
                "category": {}
			}
        }
    },


}

module.exports = HttpApi;