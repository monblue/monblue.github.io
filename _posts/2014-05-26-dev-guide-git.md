---
layout: post
title: '개발가이드_git'
date: 2014-05-26 19:52:41
tags: 
- 'IT'
- '개발'
categories: 'IT'
---

## git 설치

### git remote 저장소 이전


* ref: [Git 저장소 변경하기](http://blog.wisedog.net/95)

* ref: [github help::Error: Key already in use](https://help.github.com/articles/error-key-already-in-use)

#### 기존 저장소(github) backup

```bash
$ git init  //(로칼)저장소 생성
$ git remote add mH git@github.com:moonHani/mH.git  //(기존)원격저장소 추가
$ git pull mH --tags  //(기존)원격저장소 백업 (error 시 공개키 생성)
$ git pull mH v0.4.16 //최종 tag pull
$ git remote rm mH //(기존)원격저장소 삭제
$ git remote add mH git@github.com:******e/mH.git //(신규)원격저장소 추가
$ git push mH --tags  //(신규)원격저장소 push all tags (error 시 (기존)원격저장소 deploy key 삭제 후 (신규)원격저장소 deploy key 추가)
```

#### 공개키 생성 및 추가

* ref: [github help::generating-ssh-keys](https://help.github.com/articles/generating-ssh-keys#platform-windows)

```bash
$ cd ~/.ssh //디렉토리 이동
$ ls -al  //key 목록 보기 (list 가 있으면 key 생성 단계 생략)
$ ssh-keygen -t rsa -C "your_email@example.com"
$ ssh-add ~/.ssh/id_rsa
$ clip < ~/.ssh/id_rsa.pub  //복사하기
```

github > setting > Deploy keys > Add deploy key > Ctrl+V(붙여넣기)


9. git server 설정
1) git 사용자 계정 설정

```
$ sudo adduser git    // 사용자 생성, 비밀번호(m*5*****) 입력
$ su git    // git 사용자로 로그인
```

2) git 사용자의 홈 디렉토리에 SSH-key 등록

```
$ cd ~    // 홈디렉토리로 이동
$ mkdir .ssh    // .ssh 디렉토리 생성
$ chmod 700 .ssh    // 권한 변경
(ftp 전송: C:\Users\docMoon\.ssh\id_rsa.pub > git@moonhani)
$ cat id_rsa.pub >> ~/.ssh/authorized_keys    // 서버로 공개키를 전송하고 등록@@@@@@@@@
$ chmod 600 ~/.ssh/authorized_keys    // 권한 변경
$ rm -rf id_rsa.pub    // 전송받았던 사용자키 삭제
```

3) git 계정 접속 제한(@@@@@@@@@@@확인요.... 4)번에서 에러가 발생하여 다시 돌려놓았음@@@)

```
$ sudo vi /etc/passwd  //vi가 서툴다면 ftp로 전송받아 변경후 재전송
git:x:1001:1001:,,,:/home/git:/bin/bash
=> git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell
```

4) git 저장소 생성

```
$ cd ~    // git 사용자로 로그인한 상태에서 홈디렉토리로 이동(git 계정 로그인 불가시 root로 $ cd home/git 하면 안됨!!!!!!!!!)
$ mkdir repos    // 저장소로 사용할 디렉토리 생성
$ cd repos
$ mkdir test_project.git
$ cd /home/git/repos/test_project.git
$ git init --bare --shared  //원격(remote) 저장소의 경우 워킹디렉토리가 없는 저장소이다.  일반적인 로컬 저장소 생성의 명령어에 --bare 옵션을 주면 원격저장소가 만들어지고 --shared 옵션을 주면 자동으로 그룹 쓰기 권한을 추가한다.
```

5) 접근 테스트

$ git clone ssh://git@서버주소:/home/git/repos/test_project.git  //클라이언트에서 리모트 저장소를 내려받는다.(git clone ssh://git@moonhani.com:/home/git/repos/test_project.git) (> git remote add test git@moonhani.com:/home/git/repos/test_project.git)
$ git remote remove origin  //기존에 사용하던 remote 제거하기

6) 퍼미션
insufficient permission for adding an object to repository database ./objects  //레파지토리 퍼미션에 문제가 있다면 다음 오류 구문을 보게 될것이다.  //해당 레파지토리로 이동해서 다음을 실행하자.

```
$ cd /home/git/repos
$ sudo chmod -R 770 *

$ sudo git config core.sharedrepository true  //그래도 안된다면 다음과 같이 sharedrepository옵션을 true로 지정하자.
```

7) remote server work tree

* ref : [Automatically Deploying Website From Remote Git Repository](http://caiustheory.com/automatically-deploying-website-from-remote-git-repository)


** remote server: git 계정으로 login 후!!!(root 계정으로도 확인요@@@)

```bash
$ cd /home/git/repos
$ mkdir www.git && cd www.git
$ git init --bare --shared
$ mkdir /home/git/www
$ cat > hooks/post-receive  //hooks는 /home/git 디렉토리 내에서만 가능@@@
#!/bin/sh
GIT_WORK_TREE=/home/git/www git checkout -f
$ chmod +x hooks/post-receive
```


** local: DOS prompt로 가능

```bash
$ git init
$ git remote add www git@moonhani.com:/home/git/repos/www.git
$ commit
$ git push www +master:refs/heads/master //처음부터 git push blog master 로 하면 안되는지 확인
```
=================================================================

## github 활용

### create new remote~local repository

#### git initiate
##### create new (remote) repository
0. https://github.com/moonHani/mH.git
1. moonHani[Owner] / mH[Repository name]
2. moonHani for hanimac[description]
3. Public
4. Initialize this repository with a README

##### create new (local) repository
0. C:\APM_Setup\htdocs\mH
1. Git Init Here[mouse right click]
2. Git Gui[mouse right click]
- Remote > add
- Name: mH
- Location: https://github.com/moonHani/mH.git
- Fetch Immediately
3. git pull mH master

* tip: `shift + right click` > 여기서 명령창 열기(W)

* tip: Dos prompt > right click > 속성(P) > 편집옵션 > `빠른 편집 모드(Q)`


```bash
git pull mH master
```

* git pul is !!not worked

##### copy files (local)
- README.md, DevLog.md, DevReport.md, TODOS.md

##### git commit

```bash
git add *
git commit -m '20140329'
```

##### git tag

```bash
git tag v0.0.0
```

#### git push

```bash
git push mH v0.0.0
```

### create & edit files
#### README.md
- mH description
- requirements
- Installation
- other documents

#### DevLog.md
- tag[version] Dev Change Log

#### DevReport.md
- tag[version] Dev Error & Solution Log
- Dev Tip & Tech

#### TODOS.md
- ToDos & Memo


=======================================================
## github 활용2

### create new remote~local repository

#### git initiate
##### create new (remote) repository
0. https://github.com/monblue/mH.git
1. monblue[Owner] / mH[Repository name]
2. moonHani project app folder(d:\mH\app) files[description]
3. Public
4. Initialize this repository with a README

##### (local) repository commit & push
0. d:\mH\app

1. Git Init Here[mouse right click]

2. Git Gui[mouse right click]
1) 'Remote > add'
- Name: mH
- Location: https://github.com/monblue/mH.git
- Fetch Immediately
2) click 'Stage Changed'
3) click 'Commit'
- Commit message : 20150120

3. git tag

```bash
git tag v0.0.0
```

4. git push

```bash
git push mH v0.0.1
```