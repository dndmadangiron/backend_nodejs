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

    // 검색 : 매치 상품명
    // GET /search/prdName
    SEARCH_PRD: {
        reqJson : {
            "prd_name": "",
            //prd_id 옵션
            //page 페이지
            //size 페이지 사이즈
         },
        resJson : {
            "code": "",
			"result": {
                "total" : '',
                "products": {}
			}
        }
    },


}

module.exports = HttpApi;