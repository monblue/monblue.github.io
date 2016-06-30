//////************************************************************************
////// 이름:    TxItems.js
////// 기능:    moonHani Chart Router Module
//////************************************************************************
//define(function (require) {
var txMain = [{"group":"0","name":"진찰","gasan":"1","width":"150px","txitems":[{"code":"10100","name":"초진","price":"11310.0"},{"code":"10200","name":"재진","price":"7140.0"}]},{"group":"1","name":"할증","gasan":"1.15","width":"150px","txitems":[]},{"group":"2","name":"조제료","gasan":"1.15","width":"0px","txitems":[{"code":"30010","name":"조제료(1일분)","price":"330.0"},{"code":"30020","name":"조제료(2일분)","price":"410.0"},{"code":"30030","name":"조제료(3일분)","price":"480.0"},{"code":"30040","name":"조제료(4일분)","price":"560.0"},{"code":"30050","name":"조제료(5일분)","price":"630.0"},{"code":"30060","name":"조제료(6일분)","price":"710.0"},{"code":"30070","name":"조제료(7일분)","price":"780.0"},{"code":"30080","name":"조제료(8일분)","price":"860.0"},{"code":"30090","name":"조제료(9일분)","price":"940.0"},{"code":"30100","name":"조제료(10일분)","price":"1010.0"},{"code":"30110","name":"조제료(11일분)","price":"1090.0"},{"code":"30120","name":"조제료(12일분)","price":"1160.0"},{"code":"30130","name":"조제료(13일분)","price":"1240.0"},{"code":"30140","name":"조제료(14일분)","price":"1310.0"},{"code":"30150","name":"조제료(15일분)","price":"1390.0"},{"code":"30160","name":"조제료(16일분이상30일분까지)","price":"1610.0"},{"code":"30180","name":"조제료(31일분이상60일분까지)","price":"1990.0"},{"code":"30190","name":"조제료(61일분이상)","price":"2290.0"},{"code":"30200","name":"한방입원환자조제·복약지도료(1일당)","price":"330.0"}]},{"group":"3","name":"침1","gasan":"1.15","width":"400px","txitems":[{"code":"40011","name":"경1","price":"2560.0"},{"code":"40012","name":"경2","price":"3840.0"},{"code":"40011002","name":"1(자락등)","price":"3070.0"},{"code":"40011006","name":"1(화침등)","price":"3840.0"},{"code":"40012002","name":"2(자락등)","price":"4350.0"},{"code":"40012006","name":"2(화침등)","price":"5120.0"},{"code":"40012004","name":"2(사암등)","price":"5120.0"}]},{"group":"4","name":"특수","gasan":"1.15","width":"230px","txitems":[{"code":"40030","name":"안와","price":"2820.0"},{"code":"40070","name":"척추","price":"2780.0"},{"code":"40060","name":"관절","price":"2670.0"},{"code":"40080","name":"투자","price":"4130.0"},{"code":"40040","name":"비강","price":"2820.0"},{"code":"40050","name":"복강","price":"2800.0"}]},{"group":"5","name":"침2","gasan":"1.15","width":"220px","txitems":[{"code":"40120","name":"분구침","price":"2230.0"},{"code":"40091","name":"전침","price":"3870.0"},{"code":"40100","name":"레이저","price":"2680.0"},{"code":"40092","name":"전자침","price":"3890.0"}]},{"group":"6","name":"뜸구","gasan":"1.15","width":"150px","txitems":[{"code":"40304","name":"직접구","price":"5480.0"},{"code":"40306","name":"간접구","price":"2270.0"},{"code":"40305","name":"반흔구","price":"5720.0"},{"code":"40307","name":"기기구","price":"2090.0"}]},{"group":"7","name":"부항","gasan":"1.15","width":"200px","txitems":[{"code":"40312","name":"습부1","price":"5450.0"},{"code":"40313","name":"습부2","price":"8180.0"},{"code":"40321","name":"유관법","price":"3390.0"},{"code":"40323","name":"주관법","price":"4200.0"},{"code":"40322","name":"섬관법","price":"3640.0"}]},{"group":"8","name":"변증","gasan":"1.15","width":"150px","txitems":[{"code":"40400","name":"변증","price":"2450.0"}]},{"group":"9","name":"물리","gasan":"1.15","width":"150px","txitems":[{"code":"40700","name":"온열","price":"770.0"},{"code":"40701","name":"적외선","price":"770.0"},{"code":"40702","name":"한냉","price":"770.0"}]},{"group":"15","name":"보험약","gasan":"1","width":"500px","txitems":[{"code":"`C00010000","name":"C가미작약탕","price":"936.0"},{"code":"`C00020000","name":"C계지탕","price":"867.0"},{"code":"`C00030000","name":"C인삼2g","price":"1454.0"},{"code":"623003360","name":"기화구미강활탕","price":"1424.0"},{"code":"623003370","name":"기화삼소음","price":"1692.0"},{"code":"623003380","name":"기화소청룡탕","price":"1268.0"},{"code":"623003410","name":"기화갈근탕","price":"740.0"},{"code":"623003420","name":"기화향사평위산","price":"805.0"},{"code":"623003700","name":"기화이진탕","price":"707.0"},{"code":"623003920","name":"기화오적산","price":"1444.0"},{"code":"662703950","name":"한중궁하탕","price":"701.0"},{"code":"662704170","name":"한중이진탕","price":"707.0"},{"code":"662704380","name":"한중구미강활탕","price":"1424.0"},{"code":"662704390","name":"한중오적산","price":"1444.0"}]},{"group":"77","name":"비보","gasan":"1","width":"500px","txitems":[{"code":"HBSU00001","name":"첩약","price":"150000"},{"code":"HBSU00007","name":"경근중주파요법","price":"3030"},{"code":"HBSU00012","name":"비보험(당귀수산1일)","price":"2000"},{"code":"HBSU00013","name":"비보험(당귀수산3일)","price":"6000"},{"code":"HBSU00014","name":"비보험(당귀수산2일)","price":"4000"},{"code":"HBSU00015","name":"한방파스","price":"4000"},{"code":"HBSU00016","name":"산제(1일)","price":"1500"},{"code":"HBSU00017","name":"산제(2일)","price":"3000"},{"code":"HBSU00018","name":"경근저주파요법","price":"3030"},{"code":"HBSU00019","name":"자운고","price":"5000"},{"code":"HBSU00020","name":"첩약2","price":"180000"},{"code":"HBSU00021","name":"상담","price":"0"},{"code":"HBSU00022","name":"첩약3","price":"300000"},{"code":"HBSU00023","name":"약침(HN)","price":"5000"}]},{"group":"88","name":"자보","gasan":"1","width":"500px","txitems":[{"code":"49020","name":"경근저주파요법(TENS)","price":"3485"},{"code":"92010","name":"제일한방파프수(1매)","price":"383"}]}];

var txSub = [{"mainCode":"40011002","subItems":[{"OPSC_BIGO5":"0","name":"자락"},{"OPSC_BIGO5":"1","name":"도침"},{"OPSC_BIGO5":"2","name":"산침"}]},{"mainCode":"40011006","subItems":[{"OPSC_BIGO5":"3","name":"화침"},{"OPSC_BIGO5":"4","name":"온침"}]},{"mainCode":"40012002","subItems":[{"OPSC_BIGO5":"0","name":"자락"},{"OPSC_BIGO5":"1","name":"도침"},{"OPSC_BIGO5":"2","name":"산침"}]},{"mainCode":"40012006","subItems":[{"OPSC_BIGO5":"3","name":"화침"},{"OPSC_BIGO5":"4","name":"온침"}]},{"mainCode":"40012004","subItems":[{"OPSC_BIGO5":"5","name":"사암"},{"OPSC_BIGO5":"6","name":"오행"},{"OPSC_BIGO5":"7","name":"체질"}]},{"mainCode":"40120","subItems":[{"OPSC_BIGO5":"1","name":"이침"},{"OPSC_BIGO5":"2","name":"두침"},{"OPSC_BIGO5":"3","name":"족침"},{"OPSC_BIGO5":"4","name":"수침"},{"OPSC_BIGO5":"5","name":"수지침"},{"OPSC_BIGO5":"6","name":"면침"},{"OPSC_BIGO5":"7","name":"비침"},{"OPSC_BIGO5":"8","name":"완과침"},{"OPSC_BIGO5":"9","name":"피내침"},{"OPSC_BIGO5":"10","name":"피부침"},{"OPSC_BIGO5":"11","name":"자석침"}]},{"mainCode":"40313","subItems":[{"OPSC_BIGO5":"1","name":"두흉"},{"OPSC_BIGO5":"2","name":"두요"},{"OPSC_BIGO5":"3","name":"두상"},{"OPSC_BIGO5":"4","name":"흉요"},{"OPSC_BIGO5":"5","name":"흉상"},{"OPSC_BIGO5":"6","name":"요하"},{"OPSC_BIGO5":"7","name":"두하"},{"OPSC_BIGO5":"8","name":"흉하"},{"OPSC_BIGO5":"9","name":"요상"},{"OPSC_BIGO5":"10","name":"상하"}]},{"mainCode":"40030","subItems":[{"OPSC_BIGO2":"ST001\/","OPSC_BLOD":"승읍"},{"OPSC_BIGO2":"BL001\/","OPSC_BLOD":"정명"}]},{"mainCode":"40070","subItems":[{"OPSC_BIGO2":"GV008\/","OPSC_BLOD":"근축"},{"OPSC_BIGO2":"GV014\/","OPSC_BLOD":"대추"},{"OPSC_BIGO2":"GV004\/","OPSC_BLOD":"명문"},{"OPSC_BIGO2":"GV011\/","OPSC_BLOD":"신도"},{"OPSC_BIGO2":"GV012\/","OPSC_BLOD":"신주"},{"OPSC_BIGO2":"GV009\/","OPSC_BLOD":"지양"},{"OPSC_BIGO2":"GV006\/","OPSC_BLOD":"척중"},{"OPSC_BIGO2":"GV016\/","OPSC_BLOD":"풍부"},{"OPSC_BIGO2":"GV003\/","OPSC_BLOD":"요양관"}]},{"mainCode":"40060","subItems":[{"OPSC_BIGO2":"LI015\/","OPSC_BLOD":"견우"},{"OPSC_BIGO2":"LI011\/","OPSC_BLOD":"곡지"},{"OPSC_BIGO2":"GB040\/","OPSC_BLOD":"구허"},{"OPSC_BIGO2":"SI010\/","OPSC_BLOD":"노수"},{"OPSC_BIGO2":"PC007\/","OPSC_BLOD":"대릉"},{"OPSC_BIGO2":"ST035\/","OPSC_BLOD":"독비"},{"OPSC_BIGO2":"GB003\/","OPSC_BLOD":"상관"},{"OPSC_BIGO2":"HT003\/","OPSC_BLOD":"소해"},{"OPSC_BIGO2":"LE201\/","OPSC_BLOD":"슬안"},{"OPSC_BIGO2":"BL062\/","OPSC_BLOD":"신맥"},{"OPSC_BIGO2":"LI005\/","OPSC_BLOD":"양계"},{"OPSC_BIGO2":"SI005\/","OPSC_BLOD":"양곡"},{"OPSC_BIGO2":"TE004\/","OPSC_BLOD":"양지"},{"OPSC_BIGO2":"KI006\/","OPSC_BLOD":"조해"},{"OPSC_BIGO2":"LR004\/","OPSC_BLOD":"중봉"},{"OPSC_BIGO2":"TE010\/","OPSC_BLOD":"천정"},{"OPSC_BIGO2":"ST007\/","OPSC_BLOD":"하관"},{"OPSC_BIGO2":"GB030\/","OPSC_BLOD":"환도"}]},{"mainCode":"40080","subItems":[{"OPSC_BIGO2":"ST004\/ST006\/","OPSC_BLOD":"지창/협거"},{"OPSC_BIGO2":"HN046\/GB008\/","OPSC_BLOD":"태양/솔곡"},{"OPSC_BIGO2":"TE021\/SI019\/","OPSC_BLOD":"이문/청궁"},{"OPSC_BIGO2":"PC006\/TE005\/","OPSC_BLOD":"내관/외관"},{"OPSC_BIGO2":"LI004\/SI003\/","OPSC_BLOD":"합곡/후계"},{"OPSC_BIGO2":"TE014\/HT001\/","OPSC_BLOD":"견료/극천"},{"OPSC_BIGO2":"BL060\/KI003\/","OPSC_BLOD":"곤륜/태계"},{"OPSC_BIGO2":"SP006\/GB039\/","OPSC_BLOD":"삼음교/현종"}]},{"mainCode":"40040","subItems":[{"OPSC_BIGO2":"HN160\/","OPSC_BLOD":"내영향"}]},{"mainCode":"40050","subItems":[{"OPSC_BIGO2":"CV013\/","OPSC_BLOD":"상완"},{"OPSC_BIGO2":"CV012\/","OPSC_BLOD":"중완"},{"OPSC_BIGO2":"CV010\/","OPSC_BLOD":"하완"},{"OPSC_BIGO2":"CV006\/","OPSC_BLOD":"기해"},{"OPSC_BIGO2":"CV004\/","OPSC_BLOD":"관원"},{"OPSC_BIGO2":"CV003\/","OPSC_BLOD":"중극"},{"OPSC_BIGO2":"ST025\/","OPSC_BLOD":"천추"},{"OPSC_BIGO2":"SP015\/","OPSC_BLOD":"대횡"}]}];
/*
//-----------------------------------------------------------------------------
// INSTANCE & RETURN
//-----------------------------------------------------------------------------
  return new TxItems();
  //return Global;
});
*/