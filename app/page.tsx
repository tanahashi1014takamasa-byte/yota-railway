"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const engineRef = useRef<HTMLAudioElement | null>(null);
  const customShopBgmRef = useRef<HTMLAudioElement | null>(null);
  const imageCache = useRef<HTMLImageElement[]>([]);
  const [leverState, setLeverState] = useState<"center" | "left" | "right">("center");
  const [scene, setScene] = useState("opening");
  const [maintenanceMessages, setMaintenanceMessages] = useState<string[]>([]);
  const [quizKappaMouth, setQuizKappaMouth] = useState(false);
  const [introKappaMouth, setIntroKappaMouth] = useState(false);
  const [loadingNext, setLoadingNext] = useState("");
  const [nextScene, setNextScene] = useState("");
  const [showTrainSelect, setShowTrainSelect] = useState(false);
  const [selectedZukanVehicle, setSelectedZukanVehicle] = useState<any>(null);
  const [announceMessage, setAnnounceMessage] = useState("");
  const [deloreanMouth, setDeloreanMouth] = useState(false);
  const [deloreanIndex, setDeloreanIndex] = useState(0);
  const [driveStarted, setDriveStarted] = useState(false);
  const [driveDistance, setDriveDistance] = useState(0);
  const [gachaRolling, setGachaRolling] = useState(false);
  const gachaSoundRef = useRef<HTMLAudioElement | null>(null);
  const [gachaKappaMouth, setGachaKappaMouth] = useState(false);
  const [showCapsule, setShowCapsule] = useState(true);
  const ponSoundRef = useRef<HTMLAudioElement | null>(null);
  const [gachaPrize, setGachaPrize] = useState<any>(null);

  const deloreanMessages = [
  "よーたのおじいちゃんから\nプレゼント届いてたぞ",
  "これマジすげー！",
  "未来とか過去の乗り物見れるから\nめっさ便利だわ",
  "おれっちもあとで\nあそばせてくれ",
  "のりかえボタンに\nいれとくね",
];

  useEffect(() => {
  const images = [
  "/images/train_ver1.1.gif",
  "/images/train_ver2.1.gif",
  "/images/train_ver3.1.gif",
  "/images/yonezu_1.png",
  "/images/kappa_1.png",
  "/images/駅員.png",
];

  images.forEach((src) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    console.log("読み込み完了:", src);
  };
  imageCache.current.push(img);
});
}, []);

useEffect(() => {
  const savedData = localStorage.getItem("yotaRailwaySave");

  if (savedData) {
  const data = JSON.parse(savedData);

  const now = Date.now();

const elapsedMinutes =
  (now - (data.lastPlayed ?? now)) / (1000 * 60);

const cleanLoss = Math.floor(elapsedMinutes * 1);
const energyLoss = Math.floor(elapsedMinutes * 0.5);
const statusLoss = Math.floor(elapsedMinutes / 12);

const newCondition = {
  clean: Math.max(
    0,
    (data.condition?.clean ?? 100) - cleanLoss
  ),

  energy: Math.max(
    0,
    (data.condition?.energy ?? 100) - energyLoss
  ),

  status: Math.max(
    0,
    (data.condition?.status ?? 100) - statusLoss
  ),
};



setSaveData({
  ...data,
  condition: newCondition,
  lastPlayed: now,
});

setSaveData({
  ...data,
  money: data.money ?? 0,
  ownedVehicles: data.ownedVehicles ?? [],

  condition: newCondition,

  lastPlayed: now,
});
}

  setSaveLoaded(true);
}, []);


useEffect(() => {
  if (scene === "loading") {
    const timer = setTimeout(() => {

      if (loadingNext) {
        setScene(loadingNext);
        setLoadingNext("");
      } else {
        setScene("frame");
      }

    }, 1500);

    return () => clearTimeout(timer);
  }
}, [scene, loadingNext]);





 
  const [trainX, setTrainX] = useState(0);
  const [trainDirection, setTrainDirection] = useState(1);
  const [trainFlip, setTrainFlip] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showTrains, setShowTrains] = useState(false);
  const [doctorPage, setDoctorPage] = useState(0);
  const [vehicleDescription, setVehicleDescription] = useState("");
  const [carX, setCarX] = useState(0);
  const [carY, setCarY] = useState(0);
  const [doctorTalking, setDoctorTalking] = useState(false);
  const [obstacleX, setObstacleX] = useState(900);
  const [obstacleY, setObstacleY] = useState(300);
  const [gameOver, setGameOver] = useState(false);



useEffect(() => {
  if (!driveStarted || gameOver) return;

  const timer = setInterval(() => {

    setObstacleX((x) => {

      if (x < -100) {
        setObstacleY(
          Math.floor(Math.random() * 80) + 220
        );

        return 900;
      }

      setDriveDistance((d) => d + 1);

      return x - 8;
    });

  }, 50);

  return () => clearInterval(timer);

}, [driveStarted, gameOver]);

useEffect(() => {

  if (!driveStarted || gameOver) return;

const carLeft = window.innerWidth * 0.2 + carX;
  const carBottom = 300 + carY;

  const rockLeft = obstacleX;
const rockTop = obstacleY;

if (
  rockLeft < carLeft + 80 &&
  rockLeft + 80 > carLeft &&
  rockTop < carBottom + 80 &&
  rockTop + 80 > carBottom
) {

  setSaveData((data) => ({
    ...data,
    distance: data.distance + driveDistance,
    miles: data.miles + driveDistance,
  }));

  setGameOver(true);
}


}, [carX, carY, driveStarted, gameOver]);



  useEffect(() => {
  setDoctorTalking(true);

  const timer = setInterval(() => {
    setDoctorTalking((talking) => !talking);
  }, 200);

  return () => clearInterval(timer);
}, [doctorPage]);


useEffect(() => {
  if (scene === "quiz") {
    const timer = setInterval(() => {
      setQuizKappaMouth((mouth) => !mouth);
    }, 200);

    return () => clearInterval(timer);
  }
}, [scene]);


useEffect(() => {
  if (scene === "intro") {
    const timer = setInterval(() => {
      setIntroKappaMouth((mouth) => !mouth);
    }, 200);

    return () => clearInterval(timer);
  }
}, [scene]);

useEffect(() => {
  if (scene === "frame" && maintenanceMessages.length > 0) {
    const timer = setTimeout(() => {
      setMaintenanceMessages([]);
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [scene]);

useEffect(() => {
  const timer = setInterval(() => {
    setSaveData((data) => ({
      ...data,
      condition: {
        ...data.condition,

        clean: Math.max(
          0,
          data.condition.clean - 1
        ),
      },
    }));
  }, 60000);

  return () => clearInterval(timer);
}, []);

useEffect(() => {
  const timer = setInterval(() => {
    setSaveData((data) => ({
      ...data,
      condition: {
        ...data.condition,

        energy: Math.max(
          0,
          data.condition.energy - 1
        ),
      },
    }));
  }, 120000);

  return () => clearInterval(timer);
}, []);

useEffect(() => {
  const timer = setInterval(() => {
    setSaveData((data) => ({
      ...data,
      condition: {
        ...data.condition,

        status: Math.max(
          0,
          data.condition.status - 20
        ),
      },
    }));
  }, 43200000);

  return () => clearInterval(timer);
}, []);


useEffect(() => {
  if (scene === "delorean") {
    const timer = setInterval(() => {
      setDeloreanMouth((prev) => !prev);
    }, 500);

    return () => clearInterval(timer);
  }
}, [scene]);


  const LEFT_WALL = -200;
  const RIGHT_WALL = 200;
  const [shopIndex, setShopIndex] = useState(0);
  const [shopMode, setShopMode] = useState("main");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [buyIndex, setBuyIndex] = useState(0);
  const [cart, setCart] = useState<any[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showCartDialog, setShowCartDialog] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizResult, setQuizResult] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [saveData, setSaveData] = useState({
  selectedTrain: "",
  mainTrain: "",
  level: 1,
  distance: 0,
  money: 0,
  miles: 0,
  vehicleDistances: {} as Record<string, number>,
  retiredTrains: [],
  ownedVehicles: [
  {
    name: "ハムカッパでんしゃ",
    image: "/images/train_ver1.1.gif",
    trainSize: 150,
    offsetY: 70,
  },
  {
    name: "パトカー",
    image: "/images/train_ver2.1.gif",
    trainSize: 250,
    offsetY: 80,
  },
  {
    name: "トーマス",
    image: "/images/train_ver3.1.gif",
    trainSize: 150,
    offsetY: 70,
  },
  {
    name: "よねづけんし",
    image: "/images/yonezu_1.png",
    trainSize: 150,
    offsetY: 60,
  },
] as any[],
  condition: {
  clean: 100,
  status: 100,
  energy: 100,
},

eventFlags: {
  delorean: false,
},

lastPlayed: Date.now(),

});



const [saveLoaded, setSaveLoaded] = useState(false);




useEffect(() => {
  const timer = setInterval(() => {
    if (scene !== "frame") return;

    let speed = 1;
  
    const vehicleSpeed =
  saveData.ownedVehicles.find(
    (vehicle) => vehicle.name === saveData.selectedTrain
  )?.speed ?? 1;

speed = vehicleSpeed;
   

    if (leverState === "left") {
      setTrainX((x) => {
        if (x <= LEFT_WALL) {
          return RIGHT_WALL;
        }

        setSaveData((data) => ({
  ...data,
 distance: Number((data.distance + 0.1).toFixed(1)),
  money: data.money + 1,
  vehicleDistances: {
    ...data.vehicleDistances,
    [data.selectedTrain]:
      (data.vehicleDistances[data.selectedTrain] ?? 0) + 1,
  },
}));




        return x - speed;
      });

    } else if (leverState === "right") {
      setTrainX((x) => {
        if (x >= RIGHT_WALL) {
          return LEFT_WALL;
        }

        setSaveData((data) => ({
  ...data,
 distance: Number((data.distance + 0.1).toFixed(1)),
  money: data.money + 1,
  vehicleDistances: {
    ...data.vehicleDistances,
    [data.selectedTrain]:
      (data.vehicleDistances[data.selectedTrain] ?? 0) + 1,
  },
}));

        return x + speed;
      });
    }

  }, 30);

  return () => clearInterval(timer);
}, [leverState, scene, saveData.selectedTrain]);

const saveGame = () => {

  const sound = new Audio("/sounds/save.mp3");
  sound.volume = 0.5;
  sound.play();

  localStorage.setItem(
    "yotaRailwaySave",
    JSON.stringify(saveData)
  );

};

useEffect(() => {
  if (scene === "quiz") {
    fetch("/quiz/train.txt")
      .then((res) => res.text())
   .then((text) => {
  const lines = text.split("\n");
  const questions = text.split("\n\n");

  const currentQuestion = questions[quizIndex];
const currentLines = currentQuestion.split("\n");

const qLine = currentLines.find((line) =>
  line.startsWith("Q:")
);

  if (qLine) {
    setQuizQuestion(
      qLine.replace("Q:", "").trim()
    );
  }

    const ansLine = currentLines.find((line) =>
  line.startsWith("ANS:")
);

  if (ansLine) {
    setQuizCorrect(
      Number(ansLine.replace("ANS:", "").trim())
    );
  }


 const answers = currentLines
  .filter((line) =>
    /^[ABCD]:/.test(line)
  )
  .slice(0, 4)
  .map((line) =>
    line.substring(2).trim()
  );

  setQuizAnswers(answers);
});
  }
}, [scene, quizIndex]);

useEffect(() => {
  if (scene !== "gachaHam") return;

  const timer = setInterval(() => {
    setGachaKappaMouth((v) => !v);
  }, 300);

  return () => clearInterval(timer);

}, [scene]);

const trains = [
  
  {
    name: "ハムカッパでんしゃ",
    image: "/images/train_ver1.1.gif",
    trainSize: 150,
    offsetY: 70,
    zukanDescription: "ハムカッパが つくった\n\nふしぎな でんしゃ。\n\nよーたくんと いっしょに\nたびを する\nたいせつな なかまです。",
  },
  {
    name: "パトカー",
    image: "/images/train_ver2.1.gif",
    trainSize: 250,
    offsetY: 80,
    zukanDescription: "まちのへいわを\nまもる くるま。\n\nわるいひとを\nつかまえたり、\nこまっているひとを\nたすけたりするよ。\n\nサイレンをならして\nみんなのところへ\nかけつけるんだ！",
  },
  {
    name: "トーマス",
    image: "/images/train_ver3.1.gif",
     trainSize: 150,
    offsetY: 70,
    zukanDescription: "トーマスは\nイギリスで うまれた\nきかんしゃの キャラクター。\n\n「きかんしゃトーマス」の\nおはなしに でてくる\nあおい きかんしゃだよ。\n\nなかまたちと いっしょに\nソドーとうで はたらく\nげんきな きかんしゃなんだ！",
  },
  {
    name: "よねづけんし",
    image: "/images/yonezu_1.png",
    trainSize: 150,
    offsetY: 60,
    zukanDescription: "よねづけんしは\nうたを つくって\nうたう おんがくか。\n「Lemon」などの\nゆうめいな きょくを\nつくった ひとなんだ！\n\nテレビでは\nサメの かたちの のりものに\nのって うたうこともあるよ！",
  },
];

const gachaItems = [
  {
    name:"新幹線変形ロボ シンカリオン",
    image:"/images/新幹線変形ロボ_シンカリオン.png",
    trainSize:250,
    offsetY:70,
    zukanDescription:"正体不明の敵（巨大怪物体やアンノウンなど）\nから日本を守るため\n新幹線をベースに開発された\nロボット「シンカリオン」"
  },
  {
    name:"メリーゴーランド",
    image:"/images/メリーゴーランド_1.gif",
    trainSize:200,
    offsetY:40,
    zukanDescription:"メリーゴーランド\nは、遊園地やテーマパークにある\n代表的な遊具のひとつで\n「回転木馬」とも呼ばれます"
  },
   {
    name:"ハリケーン",
    image:"/images/ハリケーン.gif",
    trainSize:200,
    offsetY:40,
    zukanDescription:"ハリケーン\nは\n主に北大西洋や\n北東太平洋で発生する\n発達した熱帯低気圧のことです"
  },
   {
    name:"ピザ回すニキ",
    image:"/images/ピザ回すニキ.gif",
    trainSize:200,
    offsetY:40,
    zukanDescription:"ピザ回しとは\nピザ生地を空中に投げて\n回転させながら\n均等に伸ばす技術のことです\n真鶴で食べたピザは美味かったぞ"
  },
  {
    name:"よねづけんし（レモン）",
    image:"/images/yonezu_lemon.png",
    trainSize:150,
    offsetY:50,
    zukanDescription:"切り分け果実の片方の様に…\n今でもあなたはわたしの光"
  },
  {
    name:"ゴースト",
    image:"/images/ゴースト.gif",
    trainSize:150,
    offsetY:40,
    zukanDescription:"イエーイ！\nゴーストバスターズ！！"
  },
  {
    name:"サメトラック",
    image:"/images/サメのトラック.png",
    trainSize:300,
    offsetY:60,
    zukanDescription:"鳥→ジョーズ→ディープブルー\n→シャークネード→ロスト・バケーション\n→海底47m→MEG ザ・モンスター\n→セーヌ川の水面の下に→悪魔の口"
  },
  {
    name:"ハニーハント号",
    image:"/images/honeyhunt.png",
    trainSize:150,
    offsetY:50,
    zukanDescription:"ハニーハント号は\nはちみつを あつめる ための\nでんしゃだよ。\n\nはちみつを あつめて\nおもいでの かわいさを\nかんじる ことができるんだ！"
  },
];


const shopVehicles = [
  {
  name: "D51-498",
  image: "/images/D51-498蒸気機関車.png",
  trainSize: 300,
  offsetY: 90,
  description: "D51-498蒸気機関車！！\nむかし たくさんの ひとや\nにもつを はこんだ じょうききかんしゃだよ！\nくろい からだと \nおおきな けむりが\nかっこいい きかんしゃだね！",
  zukanDescription: "D51-498は\nむかし つくられた\nにほんの じょうききかんしゃ。\n\nたくさんの かもつを\nはこんだ D51がたの\nなかまなんだ。\n\nいまでも イベントなどで\nはしる すがたを\nみることができる\nすごい きかんしゃだよ！",
  price : 100,
},
  {
  name: "ギャルでん",
  image: "/images/gal.png",
  trainSize: 250,
  description: "これはギャルのでんしゃ\nギャルでん\n季節や気圧にやられる～♪\nうちらまだまだかわいい～♪",
  zukanDescription: "タナハシが\nギャルバンドHaze\nをききながら\nつくったでんしゃだ！",
  price : 150,
  offsetY: 80,
},
  {
    name: "GSE70000形ロマンスカー",
    image: "/images/GSE_70000形_ロマンスカー.png",
    trainSize: 300,
    description: "GSE70000形ロマンスカー!!\nオレンジいろの かっこいい\nロマンスカーだよ。\nおおきな まどから けしきを\nながめながら、\nすてきな たびに つれていって\nくれる でんしゃだよ。",
    zukanDescription: "GSE70000がたは\nおだきゅうの\nロマンスカー。\n\nまえと うしろに\nおおきな まどの\nてんぼうせきが ある\nとくべつな でんしゃだよ。\n\nはこねへ むかう\nおきゃくさんを\nのせて はしっているんだ！",
    price : 200,
     offsetY: 80,
  },
  {
    name: "江ノ電",
    image: "/images/enoden.png",
    description: "江ノ電だね\nえのでんは、うみのちかくをはしる\nかわいいでんしゃだよ！\nかまくらとふじさわのあいだをはしっているよ。\n割とよくある日々のすれ違いを～♪",
    zukanDescription: "えのでんは、\nかまくらとふじさわをむすぶ\nてつどうです。\n1902ねんに かいぎょうし\nうみのちかくや\nまちなかを はしる\nめずらしい でんしゃです。",
    price : 200,
    trainSize: 200,
    offsetY: 55,
  },
  {
    name: "江ノ電ニキ",
    image: "/images/enodenniki.png",
    description: "これは江ノ電ニキだ\nあの どうがをきっかけに\nタコスが\nめっさ売れたらしい\nえのしまドリームだね！",
    zukanDescription: "えのでんニキは\n\n2021ねんに\nえのしま でんてつの\nしゃしんを とっていた ばしょで\nネットで ゆうめいに なった\nひとだよ。\n\nじてんしゃに のった すがたが\nたくさんの ひとの\nきおくに のこった\nネットの にんきものなんだ！",
    price : 1000,
    offsetY: 60,
  },
  {
    name: "メタルスラッグ",
    image: "/images/メタスラ.gif",
    description: "これは…\nめっさカックィー メカだ\nだれかになんかいわれたら\nタナハシのせいにしよう！\n",
    zukanDescription: "スラグフライヤー！！\n\nゲーム「メタルスラッグ」に\nとうじょうする\nひこうきの のりもの。\n\nそらを とびながら\nてきを こうげきできる\nたのもしい へいきだよ。\n\nメタルスラッグの\nせかいで かつやくする\nとくべつな ひこうきなんだ！",
    price : 300,
    offsetY: 60,
  },
  {
    name: "メタルスラッグ２",
    image: "/images/メタスラ2.gif",
    description: "これは…\nあれだ…すげーメカだ\nうん…\nのってるのはマルコだ！！",
    zukanDescription: "ドリルスラッグ！\n\nゲーム「メタルスラッグ」に\nとうじょうする\nドリルの のりもの。\n\nじめんの なかを\nすすむことができて、\nドリルで てきを\nこうげきするんだ。\n\nちからづよく\nじめんを ほる\nめずらしい スラッグだよ！",
    price : 300,
    offsetY: 60,
  },
  {
    name: "ハイエース",
    image: "/images/ハイエース.png",
    description: "ハイエース！！\nすげーがんじょうだ！\nキャンプでつかう\nひともいれば\nバンドのきざいしゃにもなる\nタナハシも うんてんしたことあるぞ\n鞭を打つ代わりに投与～♪\n怪物って名前の飲料～♪",
    zukanDescription: "ハイエースは\n\nトヨタが つくっている\nおおきな くるま。\n\nひとを のせたり、\nにもつを はこんだり、\nいろいろな しごとで\nつかわれているよ。\n\nながいあいだ\nみんなに あいされている\nべんりな くるまなんだ！",
    price : 2000,
    offsetY: 65,
  },
   {
    name: "U.F.O.",
    image: "/images/UFO.png",
    trainSize: 130,
    description: "みかくにんひこうぶったい\nこれはまちがいなく\nみかくにんひこう…\nまちがいなく…\nみかくにん…???\nU.F.O.の軌道に乗って♪\nあーなーたーと逃避行～♪",
    zukanDescription: "U.F.O.は\n\nそらを とぶ\nふしぎな のりもの。\n\nまるい かたちをしていて\nちじょうでは みられない\nふしぎな うごきをするよ。\n\nどこから きたのかは\nまだ ひみつの\nなぞの のりものなんだ！",
    price : 1000,
    offsetY: 55,
  },
   {
    name: "キッチンカー（ケバブ）",
    image: "/images/ケバブ.png",
    trainSize: 200,
    description: "かまた駅のケバブは\nめっさ にく おおもり\nみなみすなまち駅は\nキャベツばっかり\nみなみせんじゅ駅のケバブは\nベリーグッドテイスト\nだにょ～ん\n",
    zukanDescription: "どこでも おみせにできる\nくるまのことを\nきっちんかーというよ。\n\nけばぶは おにくを\nくるくる まわしながら\nやいてつくる\nちゅうとうの りょうりだよ。",
    price : 100,
    offsetY: 65,
  },
   {
  name: "オトナブルートレイン",
  type: "video",
  image: "/videos/otona_blue.mp4",
  trainSize: 300,
  description: "個性や自由ではみ出していく\nはみ出しちゃいけないのは…\n車線だけなんだぜ\nいつかは花になる\nアマリリス～♪ハァッ！！！",
  zukanDescription: "あたらしいがっこうのりーだーずは\n4にんぐみの\nおんがくぐるーぷだよ。\n\nどくとくな\nだんすや ぱふぉーまんすで\nにんきに なったんだ。\n\n「おとなぶるー」などの\nきょくで せかいでも\nしられるように なったよ。",
  price : 50000,
  offsetY: 20,
},
{
    name: "アイシールド２１",
    image: "/images/アイシールド21.gif",
    speed: 20,
    description: "ヤー！！ハー！！\nビビりでパシりな小市民は\nアメフトの世界じゃ\n英雄だった\nホームやかいだんは\nはしらないでね！",
    zukanDescription: "あいしーるど21は\nあめりかんふっとぼーるを\nだいざいにした\nまんがの たいとるだよ。\nでんせつの\n「こうそくのらんなー」として\nしられているよ。",
    price : 10000,
    offsetY: 65,
  },
{
  name: "せいそう だいしゃニキ",
  image: "/images/清掃台車ニキ.png",
  speed: 7,
  trainSize: 100,
  description: "だいしゃ に のっては\nいけません！",
  zukanDescription: "せいそうだいしゃは\nえきや でんしゃの\nおそうじに つかわれる\nくるまだよ。\nだいしゃにのるのは\nあぶないからマネしちゃダメ！",
  price : 100,
  offsetY: 65,
},
{
  name: "じぶんさがしニキ",
  image: "/images/自分探し.gif",
  trainSize: 170,
  description: "きままなひとりたび！\nこの長い長い下り坂を～♪\n君を自転車の後ろに載せて～♪\nブレーキいっぱい\n握りしめて～♪\nゆっくりゆっくり下ってく～♪",
  zukanDescription: "じぶんさがしニキは\nじぶんの みちを さがして\nあたらしい けいけんを する\nじぶんの ことを\nみつけていく たびなんだ。",
  price : 200,
  offsetY: 65,
},

{
  name: "めっさデカいメカ",
  image: "/images/きょだいロボ.gif",
  trainSize: 350,
  description: "……………………\nえ…なにこれ…\nこわ\nこんなのつくったかな…",
  zukanDescription: "つくったきおくがありません！\nにんげんってこわいよね！",
  price : 10000,
},
{
  name: "回転寿司",
  image: "/images/回転寿司.gif",
  trainSize: 450,
  description: "おすしー！\nむしろ…おしすー！\nすし なら\nまいにちだってくえるぜ\nはむかっぱも\nすしはだいすきだってさ",
  zukanDescription: "かいてんずしは\nおすしが のった おさらが\nれーんの うえを まわる\nおみせの しくみだよ。\n\nはじめての かいてんずしは\n1958ねんに おおさかで\nうまれたと いわれているよ。",
  price : 2000,
},
{
  name: "パックマン",
  image: "/images/パックマン.gif",
  description: "……………………\nえー…これは\n…80年代の…ルンバ\nくわしいことは\nパパにきこう！",
  zukanDescription: "ぱっくまんは\n1980ねんに とうじょうした\nせかいで ゆうめいな\nげーむの きゃらくたーだよ。\n\nまるい かたちで\nめんを たべながら\nおばけから にげる\nげーむなんだ。",
  price : 500,
  offsetY: 65,
},

 {
  name: "メロン2個500円ニキ",
  image: "/images/メロン2個500円ニキ.png",
  trainSize: 200,
  description: "やっ…！！！\nやっすいっすねぇえええ！！！",
  zukanDescription: "メロンはスーパーかやおやさんでかおうね！",
  price : 500,
  offsetY: 65,
},
 {
  name: "ねぶた祭",
  image: "/images/nebuta.png",
  trainSize: 250,
  description: "ねぶた祭は\n秋に開催される\n伝統行事だよ。\n\nおおきな ねぶたを\nはこびながら\nお祝いする しきだよ。",
  zukanDescription: "ねぶた祭まつりは\nあきにかいさいされる\nでんとうぎょうじだよ。\n\nおおきな ねぶたを\nはこびながら\nお祝いする しきだよ。",
  price : 30000,
  offsetY: 40,
},
 {
  name: "船",
  image: "/images/ship.gif",
  trainSize: 300,
  description: "ふねは みずのうえを はしる のりものだよ。\n\nおおきな ふねは\nひとや にもつを\nながいあいだ はこんで\nうみを わたることができるよ。",
  zukanDescription: "船は\nみずのうえを はしる のりものだよ。\n\nおおきな ふねは\nひとや にもつを\nながいあいだ はこんで\nうみを わたることができるよ。",
  price : 100,
  offsetY: 40,
},
 {
  name: "千鳥",
  image: "/images/chidori.gif",
  trainSize: 150,
  speed: 7,
  description: "逆だったかもしれねぇ…",
  zukanDescription: "手を雷のチャクラで覆い\n猛烈なスピードで突撃して\n相手を貫く\n一点集中型の\n強力な攻撃忍術。",
  price : 1000,
  offsetY: 65,
},
 {
  name: "フェラーリ",
  image: "/images/f40.png",
  trainSize: 200,
  speed: 7,
  description: "めっさ高くてかっこいい車だよ！\nはやくて\nうんてんしやすい\nイタリアの車だよ！",
  zukanDescription: "フェラーリは\nイタリアの\nこうきゅう じどうしゃ\nブランドだよ。",
  price : 20000,
  offsetY: 65,
},
{
  name: "シンカリオン",
  image: "/images/Shinkarion_4.png",
  trainSize: 320,
  description: "でっ…！！！\nでっかいっすねぇえええ！！！",
  zukanDescription: "あきたしんかんせん\nE6けいこまちが\nロボットに へんけいする\nシンカリオンだよ。\n\nしんかんせんの すがたで\nはしることもできるし、\nロボットの すがたで\nてきを たおすこともできるよ。",
  price : 100,
  offsetY: 10,
},
];


const currentVehicle = shopVehicles[shopIndex];

const buyVehicle = shopVehicles[buyIndex];



const selectedTrain =
  trains.find(
    (train) => train.name === saveData.selectedTrain
  )
  ||
  saveData.ownedVehicles.find(
    (vehicle) => vehicle.name === saveData.selectedTrain
  );

const leverImage =
  leverState === "left"
    ? "/images/lever_l.png"
    : leverState === "right"
    ? "/images/lever_r.png"
    : "/images/lever.png";

  const playLeverSound = () => {
  const sound = new Audio("/sounds/lever.mp3");
  sound.volume = 1.0;
  sound.play();
};


  const messages = [
  "こんにちは！よーたくん！",
  "いっしょに あそぼう～！",
  "すきな のりものを えらんでね！",
];

const doctorMessages = [
  [
    "おつで〜す",
    "ハカセだにょーん",
    "よーたくん げんきかなー？",
  ],
  [
    "まあ げんきじゃなくても",
    "タイヨーは のぼるし",
    "また しずむけどね",
  ],
  [
    "それはさておき…",
  ],
  [
    "カスタムショップへ ようこそ！\n\n※ほしい のりものがあったら\nパパといっしょにかんがえよう！\n紡ぐも、逆もまた自在だよ！",
  ],
];

const trainPopStyle = {
  animation: "popIn 0.4s ease-out",
};

const popKeyframes = `
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;



  return (

  <>
<style>
  {popKeyframes}
</style>

    <audio
  ref={bgmRef}
  src="/sounds/bgm_op_ver1.mp3"
  loop
  preload="auto"
/>


<audio
  ref={gachaSoundRef}
  src="/sounds/gatyagatya.mp3"
/>


<audio
  ref={engineRef}
  src="/sounds/engine_1.mp3"
  loop
  preload="auto"
/>


    <audio
  ref={customShopBgmRef}
  src="/sounds/BackToTheFuture.mp3"
  loop
  preload="auto"
/>

<audio
  ref={ponSoundRef}
  src="/sounds/pon.mp3"
/>






    <main
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    minHeight: "100vh",
    background: "black",
    paddingTop: "0px",
    margin: "0",
  }}
>

      {scene === "opening" && (
  <>
    <img
      src="/images/logo.png"
      alt="ロゴ"
      width={200}
      style={{ marginBottom: "10px" }}
    />

    <div
  style={{
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "20px",
  }}
>
  <img
    src="/images/banner_1.png"
    alt="バナー"
    width={340}
  />
</div>



<img
  src="/images/newgame.png"
  alt="ニューゲーム"
  width={180}
  onClick={() => {

  const saved = localStorage.getItem("yotaRailwaySave");

  if (saved) {
    const ok = window.confirm(
      "セーブデータがあります。\nほんとうに あたらしく はじめますか？"
    );

    if (!ok) {
      return;
    }
  }

 setSaveData({
  selectedTrain: "",
  mainTrain: "",
  level: 1,
  distance: 0,
  retiredTrains: [],
  money: 0,
  miles: 0,
  ownedVehicles: [
  {
    name: "ハムカッパでんしゃ",
    image: "/images/train_ver1.1.gif",
    trainSize: 150,
    offsetY: 70,
  },
  {
    name: "パトカー",
    image: "/images/train_ver2.1.gif",
    trainSize: 250,
    offsetY: 80,
  },
  {
    name: "トーマス",
    image: "/images/train_ver3.1.gif",
    trainSize: 150,
    offsetY: 70,
  },
  {
    name: "よねづけんし",
    image: "/images/yonezu_1.png",
    trainSize: 150,
    offsetY: 60,
  },
] as any[],
  vehicleDistances: {},
  condition: {
  clean: 100,
  status: 100,
  energy: 100,
},

eventFlags: {
  delorean: false,
},

lastPlayed: Date.now(),

});

    setMessageIndex(0);
const steam = new Audio("/sounds/steam_train.mp3");
steam.volume = 0.3;

steam.onended = () => {
  if (bgmRef.current) {
    bgmRef.current.volume = 0.05;;
    bgmRef.current.currentTime = 0;
    bgmRef.current.play();
  }

  setLoadingNext("intro");
  setScene("loading");
};

steam.play();



  }}
  style={{
    cursor: "pointer",
    marginTop: "10px",
  }}
/>


<img
  src="/images/continue.png"
  alt="つづきから"
  width={180}
  onClick={() => {
    setScene("save");
  }}
  style={{
    cursor: "pointer",
    marginTop: "10px",
  }}
/>

<img
  src="/images/collection.png"
  alt="コレクション"
  width={180}
  onClick={() => {
    setScene("collection");
  }}
  style={{
    cursor: "pointer",
    marginTop: "10px",
  }}
/>

<img
  src="/images/customshop.png"
  alt="カスタムショップ"
  
  width={180}
 onClick={() => {
  bgmRef.current?.pause();

  customShopBgmRef.current?.play();

  setShopMode("main");   // ←追加
  setLoadingNext("customShop");
  setScene("loading");
}}

  style={{
    cursor: "pointer",
    marginTop: "10px",
  }}
/>

<img
  src="/images/capsule_toy.png"
  alt="ガチャ"
  width={180}
  onClick={() => {
    setScene("gacha");
  }}
  style={{
    cursor:"pointer",
    marginTop:"10px",
  }}
/>

  </>



)}

{scene === "intro" && (


 <div
  style={{
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    paddingLeft: "40px",
  }}
>
 <img
  src={
    introKappaMouth
      ? "/images/quizkappa2.png"
      : "/images/quizkappa1.png"
  }
  alt="ハムカッパ"
  width={100}
  loading="eager"
/>

  <div
    onClick={() => {
      if (messageIndex < messages.length - 1) {
        setMessageIndex(messageIndex + 1);
     } else {
  setScene("trainSelect");
  setShowTrains(true);
    }
    }}
    style={{
  background: "black",
  color: "white",
  border: "3px solid white",
  padding: "15px",
  borderRadius: "15px",
  marginLeft: "15px",
  fontSize: "24px",
  cursor: "pointer",
  maxWidth: "250px",
}}
  >
    {messages[messageIndex]}
  </div>
</div>
)}

{scene === "save" && saveLoaded && (
  <div
    style={{
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingTop: "50px",
  minHeight: "100vh",
}}
  >
    <p style={{ color: "white", fontSize: "22px" }}>
     <img
  src="/images/yota.png"
  width={300}
  alt="葉大鉄道"
  style={{
    marginBottom: "30px",
  }}
/>
    </p>

    <p style={{ color: "white", fontSize: "22px" }}>
      全体走行距離：{saveData.distance}km
    </p>

    <p style={{ color: "white", fontSize: "22px" }}>
  おかね：{saveData.money}円
  </p>

  <p style={{ color: "white", fontSize: "22px" }}>
   走行マイル：{saveData.miles}
</p>

  <p
  style={{
    color: "white",
    fontSize: "22px",
    marginTop: "30px",
  }}
>
  🚃 所持車両
</p>



{saveData.ownedVehicles.map((vehicle, index) => (
  <button
    key={index}
    onClick={() => {

      setSaveData({
        ...saveData,
        selectedTrain: vehicle.name,
      });

      setTrainX(0);

      const steam = new Audio("/sounds/steam_train.mp3");
      steam.volume = 0.3;

      steam.onended = () => {


      


        if (bgmRef.current) {
          bgmRef.current.volume = 0.05;
          bgmRef.current.currentTime = 0;
          bgmRef.current.play();
        }

        setScene("loading");
      };

      steam.play();

    }}
    style={{
      color: "white",
      background: "black",
      border: "2px solid white",
      borderRadius: "10px",
      fontSize: "20px",
      padding: "10px 20px",
      margin: "5px",
      cursor: "pointer",
    }}
  >
    {vehicle.name}
<br />
走行距離：
{saveData.vehicleDistances[vehicle.name] ?? 0}km
  </button>
))}

   
    </div>
)}
      {scene === "trainSelect" && (




  <>

  
  

<div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>


    
    {showTrains && trains.map((train) => (
  <div
    key={train.name}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "30px",
        ...trainPopStyle,
    }}
  >
    <img
      src={train.image}
      alt={train.name}
      width={180}
      loading="eager"
    />

   <button
  onClick={() => {
    const bell = new Audio("/sounds/bell.mp3");
    bell.volume = 1.0;

    bell.onended = () => {
  setTrainX(0);
  setLoadingNext("frame");
  setScene("loading");
};

    bell.play();

    setSaveData({
  ...saveData,
  selectedTrain: train.name,
  mainTrain: train.name,
});
  }}
      style={{
        fontSize: "20px",
        padding: "10px 30px",
        marginTop: "10px",
        color: "white",
        background: "black",
        border: "2px solid white",
        borderRadius: "10px",
      }}
    >
      {train.name}
    </button>
  </div>
))}

</div>
</>
)}

{scene === "loading" && (
  <div
    style={{
      color: "white",
      fontSize: "30px",
      textAlign: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >

    <img
      src="/images/駅員.png"
      alt="駅員"
      style={{
        width: "150px",
        position: "absolute",
        right: "20px",
        bottom: "100px",
      }}
    />

    <div
  style={{
    position: "absolute",
    right: "150px",
    bottom: "230px",
    background: "black",
    color: "white",
    padding: "8px 12px",
    borderRadius: "15px",
    border: "3px solid white",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "left",
    width: "200px",
  }}
>
      電車がまいります…<br />
      黄色い点字ブロックの内側まで<br />
      お下がりください
    </div>

  </div>
)}

{scene === "frame" && (
  <div
    style={{
      position: "relative",
      width: "100vw",
    }}
  >
    <img
  src="/images/frame.png"
  alt="フレーム"
  style={{
    width: "100vw",
    height: "100vh",
    objectFit: "fill",
    display: "block",
  }}


  
/>



<button
  onClick={() => {
    setShowTrainSelect(true);
  }}
  style={{
    position: "absolute",
    left: "28px",
    top: "410px",
    width: "70px",
    height: "80px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    zIndex: 20,
  }}
>
</button>

{showTrainSelect && (
  <div
    style={{
      position:"absolute",
      top:"150px",
      left:"50%",
      transform:"translateX(-50%)",
      width:"300px",
      background:"black",
      color:"white",
      border:"3px solid white",
      borderRadius:"15px",
      padding:"20px",
      zIndex:100,
      textAlign:"center",
    }}
  >

    <p style={{fontSize:"24px"}}>
      　のりかえ
    </p>

    <div
  style={{
    maxHeight: "45vh",
    overflowY: "auto",
    margin: "15px 0",
  }}
>

   {saveData.ownedVehicles.map((vehicle) => (
      <button
        key={vehicle.name}
        onClick={() => {

          setSaveData({
            ...saveData,
            selectedTrain: vehicle.name
          });

          setTrainX(0);

          setShowTrainSelect(false);

        }}
        style={{
          display:"block",
          width:"100%",
          margin:"10px 0",
          padding:"10px",
          fontSize:"18px",
          background:"black",
          color:"white",
          border:"2px solid white",
          borderRadius:"10px",
        }}
      >
        {vehicle.name}
      </button>

    ))}

</div>

    <button
      onClick={() => {
        setShowTrainSelect(false);
      }}
      style={{
        marginTop:"10px",
        padding:"10px 30px"
      }}
    >
      とじる
    </button>

  </div>
)}

<button
  onClick={() => {
    setScene("gameSelect");
  }}
  style={{
    position: "absolute",
    left: "112px",
    top: "410px",
    width: "70px",
    height: "80px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    zIndex: 20,
  }}
>
</button>

<button
  onClick={() => {
    setScene("maintenance");
  }}
  style={{
    position: "absolute",
    left: "194px",
    top: "410px",
    width: "70px",
    height: "80px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    zIndex: 20,
  }}
>
</button>

<button
  onClick={() => {
  const ok = window.confirm(
    "ほんとうに ホームに もどりますか？"
  );

  if (ok) {
  bgmRef.current?.pause();
  setScene("opening");
}
}}
  style={{
    position: "absolute",
    left: "278px",
    top: "410px",
    width: "70px",
    height: "80px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    zIndex: 20,
  }}
>
</button>

<img
  src="/images/save.png"
  alt="セーブ"
  onClick={saveGame}
  style={{
    position: "absolute",
    top: "2px",
    right: "3px",
    width: "95px",
    height: "auto",
    zIndex: 10,
  }}
/>

<p
  style={{
    position: "absolute",
    top: "80px",
    left: "20px",
    color: "white",
  textShadow: "2px 2px 4px black",
    fontSize: "18px",
    fontWeight: "bold",
    zIndex: 10,
    margin: "0",
  }}
>
  🚃 全体走行距離：{saveData.distance.toFixed(1)}km
</p>

<p
  style={{
    position: "absolute",
    top: "105px",
    left: "20px",
    color: "white",
    textShadow: "2px 2px 4px black",
    fontSize: "18px",
    fontWeight: "bold",
    zIndex: 10,
    margin: "0",
  }}
>
  💰 おかね：{saveData.money}
</p>
<div
  style={{
    position: "absolute",
    top: "132px",
    left: "20px",
    color: "white",
    fontSize: "18px",
    textShadow: "2px 2px 4px black",
    fontWeight: "bold",
    zIndex: 10,
  }}
>

<p style={{ margin: "0" }}>
  🧼 車両清掃：{saveData.condition.clean}
</p>
<div
  style={{
    width: "200px",
    height: "12px",
    border: "2px solid white",
  }}
>
  <div
    style={{
      width: `${saveData.condition.clean}%`,
      height: "100%",
      background: "white",
    }}
  />
</div>


<p style={{ margin: "0" }}>
  🔩 整備状態：{saveData.condition.status}
</p>
<div
  style={{
    width: "200px",
    height: "12px",
    border: "2px solid white",
  }}
>
  <div
    style={{
      width: `${saveData.condition.status}%`,
      height: "100%",
      background: "white",
    }}
  />
</div>


<p style={{ margin: "0" }}>
  ⚡ エネルギー：{saveData.condition.energy}
</p>
<div
  style={{
    width: "200px",
    height: "12px",
    border: "2px solid white",
  }}
>
  <div
    style={{
      width: `${saveData.condition.energy}%`,
      height: "100%",
      background: "white",
    }}
  />
</div>

{maintenanceMessages.length > 0 && (
  <div
    style={{
      position: "fixed",
      right: "15px",
top: "180px",
      color: "white",
      background: "black",
      border: "2px solid white",
      fontSize: "16px",
      fontWeight: "bold",
      zIndex: 30,
      textShadow: "none",
    }}
  >
    {maintenanceMessages.map((msg, index) => (
      <div key={index}>
        {msg}
      </div>
    ))}
  </div>
)}

</div>

     <div
  style={{
    position: "absolute",
    bottom: "35px",
    left: "42%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "20px",
  }}
>
  <img
    src="/images/lever_l.png"
    width={80}
   onClick={() => {
  playLeverSound();
  setLeverState("left");
  setTrainFlip(
    saveData.selectedTrain === "よねづけんし" ? true : false
  );
}}
    style={{ cursor: "pointer" }}
  />

  <img
    src="/images/lever.png"
    width={80}
    onClick={() => {
  playLeverSound();
  setLeverState("center");
}}
    style={{ cursor: "pointer" }}
  />

  <img
    src="/images/lever_r.png"
    width={80}
    onClick={() => {
  playLeverSound();
  setLeverState("right");
  setTrainFlip(
    saveData.selectedTrain === "よねづけんし" ? false : true
  );
}}
    style={{ cursor: "pointer" }}
  />
</div>

 <img
  src={selectedTrain?.image}
  alt="選んだ電車"
  className={
    selectedTrain?.image.includes("Shinkarion_4.png")||
  selectedTrain?.image.includes("derolian_1.png")
      ? "floating-train"
      : ""
  }
  style={{
    position: "absolute",
    top: "43%",
    left: "50%",
    width: `${selectedTrain?.trainSize ?? 180}px`,
    transform: `
      translate(
        calc(-50% + ${trainX}px),
        calc(-50% + ${(selectedTrain?.offsetY ?? 0)}px)
      )
      scaleX(${
        selectedTrain?.image.includes("Shinkarion_4.png")
          ? 1
          : trainFlip
            ? -1
            : 1
      })
    `,
  }}
/>
  </div>
)}

{scene === "quiz" && (
 <div
  style={{
    color: "white",
    fontSize: "30px",
    textAlign: "center",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
  }}
>

<img
  src={
    gachaKappaMouth
      ? "/images/quizkappa2.png"
      : "/images/quizkappa1.png"
  }
  alt="ハムカッパ"
  width={100}
  loading="eager"
/>

<div
  style={{
    position: "absolute",
    bottom: "100px",
    left: "140px",
    background: "black",
    color: "white",
    border: "3px solid white",
    borderRadius: "20px",
    padding: "10px 15px",
    fontSize: "18px",
    maxWidth: "350px",
    textAlign: "left",
  }}
>
{quizResult ? quizResult : quizQuestion || "クイズじゅんび中..."}
</div>


<div
  style={{
    position: "absolute",
    top: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    textAlign: "center",
  }}
>

{!quizFinished && quizAnswers.map((answer, index) => (
  <button
    key={index}
    onClick={() => {
 if (index === quizCorrect) {

  setQuizResult("せいかい！");
  setQuizScore(quizScore + 1);

  const sound = new Audio("/sounds/quiz_answer.mp3");
  sound.play();

  setTimeout(() => {
  setQuizResult("");

  if (quizIndex + 1 >= 4) {
  setQuizFinished(true);
  setQuizQuestion("10マイルゲット！！\nまたあそぼう！おつハム～");

setSaveData((prev) => {
  const newData = {
    ...prev,
    miles: prev.miles + 10,
  };

  localStorage.setItem(
    "yotaRailwaySave",
    JSON.stringify(newData)
  );

  return newData;
});

} else {
  setQuizIndex(quizIndex + 1);
}

}, 1500);

  // 次の問題へ

  }else {

  setQuizResult("ざんねん！");

  const sound = new Audio("/sounds/quiz_badanswer.mp3");
  sound.volume = 1.0;
  sound.play();

  setTimeout(() => {
    setQuizResult("");
  }, 1500);

}
}}
    style={{
      background: "black",
      color: "white",
      border: "3px solid white",
      borderRadius: "10px",
      width: "70%",
      padding: "15px",
      margin: "10px",
      fontSize: "24px",
    }}
  >
    {answer}
  </button>
))}
</div>

{quizFinished && (
  <img
    src="/images/verygood.png"
    alt="たいへんよくできました"
    style={{
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "250px",
    }}
  />
)}

{quizFinished && (
  <button
    onClick={() => {
      setScene("frame");
      setQuizFinished(false);
      setQuizIndex(0);
      setQuizResult("");
    }}
    style={{
      marginTop: "20px",
      fontSize: "24px",
      padding: "10px 30px",
      background: "black",
      color: "white",
      border: "3px solid white",
      borderRadius: "10px",
    }}
  >
    もどる
  </button>
)}


  </div>
)}


{scene === "gameSelect" && (
  <div
    style={{
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
    }}
  >

 <div
  style={{
    position: "relative",
    display: "inline-block",
  }}
>
  <img
    src="/images/game_logo.png"
    alt="ゲーム"
    style={{
      width: "450px",
      height: "auto",
      transform: "translateY(-90px)",
    }}
  />

  <img
    src="/images/UFO.png"
    alt="UFO"
    style={{
      position: "absolute",
      width: "30px",
      top: "-120px",
      left: "0px",
      animation: "ufoMove 20s linear infinite",
    }}
  />
</div>

    <button
      onClick={() => {
        setQuizIndex(0);
        setQuizFinished(false);
        setQuizResult("");
        setScene("quiz");
      }}
      style={{
  fontSize: "25px",
  padding: "20px 50px",
  background: "black",
  color: "white",
  border: "4px solid white",
  fontWeight: "bold",
  fontFamily: "monospace",
  borderRadius: "0px",
  cursor: "pointer",
}}
    >
      クイズゲーム
    </button>


    <button
  onClick={() => {
    setScene("drive");
  }}
  style={{
  fontSize: "25px",
  padding: "20px 50px",
  background: "black",
  color: "white",
  border: "4px solid white",
  fontWeight: "bold",
  fontFamily: "monospace",
  borderRadius: "0px",
  cursor: "pointer",
}}
>
  ドライブゲーム
</button>



    <button
  onClick={() => {
    setScene("frame");
  }}
  style={{
    fontSize: "22px",
    padding: "12px 40px",
    background: "black",
    color: "white",
    border: "4px solid white",
    fontWeight: "bold",
    fontFamily: "monospace",
    borderRadius: "0px",
    cursor: "pointer",
  }}
>
  もどる
</button>

  </div>
)}

{scene === "drive" && (
  <div
    style={{
      width:"100vw",
      height:"100vh",
      background:"black",
      position:"relative",
      overflow:"hidden",
    }}
  >

<p
  style={{
    position:"absolute",
    top:"20px",
    left:"20px",
    color:"white",
    fontSize:"28px",
    fontWeight:"bold",
    zIndex:10,
    textShadow:"2px 2px 3px black",
  }}
>
  ✈️ {driveDistance}マイル
</p>


    <img
      src="/images/road_1.gif"
      alt="道路"
      style={{
        width:"100%",
        height:"70%",
        objectFit:"cover",
      }}
    />


{!driveStarted && (
  <img
    src="/images/start.png"
    alt="スタート"
 onClick={() => {
  setGameOver(false);
  setObstacleX(900);
  setDriveDistance(0);
  setDriveStarted(true);

  engineRef.current?.play();
}}
    style={{
      position:"absolute",
      top:"50%",
      left:"50%",
      transform:"translate(-50%,-50%)",
      width:"150px",
      cursor:"pointer",
    }}
  />
)}


    {driveStarted && (
    <img
  src="/images/鳩に豆鉄砲車.png"
  alt="車"
  style={{
  position:"absolute",
  bottom:`${300 + carY}px`,
  left:`calc(20% + ${carX}px)`,
  transform:"translateX(-50%)",
  width:"150px",
}}



/>

    )}

{driveStarted && (
  <img
    src="/images/obstacle.png"
    alt="障害物"
    style={{
      position:"absolute",
      left:`${obstacleX}px`,
      bottom:`${obstacleY}px`,
      width:"80px",
    }}
  />
)}


{gameOver && (
  <div
onClick={() => {
  engineRef.current?.pause();
  engineRef.current!.currentTime = 0;

  setGameOver(false);
  setDriveStarted(false);
  setScene("frame");
}}
    style={{
      position:"absolute",
      top:"15%",
      left:"50%",
      transform:"translateX(-50%)",
      color:"white",
      fontSize:"28px",
      fontWeight:"bold",
      textAlign:"center",
      whiteSpace:"nowrap",
      background:"black",
      padding:"20px 40px",
      border:"4px solid white",
      borderRadius:"10px",
      zIndex:100,
    }}
  >
    岩にぶつかった！<br />
    またあそぼう！
  </div>
)}


<div
  style={{
    position:"absolute",
    bottom:"20px",
    left:"47%",
    transform:"translateX(-50%)",
    display:"grid",
    gridTemplateColumns:"50px 50px 50px",
    gridTemplateRows:"50px 50px 50px",
    gap:"5px",
  }}


  
>




  {/* 上 */}
  <button
    onClick={() => setCarY(carY + 20)}
    style={{gridColumn:"2"
      ,
    width:"80px",
    height:"80px",
    fontSize:"40px",
    color:"white",
    }}
  >
    △
  </button>


  {/* 左 */}
  <button
  onClick={() => setCarX(carX - 20)}
  style={{
    gridColumn:"1",
    gridRow:"2",
    width:"80px",
    height:"80px",
    fontSize:"40px",
    color:"white",
  }}
>
  ◁
</button>


  {/* 下 */}
  <button
    onClick={() => setCarY(carY - 20)}
    style={{gridColumn:"2", gridRow:"3",
    width:"80px",
    height:"80px",
    fontSize:"40px",
    color:"white",
}}
  >
    ▽
  </button>


  {/* 右 */}
  <button
    onClick={() => setCarX(carX + 20)}
    style={{gridColumn:"3", gridRow:"2",
    width:"80px",
    height:"80px",
    fontSize:"40px",
    color:"white",
}}
  >
    ▷
  </button>


</div>

  </div>
)}


{scene === "maintenance" && (
  <div
    style={{
      color: "white",
      textAlign: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "20px",
      paddingTop: "200px",
    }}
  >

    <img
  src="/images/check.png"
  alt="メンテナンス"
  style={{
    width: "400px",
    height: "auto",
    margin: "0 auto",
    marginTop: "-100px", // 上へ50px
  }}
/>

   <button
  onClick={() => {

    const sound = new Audio("/sounds/clean.mp3");
    sound.volume = 1.0;
    sound.play();

    setSaveData((data) => ({
      ...data,
      condition: {
        ...data.condition,
        clean: Math.min(
  100,
  data.condition.clean + 20
),
      },
    }));

    setMaintenanceMessages((prev) => [
  ...prev.filter((msg) => msg !== "ピカピカ⭕"),
  "ピカピカ⭕"
]);

  }}
  style={{
    color: "white",
    background: "black",
    fontSize: "32px",
    fontWeight: "bold",
    border: "3px solid white",
    borderRadius: "15px",
    padding: "5px 15px",
    textShadow: `
      -2px -2px 0 black,
       2px -2px 0 black,
      -2px  2px 0 black,
       2px  2px 0 black
    `,
  }}
>
   🚿おそうじ🚿
</button>

   <button
  onClick={() => {

    const sound = new Audio("/sounds/air.mp3");
    sound.volume = 1.0;
    sound.play();

    setSaveData((data) => ({
  ...data,
  condition: {
    ...data.condition,
    status: Math.min(
  100,
  data.condition.status + 20
),
  },
}));

setMaintenanceMessages((prev) => [
  ...prev.filter((msg) => msg !== "メンテ⭕"),
  "メンテ⭕"
]);

  }}
  style={{
    color: "white",
    background: "black",
    fontSize: "32px",
    fontWeight: "bold",
    border: "3px solid white",
    borderRadius: "15px",
    padding: "5px 15px",
  }}
>
  🛠️てんけん🛠️
</button>

    <button
  onClick={() => {

    const sound = new Audio("/sounds/charge.mp3");
    sound.volume = 1.0;
    sound.play();

    setSaveData((data) => ({
      ...data,
      condition: {
        ...data.condition,
        energy: Math.min(
          100,
          data.condition.energy + 20
        ),
      },
    }));

setMaintenanceMessages((prev) => [
  ...prev.filter((msg) => msg !== "チャージ⭕"),
  "チャージ⭕"
]);

  }}
  style={{
    color: "white",
    background: "black",
    fontSize: "32px",
    fontWeight: "bold",
    border: "3px solid white",
    borderRadius: "15px",
    padding: "10px 30px",
  }}
>
⚡チャージ⚡
</button>

    <button
  onClick={() => {
    setScene("frame");
  }}
  style={{
    fontSize: "28px",
    marginTop: "20px",
    padding: "10px 30px",
  }}
>
  もどる
</button>

  </div>
)}

{scene === "collection" && (
  <div
    style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "30px",
    }}
  >

    {/* 図鑑タイトル画像予定 */}
    <div
      style={{
        width: "300px",
        height: "80px",
        border: "3px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        marginBottom: "30px",
      }}
    >
      のりものずかん
    </div>


    {/* 図鑑マス */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 90px)",
        gap: "15px",
      }}
    >

    {[
  ...trains,
  ...saveData.ownedVehicles
]
.filter(
  (vehicle, index, self) =>
    self.findIndex(
      (v) => v.name === vehicle.name
    ) === index
)
.map((vehicle,index)=>(
  <div
    key={index}
    style={{
      width:"90px",
      height:"90px",
      border:"2px solid white",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
    }}
  >
    <img
  src={vehicle.image}
  alt={vehicle.name}
  width={80}
  onClick={()=>{
    setSelectedZukanVehicle(vehicle);
  }}
  style={{
    cursor:"pointer",
  }}
/>
  </div>
))}

    </div>


    <button
  onClick={()=>{
    setScene("opening");
  }}
  style={{
    marginTop:"40px",
    background:"black",
    color:"white",
    border:"3px solid white",
    borderRadius:"10px",
    fontSize:"24px",
    padding:"15px 50px",
    cursor:"pointer",
  }}
>
  もどる
</button>


    {selectedZukanVehicle && (
      <div
        style={{
          position:"fixed",
          top:"50%",
          left:"50%",
          transform:"translate(-50%,-50%)",
          width:"300px",
          background:"black",
          color:"white",
          border:"3px solid white",
          borderRadius:"15px",
          padding:"20px",
          textAlign:"center",
          zIndex:100,
        }}
      >

        <img
  src={selectedZukanVehicle.image}
  width={220}
  style={{
    display: "block",
    margin: "0 auto",
  }}
/>


<p>
  {selectedZukanVehicle.description}
</p>

        <h2
  style={{
    marginTop: "10px",
    fontWeight: "700",
    fontSize: "28px",
    textShadow: "2px 2px 3px black",
  }}
>
  {selectedZukanVehicle.name}
</h2>

        <p
  style={{
    whiteSpace: "pre-line",
    textAlign: "center",
    lineHeight: "1.8",
  }}
>
  {selectedZukanVehicle.zukanDescription}
</p>

<button
  onClick={()=>{
    setSelectedZukanVehicle(null);
  }}
 style={{
  position:"absolute",
  top:"5px",
  right:"5px",
  width:"35px",
  height:"35px",
  fontSize:"30px",
  background:"transparent",
  color:"white",
  border:"none",
  cursor:"pointer",
 }}
>
×
</button>

</div>
    )}

  </div>
)}


{scene === "customShop" && (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >

  <img
  src="/images/CS.png"
  alt="カスタムショップ"
  onClick={() => {
    setShopMode("main");
    setVehicleDescription("");
  }}

  style={{
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "280px", // 好みで調整
    height: "auto",
  }}
/>
<img
  src="/images/CSHOME.png"
  alt="ホーム"
  onClick={() => {
    customShopBgmRef.current?.pause();
    customShopBgmRef.current!.currentTime = 0;
    setScene("opening");
  }}
  style={{
    position: "absolute",
    top: "65px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "140px",
    cursor: "pointer",
  }}
/>

<img
  src="/images/sell.png"
  alt="売却"
  onClick={() => {
  if (
    saveData.ownedVehicles.length < 10 ||
    saveData.eventFlags.delorean
  ) {
    return;
  }

  setDeloreanIndex(0);
  setScene("delorean");
}}
  style={{
  position: "absolute",
  top: "65px",
  left: "calc(50% - 170px)",
  width: "70px",
  cursor: "pointer",
  animation:
  saveData.ownedVehicles.length >= 10 &&
  !saveData.eventFlags.delorean
    ? "blink 1s infinite"
    : "none",
}}
/>

<img
  src="/images/buy.png"
  alt="購入"
   onClick={() => {
    setShopMode("buy");
  }}
  style={{
    position: "absolute",
    top: "65px",
    left: "calc(63% + 50px)",
    width: "70px",
    cursor: "pointer",
  }}
/>

{shopMode === "main" && (
<>

<p
  style={{
    position: "absolute",
    top: "140px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",

    background: "black",
    border: "3px solid white",
    borderRadius: "15px",
    padding: "10px 25px",

     whiteSpace: "nowrap", // ← 改行させない
  }}
>
  {currentVehicle.name}
</p>


    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        left: "20px",
        bottom: "30px",
      }}
    >

      <img
        src={doctorTalking ? "/images/doc2.png" : "/images/doc1.png"}
          alt="博士"
          width={100}
/>



      <div
  onClick={() => {
    if (doctorPage < doctorMessages.length - 1) {
      setDoctorPage(doctorPage + 1);
    }
  }}
  style={{
    color: "white",
    fontSize: "14px",
    border: "3px solid white",
    borderRadius: "15px",
    padding: "10px",
    marginLeft: "15px",
    position: "relative",
    cursor: "pointer",
    width: "220px",
    minHeight: "90px",
  }}
>
 {vehicleDescription ? (
  <div style={{ whiteSpace: "pre-line" }}>
    {vehicleDescription}
  </div>
) : (
  doctorMessages[doctorPage].map((text, index) => (
    <div key={index} style={{ whiteSpace: "pre-line" }}>
      {text}
    </div>
  ))
)}


  {doctorPage < doctorMessages.length - 1 && (
    <div
      style={{
        position: "absolute",
        right: "8px",
        bottom: "3px",
        fontSize: "20px",
      }}
    >
      ▽
    </div>
  )}
</div>




    </div>


    <div
      style={{
        display:"flex",
        alignItems:"center",
        gap:"30px",
        marginTop:"-20px",
      }}
    >

      <button
  onClick={() => {
    const prevIndex =
      shopIndex === 0
        ? shopVehicles.length - 1
        : shopIndex - 1;

    setShopIndex(prevIndex);
    setVehicleDescription(shopVehicles[prevIndex].description);
  }}
  style={{
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "50px",
    padding: 0,
    cursor: "pointer",
  }}
>
  ◁
</button>


     {currentVehicle.type === "video" ? (
  <video
    src={currentVehicle.image}
    width={250}
    autoPlay
    loop
    muted
    playsInline
    onClick={() => {
      setVehicleDescription(currentVehicle.description);
    }}
    style={{
      cursor: "pointer",
      transform: "translateX(-20px)",
    }}
  />
) : (
  <img
    src={currentVehicle.image}
    alt={currentVehicle.name}
    width={250}
    onClick={() => {
      setVehicleDescription(currentVehicle.description);
    }}
    style={{
      cursor: "pointer",
      transform: "translateX(-20px)",
    }}
  />
)}


      <button
  onClick={() => {
    const nextIndex =
      shopIndex === shopVehicles.length - 1
        ? 0
        : shopIndex + 1;

    setShopIndex(nextIndex);
    setVehicleDescription(shopVehicles[nextIndex].description);
  }}
  style={{
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "50px",
    padding: 0,
    cursor: "pointer",
    transform: "translateX(-35px)",
  }}
>
  ▷
</button>

    </div>

    </>
)}

    {shopMode === "buy" && (
  <div
    style={{
      position: "absolute",
      top: "130px",
      left: "50%",
      transform: "translateX(-50%)",
      color: "white",
      textAlign: "center",
    }}
  >
    <p
  style={{
    textAlign: "center",
    marginTop: "20px",
    fontSize: "17px",
  }}
>
  商品をタップして
  <br />
  カートに追加してください
</p>

    <p
  style={{
    textAlign: "center",
    width: "300px",
    margin: "0 auto 20px",
    fontSize: "20px",
  }}
>
  💰 所持金：{saveData.money}円
</p>

    <div
  style={{
    textAlign: "left",
    width: "300px",
    margin: "0 auto",
  }}
>
{shopVehicles.map((vehicle, index) => (
  <p
    key={vehicle.name}
     onClick={() => {
  const sound = new Audio("/sounds/coin.mp3");
  sound.volume = 0.5;
  sound.play();

  if (
  saveData.ownedVehicles.some(
    (v) => v.name === vehicle.name
  )
) {
  return;
}

  setCartItems((prev) => [
    ...prev,
    vehicle,
  ]);

  setSelectedVehicle(vehicle);
}}
    style={{
      display: "flex",
      alignItems: "center",
      margin: "30px 0",
      fontSize: "23px",
      cursor: "pointer",
    }}
  >
    <span style={{ width: "30px" }}>
</span>

  <span style={{ width: "180px" }}>
  {vehicle.name}
  {saveData.ownedVehicles.some(
    (v) => v.name === vehicle.name
  ) && " ✅"}
</span>

    <span>
      {vehicle.price}円
    </span>
  </p>
))}

<img
  src="/images/CART.png"
  alt="カート"
  width={100}
  onClick={() => {
    setScene("cart");
  }}
  style={{
    display: "block",
    margin: "40px auto",
    cursor: "pointer",
  }}
/>


</div>

 


  </div>
)}

   </div>
)}

{scene === "cart" && (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      background: "black",
      color: "white",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      🛒 カート
    </h1>

<p
  style={{
    textAlign: "center",
    fontSize: "22px",
    marginTop: "20px",
  }}
>
  合計金額：
  {cartItems.reduce(
    (total, vehicle) => total + vehicle.price,
    0
  )}円
</p>


<p
  style={{
    textAlign: "center",
    fontSize: "22px",
    marginTop: "10px",
  }}
>
  💰 所持金：{saveData.money}円
</p>

<div
  style={{
    width: "320px",
    maxHeight: "55vh",
    margin: "20px auto 0",
    color: "white",
    overflowY: "auto",
  }}
>
  {cartItems.map((vehicle, index) => (
    <div
      key={index}
      style={{
        textAlign: "center",
        marginTop: "30px",
        fontSize: "20px",
      }}
    >
      {vehicle.name}　{vehicle.price}円


<br />

    <button
      onClick={() => {
        setCartItems((prev) =>
          prev.filter((_, i) => i !== index)
        );
      }}
      style={{
        marginTop: "10px",
        cursor: "pointer",
      }}
    >
      削除
    </button>

    </div>
  ))}
</div>

 <div
  style={{
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    width: "300px",
  }}
>

<button
  onClick={() => {
    setScene("customShop");
    setShopMode("buy");
  }}
  style={{
    fontSize: "20px",
    padding: "10px 30px",
    width: "120px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transform: "translateX(-20px)",
  }}
>
  ［戻る］
</button>


<button
  onClick={() => {
    const total = cartItems.reduce(
      (sum, vehicle) => sum + vehicle.price,
      0
    );

   if (saveData.money < total) {
  alert("おかねがたりません！");
  return;
}

setSaveData((data) => ({
  ...data,
  money: data.money - total,
  ownedVehicles: [
    ...data.ownedVehicles,
    ...cartItems.filter(
      (cartVehicle) =>
        !data.ownedVehicles.some(
          (owned) => owned.name === cartVehicle.name
        )
    ),
  ],
}));

alert("購入しました！");

setCartItems([]);
  }}
  style={{
    fontSize: "20px",
    padding: "10px 30px",
    width: "120px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    transform: "translateX(-10px)",
  }}
>
  ［購入する］
</button>

</div>

  </div>
)}

{scene === "gacha" && (
  <div
    style={{
      width:"100vw",
      height:"100vh",
      background:"black",
      position:"relative",
      overflow:"hidden",
    }}
  >

    <p
  style={{
    position:"absolute",
    top:"10px",
    left:"50%",
    transform:"translateX(-50%)",
    color:"white",
    fontSize:"28px",
    fontWeight:"bold",
    zIndex:10,
  }}
>
  ✈️ {saveData.miles}マイル
</p>

    <img
      src={
    gachaRolling
      ? "/images/capsule_machine.gif"
      : "/images/capsule_machine_1.png"
  }
      alt="ガチャマシン"
      style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)",
        width:"200px",
      }}
    />

 

  <button
 onClick={() => {

  if (saveData.miles < 500) {
    alert("マイルが足りません");
    return;
  }

  gachaSoundRef.current?.play();
  setGachaRolling(true);

  setTimeout(() => {
    setScene("gachaHam");
  }, 2000);
}}
  style={{
    position:"absolute",
    top:"72%",
    left:"50%",
    transform:"translateX(-50%)",
    background:"black",
    color:"white",
    fontSize:"28px",
    fontWeight:"bold",
    padding:"12px 40px",
    border:"4px solid white",
    borderRadius:"10px",
    cursor:"pointer",
  }}
>
  まわす
</button>

    <p
  style={{
    position:"absolute",
    top:"75px",
    left:"50%",
    transform:"translateX(-50%)",
    color:"white",
    fontSize:"32px",
    fontWeight:"bold",
    fontFamily:"'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif",
    textShadow:"2px 2px 3px black",
    whiteSpace:"nowrap",
  }}
>
  １回 500マイル
</p>

<p
  style={{
    position:"absolute",
    top:"75px",
    left:"50%",
    transform:"translateX(-50%)",
    color:"white",
    fontSize:"32px",
    fontWeight:"bold",
    fontFamily:"'Comic Sans MS', 'Arial Rounded MT Bold', sans-serif",
    textShadow:"2px 2px 3px black",
    whiteSpace:"nowrap",
  }}
>
  １回 500マイル
</p>


<button
  onClick={() => {
    setScene("opening");
  }}
style={{
    position:"absolute",
    top:"87%",
    left:"50%",
    transform:"translateX(-50%)",
    background:"black",
    color:"white",
    fontSize:"28px",
    fontWeight:"bold",
    padding:"12px 40px",
    border:"4px solid white",
    borderRadius:"10px",
    cursor:"pointer",
  }}
>
  もどる
</button>

  </div>
)}



      {scene === "running" && (
        <>
          <img
  src={selectedTrain?.image}
  width={120}
  alt="選択した電車"
/>
        </>
      )}

     {scene === "delorean" && (
  <>
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >

      {/* デロリアン＋博士 */}
 <img
  src={
    deloreanMouth
      ? "/images/derolian_3.png"
      : "/images/derolian_2.png"
  }
  alt="デロリアン"
  width={300}
  style={{
    height: "300px",
    objectFit: "contain",
    marginTop: "120px",
    flexShrink: 0,
  }}
/>

      {/* セリフ */}
  <div
onClick={() => {
 if (deloreanIndex < deloreanMessages.length - 1) {
  setDeloreanIndex(deloreanIndex + 1);


} else {

  // デロリアン入手
setSaveData((data) => {

  if (data.eventFlags.delorean) {
    return data;
  }

  return {
    ...data,

    eventFlags: {
      ...data.eventFlags,
      delorean: true,
    },

    ownedVehicles: [
      ...data.ownedVehicles,
      {
        name: "デロリアン",
        image: "/images/derolian_1.png",
        trainSize: 250,
        offsetY: 40,
        description: "未来からやってきたタイムマシン型の特別車両！"
      },
    ],
  };

});


  customShopBgmRef.current?.pause();
  customShopBgmRef.current!.currentTime = 0;

  if (bgmRef.current) {
    bgmRef.current.volume = 0.05;
    bgmRef.current.currentTime = 0;
    bgmRef.current.play();
  }

  setScene("frame");
}


}}
style={{
  marginTop: "20px",
  width: "70%",
  minHeight: "80px",
  padding: "10px",
  background: "black",
  color: "white",
  border: "5px solid white",
  fontSize: "20px",
  textAlign: "center",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  flexShrink: 0,
}}
>
  <div
  style={{
    whiteSpace: "pre-line",
  }}
>
  {deloreanMessages[deloreanIndex]}
</div>

  <div>
    ▽
  </div>




</div>



    </div>

    
  </>
  
)}
{scene === "gachaHam" && (
  <div
    style={{
      width:"100vw",
      height:"100vh",
      background:"black",
      position:"relative",
      overflow:"hidden",
    }}
  >

<img
  src={
    gachaKappaMouth
      ? "/images/quizkappa2.png"
      : "/images/quizkappa1.png"
  }
  alt="ハムカッパ"
  width={100}
  style={{
    position:"absolute",
    bottom:"50px",
    left:"20px",
  }}
/>

 {showCapsule && (
  <img
    src="/images/cap.png"
    alt="カプセル"
    width={120}
   onClick={() => {

  if (saveData.miles < 500) {
    alert("マイルが足りません");
    return;
  }

  setSaveData((data) => ({
    ...data,
    miles: data.miles - 500,
  }));

  ponSoundRef.current?.play();

 const availableItems = gachaItems.filter(
  (item) =>
    !saveData.ownedVehicles.some(
      (v) => v.name === item.name
    )
);

if (availableItems.length === 0) 
  { const ok = window.confirm("もう全部集まりました！"); 
    if (ok) { setScene("opening"); } 
    return; }

const prize =
  availableItems[
    Math.floor(Math.random() * availableItems.length)
  ];

  setGachaPrize(prize);

setSaveData((data) => ({
  ...data,
  ownedVehicles: [
    ...data.ownedVehicles,
    prize,
  ],
}));

setScene("gachaResult");
}}
    style={{
      position:"absolute",
      bottom:"50px",
      left:"180px",
      cursor:"pointer",
    }}
  />
)}

<div
  style={{
    position:"absolute",
    bottom:"300px",
    left:"50%",
    transform:"translateX(-50%)",
    background:"black",
    color:"white",
    padding:"15px 25px",
    border:"3px solid white",
    borderRadius:"20px",
    fontSize:"24px",
    fontWeight:"bold",
    textAlign:"center",
    whiteSpace:"nowrap",
  }}
>
  なにがでるかなー？
</div>



  </div>
)}
{scene === "gachaResult" && (
  <div
    style={{
      width:"100vw",
      height:"100vh",
      background:"black",
      position:"relative",
      overflow:"hidden",
    }}
  >

    <img
      src={gachaPrize.image}
      alt={gachaPrize.name}
      style={{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)",
        width:"350px",
      }}
    />

    <div
 onClick={() => {
  setGachaRolling(false);
  setScene("gacha");
}}

  style={{
    position:"absolute",
    top:"73%",
    left:"50%",
    transform:"translateX(-50%)",
    background:"black",
    color:"white",
    border:"3px solid white",
    padding:"10px 20px",
    fontSize:"24px",
    fontWeight:"bold",
    textAlign:"center",
    whiteSpace:"nowrap",
  }}
>
  {gachaPrize.name}
</div>

  </div>
)}
  

    </main>
    </>
  );
}