---
layout: page
title: 'Jekyll 윈도우에 설치해서 사용하기'
date: 2016-06-24 00:01:41
tags: 
- 'IT'
- '개발'
categories: 'IT'
---

* content
{:toc}

## 필요한 것들 
* Ruby(ruby, DevKit) 
* Jekyll 
* Python(Setuptool,pip,Pygments) 
* rouge 

Jekyll은 루비 기반으로 돌아갑니다. 그래서 Ruby가 설치된 장비가 필요합니다. 그리고 syntax highlighting 을 사용하기 위해서 Pygments가 있어야 합니다. Pygments는 Python 기반으로 돌아가기 때문에 Python이 설치되어 있어야 하고요. 
그럼 본격적으로 설치를 해보겠습니다. 
 
 
## 루비(Ruby) 설치 

### 루비(Ruby) 설치 
* 다운로드: http://rubyinstaller.org/downloads/ 
* 본인의 시스템에 맞는 파일을 다운로드 받아 설치 
* 설치 디렉토리(참고): d:\dev\apps\Ruby

### Development Kit 설치 
* 다운로드: http://rubyinstaller.org/downloads/ 
* 설치 디렉토리(참고): d:\dev\apps\RubyDevkit

```bash
cd d:\dev\apps\RubyDevkit
ruby dk.rb init 
ruby dk.rb install 
```


## 지킬(Jekyll) 설치

```bash
gem install jekyll 
```

## rouge 설치

```bash
gem install rouge
```
* 목적: code blocks 사용

## Python 설치
* 목적: syntax highlighter를 사용 등
* 다운로드: https://www.python.org/downloads/ 
* 설치 디렉토리(참고): d:\dev\apps\Python
* 윈도우 환경변수 설정(추가)
![image1](\static\img\post\20150911_jelky_install_03.jpg)

```bash
d:\dev\apps\Python;d:\dev\apps\Python\Scripts; 
```


* Python & pip 실행
```bash
python 
```

```bash
pip
```

## Pygments 설치 
* syntax highlighting 사용

```bash
pip install Pygments
```

* pip 실행이 안되는경우 
```bash
python -m pip install Pygments
```

## wdm, kramdown 설치

```bash
gem install wdm

gem install kramdown
```

 
## 제킬(jekyll) 사이트 생성 

```bash
jekyll new d:\dev\blog\myBlog
cd d:\dev\blog\myBlog
jekyll serve
```