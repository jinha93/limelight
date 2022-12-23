module.exports = {

    NOT_FOUND: "루트가 잘못되었습니다.",
    UNKNOWN_ERROR: "알 수 없는 에러가 발생했습니다.",

    NULL_VALUE: "필요한 값이 없습니다.",
    OUT_OF_VALUE: "파라미터 값이 잘못 되었습니다.",

    DATA_ADD_SUCCESS: "데이터가 성공적으로 추가 되었습니다.",
    DATA_ADD_FAIL: "데이터 추가가 실패하였습니다.",
    DATA_UPDATE_SUCCESS: "데이터가 성공적으로 수정 되었습니다.",
    DATA_UPDATE_FAIL: "데이터 수정이 실패하였습니다.",
    DATA_SEARCH_SUCESS: "데이터 검색에 성공하였습니다.",
    DATA_SEARCH_FAIL: "데이터 검색에 실패하였습니다.",


    SIGN_UP_SUCCESS: "회원가입 성공",
    SIGN_UP_FAIL: "회원 가입 실패",

    LOG_IN_SUCCESS: "로그인 성공",
    LOG_IN_FAIL: "로그인 실패",
    
    VALID_ID: "유효한 ID 입니다.",
    INVALID_ID: "유효하지 않은 ID 입니다.",
    VALID_PW: "유효한 PW 입니다.",
    INVALID_PW: "유효하지 않은 PW 입니다.",


    ALREADY_ID: "존재하는 ID 입니다.",
    NO_USER: "존재하지 않는 유저 ID 입니다.",
    MISS_ID_OR_PW: "ID 또는 PW를 입력하지 않았습니다",
    MISS_MATCH_ID: "ID가 일치하지 않습니다",
    MISS_MATCH_PW: "비밀번호가 일치하지 않습니다",

    

    EMPTY_TOKEN: "토큰이 없습니다",
    EXPIRED_TOKEN: "토큰이 만료되었습니다",
    INVALID_TOKEN: "유효하지 않은 토큰입니다",
    RESGINED_TOKEN: "토큰이 재발행 되었습니다",
    
    EMPTY_REFRESHTOKEN: "리프레시 토큰이 없습니다",
    EXPIRED_REFRESHTOKEN: "리프레시 토큰이 만료되었습니다",
    INVALID_REFRESHTOKEN: "유효하지 않은 리프레시 토큰입니다",

    DB_ERROR:"데이터베이스 오류",
    
    INTERNAL_SERVER_ERROR: "서버 내부 오류",

    SEARCH_SUCCESS: "검색 성공",
    SEARCH_FAIL: "검색 실패",

    MYPAGE_READ_SUCCESS: "마이페이지 조회 성공",
    MYPAGE_READ_FAIL: "마이페이지 조회 실패",
    MYPAGE_UPDATE_SUCCESS: "마이페이지 수정 성공",

    X_NULL_VALUE: (x) => `${x}가 존재하지 않습니다.`,
    X_CREATE_SUCCESS: (x) => `${x} 작성 성공`,
    X_CREATE_FAIL: (x) => `${x} 작성 실패`,
    X_READ_ALL_SUCCESS: (x) => `${x} 전체 조회 성공`,
    X_READ_ALL_FAIL: (x) => `${x} 전체 조회 실패`,
    X_READ_SUCCESS: (x) => `${x} 조회 성공`,
    X_READ_FAIL: (x) => `${x} 조회 실패`,
    X_UPDATE_SUCCESS: (x) => `${x} 수정 성공`,
    X_UPDATE_FAIL: (x) => `${x} 수정 실패`,
    X_DELETE_SUCCESS: (x) => `${x} 삭제 성공`,
    X_DELETE_FAIL: (x) => `${x} 삭제 실패`,  
    NO_X: (x) => `${x} 이/가 존재하지 않습니다.`,
    NO_VALID_X: (x) => `${x} 이/가 유효하지 않습니다.`,
    ALREADY_X: (x) => `존재하는 ${x} 입니다.`,
}