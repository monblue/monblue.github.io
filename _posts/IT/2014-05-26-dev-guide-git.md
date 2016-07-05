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


=============================
Generating an SSH key
MAC WINDOWS
SSH keys are a way to identify trusted computers without involving passwords. You can generate an SSH key and add the public key to your GitHub account by following the procedures outlined in this section.

We recommend that you regularly review your SSH keys list and revoke any that haven't been used in a while.

Tip: If you have GitHub for Windows installed, you can use it to clone repositories and not deal with SSH keys. It also comes with the Git Bash tool, which is the preferred way of running git commands on Windows.
Checking for existing SSH keys

Before you generate an SSH key, you can check to see if you have any existing SSH keys.

Generating a new SSH key and adding it to the ssh-agent

After you've checked for existing SSH keys, you can generate a new SSH key to use for authentication, then add it to the ssh-agent.

Adding a new SSH key to your GitHub account

To configure your GitHub account to use your new (or existing) SSH key, you'll also need to add it to your GitHub account.

Testing your SSH connection

After you've set up your SSH key and added it to your GitHub account, you can test your connection.




## SSH키 생성

### 기존 SSH키 확인
- 명령프롬프트
```bash
ls -al ~/.ssh
```
- 윈도우
> C:\Users\[사용자id]\.ssh 폴더로 이동
> 파일 확인

id_rsa / id_rsa.pub / known_hosts 파일 등이 있다면 기존 SSH키가 있는 겁니다.


### SSH키 추가

```bash
monwa@DESKTOP-M3RQ6KV MINGW64 ~/.ssh
$ ls
id_rsa  id_rsa.pub  known_hosts

monwa@DESKTOP-M3RQ6KV MINGW64 ~/.ssh
$ ssh-keygen -t rsa -b 4096 -C "monwater@gmail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/monwa/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/monwa/.ssh/id_rsa.
Your public key has been saved in /c/Users/monwa/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:Gs+TC3hjgzaKvUd04SaZ2HAtW9OnKGA8VyzqEVLKfq0 monwater@gmail.com
The key's randomart image is:
+---[RSA 4096]----+
| o.  +..         |
|o.B = * . .      |
|.+ @ O + o       |
|. + X = .        |
| o + *. S        |
|  o oo = .       |
|   E= B =        |
| o o.+ + o       |
|. +o    .        |
+----[SHA256]-----+

monwa@DESKTOP-M3RQ6KV MINGW64 ~/.ssh


### 테스트 SSH키 연결



```

ssh-keygen -t rsa -b 4096 -C "your_email@example.com"



ssh-keygen -t rsa -b 4096 -C "monwater@gmail.com"





This problem was bugging me for quite some time. The problem is, the OpenSSH client they've compiled for Windows doesn't check the known_hosts file in ~/.ssh/known_hosts


### error
- Warning: Permanently added the RSA host key for IP address

ssh -v git@github.com


~/.ssh/config file and insert the line:

UserKnownHostsFile ~/.ssh/known_hosts



https://github.com/moonhani.github.io.git




==========================
깃헙(GITHUB)에 SSH 키 만들고 등록하기
터미널에서 등록된 키를 확인한다.
ls -al ~/.ssh

id_rsa.pub 등이 있다. 없다면 만든적이 없는것 새로 만든다…

아래와 같이 터미널에 입력하는데 이메일에 주의한다. 깃헙에 등록한 이메일을 사용한다.
ssh-keygen -t rsa -C “your_email@example.com”
ssh-keygen -t rsa -C “monwater@naver.com”

비밀번호를 입력하라고 하면 비밀번호를 입력해준다.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:

새로운 키를 에이전트에 추가한다.
eval “$(ssh-agent -s)”
ssh-add ~/.ssh/id_rsa

새로 만든 키를 클립보드에 저장한다
pbcopy < ~/.ssh/id_rsa.pub
이제 준비가 되었으니 github.com 에 로그인하고 Settings에 들어가 SSH Keys 메뉴를 선택한다.
Add 버튼을 선택한 후 클립보드에 복사된 내용을 붙여 넣는다.끝~~

터미널에 입력하여 확인한다.
ssh -T git@github.com
다음과 같은 메세지가 나타나면 성공!!
Hi username! You've successfully authenticated, but GitHub does not
# provide shell access.


============================
Inviting collaborators to a personal repository
You can invite users to become collaborators on your personal repository.

Tip: You can grant read/write access to collaborators on a personal repository. Repositories owned by an organization can grant more granular access. For more information, see "What are the different access permissions?"
Ask for the username of the person you're inviting as a collaborator. If they don't have a username yet, they can sign up for GitHub.
On GitHub, navigate to the main page of the repository.

Repository settings buttonUnder your repository name, click  Settings.

Repository settings sidebar with Collaborators highlightedIn the left sidebar, click Collaborators.

Under "Collaborators", start typing the collaborator's username.
Collaborator list drop-down menuSelect the collaborator's username from the drop-down menu.
Add buttonClick Add collaborator.

The user will receive an email inviting them to the repository. Once they accept your invitation, they will have collaborator access to your repository.


=============================
https://github.com/monwater/monwater.github.io.git
git@github.com:monwater/monwater.github.io.git
git://github.com/monwater/monwater.github.io.git

```
git remote add origin https://github.com/monwater/monwater.github.io.git
git pull origin master
```