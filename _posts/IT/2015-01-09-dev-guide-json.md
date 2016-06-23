---
layout: page
title: '개발가이드_exel2json'
date: 2015-01-09 10:10:10
tags: 
- 'IT'
- '개발'
categories: 'IT'
---

* content
{:toc}

## 개요
- url: [excel2json](https://github.com/coolengineer/excel2json)
- 엑셀 파일 생성 및 편집

![image1]({{ site.url }}/static/img/logo-2x.png)

![image2](/static/img/logo-2x.png)

## 설치법

## 사용법
- ADD SOME HINTS TO YOUR EXCEL FILE FOR JSON ##
- There are four types of object, which can be handled by this script.

### Simple Object ###

If you have an excel file, very simple one like this.

|   |      A      |    B    |    C    |    D    |       E       |
|---|-------------|---------|---------|---------|---------------|
| 1 |             |  Initial  data    |         |               |
| 2 |             |   Name  |  Value  |         |               |
| 3 |             |  coins  |  1000   |         |               |
| 3 |             |  golds  |     0   |         |               |

And, Let's give a hint for the script, which awares A Column's '#' mark.

|   |      A      |    B    |    C    |    D    |       E       |
|---|-------------|---------|---------|---------|---------------|
| 1 |             |  Initial| data    |         |               |
| 2 |             |   Name  |  Value  |         |               |
| 3 | #initdata{} |   $key  |  $value |         | *inserted!*   |
| 4 |             |  coins  |  1000   |         |               |
| 5 |             |  golds  |     0   |         |               |

In the above example, you can get this JSON file

```json
{
    "initdata" : {
        "coins" : 1000,
        "golds" : 0
    }
}
```

### Objects in Object ###
Above example explains plain value object, now if you want an object which
has objects as the key/value pairs, you can use "{{}}" suffix instead of "{}"

|   |        A       |      B     |    C    |    D    |       E       |
|---|----------------|------------|---------|---------|---------------|
| 1 |                |  Buildings |         |         |               |
| 2 |                |   Name     |  Color  |  Width  |    Height     |
| 3 | #buildings{{}} |   $key     |  color  |  width  |    height     |
| 4 |                |  barrack   |  blue   |   200   |     200       |
| 5 |                |  mine      |  yellow |   200   |     100       |
| 6 |                |  gas       |   red   |   100   |     100       |
| 7 |                |  townhall  |  black  |   200   |     200       |

And, this yields

```json
{
    "buildings" : {
        "barrack" : {
            "color": "blue",
            "width": 200,
            "height": 200
        },
        "mine" : {
            "color": "yellow",
            "width": 200,
            "height": 100
        },
        "gas": {
            "color": "red",
            "width": 100,
            "height": 100
        },
        "townhall": {
            "color": "black",
            "width": 200,
            "height": 100
        }
    }
}           
```

### Arrays in Object ###

This type of object has nested value as an array, see this example!

|   |        A       |      B     |    C    |    D    |   E   | 
|---|----------------|------------|---------|---------|-------|
| 1 |                |  Required coins of buildings   |       |
| 2 | #reqcoins{[]}  |   barrack  |  mine   |  gas    |       |
| 3 |                |        100 |    100  |   100   |       |
| 4 |                |        500 |    500  |   500   |       |
| 5 |                |       1000 |   1000  |  1000   |       |
| 6 |                |       1500 |         |         |       |

As you can see, the suffix of #reqcoins is "{[]}", this gives hints for constructing vertical array.
The result is

```json
{
    "reqcoins" : {
        "barrack" : [100, 500, 1000, 1500 ],
        "mine" : [ 100, 500, 1000 ],
        "gas"  : [ 100, 500, 1000 ]
    }
}
```

### Object Array ###

The last format of compound data is an array which contains objects, the suffix "[{}]"

|   |     A     |      B     |    C    |    D     |   E   | 
|---|-----------|------------|---------|----------|-------|
| 1 |           |    Shop    |         |          |       |
| 2 | #shop[{}] |   name     |  price  | category |       |
| 3 |           |    blade   |    100  |  attack  |       |
| 4 |           |    dagger  |    200  |  attack  |       |
| 5 |           |    shield  |    100  |  defese  |       |

And this yields

```json
{
    "shop" : [
        {
            "name": "blade",
            "price" : 100,
            "category" : "attack"
        },
        {
            "name": "dagger",
            "price": 200,
            "category": "attack"
        },
        {
            "name": "shield",
            "price": 100,
            "category": "defense"
        }
    ]
}
```

### Array Value (Tip) ###

Magic field suffix "[]" of object description line introduce array value.

|   |        A       |      B     |             C         |    D     |   E   | 
|---|----------------|------------|-----------------------|----------|-------|
| 1 |                |    Shop    |                       |          |       |
| 2 | #inventory[{}] |    type    |        attrib[]       |    dur   |       |
| 3 |                |    blade   |       oil, diamond    |    100   |       |
| 4 |                |    dagger  |         sapphire      |    150   |       |
| 5 |                |    shield  | diamond,sapphire,rune |    200   |       |

The "attrib[]" field name terminates with "[]", which indicates attrib key has
array value. so, the result will be like this.

```json
{
    "inventory" : [
        {
            "type": "blade",
            "attrib": [ "oil", "diamond" ],
            "dur": 100
        },
        {
            "type": "dagger",
            "attrib": [ "sapphire" ],
            "dur": 150
        },
        {
            "type": "shield",
            "attrib": [ "diamond", "sapphire", "rune" ],
            "dur": 200
        }
    ]
}
```



## Some technical marks ##

### '!' prefixed sheet name ###

You can insert '!' mark before a sheet name which will not be considered to be parsed. For e.g. '!Samples', '!Test' or '!Templates'.



## 실행 
- ".js" extension files are associated with WSCRIPT.EXE (Windows already has this program!), you can easily run the script by double click!
- You may also make your own start script, like an 'excel2json.bat' with which you can run the script specifying excel files and output folder name as the arguments.

```bash
D:\mH\_utils\excel2json> WSCRIPT.EXE Excel2Json.js file1.xlsx file2.xlsx product
```

- WSCRIPT.EXE : 윈도우즈 내장 파일(추가 설치, path 지정 필요없음)
- D:\mH\_utils\excel2json : Excel2Json.js 가 있는 폴더
- file1.xlsx file2.xlsx : 변환할 엑셀 파일(복수개 가능)
- product : 결과 json이 저장될 폴더 이름

## 참고 

### HOWTO-WORK

Internally, CSV format is used to parse excel files.

By clicking the script in explorer:

    1. Run the script in a folder without any argument (by clicking)
    2. The script searches the folder for all excel files with extension .xls, .xlsx.
    3. All the sheets in the excel file are converted to CSV files.
    4. The CSV files are stored temporary folders with suffix (.$$$)
    6. Parse the CSV files and make json files into the 'output' folder.
    7. All the temporary folders will be removed with their contents (csv files)
    
By running WSCRIPT.EXE Excel2Json.js file1.xlsx file2.xlsx product:

    1. All the proceess is same with above.
    2. But it does not search the directory for excel files.
    3. And use the 'product' directory instead of 'output' for its result.
    

### json 파일 수정(by moon)
- !!!highCharts 용 json 생성 테스트
- 원본생성: D:\mH\_utils\excel2json\growth>WSCRIPT.EXE Excel2Json.js height_male01.xlsx  json

- 원본: {"height": {"3rd": [1,2,....], "5th":[3,4,5,...], ...}}
- 목표: [{"name":"3rd", "data":[1,2,...]}, {"name":"5th", "data":[3,4,5,...]}, …]

- sublime text : macro기능을 사용하려 했으나 복잡함 -> nodejs 이용

### 파일 변환(node command line)

```bash
D:\mH\_utils\excel2json\growth\json>copy height_male01.json D:\mH\app\_test\height_male01.json
D:\mH\app\_test>node replace.js height_male01.json replace1.json height_male01_.json
```
- replace1.json : !!!변환 map json


### mongodb import
```bash
D:\mongoDB\bin>mongoimport --db mHdb --collection growth_height_male --file D:\mH\app\_test\height_male01_.json
```

mongoimport --db mHdb --collection growth_height_male --file D:\mH\_utils\excel2json\growth\json\height_male03.json



1. excel2json

```bash
D:\mH\_utils\excel2json\growth>WSCRIPT.EXE Excel2Json.js  growth_height1.xlsx  growth_weight1.xlsx json

D:\mH\_utils\excel2json\growth>copy .\json\growth_height1.json D:\mH\app\_test\growth_height1.json

D:\mH\_utils\excel2json\growth>copy .\json\growth_weight1.json D:\mH\app\_test\growth_weight1.json
```

2. json 교정

```bash
D:\mH\app\_test>node replace.js growth_height1.json replaceGrowth1.json growth_height1_.json

D:\mH\app\_test>node replace.js growth_weight1.json replaceGrowth1.json growth_weight1_.json

D:\mH\app\_test>node replace.js growth_weight1_.json replaceGrowth_weight.json growth_weight1_.json
```

3. mongodb import

```bash
D:\mongoDB\bin>mongoimport --db mHdb --collection growth_all_full --file D:\mH\app\_test\growth_height1_.json
D:\mongoDB\bin>mongoimport --db mHdb --collection growth_all_full --file D:\mH\app\_test\growth_weight1_.json

D:\mongoDB\bin>mongo
MongoDB shell version: 2.4.9
connecting to: test
> use mHdb
switched to db mHdb
> db.growth_all_full.find({});

db.growth_all_full.find({"type":"height","sex":"male"});

db.growth_all_full.find({"type":"height","sex":"male","data.month":198.5}, {_id: 0, 'data.$': 1})

```

### find subdocumen
- month가 198.5 인 data만 출력 @@@@@

```bash
> db.growth_all_full.find({"type":"height","sex":"male","data.month":198.5}, {_id: 0, 'data.$': 1})

{ "data" : [    {       "month" : 198.5,        "3rd" : 160.87,         "5th" : 162.31,         "10th" : 164.49,        "25th" : 168.05,        "50th" : 171.87,
        "75th" : 175.57,        "90th" : 178.8,         "95th" : 180.69,        "97th" : 181.91 } ] }

> db.growth_all_full.find({"type":"height","sex":"male","data.month":{$lt:6, $gt:4}}, {_id: 0, 'data.$': 1})
```