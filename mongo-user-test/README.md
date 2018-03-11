# mongoDB


mongo DB


rdbms와 달리 nosql디비로 빈관계형 디비라고한다. not only sql sql을 사용하지 않는다는 뜻이 아니라 다른것도 사용한다는 이야기.

MongoDB는 c++로 작성된 오픈 소스 문서 지향(Document Oriented)적인 Cross Platform 데이터베이스입니다.
뛰어난 확장성과 성능을 자랑하며 가장 유명한 NoSQL 데이터베이스 시스템입니다.


NoSQL이란?

NoSQL 데이터베이스는 전통적인 관계형 데이터베이스보다 덜 제한적인 일관성 모델을 이용하는 데이터의 저장 및
검색을 위한 매커니즘을 제공합니다. 단순 검색 및 추가 작업을 위한 매우 최적화된 키 값 저장 공간으로, 레이턴시와
스루풋과 관련하여 상당한 성능 이익을 내는 것이 목적입니다.
이 시스템은 SQL 계열 쿼리 언어를 사용할 수 있다는 사실을 강조한다는 면에서 "Not only SQL"로 불리기도 합니다.


Document란?

MongoDB를 오픈 소스 문서 지향(Document Oriented) 데이터베이스라고 했는데 여기에서 Document는 무엇일까요?
그냥 문서라고 번역하기에는 조금 애매합니다. 여기서 말하는 Document는 RDMS의 record와 비슷한 개념으로
보시면 됩니다. 데이터의 구조가 한 개 이상의 key와 value의 pair로 이루어져있습니다.
샘플 Document를 확인해보겠습니다.


{
    "_id": ObjectId("5099803df3f4948bd2f98391"),
    "username": "sivasechi",
    "name": { first: "", last: "An" }
}


이 소스에서 _id, username, name은 Key이고 오른쪽의 있는 값들이 Value입니다.
_id는 12bytes의 hexadecimal 값이며 각 document의 유일함(uniqueness)을 제공합니다.
이 값은 첫 4bytes는 현재 timestamp, 다음 3bytes는 machine id, 다음 2bytes는
MongoDB 서버의 프로세스id, 마지막 3bytes는 순차 번호입니다. 순차 번호는 추가될 때마다 값이 올라갑니다.
Document는 동적(dynamic)의 스키마(schema)를 가지고 있습니다. 같은 컬렉션(Collection) 안에 있는
Document끼리 다른 스키마를 가지고 있을 수 있습니다.
모든 스키마가 동일하지 않은 Key값을 가지고 있을 수 있습니다.


Collection란?

콜렉션(Collection)은 MongoDB Document의 그룹을 뜻합니다.
Document들이 Collection 내부에 위치하게 됩니다.
RDMS의 table과 비슷한 개념이지만 스키마를 따로 가지고 있지는 않습니다.
그 이유는 Document들이 서로 다른 schema를 가지고 있을 수 있기 때문입니다.


Database란?

데이터베이스(Database)는 Collection들의 물리적인 컨테이너라고 보시면 됩니다.
각 데이터베이스 파일 시스템에 여러 파일들로 저장되어 있습니다.


MongoDB와 RDMS 비교

RDMS가 생소하신 분들을 위해 간단히 설명해드리겠습니다.
Relational Database Management System (관계형 데이터베이스 관리 시스템)은
행과 열로 이루어진 2차원의 table로 데이터를 관리하는 데이터베이스 시스템입니다.
RDMS 시스템으로는 Mysql, Oracle Database, DB2 등이 있습니다.

MongoDB	             DBMS
Database	         Database
Collection	         Table
Document	         Tuple / Row
Key / Field	         Column
Embedded Documents   Table Join
Primary Key (_id)	 Primary Key
Database server & Client	
mongod	             mysqld
mongo	             mysql
 

MongoDB의 장점

 [ 1 ] Schema-less - Schema가 없습니다. 같은 Collection 안에 있더라도 서로 다른 Schema를 가지고 있을 수 있습니다.

 [ 2 ] 각 객체의 구조가 뚜렷합니다.

 [ 3 ] 복잡한 JOIN이 없습니다.


 [ 4 ] Deep Query Ability (문서 지향적 Query Language를 사용하여 SQL만큼 강력한 Query 성능을 제공합니다.)

 [ 5 ] 어플리케이션에서 사용되는 객체를 데이터베이스에 추가할 때 Conversion / Mapping이 필요 없습니다.


출처: http://loadofprogrammer.tistory.com/133 [꿈 꾸는 프로그래머] 

개인적으로 만지는 프로젝트에서는 MongoDB를 주로 사용하고 있는데 아주 간단한 수준의 것들만 여태 사용하다가 좀 설계가 필요한 것을 개발해보려고 하니 스키마 디자인에 대한 고민에 빠졌습니다. 기본적으로 NoSQL은 RDBMS랑은 좀 다르기 때문에 RDBMS처럼 디자인할 수는 없었기 때문에 관련한 자료를 좀 찾아 보았습니다. 이 내용은 앞에 말했듯이 MongoDB를 사용하면서 경험에 기반한 스키마 디자인에 대한 내용이 아닌 인터넷 검색을 통해서 찾은 내용을 정리한 것입니다. 기본적으로 Schema Design문서에 기반하고 있으며 그외 다른 문서들을 참고하였습니다.(MongoDB는 문서화가 참 잘되어 있습니다.)




기본적인 모델링
MongoDB는 join을 할 수 없기 때문에 기본적으로 RDBMS처럼 정규화를 하면 안되며 보통 모델링에서 최상위 객체마다 하나의 컬렉션을 갖는 형태가 됩니다.

Student와 Course에 대한 다이어그램
from MongoDB Refernce


위의 다이어그램에서 students, courses의 2개 컬렉션이 존재하는데 students는 address 도큐먼트와 courses 컬렉션을 참조하는 score 도큐먼트를 가지고 있습니다. 반면 RDMBS라면 score는 보통 students의 키를 FK로 가지는 별도의 테이블로 디자인하는게 일반적입니다.




내장(Embed)할 것인가? 참조(Reference)할 것인가?
스키마 디자인에서 "이 객체가 자신만의 컬렉션을 가질 것인가? 다른 컬렉션안에 내장되어야 하는가?"를 결정하는 것이 중요합니다. 일반적인 RDBMS에서는 정규화를 통해서 테이블을 분리하지만 MongoDB에서는 객체를 내장할 경우 디스크에서 같은 곳에 위치하기 때문에 더 효율적입니다. 그래서 오히려 "왜 이 객체를 내장하지 않는가?"하는 관점으로 접근해야 합니다.

student.address.city에 접근한다고 하였을 때 address가 내장객체라면 빠르게 접근할 수 있으며 student가 메모리상에 있다면 address도 메모리에 올라와 있습니다. 반면 student.scores[0].for_corse.name 에 접근한다면 (메모리에 있지 않은 이상) 추가적인 쿼리를 해야 합니다. 각 참조에 대한 탐색은 디비에 대한 쿼리입니다. 보통 컬렉션은 _id로 인덱싱되기 때문에 쿼리는 충분이 빠를 수 있지만 많은 양에 데이터가 반복된다면 참조에 대한 쿼리는 아주 느릴 것입니다. 참조하는 방법은 Simple Manual References, DBRef의 2가지 방법이 일반적입니다. 


Simple Manual References
Simple Manual References는 수동으로 코딩된 참조를 의미하며 _id를 다른 문서에 저장합니다. 

JavaScript

// 임의로 블로그글을 하나 가져옵니다:
p = db.postings.findOne();
{
    "_id" : ObjectId("4b866f08234ae01d21d89604"),
    "author" : "jim",
    "title" : "Brewing Methods"
}
// 블로그글 p의 작성자에 대한 추가정보를 가져옵니다
a = db.users.findOne( { _id : p.author } )
{ "_id" : "jim", "email" : "jim@gmail.com" }

// 반대로 작성자에 대한 블로그글을 모두 가져옵니다.
db.postings.find( {author : a._id } )


DBRef
DBRef는 문서간에 참조를 하는 표준스펙이며 대부분의 드라이버가 지원합니다. DBRef는 디비내의 다른 것으로의 참조인데 object id처럼 컬렉션의 이름을 포함하며 컬렉션이 다른 도큐먼트로 변경될 수 있다면 DBRef를 사용하는 것이 좋지만 항상 같은 컬렉션을 참조한다면 Manual References가 더 효율적입니다.  또한 DBRef는 표준내장객체(JSON/BSON) 입니다.

JavaScript

{ $ref : <collname>, $id : <idvalue>[, $db : <dbname>] }

DBRef 참조를 위한 문법입니다. <collname>은 참조된 컬렉션명이고(디비명은 적지 않습니다.) <idvalue>는 참조된 객체의 _id필드의 값입니다. $db 부분은 옵션적인 부분이며(아직 대부분의 드라이버에서 지원하지 않습니다.) 다른 디비로의 문서를 참조하도록 합니다.) DBRef를 사용할 때는 문법과 동일한 순서로 적어주어야 합니다. (과거의 BSON DBRef는 더이상 사용하지 않습니다.)




일반적인 규칙
First Class 객체가 최상위 레벨이면 자신만의 컬렉션을 갖습니다.
아이템의 세부사항들은 내장합니다.
한 객체에 "포함"관계로 모델링된 객체들은 내장합니다.
다대다(Many to Many)관계는 보통 참조합니다.
객체가 면개 안되는 컬렉션들은 전체 컬렉션을 빠르게 캐쉬할 수 있도록 분리합니다.
내장 객체는 컬렉션에서 "최상위 레벨"객체보다 참조하기 어렵기 때문에 내장객체로의 DBRef를 가질 수 없습니다.
내장 객체에 대한 시스템 레벨의 뷰를 얻는 것은 어렵습니다. 예를 들어 Scores가 내장되지 않았다면 상위 100명의 점수를 쿼리하는 것은 쉽습니다.
내장하기에 양이 크다면(MB이상) 단일객체의 사이즈 제한에 걸릴것입니다.
성능이슈가 있으면 내장합니다.

내장문서(Embedded)는 빠르게 쿼리할 수 있으며 부모와 항상 함께 나타납니다. 
내장되면서 중첩된(Nested) 문서는 복잡한 계층화를 나타내기에 좋고 동일하게 부모와 항상 함께 나타나지만 내부문서에 질의할 때 특정한 레벨에만 하는 것은 쉽지 않습니다. 
정규화를 하면 유연성을 가질수 있습니다.

일반적인 스키마 디자인은 간단한 스키마에서 시작해서 데이터를 쿼리해보변서 점점 발전시켜 나가는 형태를 취합니다. 반복적인 개발은 MongoDB에서는 어렵지 않습니다. 




유즈케이스
이제 몇가지의 유즈케이스를 보겠습니다.

Customer / Order / Order Line-Item
orders와 customers는 컬렉션이어야 합니다. line-items는 order객체에 내장된 line-items의 배열이 되어야 합니다.

블로깅 시스템
posts는 컬렉션이 되어야 합니다. post author는 분리된 컬렉션이거나 이메일주소만 있다면 posts내에 간단한 필드가 됩니다. comments는 성능을 위해서 post내의 내장객체가 되어야 합니다.

1 대 다 관계
배열이나 배열키를 내장할 경우 배열의 서브셋을 리턴하는 slice를 사용합니다. 하지만 모든 문서에서 마지막 커멘트를 찾는 것은 쉽지 않습니다. 트리를 내장할 경우 단일 문서의 형태가 되며 자연스럽지만 쿼리하기가 어렵습니다. 2개의 컬렉션으로 정규화를 할 경우 가장 유연하지만 더 많은 쿼리가 필요합니다.




Index 선택
스키마 디자인의 두번째 관점은 인덱스 선택입니다. 일반적인 규칙에 따라 관계형 디비에서 인덱스하기 원하는 곳에 MongoDB에서도 인덱스 하면 됩니다.
    
_id 필드는 자동적으로 인덱스됩니다.
찾고자 하는 키에 대한 필드는 인덱스합니다.
보통 정렬하는 필드는 인덱스합니다.
   
MongoDB 프로파일링 기능은 누락된 인덱스에 대한 유용한 정보를 줍니다.
    
인덱스를 추가하는 것은 컬렉션에 쓰기(Write)를 느리게 하지만 읽기(Read)는 괜찮습니다. 읽기 대 쓰기의 비율이 높은 컬렉션에 많은 인덱스를 사용합니다.(스토리지의 과잉문제는 신경안쓴다고 가정합니다.) 읽기보다 쓰기가 많은 컬렉션에 대해서는 인덱스는 아주 비용이 큽니다.

