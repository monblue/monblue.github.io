//////************************************************************************
////// 이름:    chart.js
////// 기능:    moonHani chart require config & chart start
//////************************************************************************
require.config({

    baseUrl: '../_assets/js/_lib',

    paths: {
        chart: '../chart',
        list: '../list',
        //diagnosis: '../diagnosis',
        share: '../_share',
        chart_tpl: '../../tpl/chart',
        list_tpl: '../../tpl/list',
        share_tpl: '../../tpl/_share',
        UI_tpl: '../../tpl/_UI'
    },
/*
    map: {
        '*': {
            //'app/models/employee': 'app/models/memory/employee'
        }
    },
*/
    shim: {
        'backbone.collectionsubset': {
            deps: ['underscore', 'jquery', 'backbone'],
            exports: 'Subset'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery'],
            //exports: 'Backbone'
        },
        'bootstrap-modal': {
            deps: ['jquery'],
            //exports: 'Backbone'
        },
    }
});

//require(['jquery', 'backbone', 'bootstrap', 'chart/router'], function ($, Backbone, bootstrap, Router) {
require(['jquery', 'backbone', 'bootstrap', 'MH_utils', 'share/Global', 'chart/router'], function ($, Backbone, bootstrap, MH, GLOBAL, Router) {
    var date = GLOBAL.get('_LISTDATE') || '';

    if (!date || !date.length) {
      date = MH.getToday();
    	GLOBAL.setListDate(date);
    }

    var app = new Router();
    Backbone.history.start();
/*
    var date = '';
    var arrUrl = document.location.href.split("#");
    if (arrUrl[1]) {
      date = arrUrl[1].substr(1);
    }

    if (!date || !date.length) {
      date = MH.getToday();
      document.location.replace(arrUrl[0] + '#L' + date);
      //Backbone.history.navigate('L' + date);
    }
    console.log('date is', date);

    GLOBAL.setListDate(date);
    var app = new Router(date);
    Backbone.history.start();
*/
});