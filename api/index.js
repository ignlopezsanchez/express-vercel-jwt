const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

app.set("key", process.env.SECRET_KEY);
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

app.post("/api/login", (req, res) => {
  if (req.body.user === "mock_user" && req.body.password === "mock_password") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("key"), {
      expiresIn: 1440,
    });
    res.json({
      message: "Success",
      token: token,
    });
  } else {
    res.json({ message: "User or password not found" });
  }
});
app.get("/api/users", authenticateToken, (req, res) => {
  const users = [
    {
      id: 1,
      firstName: "Haywood",
      lastName: "Adhams",
      email: "hadhams0@nsw.gov.au",
      gender: "Male",
      locationLatitude: 53.4487975,
      locationLongitude: -6.176659,
      smallAvatar:
        "https://robohash.org/etconsequaturnon.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/noneligendivoluptatem.png?size=500x500&set=set1",
    },
    {
      id: 2,
      firstName: "Anabel",
      lastName: "Amiable",
      email: "aamiable1@microsoft.com",
      gender: "Female",
      locationLatitude: 43.3209022,
      locationLongitude: 21.8957589,
      smallAvatar:
        "https://robohash.org/asperiorespossimusearum.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/ipsameosnam.png?size=500x500&set=set1",
    },
    {
      id: 3,
      firstName: "Birgitta",
      lastName: "Danhel",
      email: "bdanhel2@imgur.com",
      gender: "Female",
      locationLatitude: 9.297858,
      locationLongitude: -64.3490085,
      smallAvatar:
        "https://robohash.org/omnisprovidentconsequatur.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/nemonecessitatibusoptio.png?size=500x500&set=set1",
    },
    {
      id: 4,
      firstName: "Cleon",
      lastName: "Risborough",
      email: "crisborough3@addthis.com",
      gender: "Male",
      locationLatitude: -10.0798,
      locationLongitude: 120.2781,
      smallAvatar:
        "https://robohash.org/excepturivoluptatemesse.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/expeditalaboriosamqui.png?size=500x500&set=set1",
    },
    {
      id: 5,
      firstName: "Crawford",
      lastName: "Ransbury",
      email: "cransbury4@amazon.com",
      gender: "Male",
      locationLatitude: -7.4536,
      locationLongitude: 108.6423,
      smallAvatar:
        "https://robohash.org/illumtemporeomnis.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/quisquamaliasarchitecto.png?size=500x500&set=set1",
    },
    {
      id: 6,
      firstName: "Kippy",
      lastName: "Newarte",
      email: "knewarte5@alibaba.com",
      gender: "Female",
      locationLatitude: 41.565627,
      locationLongitude: 120.453743,
      smallAvatar:
        "https://robohash.org/iustofugiatdeleniti.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/quieoslabore.png?size=500x500&set=set1",
    },
    {
      id: 7,
      firstName: "Frederica",
      lastName: "Dunlap",
      email: "fdunlap6@abc.net.au",
      gender: "Female",
      locationLatitude: 20.8965838,
      locationLongitude: -105.4093552,
      smallAvatar:
        "https://robohash.org/rerumexpeditaquae.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/utdolorquia.png?size=500x500&set=set1",
    },
    {
      id: 8,
      firstName: "Joanna",
      lastName: "Crowche",
      email: "jcrowche7@amazon.com",
      gender: "Female",
      locationLatitude: 43.5234337,
      locationLongitude: 5.422976,
      smallAvatar:
        "https://robohash.org/illoutsuscipit.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/aspernatureteos.png?size=500x500&set=set1",
    },
    {
      id: 9,
      firstName: "Aubrette",
      lastName: "Robertsen",
      email: "arobertsen8@issuu.com",
      gender: "Female",
      locationLatitude: 31.839084,
      locationLongitude: 106.763842,
      smallAvatar:
        "https://robohash.org/consequunturrerumpossimus.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/modifugitet.png?size=500x500&set=set1",
    },
    {
      id: 10,
      firstName: "Morganica",
      lastName: "Bunce",
      email: "mbunce9@hexun.com",
      gender: "Female",
      locationLatitude: 14.8704596,
      locationLongitude: 101.8322677,
      smallAvatar: "https://robohash.org/teneturodioat.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/doloremqueexplicaboatque.png?size=500x500&set=set1",
    },
    {
      id: 11,
      firstName: "Vicky",
      lastName: "Flacke",
      email: "vflackea@gov.uk",
      gender: "Female",
      locationLatitude: 62.0772471,
      locationLongitude: 49.5698112,
      smallAvatar:
        "https://robohash.org/quamvoluptassunt.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/minuslaboriosamin.png?size=500x500&set=set1",
    },
    {
      id: 12,
      firstName: "Myrtice",
      lastName: "Wanek",
      email: "mwanekb@clickbank.net",
      gender: "Female",
      locationLatitude: 20.1473464,
      locationLongitude: -102.7601176,
      smallAvatar:
        "https://robohash.org/illumadipisciaut.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/culpautad.png?size=500x500&set=set1",
    },
    {
      id: 13,
      firstName: "Ashil",
      lastName: "MacDunleavy",
      email: "amacdunleavyc@moonfruit.com",
      gender: "Female",
      locationLatitude: 6.7368274,
      locationLongitude: 2.6636066,
      smallAvatar:
        "https://robohash.org/erroranimicorrupti.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/recusandaeadlaudantium.png?size=500x500&set=set1",
    },
    {
      id: 14,
      firstName: "Gaylene",
      lastName: "Wones",
      email: "gwonesd@cbc.ca",
      gender: "Female",
      locationLatitude: 16.733514,
      locationLongitude: -93.0859557,
      smallAvatar:
        "https://robohash.org/aspernaturlaboredolorum.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/distinctiodoloresperferendis.png?size=500x500&set=set1",
    },
    {
      id: 15,
      firstName: "Bonnibelle",
      lastName: "Gaywood",
      email: "bgaywoode@home.pl",
      gender: "Female",
      locationLatitude: -9.5463283,
      locationLongitude: 118.9996527,
      smallAvatar:
        "https://robohash.org/fugitnihilullam.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/auttemporemaxime.png?size=500x500&set=set1",
    },
    {
      id: 16,
      firstName: "Pet",
      lastName: "Reedman",
      email: "preedmanf@ucoz.ru",
      gender: "Female",
      locationLatitude: 9.9868231,
      locationLongitude: -84.3692925,
      smallAvatar:
        "https://robohash.org/dolorporroquidem.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/sedvellaborum.png?size=500x500&set=set1",
    },
    {
      id: 17,
      firstName: "Israel",
      lastName: "Fillary",
      email: "ifillaryg@hud.gov",
      gender: "Male",
      locationLatitude: 37.3916313,
      locationLongitude: 140.3798031,
      smallAvatar:
        "https://robohash.org/impeditnonnobis.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/placeatcumquelabore.png?size=500x500&set=set1",
    },
    {
      id: 18,
      firstName: "Abraham",
      lastName: "Villa",
      email: "avillah@weather.com",
      gender: "Male",
      locationLatitude: 57.8991434,
      locationLongitude: 34.9594447,
      smallAvatar:
        "https://robohash.org/voluptasquaeut.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/utcupiditatemolestias.png?size=500x500&set=set1",
    },
    {
      id: 19,
      firstName: "Selia",
      lastName: "Guittet",
      email: "sguitteti@blogger.com",
      gender: "Female",
      locationLatitude: -8.1306189,
      locationLongitude: 113.7603078,
      smallAvatar:
        "https://robohash.org/suscipitnemoquis.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/quasilaudantiumipsa.png?size=500x500&set=set1",
    },
    {
      id: 20,
      firstName: "Saul",
      lastName: "Harborow",
      email: "sharborowj@w3.org",
      gender: "Male",
      locationLatitude: 1.0029693,
      locationLongitude: 34.3338123,
      smallAvatar:
        "https://robohash.org/sintnamasperiores.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/aautquis.png?size=500x500&set=set1",
    },
    {
      id: 21,
      firstName: "Giorgi",
      lastName: "Burth",
      email: "gburthk@cargocollective.com",
      gender: "Male",
      locationLatitude: 48.8708001,
      locationLongitude: 2.166848,
      smallAvatar:
        "https://robohash.org/eligendimagnamquaerat.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/temporibusquiaenim.png?size=500x500&set=set1",
    },
    {
      id: 22,
      firstName: "Fawne",
      lastName: "Chirm",
      email: "fchirml@sitemeter.com",
      gender: "Female",
      locationLatitude: 27.283955,
      locationLongitude: 105.291643,
      smallAvatar:
        "https://robohash.org/temporibusquisvoluptatem.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/impeditodioexercitationem.png?size=500x500&set=set1",
    },
    {
      id: 23,
      firstName: "Harv",
      lastName: "Westby",
      email: "hwestbym@alibaba.com",
      gender: "Male",
      locationLatitude: -19.39656,
      locationLongitude: -40.0658731,
      smallAvatar:
        "https://robohash.org/reprehenderitquiducimus.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/placeatidquia.png?size=500x500&set=set1",
    },
    {
      id: 24,
      firstName: "Waverley",
      lastName: "Trimmill",
      email: "wtrimmilln@apache.org",
      gender: "Male",
      locationLatitude: 49.2165148,
      locationLongitude: -122.6562872,
      smallAvatar:
        "https://robohash.org/rerumnatusratione.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/etassumendatempore.png?size=500x500&set=set1",
    },
    {
      id: 25,
      firstName: "Juana",
      lastName: "Ollerearnshaw",
      email: "jollerearnshawo@delicious.com",
      gender: "Female",
      locationLatitude: -3.4097,
      locationLongitude: 119.3077,
      smallAvatar:
        "https://robohash.org/consequaturdolorid.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/vitaequaeconsequatur.png?size=500x500&set=set1",
    },
    {
      id: 26,
      firstName: "Ricki",
      lastName: "Meaking",
      email: "rmeakingp@elegantthemes.com",
      gender: "Female",
      locationLatitude: 38.1481953,
      locationLongitude: 22.3558193,
      smallAvatar:
        "https://robohash.org/doloremquasienim.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/facilisperferendisveritatis.png?size=500x500&set=set1",
    },
    {
      id: 27,
      firstName: "Victor",
      lastName: "Papps",
      email: "vpappsq@google.co.jp",
      gender: "Male",
      locationLatitude: -2.4655425,
      locationLongitude: 140.4101474,
      smallAvatar: "https://robohash.org/inabmagnam.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/nonutlibero.png?size=500x500&set=set1",
    },
    {
      id: 28,
      firstName: "Sibilla",
      lastName: "MacNeice",
      email: "smacneicer@foxnews.com",
      gender: "Female",
      locationLatitude: -7.3,
      locationLongitude: 109.066667,
      smallAvatar:
        "https://robohash.org/ullamblanditiisconsequatur.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/vellaborumrecusandae.png?size=500x500&set=set1",
    },
    {
      id: 29,
      firstName: "Brandtr",
      lastName: "Haking",
      email: "bhakings@answers.com",
      gender: "Male",
      locationLatitude: -22.748659,
      locationLongitude: -46.1352278,
      smallAvatar:
        "https://robohash.org/minimablanditiisquasi.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/sintofficiisnisi.png?size=500x500&set=set1",
    },
    {
      id: 30,
      firstName: "Cathryn",
      lastName: "Eldritt",
      email: "celdrittt@constantcontact.com",
      gender: "Female",
      locationLatitude: -0.7739574,
      locationLongitude: 102.026135,
      smallAvatar:
        "https://robohash.org/quodquisimilique.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/commodisintest.png?size=500x500&set=set1",
    },
    {
      id: 31,
      firstName: "Lanni",
      lastName: "Damrell",
      email: "ldamrellu@biblegateway.com",
      gender: "Female",
      locationLatitude: 25.112046,
      locationLongitude: 99.161761,
      smallAvatar:
        "https://robohash.org/maximeofficiisofficia.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/temporibusfugamaxime.png?size=500x500&set=set1",
    },
    {
      id: 32,
      firstName: "Saree",
      lastName: "McKirdy",
      email: "smckirdyv@intel.com",
      gender: "Female",
      locationLatitude: 8.0275138,
      locationLongitude: 79.8367828,
      smallAvatar: "https://robohash.org/velautodit.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/doloribuseaodit.png?size=500x500&set=set1",
    },
    {
      id: 33,
      firstName: "Ivette",
      lastName: "Gloy",
      email: "igloyw@wikia.com",
      gender: "Female",
      locationLatitude: 49.5012266,
      locationLongitude: 14.5455675,
      smallAvatar:
        "https://robohash.org/mollitiaquoseos.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/nobisundeminus.png?size=500x500&set=set1",
    },
    {
      id: 34,
      firstName: "Consolata",
      lastName: "Micheu",
      email: "cmicheux@liveinternet.ru",
      gender: "Female",
      locationLatitude: 53.488087,
      locationLongitude: -10.022186,
      smallAvatar: "https://robohash.org/autemfugaquis.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/nonatqueexplicabo.png?size=500x500&set=set1",
    },
    {
      id: 35,
      firstName: "Stanford",
      lastName: "Kohnemann",
      email: "skohnemanny@mayoclinic.com",
      gender: "Male",
      locationLatitude: 14.5699334,
      locationLongitude: 121.0204582,
      smallAvatar:
        "https://robohash.org/mollitiaaccusantiumaliquid.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/quirerumquae.png?size=500x500&set=set1",
    },
    {
      id: 36,
      firstName: "Nap",
      lastName: "Austick",
      email: "naustickz@360.cn",
      gender: "Male",
      locationLatitude: 37.1773363,
      locationLongitude: -3.5985571,
      smallAvatar:
        "https://robohash.org/illumutsuscipit.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/quiaminimamolestiae.png?size=500x500&set=set1",
    },
    {
      id: 37,
      firstName: "Wilbur",
      lastName: "Bloom",
      email: "wbloom10@netlog.com",
      gender: "Male",
      locationLatitude: 39.1251493,
      locationLongitude: 23.6799766,
      smallAvatar:
        "https://robohash.org/eosaccusamuscum.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/ipsumimpedittotam.png?size=500x500&set=set1",
    },
    {
      id: 38,
      firstName: "Kingsley",
      lastName: "Vedeneev",
      email: "kvedeneev11@paypal.com",
      gender: "Male",
      locationLatitude: 37.509395,
      locationLongitude: 103.929926,
      smallAvatar:
        "https://robohash.org/nostrumquaerateos.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/voluptatedoloremreprehenderit.png?size=500x500&set=set1",
    },
    {
      id: 39,
      firstName: "Pearline",
      lastName: "Brahmer",
      email: "pbrahmer12@prlog.org",
      gender: "Female",
      locationLatitude: 49.3962315,
      locationLongitude: 25.605439,
      smallAvatar:
        "https://robohash.org/autcupiditateconsequatur.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/doloremquevoluptateamet.png?size=500x500&set=set1",
    },
    {
      id: 40,
      firstName: "Moss",
      lastName: "Fritz",
      email: "mfritz13@a8.net",
      gender: "Male",
      locationLatitude: 41.8036152,
      locationLongitude: 20.9182981,
      smallAvatar: "https://robohash.org/doloreetin.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/utetculpa.png?size=500x500&set=set1",
    },
    {
      id: 41,
      firstName: "Odilia",
      lastName: "Nairn",
      email: "onairn14@sakura.ne.jp",
      gender: "Female",
      locationLatitude: 7.5866041,
      locationLongitude: 0.6085749,
      smallAvatar:
        "https://robohash.org/aliquamassumendaconsequuntur.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/quiipsamolestias.png?size=500x500&set=set1",
    },
    {
      id: 42,
      firstName: "Gonzales",
      lastName: "Cansdall",
      email: "gcansdall15@oakley.com",
      gender: "Male",
      locationLatitude: 49.4991381,
      locationLongitude: -119.5937077,
      smallAvatar:
        "https://robohash.org/voluptatesmaximefugiat.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/accusamusadexercitationem.png?size=500x500&set=set1",
    },
    {
      id: 43,
      firstName: "Mylo",
      lastName: "O'Dougherty",
      email: "modougherty16@apple.com",
      gender: "Male",
      locationLatitude: 13.9906389,
      locationLongitude: 100.6184588,
      smallAvatar: "https://robohash.org/atqueundeeum.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/fugiatesttempora.png?size=500x500&set=set1",
    },
    {
      id: 44,
      firstName: "Katha",
      lastName: "Meneghi",
      email: "kmeneghi17@jigsy.com",
      gender: "Female",
      locationLatitude: 48.4474626,
      locationLongitude: -123.4956337,
      smallAvatar:
        "https://robohash.org/dolorumconsequaturnihil.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/nostrumullamerror.png?size=500x500&set=set1",
    },
    {
      id: 45,
      firstName: "Allys",
      lastName: "Youster",
      email: "ayouster18@liveinternet.ru",
      gender: "Female",
      locationLatitude: 23.3854292,
      locationLongitude: 113.4895468,
      smallAvatar:
        "https://robohash.org/velsedsuscipit.png?size=50x50&set=set1",
      bigAvatar: "https://robohash.org/eiusestquia.png?size=500x500&set=set1",
    },
    {
      id: 46,
      firstName: "Kylen",
      lastName: "Saltern",
      email: "ksaltern19@jimdo.com",
      gender: "Female",
      locationLatitude: 37.327838,
      locationLongitude: 23.1437319,
      smallAvatar:
        "https://robohash.org/necessitatibussitvoluptas.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/veritatisquisquamdolor.png?size=500x500&set=set1",
    },
    {
      id: 47,
      firstName: "Kevin",
      lastName: "Odde",
      email: "kodde1a@indiegogo.com",
      gender: "Male",
      locationLatitude: 42.669195,
      locationLongitude: 23.2885096,
      smallAvatar:
        "https://robohash.org/praesentiumdolorumodit.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/dolorumdebitisminus.png?size=500x500&set=set1",
    },
    {
      id: 48,
      firstName: "Goldia",
      lastName: "Dobbings",
      email: "gdobbings1b@liveinternet.ru",
      gender: "Female",
      locationLatitude: 35.939466,
      locationLongitude: 118.520324,
      smallAvatar:
        "https://robohash.org/reiciendisducimusaut.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/dignissimostemporaeius.png?size=500x500&set=set1",
    },
    {
      id: 49,
      firstName: "Agnola",
      lastName: "Jepson",
      email: "ajepson1c@alibaba.com",
      gender: "Female",
      locationLatitude: 38.0120968,
      locationLongitude: 23.7725723,
      smallAvatar:
        "https://robohash.org/accusantiumidvoluptatem.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/animidistinctioaliquid.png?size=500x500&set=set1",
    },
    {
      id: 50,
      firstName: "Colver",
      lastName: "Beddon",
      email: "cbeddon1d@yolasite.com",
      gender: "Male",
      locationLatitude: 31.364042,
      locationLongitude: 108.520914,
      smallAvatar:
        "https://robohash.org/quiveritatisvoluptatum.png?size=50x50&set=set1",
      bigAvatar:
        "https://robohash.org/quaeratinciduntsunt.png?size=500x500&set=set1",
    },
  ];

  res.json(users);
});
module.exports = app;
