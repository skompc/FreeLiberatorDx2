// TODO: Grab Dramas that come after battles
// TODO: Grab Tutorial Dramas
// TODO: Alterworld Stuffs
// TODO: Everything else...

const fs = require('fs');
const path = require('path');
const encrypt = require("../tools/decrypt").encrypt;
const decrypt = require("../tools/decrypt").decrypt;
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const CookieJar = require('tough-cookie').CookieJar;

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const jar = new CookieJar();
  const client = wrapper(axios.create({
    withCredentials: true,
  }));

  // GET THIS FROM A BROWSER WINDOW WITH THE LOGIN JSON OPEN (It's in the cookies of that[press F12 and refresh])
  let sid = "CEA016E92A58EC3905AD03EDBD54CED0-n2"
  // GET THIS FROM THE SAME BROWSER WINDOW! (It's in the page itself)
  let ek = "XE6DJ01E0ZN4"

  const cookieValue = `JSESSIONID=${sid}`;

  // Set the cookie in the request headers
  client.defaults.headers.common['Cookie'] = cookieValue

  //quest ids
  let questArray = [
    10001,
    10011,
    10012,
    10013,
    10021,
    10022,
    10023,
    10031,
    10032,
    10033,
    10041,
    10042,
    10043,
    10051,
    10052,
    10053,
    10061,
    10062,
    10063,
    10071,
    10072,
    10073,
    10081,
    10082,
    10083,
    10091,
    10092,
    10093,
    1001,
    1002,
    1003,
    10101,
    10102,
    10103,
    10111,
    10112,
    10113,
    10121,
    10122,
    10123,
    10131,
    11001,
    11011,
    11012,
    11013,
    11021,
    11022,
    11023,
    11031,
    11032,
    11033,
    11041,
    11042,
    11043,
    11051,
    11052,
    11053,
    11061,
    11062,
    11063,
    11071,
    11072,
    11073,
    11081,
    11082,
    11083,
    11091,
    11092,
    11093,
    11101,
    11102,
    11103,
    1101,
    1102,
    1103,
    11111,
    11112,
    11113,
    11121,
    11122,
    11123,
    11131,
    11132,
    11133,
    11141,
    11142,
    11143,
    11151,
    12001,
    12011,
    12012,
    12013,
    12021,
    12022,
    12023,
    12031,
    12032,
    12033,
    12041,
    12042,
    12043,
    12051,
    12052,
    12053,
    12061,
    12062,
    12063,
    12071,
    12072,
    12073,
    12081,
    12082,
    12083,
    12091,
    12092,
    12093,
    12101,
    12102,
    12103,
    12111,
    12112,
    12113,
    12121,
    12122,
    12123,
    1201,
    1202,
    1203,
    12131,
    12132,
    12133,
    12141,
    12142,
    12143,
    12151,
    12152,
    12153,
    12161,
    12162,
    12163,
    12171,
    12172,
    12173,
    12181,
    13001,
    13011,
    13012,
    13013,
    13021,
    13022,
    13023,
    13031,
    13032,
    13033,
    13041,
    13042,
    13043,
    13051,
    13052,
    13053,
    13061,
    13062,
    13063,
    13071,
    13072,
    13073,
    13081,
    13082,
    13083,
    13091,
    13092,
    13093,
    13101,
    13102,
    13103,
    13111,
    13112,
    13113,
    13121,
    13122,
    13123,
    1301,
    1302,
    1303,
    13131,
    13132,
    13133,
    13141,
    13142,
    13143,
    13151,
    13152,
    13153,
    13161,
    13162,
    13163,
    13171,
    14001,
    14011,
    14012,
    14013,
    14021,
    14022,
    14023,
    14031,
    14032,
    14033,
    14041,
    14042,
    14043,
    14051,
    14052,
    14053,
    14061,
    14062,
    14063,
    14071,
    14072,
    14073,
    14081,
    14082,
    14083,
    14091,
    14092,
    14093,
    14101,
    14102,
    14103,
    14111,
    14112,
    14113,
    14121,
    14122,
    14123,
    1401,
    1402,
    1403,
    14131,
    14132,
    14133,
    14141,
    14142,
    14143,
    14151,
    14152,
    14153,
    14161,
    14162,
    14163,
    14171,
    15001,
    15011,
    15012,
    15013,
    15021,
    15022,
    15023,
    15031,
    15032,
    15033,
    15041,
    15042,
    15043,
    15051,
    15052,
    15053,
    15061,
    15062,
    15063,
    15071,
    15072,
    15073,
    15081,
    15082,
    15083,
    15091,
    15092,
    15093,
    15101,
    15102,
    15103,
    1501,
    1502,
    1503,
    15111,
    15112,
    15113,
    15121,
    15122,
    15123,
    15131,
    15132,
    15133,
    15141,
    15142,
    15143,
    15151,
    15152,
    15153,
    15161,
    15171,
    16001,
    16011,
    16012,
    16013,
    16021,
    16022,
    16023,
    16031,
    16032,
    16033,
    16041,
    16042,
    16043,
    16051,
    16052,
    16053,
    16061,
    16062,
    16063,
    16071,
    16072,
    16073,
    16081,
    16082,
    16083,
    16091,
    16092,
    16093,
    16101,
    16102,
    16103,
    1601,
    1602,
    1603,
    16111,
    16112,
    16113,
    16121,
    16122,
    16123,
    16131,
    16132,
    16133,
    16141,
    16142,
    16143,
    16151,
    16152,
    16153,
    16161,
    16162,
    16163,
    16171,
    17001,
    17011,
    17012,
    17013,
    17021,
    17022,
    17023,
    17031,
    17032,
    17033,
    17041,
    17042,
    17043,
    17051,
    17052,
    17053,
    17061,
    17062,
    17063,
    17071,
    17072,
    17073,
    17081,
    17082,
    17083,
    17091,
    17092,
    17093,
    1701,
    1702,
    1703,
    17101,
    17102,
    17103,
    17111,
    17112,
    17113,
    17121,
    17122,
    17123,
    17131,
    17132,
    17133,
    17141,
    17991,
    18001,
    18011,
    18012,
    18013,
    18021,
    18022,
    18023,
    18031,
    18032,
    18033,
    18041,
    18042,
    18043,
    18051,
    18052,
    18053,
    18061,
    18062,
    18063,
    18071,
    18072,
    18073,
    1801,
    1802,
    1803,
    18081,
    18082,
    18083,
    18091,
    18092,
    18093,
    18101,
    18102,
    18103,
    18111,
    18112,
    18113,
    18121,
    18122,
    18123,
    18171,
    19001,
    19011,
    19012,
    19013,
    19021,
    19022,
    19023,
    19031,
    19032,
    19033,
    19041,
    19042,
    19043,
    19051,
    19052,
    19053,
    19061,
    19062,
    19063,
    19071,
    19072,
    19073,
    1901,
    1902,
    1903,
    19081,
    19082,
    19083,
    19091,
    19092,
    19093,
    19101,
    19102,
    19103,
    19111,
    19112,
    19113,
    19121,
    19122,
    19123,
    19131,
    20001,
    20011,
    20012,
    20013,
    20021,
    20022,
    20023,
    20031,
    20032,
    20033,
    20041,
    20042,
    20043,
    20051,
    20052,
    20053,
    20061,
    20062,
    20063,
    20071,
    20072,
    20073,
    2001,
    2002,
    2003,
    20081,
    20082,
    20083,
    20091,
    20092,
    20093,
    20101,
    20102,
    20103,
    20111,
    20112,
    20113,
    20121,
    20122,
    20123,
    20131,
    21001,
    21011,
    21012,
    21013,
    21021,
    21022,
    21023,
    21031,
    21032,
    21033,
    21041,
    21042,
    21043,
    21051,
    21052,
    21053,
    21061,
    21062,
    21063,
    21071,
    21072,
    21073,
    21081,
    21082,
    21083,
    21091,
    21092,
    21093,
    21101,
    21102,
    21103,
    2101,
    2102,
    2103,
    21111,
    21112,
    21113,
    21121,
    21122,
    21123,
    21131,
    21132,
    21133,
    21141,
    21142,
    21143,
    21151,
    21152,
    21153,
    21161,
    22001,
    22011,
    22012,
    22013,
    22021,
    22022,
    22023,
    22031,
    22032,
    22033,
    22041,
    22042,
    22043,
    22051,
    22052,
    22053,
    22061,
    22062,
    22063,
    22071,
    22072,
    22073,
    22081,
    22082,
    22083,
    22091,
    22092,
    22093,
    22101,
    22102,
    22103,
    2201,
    2202,
    2203,
    22111,
    22112,
    22113,
    22121,
    22122,
    22123,
    22131,
    22132,
    22133,
    22141,
    22142,
    22143,
    22151,
    22152,
    22153,
    22161,
    22162,
    22163,
    22171,
    22181,
    23001,
    23011,
    23012,
    23013,
    23021,
    23022,
    23023,
    23031,
    23032,
    23033,
    23041,
    23042,
    23043,
    23051,
    23052,
    23053,
    23061,
    23062,
    23063,
    23071,
    23072,
    23073,
    23081,
    23082,
    23083,
    23091,
    23092,
    23093,
    2301,
    2302,
    2303,
    23101,
    23102,
    23103,
    23111,
    23112,
    23113,
    23121,
    23122,
    23123,
    23131,
    23132,
    23133,
    23141,
    23142,
    23143,
    23151,
    23152,
    23153,
    23161,
    23162,
    23163,
    23171,
    24001,
    24011,
    24012,
    24013,
    24021,
    24022,
    24023,
    24031,
    24032,
    24033,
    24041,
    24042,
    24043,
    24051,
    24052,
    24053,
    24061,
    24062,
    24063,
    24071,
    24072,
    24073,
    24081,
    24082,
    24083,
    24091,
    24092,
    24093,
    2401,
    2402,
    2403,
    24101,
    24102,
    24103,
    24111,
    24112,
    24113,
    24121,
    24122,
    24123,
    24131,
    24132,
    24133,
    24141,
    24142,
    24143,
    24151,
    24152,
    24153,
    24161,
    24162,
    24163,
    24171,
    24172,
    24173,
    24181,
    25001,
    25011,
    25012,
    25013,
    25021,
    25022,
    25023,
    25031,
    25032,
    25033,
    25041,
    25042,
    25043,
    25051,
    25052,
    25053,
    25061,
    25062,
    25063,
    25071,
    25072,
    25073,
    25081,
    25082,
    25083,
    25091,
    25092,
    25093,
    25101,
    25102,
    25103,
    2501,
    2502,
    2503,
    25111,
    25112,
    25113,
    25121,
    25122,
    25123,
    25131,
    25132,
    25133,
    25141,
    25142,
    25143,
    25151,
    25152,
    25153,
    25161
  ]

  // drama paths
  let dramaArray = [
    "story/capter_01/000_qb",
    "story/capter_01/001_qb",
    "story/capter_01/002_qb",
    "story/capter_01/003_qb",
    "story/capter_01/004_qb",
    "story/capter_01/005_qb",
    "story/capter_01/006_qb",
    "story/capter_01/007_qb",
    "story/capter_01/008_qb",
    "story/capter_01/009_qb",
    "story/capter_01/010_qb",
    "story/capter_01/011_qb",
    "story/capter_01/012_qb",
    "story/capter_01/100_qb",
    "story/capter_02/000_qb",
    "story/capter_02/001_qb",
    "story/capter_02/002_qb",
    "story/capter_02/003_qb",
    "story/capter_02/004_qb",
    "story/capter_02/005_qb",
    "story/capter_02/006_qb",
    "story/capter_02/007_qb",
    "story/capter_02/008_qb",
    "story/capter_02/009_qb",
    "story/capter_02/010_qb",
    "story/capter_02/011_qb",
    "story/capter_02/012_qb",
    "story/capter_02/013_qb",
    "story/capter_02/014_qb",
    "story/capter_02/100_qb",
    "story/capter_03/000_qb",
    "story/capter_03/001_qb",
    "story/capter_03/002_qb",
    "story/capter_03/003_qb",
    "story/capter_03/004_qb",
    "story/capter_03/005_qb",
    "story/capter_03/006_qb",
    "story/capter_03/007_qb",
    "story/capter_03/008_qb",
    "story/capter_03/009_qb",
    "story/capter_03/010_qb",
    "story/capter_03/011_qb",
    "story/capter_03/012_qb",
    "story/capter_03/013_qb",
    "story/capter_03/014_qb",
    "story/capter_03/015_qb",
    "story/capter_03/016_qb",
    "story/capter_03/017_qb",
    "story/capter_03/100_qb",
    "story/capter_04/000_qb",
    "story/capter_04/001_qb",
    "story/capter_04/002_qb",
    "story/capter_04/003_qb",
    "story/capter_04/004_qb",
    "story/capter_04/005_qb",
    "story/capter_04/006_qb",
    "story/capter_04/007_qb",
    "story/capter_04/008_qb",
    "story/capter_04/009_qb",
    "story/capter_04/010_qb",
    "story/capter_04/011_qb",
    "story/capter_04/012_qb",
    "story/capter_04/013_qb",
    "story/capter_04/014_qb",
    "story/capter_04/015_qb",
    "story/capter_04/016_qb",
    "story/capter_04/100_qb",
    "story/capter_05/000_qb",
    "story/capter_05/001_qb",
    "story/capter_05/002_qb",
    "story/capter_05/003_qb",
    "story/capter_05/004_qb",
    "story/capter_05/005_qb",
    "story/capter_05/006_qb",
    "story/capter_05/007_qb",
    "story/capter_05/008_qb",
    "story/capter_05/009_qb",
    "story/capter_05/010_qb",
    "story/capter_05/011_qb",
    "story/capter_05/012_qb",
    "story/capter_05/013_qb",
    "story/capter_05/014_qb",
    "story/capter_05/015_qb",
    "story/capter_05/016_qb",
    "story/capter_05/100_qb",
    "story/capter_06/000_qb",
    "story/capter_06/001_qb",
    "story/capter_06/002_qb",
    "story/capter_06/003_qb",
    "story/capter_06/004_qb",
    "story/capter_06/005_qb",
    "story/capter_06/006_qb",
    "story/capter_06/007_qb",
    "story/capter_06/008_qb",
    "story/capter_06/009_qb",
    "story/capter_06/010_qb",
    "story/capter_06/011_qb",
    "story/capter_06/012_qb",
    "story/capter_06/013_qb",
    "story/capter_06/014_qb",
    "story/capter_06/015_qb",
    "story/capter_06/100_qb",
    "story/capter_06/100_qb_b",
    "story/capter_07/000_qb",
    "story/capter_07/001_qb",
    "story/capter_07/002_qb",
    "story/capter_07/003_qb",
    "story/capter_07/004_qb",
    "story/capter_07/005_qb",
    "story/capter_07/006_qb",
    "story/capter_07/007_qb",
    "story/capter_07/008_qb",
    "story/capter_07/009_qb",
    "story/capter_07/010_qb",
    "story/capter_07/011_qb",
    "story/capter_07/012_qb",
    "story/capter_07/013_qb",
    "story/capter_07/014_qb",
    "story/capter_07/015_qb",
    "story/capter_07/016_qb",
    "story/capter_07/100_qb",
    "story/capter_07b/000_qb",
    "story/capter_07b/001_qb",
    "story/capter_07b/002_qb",
    "story/capter_07b/003_qb",
    "story/capter_07b/004_qb",
    "story/capter_07b/005_qb",
    "story/capter_07b/006_qb",
    "story/capter_07b/007_qb",
    "story/capter_07b/008_qb",
    "story/capter_07b/009_qb",
    "story/capter_07b/010_qb",
    "story/capter_07b/011_qb",
    "story/capter_07b/012_qb",
    "story/capter_07b/013_qb",
    "story/capter_07b/100_qb",
    "story/capter_second_op/000_qb",
    "story/capter_08/000_qb",
    "story/capter_08/001_qb",
    "story/capter_08/002_qb",
    "story/capter_08/003_qb",
    "story/capter_08/004_qb",
    "story/capter_08/005_qb",
    "story/capter_08/006_qb",
    "story/capter_08/007_qb",
    "story/capter_08/008_qb",
    "story/capter_08/100_qb",
    "story/capter_09/000_qb",
    "story/capter_09/001_qb",
    "story/capter_09/002_qb",
    "story/capter_09/003_qb",
    "story/capter_09/004_qb",
    "story/capter_09/005_qb",
    "story/capter_09/006_qb",
    "story/capter_09/007_qb",
    "story/capter_09/008_qb",
    "story/capter_09/009_qb",
    "story/capter_09/010_qb",
    "story/capter_09/100_qb",
    "story/capter_10/000_qb",
    "story/capter_10/001_qb",
    "story/capter_10/002_qb",
    "story/capter_10/003_qb",
    "story/capter_10/004_qb",
    "story/capter_10/005_qb",
    "story/capter_10/006_qb",
    "story/capter_10/007_qb",
    "story/capter_10/008_qb",
    "story/capter_10/009_qb",
    "story/capter_10/010_qb",
    "story/capter_10/011_qb",
    "story/capter_10/012_qb",
    "story/capter_10/100_qb",
    "story/capter_11/000_qb",
    "story/capter_11/001_qb",
    "story/capter_11/002_qb",
    "story/capter_11/003_qb",
    "story/capter_11/004_qb",
    "story/capter_11/005_qb",
    "story/capter_11/006_qb",
    "story/capter_11/007_qb",
    "story/capter_11/008_qb",
    "story/capter_11/009_qb",
    "story/capter_11/010_qb",
    "story/capter_11/011_qb",
    "story/capter_11/012_qb",
    "story/capter_11/013_qb",
    "story/capter_11/014_qb",
    "story/capter_11/015_qb",
    "story/capter_11/100_qb",
    "story/capter_12/000_qb",
    "story/capter_12/001_qb",
    "story/capter_12/002_qb",
    "story/capter_12/003_qb",
    "story/capter_12/004_qb",
    "story/capter_12/005_qb",
    "story/capter_12/006_qb",
    "story/capter_12/007_qb",
    "story/capter_12/008_qb",
    "story/capter_12/009_qb",
    "story/capter_12/010_qb",
    "story/capter_12/011_qb",
    "story/capter_12/012_qb",
    "story/capter_12/013_qb",
    "story/capter_12/014_qb",
    "story/capter_12/015_qb",
    "story/capter_12/016_qb",
    "story/capter_12/100_qb",
    "story/capter_12/100_qb_b",
    "story/capter_13/000_qb",
    "story/capter_13/001_qb",
    "story/capter_13/002_qb",
    "story/capter_13/003_qb",
    "story/capter_13/006_qb",
    "story/capter_13/007_qb",
    "story/capter_13/008_qb",
    "story/capter_13/009_qb",
    "story/capter_13/010_qb",
    "story/capter_13/011_qb",
    "story/capter_13/013_qb",
    "story/capter_13/014_qb",
    "story/capter_13/015_qb",
    "story/capter_13/016_qb",
    "story/capter_13/100_qb",
    "story/capter_13b/000_qb",
    "story/capter_13b/001_qb",
    "story/capter_13b/002_qb",
    "story/capter_13b/003_qb",
    "story/capter_13b/004_qb",
    "story/capter_13b/005_qb",
    "story/capter_13b/006_qb",
    "story/capter_13b/007_qb",
    "story/capter_13b/008_qb",
    "story/capter_13b/009_qb",
    "story/capter_13b/010_qb",
    "story/capter_13b/011_qb",
    "story/capter_13b/012_qb",
    "story/capter_13b/013_qb",
    "story/capter_13b/014_qb",
    "story/capter_13b/017_qb",
    "story/capter_13b/100_qb",
    "story/capter_14/000_qb",
    "story/capter_14/001_qb",
    "story/capter_14/002_qb",
    "story/capter_14/003_qb",
    "story/capter_14/004_qb",
    "story/capter_14/005_qb",
    "story/capter_14/006_qb",
    "story/capter_14/007_qb",
    "story/capter_14/008_qb",
    "story/capter_14/009_qb",
    "story/capter_14/010_qb",
    "story/capter_14/011_qb",
    "story/capter_14/012_qb",
    "story/capter_14/013_qb",
    "story/capter_14/014_qb",
    "story/capter_14/015_qb",
    "story/capter_14/100_qb"
  ]

  let urlArray_Drama = []

  let urlArray_Battle = []

  // Make Drama urls
  for (const drama of dramaArray) {
    const dramaToGet = encodeURIComponent(drama);
    const encodedUrl = dramaToGet.replace(/\//g, '%2f');
    const dec = `lang=1&path=${encodedUrl}&_tm_=8`;
    const enc = encrypt(dec, ek);
    const url = `https://d2r-sim.d2megaten.com/socialsv/Drama.do?param=${enc}`;
    urlArray_Drama.push(url);
  }

  // Fetch Drama urls
  for (let i = 0; i < dramaArray.length; i++) {
    await wait(5000)
    let url = urlArray_Drama[i]

    fs.mkdir(`../json/dramas/${dramaArray[i]}/..`, { recursive: true }, (err) => {
      if (err) {
        //console.error(`Error creating directory: ${err.message}`);
      } else {
        //console.log(`Created directory: ${dramaArray[i]}`);
      }
    });

    client.get(url)
      .then(response => {
        const jsonData = response.data;
        const fileName = `../json/dramas/${dramaArray[i]}.json`;

        fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) throw err;
          console.log(`JSON data saved to ${fileName}`);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Make BattleEntry urls
  for (const quest of questArray) {
    const dec0 = `stage=${quest}&main_smn=1&sub_smn=0&main_idx=1&sub_idx=0&helper=0&smn_id=0&is_auto=0&_tm_=108`;
    const enc0 = encrypt(dec0, ek);
    const url0 = `https://d2r-sim.d2megaten.com/socialsv/BattleEntry.do?param=${enc0}`;
    urlArray_Battle.push(url0);
  }

  // Fetch BattleEntry urls
  for (let i = 0; i < questArray.length; i++) {
    await wait(5000)
    let url = urlArray_Battle[i]

    fs.mkdir(`../json/battles/story/${questArray[i]}`, { recursive: true }, (err) => {
      if (err) {
        //console.error(`Error creating directory: ${err.message}`);
      } else {
        //console.log(`Created directory: ${dramaArray[i]}`);
      }
    });

    client.get(url)
      .then(response => {
        const jsonData = response.data;
        const fileName = `../json/battles/story/${questArray[i]}/0.json`;

        fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) throw err;
          console.log(`JSON data saved to ${fileName}`);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  urlArray_Battle = []
  // Make BattleNext urls (wave 1)
  for (const quest of questArray) {
    const dec1 = `stage=${quest}&wave=1&an_info=%5b%7b%22id%22%3a+11910%2c%22attr%22%3a+127%7d%5d&item_use=&df_info=%5b%7b%22uniq%22%3a+4%2c%22type%22%3a+2%7d%5d&turn=1&p_act=0&e_act=0&_tm_=136`;
    const enc1 = encrypt(dec1, ek);
    const url1 = `https://d2r-sim.d2megaten.com/socialsv/BattleNext.do?param=${enc1}`;
    urlArray_Battle.push(url1);
  }

  // Fetch BattleEntry urls (wave 1)
  for (let i = 0; i < questArray.length; i++) {
    await wait(5000)
    let url = urlArray_Battle[i]

    fs.mkdir(`../json/battles/story/${questArray[i]}`, { recursive: true }, (err) => {
      if (err) {
        //console.error(`Error creating directory: ${err.message}`);
      } else {
        //console.log(`Created directory: ${dramaArray[i]}`);
      }
    });

    client.get(url)
      .then(response => {
        const jsonData = response.data;
        const fileName = `../json/battles/story/${questArray[i]}/1.json`;

        fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) throw err;
          console.log(`JSON data saved to ${fileName}`);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  urlArray_Battle = []
  // Make BattleNext urls (wave 2)
  for (const quest of questArray) {
    const dec2 = `stage=${quest}&wave=2&an_info=%5b%7b%22id%22%3a+11910%2c%22attr%22%3a+127%7d%5d&item_use=&df_info=%5b%7b%22uniq%22%3a+4%2c%22type%22%3a+2%7d%5d&turn=1&p_act=0&e_act=0&_tm_=136`;
    const enc2 = encrypt(dec2, ek);
    const url2 = `https://d2r-sim.d2megaten.com/socialsv/BattleNext.do?param=${enc2}`;
    urlArray_Battle.push(url2);
  }

  // Fetch BattleNext urls (wave 2)
  for (let i = 0; i < questArray.length; i++) {
    await wait(5000)
    let url = urlArray_Battle[i]

    fs.mkdir(`../json/battles/story/${questArray[i]}`, { recursive: true }, (err) => {
      if (err) {
        //console.error(`Error creating directory: ${err.message}`);
      } else {
        //console.log(`Created directory: ${dramaArray[i]}`);
      }
    });

    client.get(url)
      .then(response => {
        const jsonData = response.data;
        const fileName = `../json/battles/story/${questArray[i]}/2.json`;

        fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) throw err;
          console.log(`JSON data saved to ${fileName}`);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  urlArray_Battle = []
  // Make BattleResult urls
  for (const quest of questArray) {
    const dec3 = `stage=${quest}&result=1&an_info=%5b%7b%22id%22%3a+11730%2c%22attr%22%3a+1%7d%5d&item_use=&df_info=%5b%7b%22uniq%22%3a+6%2c%22type%22%3a+1%7d%5d&mission_result=0&defeat_count=3&smn_change=1&max_damage=36&turn=1&p_act=2&e_act=0&mem_cnt=0&dtcr_err=0&mem_log=&clear_tm=146830&info=%7b%22is_not_using_command%22%3a0%2c%22devil_info%22%3a%5b%22%7b%5c%22uniq_id%5c%22%3a40429823204%2c%5c%22defeat_num%5c%22%3a0%2c%5c%22hp%5c%22%3a40%2c%5c%22total_damage%5c%22%3a53%2c%5c%22cond_add_type%5c%22%3a%5b%5d%2c%5c%22cond_add_count%5c%22%3a%5b%5d%2c%5c%22action_result_type%5c%22%3a%5b3%5d%2c%5c%22action_result_count%5c%22%3a%5b1%5d%7d%22%2c%22%7b%5c%22uniq_id%5c%22%3a40429823205%2c%5c%22defeat_num%5c%22%3a2%2c%5c%22hp%5c%22%3a41%2c%5c%22total_damage%5c%22%3a59%2c%5c%22cond_add_type%5c%22%3a%5b%5d%2c%5c%22cond_add_count%5c%22%3a%5b%5d%2c%5c%22action_result_type%5c%22%3a%5b3%5d%2c%5c%22action_result_count%5c%22%3a%5b1%5d%7d%22%5d%2c%22enemy_devil_info%22%3a%5b%22%7b%5c%22uniq_id%5c%22%3a4%2c%5c%22defeat_num%5c%22%3a0%2c%5c%22hp%5c%22%3a0%2c%5c%22total_damage%5c%22%3a0%2c%5c%22cond_add_type%5c%22%3a%5b%5d%2c%5c%22cond_add_count%5c%22%3a%5b%5d%2c%5c%22action_result_type%5c%22%3a%5b%5d%2c%5c%22action_result_count%5c%22%3a%5b%5d%7d%22%2c%22%7b%5c%22uniq_id%5c%22%3a5%2c%5c%22defeat_num%5c%22%3a0%2c%5c%22hp%5c%22%3a0%2c%5c%22total_damage%5c%22%3a47%2c%5c%22cond_add_type%5c%22%3a%5b%5d%2c%5c%22cond_add_count%5c%22%3a%5b%5d%2c%5c%22action_result_type%5c%22%3a%5b3%5d%2c%5c%22action_result_count%5c%22%3a%5b1%5d%7d%22%2c%22%7b%5c%22uniq_id%5c%22%3a6%2c%5c%22defeat_num%5c%22%3a0%2c%5c%22hp%5c%22%3a0%2c%5c%22total_damage%5c%22%3a0%2c%5c%22cond_add_type%5c%22%3a%5b%5d%2c%5c%22cond_add_count%5c%22%3a%5b%5d%2c%5c%22action_result_type%5c%22%3a%5b%5d%2c%5c%22action_result_count%5c%22%3a%5b%5d%7d%22%5d%2c%22result_drama_cutin%22%3a%5b%5d%7d&_tm_=155`;
    const enc3 = encrypt(dec3, ek);
    const url3 = enc3;
    urlArray_Battle.push(url3);
  }

  // Fetch BattleResult urls
  for (let i = 0; i < questArray.length; i++) {
    await wait(5000)
    let url = "https://d2r-sim.d2megaten.com/socialsv/BattleResult.do"

    fs.mkdir(`../json/battles/story/${questArray[i]}`, { recursive: true }, (err) => {
      if (err) {
        //console.error(`Error creating directory: ${err.message}`);
      } else {
        //console.log(`Created directory: ${dramaArray[i]}`);
      }
    });

    client.post(url, urlArray_Battle[i])
      .then(response => {
        const jsonData = response.data;
        const fileName = `../json/battles/story/${questArray[i]}/result.json`;

        fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) throw err;
          console.log(`JSON data saved to ${fileName}`);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

main()

// just for my personal use here...
//decrypt("02762b9668f049100b39d719b8c077233dd858e077f0154648658876e19f206a72981ef73eb34a525c368f4dadc374207cdc00a42ab31b474b36850cbac327713bcf0ea729a11b164535c31eecd4736169d45ff076db5d040b39c04deeae2f6b29d216b02ee60d400c21d41bfd9f2f746a8f19b028e503414b36850cbac3327c3fd80ea729a11b164535c31eecd4736169d042e668ed47193176835afd9d32387f9b4ff07de149033167895ce6857b3669ce46fb44e7401600638314b9d72b6437e24ff476e54f125337d00ffc84346b728c0de544e54b035336c04cd7902571728d0df87ee977140070db19ae9532663de24ee769b9185103618b76e49e213869de47f07af677030339d71dbec9753569d445f374b90d400c21d41be182196b20c974e068ed461031678944e59028616a8f19b028e518525c67c31bba95237326d174fc75e247525c36c31ae9d473676a8f19b02ce60d420d21d41bfd9f2f7410d44fb02ee70d455c21d548bcc17237768519a629b41c525c67c31cebd474372bd84df07af077191b69c31cebd474376a8e4aa53eb64b525b67c31bba9936207ade0ea729a11b165a34c31bebd473666a8f19e174f0491b31608744e99623207ade0ea729a11b165b37c31bebd473666a8f19f674ea4c280f608276fc8836606a8848b029b60d440f21d34badc422207dde0ea078a11a450d6b884dd790226110de44e075f00d420d21d41badc227207adf0ea07fa11a144b31850cbac327663bd444fb44f64d041b689276fc8836606a8848b029b60d440f21d34bbbd473616a8f48b02ee70d455c65855de19e285a3dd858e077f077140171885dadc425207d8f0ea67aa11d155f21d34dadc622207d8f0ea778a11a454b33840cbd9263377dc845fc6adb41134b31850cbac363362e891ba129bd10455d36d61cadc325207ade0ea729e04d110b659276e6842b207ade0ea729a11b165c21d44aadc425207d8f43e53eb14b525c36c31ae9c577207dde0ea078a11a451a6b9248e4ae226422dc4cf03eb14b525c36c31ae9c47f207dde0ea078a11a450d6b884dd790226110c952e57ea11d144b36d40cbb9063302d981ef13eb64b525b67c31bba92296b2be24af17fdb4b181b6a920cbd9263377d9818f43eb14a525b60c31bebd473666a8f19f478f04118005b944cfb842a7110c952e57ea11d144b36d40cbb9063302d8e0ea07fa11a144b31850cbac327663bd444fb44f64d041b689276eb9e336b3b981ef63eb61a525d65c31ceac063302b981cf13eb61a525b60c31bebd474372ad34ef862db4c12186d8a76e19f206a6a8f19b028e50d420c21d41badc624207ade0ea729f1461e1f5b8f4dadc425207d8f0ea67ab00d450d21d34aadc374612adb4ef46fdb46020321d34aadc374207cdc1bb029e70d420d21d41be08163302c9819a73eb749474b36850cbd9263377dc944e17ae877130f69874eedd473666a8f19b028e518525c67c31cebd474372cd245f144e54c1331709f59edd473666a8f19b028e50d420c21d34dadc325207ade0ea729e747190a5b874decae256a3ad35fb02ee70d455c21d548adc424207ad90ea778a11d144b36d448eb852f6a21e259f068f1440331709f59edd473666a8f19b028e50d420c21d34dadc325207ade0ea729e54b03076b8876fa94357023c974f674f146034b31850cbac363362e981ef73eb14c525960c31bbad474666a8f19b02ce60d420d21d41bfd9f2f7410d44fb02ee70d455c21d548bdd474666a8848b029b64c120861875dd79f33686a8848b029b60d440f34c31bebd473666a8f19fd6ba11d144b36d40cbb9076207dde0ea078a11a451a6b9248e4ae226422dc4cf03eb14b525c36c31ae9c571207dde0ea078a11a450d6b884dd790226110c952e57ea11d144b36d40cbb9063302d981ef13eb64b525b67c31bba92296b2be24af17fdb4b181b6a920cbd9263377d9818f43eb14a525b60c31bebd473666a8f19f478f04118005b944cfb842a7110c952e57ea11d144b36d40cbb9063302d8e0ea07fa11a144b31850cbac327663bd444fb44f64d041b689276eb9e336b3b981ef63eb61a525d65c31ceac063302b981cf13eb61a525c67c31bbad471676a8848b029b65d190775b940ecd473666a8f19b028e51e525c67c31cebd474372bd84df07af077191b69c31cebd474376a8e4aa53eb64b525b67c31bba9936207ade0ea729a11b165e21d44aadc425207d8f5ffa6fe544280a658b48ef9463302c9819a73eb749474b36850cbd9263377dde44fb7fdb49130a5b9250f89463302c9819a73eb749525b66c31cecd474666a8848b029b64b180060b948ec95196620c845e13eb14b525c36c31ae9d473676a884fb029e70d420d21d41be992326c20d374e77ef75d1b1a5b9250f89463302c9819a73eb749525b66c31cecd474666a8848b029b649141a6d8947d78323763ad15fca78eb5d191a21d34aadc374207cdc0ea079a11d134b33820cbac363302b9819f63eb61a050b779345fcae22772ed04aca78f15c1e0021d41badc227207adf0ea07fa11f13485b9244d7cc77307acc1801cea0a20a5dffc8cc1e194f3564")

//stage=10011&main_smn=1&sub_smn=0&main_idx=1&sub_idx=0&helper=0&smn_id=0&is_auto=0&_tm_=108

//stage=10011&wave=1&an_info=%5b%7b%22id%22%3a+11910%2c%22attr%22%3a+127%7d%5d&item_use=&df_info=%5b%7b%22uniq%22%3a+4%2c%22type%22%3a+2%7d%5d&turn=1&p_act=0&e_act=0&_tm_=136