// 기본 모듈 불어오기
var express = require('express')
    , http = require('http')
    , path = require('path');

//express 미들웨어 불러오기
var bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , static = require('serve-static')
    , errorHandler = require('errorhandler');

// 오류 헨들러 사
var expressErrorHandler = require('express-error-handler');

// Session 미들 웨어 불러오기
var expressSession = require('express-session');

// 익스프레스 인스턴스 생성
var app = express();


// 기본 속성
app.set('port', process.env.PORT || 3000);

// body-parser application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));

// body-parser application/json
app.use(bodyParser.json());

// public 폴더를 static오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));


var schema ={}; // 스키마입력 몽고에서의 스키마는 데이터가 입력 될 때, 검토를 할 수 있도록 도입 되었다.



//몽고 모듈
var MongoClient = require('mongodb').MongoClient;


// da 객체 변수 선언
var database;

//db 연겨ㅓㄹ
function connectDB() {
    // db 연결 정보
    var databaseUrl = 'mongodb://127.0.0.1:27017/local';

    // 데이터 베이스 연결
    MongoClient.connect(databaseUrl, function(err, db) {
        if (err) throw err;

        console.log('서버 시작 포트 : ' + databaseUrl);

        // database 변수 할당
        database = db.db('local');

        // console.log(database)
        });
}




//===== �쇱슦�� �⑥닔 �깅줉 =====//

// 라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수 - db의 정보와 비
router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출됨.');

    // �붿껌 �뚮씪誘명꽣 �뺤씤
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    console.log('요청 사용자 : ' + paramId + ', ' + paramPassword);

    if (database) {
        authUser(database, paramId, paramPassword, function(err, docs) {
            if (err) {throw err;}

            if (docs) {
                console.dir(docs);

                var username = docs[0].name;

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 성공</h1>');
                res.write('<div><p>아디 : ' + paramId + '</p></div>');
                res.write('<div><p>비번 : ' + username + '</p></div>');
                res.write("<br><br><a href='/public/login.html'>다시로그인</a>");
                res.end();

            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로드인 실패</h1>');
                res.write('<div><p>일치 하지 아니하다.</p></div>');
                res.write("<br><br><a href='/public/login.html'>다시 로그인</a>");
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>db 연결 실패</h2>');
        res.write('<div><p>db 연결에 실패.</p></div>');
        res.end();
    }

});

// 라우터 등록
app.use('/', router);


// 사용자 인증 함수
var authUser = function(database, id, password, callback) {
    console.log('authUser 정보 : ' + id + ', ' + password);

    // users 컬렉션 참고
    var users = database.collection('users');


    // users.find({"id":"test01"}).pretty()
// 아이디와 비번을 사용해서 검색
    console.log(users.find({"id":id,"password":password}));
    users.find({"id":id,"password":password}).toArray(function(err, docs) {
        console.log(docs);


        if (err) {
            callback(err, null);

            return;
        }

        if (docs.length > 0) {
            console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.', id, password);
            callback(null, docs);
        } else {
            console.log("일치하는 사용자 찾지 못함.");
            callback(null, null);
        }
    });
}


// 404
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


// Express
http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. : ' + app.get('port'));

    // 서버 시작시 db와 연
    connectDB();

});