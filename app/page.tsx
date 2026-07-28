"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const customShopBgmRef = useRef<HTMLAudioElement | null>(null);
  const imageCache = useRef<HTMLImageElement[]>([]);
  const [leverState, setLeverState] = useState<"center" | "left" | "right">("center");
  const [scene, setScene] = useState("opening");
  const [quizKappaMouth, setQuizKappaMouth] = useState(false);
  const [introKappaMouth, setIntroKappaMouth] = useState(false);
  const [loadingNext, setLoadingNext] = useState("");
  const [nextScene, setNextScene] = useState("");
  const [showTrainSelect, setShowTrainSelect] = useState(false);

  

  useEffect(() => {
  const images = [
  "/images/train_ver1.1.png",
  "/images/train_ver2.1.png",
  "/images/train_ver3.1.png",
  "/images/yonezu_1.png",
  "/images/kappa_1.png",
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

  setSaveData({
  ...data,
  money: data.money ?? 0,
  ownedVehicles: data.ownedVehicles ?? [],
  condition: {
  clean: 50,
  status: 50,
  energy: 50,
},
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
  const [doctorTalking, setDoctorTalking] = useState(false);
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
  ownedVehicles: [] as any[],
  condition: {
  clean: 100,
  status: 100,
  energy: 100,
},
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
  distance: data.distance + 1,
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
  distance: data.distance + 1,
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



const trains = [
  
  {
    name: "ハムカッパでんしゃ",
    image: "/images/train_ver1.1.png",
    trainSize: 150,
    offsetY: 70,
  },
  {
    name: "しんかんせん",
    image: "/images/train_ver2.1.png",
    trainSize: 150,
    offsetY: 70,
  },
  {
    name: "トーマス",
    image: "/images/train_ver3.1.png",
     trainSize: 150,
    offsetY: 70,
  },
  {
    name: "よねづけんし",
    image: "/images/yonezu_1.png",
    trainSize: 150,
    offsetY: 60,
  },
];


const shopVehicles = [
  {
  name: "D51-498",
  image: "/images/D51-498蒸気機関車.png",
  trainSize: 300,
  offsetY: 60,
  description: "D51-498蒸気機関車！！\nむかし たくさんの ひとや\nにもつを はこんだ じょうききかんしゃだよ！\nくろい からだと \nおおきな けむりが\nかっこいい きかんしゃだね！",
  price : 100,
},
  {
  name: "ギャルでん",
  image: "/images/gal.png",
  trainSize: 300,
  description: "これはギャルのでんしゃ\nギャルでん\n季節や気圧にやられる～♪\nうちらまだまだかわいい～♪",
  price : 100,
  offsetY: 45,
},
  {
    name: "GSE70000形ロマンスカー",
    image: "/images/GSE_70000形_ロマンスカー.png",
    trainSize: 400,
    description: "GSE70000形ロマンスカー!!\nオレンジいろの かっこいい\nロマンスカーだよ。\nおおきな まどから けしきを\nながめながら、\nすてきな たびに つれていって\nくれる でんしゃだよ。",
    price : 100,
  },
  {
    name: "江ノ電",
    image: "/images/enoden.png",
    description: "江ノ電だね\nえのでんは、うみのちかくをはしる\nかわいいでんしゃだよ！\nかまくらとふじさわのあいだをはしっているよ。\n割とよくある日々のすれ違いを～♪",
    price : 100,
  },
  {
    name: "江ノ電ニキ",
    image: "/images/enodenniki.png",
    description: "これは江ノ電ニキだ\nあの どうがをきっかけに\nタコスが\nめっさ売れたらしい\nえのしまドリームだね！",
    price : 100,
  },
  {
    name: "メタルスラッグ",
    image: "/images/メタスラ.gif",
    description: "これは…\nめっさカックィー メカだ\nだれかになんかいわれたら\nタナハシのせいにしよう！\n",
    price : 100,
  },
  {
    name: "メタルスラッグ２",
    image: "/images/メタスラ2.gif",
    description: "これは…\nあれだ…すげーメカだ\nうん…\nのってるのはマルコだ！！",
    price : 100,
  },
  {
    name: "ハイエース",
    image: "/images/ハイエース.png",
    description: "ハイエース！！\nすげーがんじょうだ！\nキャンプでつかう\nひともいれば\nバンドのきざいしゃにもなる\nタナハシも うんてんしたことあるぞ\n鞭を打つ代わりに投与～♪\n怪物って名前の飲料～♪",
    price : 100,
  },
   {
    name: "U.F.O.",
    image: "/images/UFO.png",
    trainSize: 160,
    description: "みかくにんひこうぶったい\nこれはまちがいなく\nみかくにんひこう…\nまちがいなく…\nみかくにん…???\nU.F.O.の軌道に乗って♪\nあーなーたーと逃避行～♪",
    price : 100,
  },
   {
    name: "キッチンカー（ケバブ）",
    image: "/images/ケバブ.png",
    trainSize: 350,
    description: "かまた駅のケバブは\nめっさ にく おおもり\nみなみすなまち駅は\nキャベツばっかり\nみなみせんじゅ駅のケバブは\nベリーグッドテイスト\nだにょ～ん\n",
    price : 100,
  },
   {
  name: "オトナブルートレイン",
  type: "video",
  image: "/videos/otona_blue.mp4",
  trainSize: 300,
  description: "個性や自由ではみ出していく\nはみ出しちゃいけないのは…\n車線だけなんだぜ\nいつかは花になる\nアマリリス～♪ハァッ！！！",
  price : 100,
},
{
    name: "アイシールド２１",
    image: "/images/アイシールド21.gif",
    speed: 20,
    description: "ヤー！！ハー！！\nビビりでパシりな小市民は\nアメフトの世界じゃ\n英雄だった\nホームやかいだんは\nはしらないでね！",
    price : 100,
  },
{
  name: "せいそう だいしゃニキ",
  image: "/images/清掃台車ニキ.png",
  speed: 7,
  trainSize: 200,
  description: "だいしゃ に のっては\nいけません！",
  price : 100,
},
{
  name: "じぶんさがしニキ",
  image: "/images/自分探し.gif",
  trainSize: 200,
  description: "きままなひとりたび！\nこの長い長い下り坂を～♪\n君を自転車の後ろに載せて～♪\nブレーキいっぱい\n握りしめて～♪\nゆっくりゆっくり下ってく～♪",
  price : 100,
},

{
  name: "めっさデカいメカ",
  image: "/images/きょだいロボ.gif",
  trainSize: 350,
  description: "……………………\nえ…なにこれ…\nこわ\nこんなのつくったかな…",
  price : 100,
},
{
  name: "回転寿司",
  image: "/images/回転寿司.gif",
  trainSize: 450,
  description: "おすしー！\nむしろ…おしすー！\nすし なら\nまいにちだってくえるぜ\nはむかっぱも\nすしはだいすきだってさ",
  price : 100,
},
{
  name: "パックマン",
  image: "/images/パックマン.gif",
  description: "……………………\nえー…これは\n…80年代の…ルンバ\nくわしいことは\nパパにきこう！",
  price : 100,
},

 {
  name: "メロン2個500円ニキ",
  image: "/images/メロン2個500円ニキ.png",
  trainSize: 200,
  description: "やっ…！！！\nやっすいっすねぇえええ！！！",
  price : 100,
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
  ref={customShopBgmRef}
  src="/sounds/BackToTheFuture.mp3"
  loop
  preload="auto"
/>


<button
  onClick={() => {
    window.location.reload();
  }}
  style={{
    position: "fixed",
    top: "5px",
    left: "20px",
    fontSize: "30px",
    color: "white",
    background: "transparent",
    border: "none",
    zIndex: 10000,
    cursor: "pointer",
  }}
>
  ↻
</button>



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
  ownedVehicles: [],
  vehicleDistances: {},
  condition: {
  clean: 100,
  status: 100,
  energy: 100,
},
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

  setLoadingNext("customShop");
  setScene("loading");
}}

  style={{
    cursor: "pointer",
    marginTop: "10px",
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
      justifyContent: "center",
      minHeight: "100vh",
    }}
  >
    <p style={{ color: "white", fontSize: "24px" }}>
      <img
  src="/images/yota.png"
  width={300}
  alt="葉大鉄道"
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

   <button
  onClick={() => {

    setSaveData({
      ...saveData,
      selectedTrain: saveData.mainTrain,
    });

    const steam = new Audio("/sounds/steam_train.mp3");
    steam.volume = 0.3;
    steam.play();

    if (bgmRef.current) {
      bgmRef.current.volume = 0.05;
      bgmRef.current.play();
    }

    setScene("frame");
  }}
 style={{
  color: "white",
  background: "black",
  border: "2px solid white",
  borderRadius: "10px",
  fontSize: "20px",
  padding: "10px 20px",
  cursor: "pointer",
}}
>
   {saveData.mainTrain || "回送列車"}
<br />
走行距離：
{saveData.vehicleDistances[saveData.mainTrain] ?? 0}km
</button>
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

<p style={{ color: "white", fontSize: "24px" }}>
      すきな のりものを えらんでね！
    </p>
    
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
    電車がまいります…
    <br />
    黄色い点字ブロックの内側まで
    <br />
    お下がりください
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
      🚃 のりかえ
    </p>

    {[
      ...trains,
      ...saveData.ownedVehicles
    ].map((vehicle) => (

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


    <button
      onClick={() => {
        setShowTrainSelect(false);
      }}
      style={{
        marginTop:"10px",
        padding:"10px 30px",
      }}
    >
      とじる
    </button>

  </div>
)}

<button
  onClick={() => {
    setScene("quiz");
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
    fontSize: "24px",
    fontWeight: "bold",
    zIndex: 10,
  }}
>
  🚃 全体走行距離：{saveData.distance}km
</p>

<p
  style={{
    position: "absolute",
    top: "120px",
    left: "20px",
    color: "white",
    textShadow: "2px 2px 4px black",
    fontSize: "24px",
    fontWeight: "bold",
    zIndex: 10,
  }}
>
  💰 おかね：{saveData.money}
</p>
<div
  style={{
    position: "absolute",
    top: "160px",
    left: "20px",
    color: "white",
    fontSize: "18px",
    textShadow: "2px 2px 4px black",
    fontWeight: "bold",
    zIndex: 10,
  }}
>

<p>
  🧼 きれい度：{saveData.condition.clean}
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


<p>
  🔩 調子：{saveData.condition.status}
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


<p>
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
  scaleX(${trainFlip ? -1 : 1})
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
  src={quizKappaMouth ? "/images/quizkappa2.png" : "/images/quizkappa1.png"}
  width={120}
  alt="ハムカッパ"
  style={{
    position: "absolute",
    bottom: "50px",
    left: "20px",
  }}
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


{scene === "maintenance" && (
  <div
    style={{
      color: "white",
      textAlign: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "20px",
    }}
  >

    <h1>🔧 メンテナンス</h1>

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
  }}
>
  🚿 洗車
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
  }}
>
  🔩 点検
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
  }}
>
  ⚡ チャージ
</button>

    <button
      onClick={() => {
        setScene("frame");
      }}
    >
      もどる
    </button>

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
  style={{
    position: "absolute",
    top: "65px",
    left: "calc(50% - 170px)",
    width: "70px",
    cursor: "pointer",
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
    ...cartItems,
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



      {scene === "running" && (
        <>
          <img
  src={selectedTrain?.image}
  width={120}
  alt="選択した電車"
/>
        </>
      )}

    </main>
    </>
  );
}