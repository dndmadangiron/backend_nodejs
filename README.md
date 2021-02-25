![header](https://capsule-render.vercel.app/api?type=cylinder&color=gradient&height=150&section=header&text=장%20:%20마당&fontSize=40)

### 📅 When?
> 2019.12.28 ~ 2020.03.07 : DND 2기 (장 : 마당 프로젝트)

### 🤔 Why?
> 중고거래 시장에 허위매물이 많고, 검색을 많이 해보지 않으면 시세를 알기 어렵다는 점이 문제라고 생각하였습니다.
> 
> 장 : 마당 에서는 특정 상품에 대해 비슷한 가격을 설정한 구매자와 판매자를 매칭시켜주고, 그렇게 쌓인
> 
> 실거래 데이터로 시세 차트를 제공하여, 사용자들이 상품의 시세를 편리하게 파악할 수 있게해주는 서비스를 만드는것이
> 
> 장 : 마당 프로젝트 팀의 목표였습니다.

### 😫 But..
> 패기롭게 시작하였지만, 막상 설계를 생각하고보니 초보들이 구현하기에 만만치 않은 서비스란것을 알게되었습니다.
> 
> 사용자 매칭 알고리즘은 생각보다 신경쓸게 너무 많았고, 매칭을 한다고 해도 특정 상품으로 매칭을 하기 위해서는 결국
> 
> 상품 Key가 정해져 있어야 하는데, 그러면 데이터를 미리 쌓아놓을지 사용자가 등록하게 할지도 판단하기 어려웠습니다.
> 
> 그래서 일단 할 수 있는것 부터 시작했습니다.

### 🙂 So
> 일단 프론트(안드로이드) 개발 파트와 논의하여 로그인, 회원가입, 상품검색, 카테고리검색, 상품판매순위 등의 간단한 기능부터
> 
> 개발해보기로 결정하고 개발에 착수하였습니다. 프로젝트를 시작할 당시 NodeJS로 프로젝트를 하는것은 처음이어서
> 
> 프로젝트 구조와 운영환경을 어떻게 구성할지 고민을 많이 하였습니다. 

### 🛠 Stack
<img src="https://user-images.githubusercontent.com/45728407/108736071-987e4400-7574-11eb-80ea-af03202b827e.png" height="80"><img src="https://user-images.githubusercontent.com/45728407/108736113-a59b3300-7574-11eb-9b86-94de336d5e37.png" height="80"><img src="https://user-images.githubusercontent.com/45728407/108736396-eabf6500-7574-11eb-9c51-2e802b53d99c.png" height="50"><img src="https://user-images.githubusercontent.com/45728407/108736458-fc087180-7574-11eb-96b1-b3938b2e42c4.png" height="80"><img src="https://user-images.githubusercontent.com/45728407/108223862-9f284800-717d-11eb-8787-701f5f341cdd.png" height="80"><img src="https://user-images.githubusercontent.com/45728407/108736521-0aef2400-7575-11eb-8285-8559cde66b09.png" height="50">

### API 
1. 유저 회원가입
* ENDPOINT : /register
* DESCRIPTION : 사용자가 회원가입 할 때 API 사용. 

``` JSON
# REQUEST

{
	"user_id":"01034708942",
	"user_pw":"123",
	"user_name":"madang",
	"user_nickname":"dnd"
}
```

``` JSON
# RESPONSE

//요청 성공
{
  "code":"200",
	"result": {
		"isRegister": true
	}
}

//요청 파라메터 에러
{
  "code":"403",
	"result": {
	  "isRegister":false
  }
}

//서버 로직에러
{
  "code":"503",
  "result": {
		"isRegister":false
	}
}
```

2. 유저 아이디 중복검사 API (GET)2. 유저 아이디 중복검사 API (GET)
* ENDPOINT : /users/{user_id}
* DESCRIPTION : 사용자의 아이디를 중복 체크할 때 API 사용.

```
# REQUEST

http://API서버주소/users/jinan159
```

```JSON
# RESPONSE:  (true : 사용가능, false : 사용불가능(중복))

//요청 성공(사용가능)
{
  "code":"200",
	"result": {
	  "user_check": true
	}
}

//요청 파라메터 에러(사용불가)
{
  "code":"403",
	"result": {
	  "user_check": false
	}
}

//서버 로직에러(사용불가)
{
  "code":"503",
  "result": {
	  "user_check": false
	}
}
```

2-1. 유저 닉네임 중복검사 API (GET)
* ENDPOINT : /users/nickname/{nickname}
* DESCRIPTION : 사용자의 닉네임 중복 체크할 때 API 사용.

```
# REQUEST

http://API서버주소/users/nickname/jinanNickName
```

```JSON
# RESPONSE

//요청 성공(사용가능)
{
  "code":"200",
	"result": {
	  "nickname_check": true
	}
}

//요청 파라메터 에러(사용불가)
{
  "code":"403",
  "result": {
	  "nickname_check": false
	}
	
}

//서버 로직에러(사용불가)
{
  "code":"503",
  "result": {
	  "nickname_check": false
	}
}
```

3. 로그인 API (POST)
* ENDPOINT : /auth/login
* DESCRIPTION : 유저의 아이디, 비밀번호를 입력 시 결과 반환. 
* HTTP HEADER 에 token 이라는 이름으로 jwt토큰 전송 (60분 후 token expire)

```JSON
# REQUEST

{
  "user_id":"01000000000",
  "user_pw":"123",
}
```

```JSON
# RESPONSE

//요청 성공
"Header" : {
	"token":""
}
{
  "code":"200",
	"result": {
	  "isLoggedIn": true
	}
}


//요청 파라메터 에러
{
  "code":"403",
  "result": {
	  "isLoggedIn": false
	}
}

//서버 로직에러
{
  "code":"503",
  "result": {
	  "isLoggedIn": false
	}
}
```

4. 카테고리 API (GET)
* ENDPOINT : /category/all
* DESCRIPTION : 모든 카테고리를 대분류, 중분류, 소분류의 트리구조로 반환

```
# REQUEST

http://API서버주소/category/all
```

```JSON
# RESPONSE

//요청 성공
{
	"code": "",
	"result": {
		"category": [{
			"cate_id" : 1,
			"cate_bg" : "01",
			"cate_md" : "00",
			"cate_sm" : "00",
			"cate_name" : "카테고리 대분류",
			"matchYN" : "N",
			"item_md" : [{
				"cate_id" : 2,
				"cate_bg" : "01",
				"cate_md" : "01",
				"cate_sm" : "00",
				"cate_name" : "카테고리 중분류",
				"matchYN" : "N",
				"item_sm" : [{
					"cate_id" : 3,
					"cate_bg" : "01",
					"cate_md" : "01",
					"cate_sm" : "01",
					"cate_name" : "카테고리 소분류",
					"matchYN" : "N",
				}, {...}, {...}, ... ] /* 소분류 */
			}, {...}, {...}, ... ] /* 중분류 */
		}, {...}, {...}, ... ] /* 대분류*/
	}
}

//요청 파라메터 에러
{
  "code":"403",
  "result": {
	  "category": {}
	}
}

//서버 로직에러
{
  "code":"503",
  "result": {
	  "category": {}
	}
}
```

4-1 카테고리 대분류 (GET)
* ENDPOINT : /category/bg
* DESCRIPTION : 모든 대분류 카테고리 반환

```
# REQUEST

http://API서버주소/category/bg
```

```JSON
# RESPONSE

//요청 성공
{
	"code": "",
	"result": {
		"category": [{
			"cate_id" : 1,
			"cate_bg" : "01",
			"cate_md" : "00",
			"cate_sm" : "00",
			"cate_name" : "카테고리 대분류",
			"matchYN" : "N",
			}, {
			"cate_id" : 2,
			"cate_bg" : "02",
			"cate_md" : "00",
			"cate_sm" : "00",
			"cate_name" : "카테고리 대분류2",
			"matchYN" : "N",
			}] /* 대분류*/
	}
}

//요청 파라메터 에러
{
  "code":"403",
  "result": {
	  "category": {}
	}
}

//서버 로직에러
{
  "code":"503",
  "result": {
	  "category": {}
	}
}
```

4-2. 카테고리 중분류 (GET)
* ENDPOINT : /category/md
* DESCRIPTION : 모든 카테고리를 대분류, 중분류, 소분류의 트리구조로 반환
```
# REQUEST

필수 파라미터 : cate_bg (대분류 코드)
옵션 파라미터 : cate_md (중분류 코드)

http://api.madangiron.kro.kr/category/md?cate_bg=01 
	=> 01번 대분류의 중분류만 모두 반환
http://api.madangiron.kro.kr/category/md?cate_bg=01&cate_md=01 
	=> 01번 대분류의 01번 중분류 항목 반환
```

```JSON
# RESPONSE

//요청 성공
{
	"code": "",
	"result": {
		"category": [{
				"cate_id" : 1,
				"cate_bg" : "01",
				"cate_md" : "01",
				"cate_sm" : "00",
				"cate_name" : "카테고리 중분류",
				"matchYN" : "N",
			}, {					
				"cate_id" : 2,
				"cate_bg" : "01",
				"cate_md" : "01",
				"cate_sm" : "00",
				"cate_name" : "카테고리 중분류2",
				"matchYN" : "N",
			}, {...}, {...}, ... ]
	}
}

//요청 파라메터 에러
{
  "code":"403",
  "result": {
	  "category": {}
	}
}

//서버 로직에러
{
  "code":"503",
  "result": {
	  "category": {}
	}
}
```

4-3. 카테고리 소분류 (GET)
* ENDPOINT : /category/sm
* DESCRIPTION : 모든 카테고리를 대분류, 중분류, 소분류의 트리구조로 반환
```
# REQUEST

필수 파라미터 : cate_bg, cate_md (대분류, 소분류 코드)
옵션 파라미터 : cate_sm (소분류 코드)

http://api.madangiron.kro.kr/category/md?cate_bg=01&cate_md=01 
	=> 01번 대분류의 01번 중분류의 모든 소분류 반환

http://api.madangiron.kro.kr/category/md?cate_bg=01&cate_md=01 &cate_sm=01
	=> 01번 대분류의 01번 중분류의 01번 소분류 항목 반환
```

```JSON
# RESPONSE

//요청 성공
{
	"code": "",
	"result": {
		"category": [{
				"cate_id" : 1,
				"cate_bg" : "01",
				"cate_md" : "01",
				"cate_sm" : "01",
				"cate_name" : "카테고리 소분류",
				"matchYN" : "N",
			}, {					
				"cate_id" : 2,
				"cate_bg" : "01",
				"cate_md" : "01",
				"cate_sm" : "02",
				"cate_name" : "카테고리 소분류2",
				"matchYN" : "N",
			}, {...}, {...}, ... ]
	}
}

//요청 파라메터 에러
{
  "code":"403",
  "result": {
	  "category": {}
	}
}

//서버 로직에러
{
  "code":"503",
  "result": {
	  "category": {}
	}
}
```

5. 상품 검색 API (GET)
* ENDPOINT : /search/prdName
* DESCRIPTION : 간편거래 상품 키워드를 통해, 간편거래 상품 리스트 조회

```
# REQUEST

필수 파라미터 : prd_name (상품명. 키워드 검색가능)
옵션 파라미터 : prd_id (반환되는 데이터에서 mch_prd_id가 상품 id임)
							 page, size (size만큼 데이터가 출력되고, size에 맞춰 페이지 출력)

http://api.madangiron.kro.kr/search/prdName?prd_name=아이폰
	=> 아이폰 키워드 들어간 모든 상품명

http://api.madangiron.kro.kr/search/prdName?prd_name=아이폰&page=1&size=10
	=> 아이폰 키워드 들어간 모든 상품 반환
```

```JSON
# RESPONSE

http://api.madangiron.kro.kr/search/prdName?prd_name=아이폰XS&page=1&size=2
//요청 성공
{
  "code": "200",
  "result": { 
    "total": 33,
    "products": [
      {
        "mch_prd_id": 32,
        "mch_prd_cate": "060201",
        "cate_name": "모바일/태블릿",
        "mch_prd_name": "아이폰XS MAX 64GB"
      },
      {
        "mch_prd_id": 31,
        "mch_prd_cate": "060201",
        "cate_name": "모바일/태블릿",
        "mch_prd_name": "아이폰XS 256GB"
      }
    ]
  }
}

//요청 파라메터 에러
{
  "code": "403",
  "result": {
    "total": "",
    "products": {}
  }
}

//서버 로직에러
{
  "code": "503",
  "result": {
    "total": "",
    "products": {}
  }
}
```
