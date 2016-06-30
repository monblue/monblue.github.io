## 교정 순서
1. hwp -> txt
1) 스타일 ->
2) 이미지
3) 표


hwp 주석 옮기기
0) 문서 시작에서 출발
1) alt + G (찾아가기 ‘각주’로 설정해두고 시작)
2) enter
3) shift + ‘->’
4) ctr + ‘x’
5) ‘->’
6) ctr + v


2. txt 교정
1) app 이용
2) sublimetext 이용
- '<'	'〈'
- '>'	'〉'

3. txt -> md
1) 페이지 표시 없애기 (#001, ...)
2) '|' -> 줄바꾸기
3) md에서 줄바꾸기 작용하도록(줄 끝에 공백 문자 2개 삽입)
4) 1갤 -> , 2갤 -> 3갤 ->


## 실제 교정 Log
1. 2016-06-23-A-GREAT-REVOLUTION-IN-THE-BRAN-WORLD-1_O.txt
1) hwp -> txt
- 복사

2) txt 교정
- '한충'	'한층'
- ' 사 탐'	'사람'
- ' 까지'		'까지'
- '운동 선수'	'운동선수'





- '사례'	'*사례'
- 'point'	'3갤point'



3) txt -> md
- '#' 지우기

- '\n@@\n'	''
- '\\\|'	'\n'
- '\n'	'  \n'
- '2갤'	'##'
- '3갤'	'###'
- '4갤'	'####'

- 추가
---
layout: page
title: '남성 동의보감'
date: 2016-06-23 20:14:54
categories: 'book'
---

* content
{:toc}



2. 2016-06-24-MAN-DONGUIBOGAM
1)

2)

3) txt -> md
\n([^ ]+) (.+)	\n`\1` \2


node D:\dev\apps\_myApps\replaceBook.js  D:\dev\blog\monblue.github.io\_draft\txt\2016-06-24-MAN-DONGUIBOGAM.txt D:\dev\blog\monblue.github.io\_draft\rep\r_MAN-DONGUIBOGAM.txt

\r\n	힣
\|	힣
힣`\d\d\d\r힣7갤@	
7갤(.+)	<pre class="note warning">힣$1힣</pre>
힣`\d\d\d힣	
`\d\d\d	
0갤	힣# 
1갤	힣## 
2갤	힣### 
3갤	힣#### 
4갤	힣##### 
힣{2,}#	힣힣#
힣?<pre	힣<pre
힣?<\/pre>힣?	힣</pre>힣
힣{3,}	힣힣
힣	  힣
>  힣	>힣
  힣<	힣<
# ([^힣]+)  힣	# $1힣


- '\n`\d\d\d\n7갤@'	''
- '7갤(.+)'	'<pre class="note warning">\n\1\n</pre>'
@@@바지락조청
- '\n`\d\d\d\n'	''
- '\|'	'\n'
- '0갤'	'\n# '
- '1갤'	'\n## '
- '2갤'	'\n### '
- '3갤'	'\n#### '
- '4갤'	'\n##### '

- '\n#'	'\n\n#'
- '<pre' 	'\n<pre'
- '<\/pre>'	'\n</pre>\n'
- '\n\n\n'	'\n\n'
- '\n'	'  \n'



- '  \n<'	'\n<'
- '  \n\n<'	'\n<'
- '>  '	'>'




3. 2016-06-24-NEW-CLINICAL-KOREAN-MEDICINE
최신임상한방의학_미즈노슈이치



4. 2016-06-24-VISCERA-PATTERN-REMEDY
장부변증논치
1) txt 수정
(1) 표 넣기

1) txt -> md
node D:\dev\apps\_myApps\replaceBook.js  D:\dev\blog\monblue.github.io\_draft\txt\2016-06-24-VISCERA-PATTERN-REMEDY.txt D:\dev\blog\monblue.github.io\_draft\rep\r_VISCERA-PATTERN-REMEDY.txt


---
layout: page
title: '장부변증논치(臟腑辨證論治)'
date: 2016-06-24 20:14:54
categories: 'book'
---

* content
{:toc}





5. 2016-06-24-DONGUIBOGAM.txt
동의보감_법인
1) json -> txt
(0)
{주} -> _주_
{}

(1) 중복 개요 없애기
- "_o"	\t"_o"
- 엑셀 작업: 중복셀비우기1.xlsm 에서 중복셀 없애기
- '\t'	''	

(2) 주석 분리
- '\,\{"n"([^\}]+)\}'	'``\n\,\{"n"\1\}\n'
- 엑셀 작업: 
 데이터 정렬 후 주석[",{"n"\1},"로 시작] 추출 따로 보관(원래 순서대로)
 원문만 원래 순서대로 추출
 주석 뒤에 있던 내용은 줄바꿈 없애기: '^\{"'	'힣{"'
		
(3) json 태그 없애기, 주석->줗

node D:\dev\apps\_myApps\replaceBook.js  D:\dev\blog\monblue.github.io\_draft\txt\2016-06-24-DONGUIBOGAM.txt D:\dev\blog\monblue.github.io\_draft\rep\r_donggam.txt

(4) 원문 / 해석 분리용 파일
node D:\dev\apps\_myApps\replaceBook.js  D:\dev\blog\monblue.github.io\_draft\txt\2016-06-24-DONGUIBOGAM.txt D:\dev\blog\monblue.github.io\_draft\rep\r_donggam2.txt


6. 2016-06-24-Saam-Acupuncture-System-Essay.txt
사암침법수상록


1) txt -> md
node D:\dev\apps\_myApps\replaceBook.js  D:\dev\blog\monblue.github.io\_draft\txt\2016-06-24-Saam-Acupuncture-System-Essay.txt D:\dev\blog\monblue.github.io\_draft\rep\r_Saam-Acupuncture-System-Essay.txt


---
layout: page
title: '사암침법수상록(舍岩鍼法隨想錄)'
date: 2016-06-24 20:14:54
categories: 'book'
---

* content
{:toc}


7. 2016-06-24-Actual-Saam-Acupuncture.txt
김관우 원장의 실전사암침법
1) txt -> md
node D:\dev\apps\_myApps\replaceBook.js  D:\dev\blog\monblue.github.io\_draft\txt\2016-06-24-Actual-Saam-Acupuncture.txt D:\dev\blog\monblue.github.io\_draft\rep\r_Actual-Saam-Acupuncture.txt

---
layout: page
title: '김관우 원장의 실전사암침법'
date: 2016-06-24 20:14:54
categories: 'book'
---

* content
{:toc}


8. 2016-06-24-Illustrated-Clinical-Take-Acupoint.txt
도해임상취혈
0) hwp(2016-06-24-Illustrated-Clinical-Take-Acupoint_O.txt) -> txt
- 그림위치삽입 매크로 실행

1) txt -> md
node D:\dev\apps\_myApps\replaceBook.js  D:\dev\blog\monblue.github.io\_draft\txt\2016-06-24-Illustrated-Clinical-Take-Acupoint.txt D:\dev\blog\monblue.github.io\_draft\rep\r_Illustrated-Clinical-Take-Acupoint.txt

---
layout: page
title: '도해임상취혈'
date: 2016-06-24 20:14:54
categories: 'book'
---

* content
{:toc}


9. 2016-06-24-Clinical-Important-Medicine.txt
圖說 韓方診療要方

0) hwp(2016-06-24-Illustrated-Clinical-Take-Acupoint_O.txt) -> txt
- 표를문자열로 매크로 실행
- 그림위치삽입 매크로 실행

1) txt -> md
node D:\dev\apps\_myApps\replaceBook.js  D:\dev\blog\monblue.github.io\_draft\txt\2016-06-24-Clinical-Important-Medicine.txt D:\dev\blog\monblue.github.io\_draft\rep\r_Clinical-Important-Medicine.txt

---
layout: page
title: '도설한방진료요방'
date: 2016-06-24 20:14:54
categories: 'book'
---

* content
{:toc}




'\{\{\*(\d\d\d)'	'2갤{{\1




컿S ~ 컿E : md 파일 생성시 제외
md 항목 생성시 추가 파일
