"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const customShopBgmRef = useRef<HTMLAudioElement | null>(null);
  const imageCache = useRef<HTMLImageElement[]>([]);
  const [leverState, setLeverState] = useState<"center" | "left" | "right">("center");

  

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
  });
}

  setSaveLoaded(true);
}, []);


 





  const [scene, setScene] = useState("opening");
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

  const LEFT_WALL = -200;
  const RIGHT_WALL = 200;
  const [shopIndex, setShopIndex] = useState(0);
  const [shopMode, setShopMode] = useState("main");
  const [buyIndex, setBuyIndex] = useState(0);
  

  const [saveData, setSaveData] = useState({
  selectedTrain: "",
  level: 1,
  distance: 0,
  money: 0,
  retiredTrains: [],
});

const [saveLoaded, setSaveLoaded] = useState(false);




useEffect(() => {
  const timer = setInterval(() => {
    if (scene !== "frame") return;

    if (leverState === "left") {
      setTrainX((x) => {
        if (x <= LEFT_WALL) {
          return RIGHT_WALL;
        }

        setSaveData((data) => ({
  ...data,
  distance: data.distance + 1,
  money: data.money + 1,
}));

        return x - 1;
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
}));

        return x + 1;
      });
    }

  }, 30);

  return () => clearInterval(timer);
}, [leverState, scene]);

const saveGame = () => {

  const sound = new Audio("/sounds/save.mp3");
  sound.volume = 0.5;
  sound.play();

  localStorage.setItem(
    "yotaRailwaySave",
    JSON.stringify(saveData)
  );

};

const trains = [
  
  {
    name: "ハムカッパでんしゃ",
    image: "/images/train_ver1.1.png",
  },
  {
    name: "しんかんせん",
    image: "/images/train_ver2.1.png",
  },
  {
    name: "トーマス",
    image: "/images/train_ver3.1.png",
  },
  {
    name: "よねづけんし",
    image: "/images/yonezu_1.png",
  },
];


const shopVehicles = [
  {
  name: "D51-498",
  image: "/images/D51-498蒸気機関車.png",
  description: "D51-498蒸気機関車！！\nむかし たくさんの ひとや\nにもつを はこんだ じょうききかんしゃだよ！\nくろい からだと \nおおきな けむりが\nかっこいい きかんしゃだね！",
  price : 100,
},
  {
  name: "ギャルでん",
  image: "/images/gal.png",
  description: "これはギャルのでんしゃ\nギャルでん\n季節や気圧にやられる～♪\nうちらまだまだかわいい～♪",
  price : 100,
},
  {
    name: "GSE70000形ロマンスカー",
    image: "/images/GSE_70000形_ロマンスカー.png",
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
    description: "みかくにんひこうぶったい\nこれはまちがいなく\nみかくにんひこう…\nまちがいなく…\nみかくにん…???\nU.F.O.の軌道に乗って♪\nあーなーたーと逃避行～♪",
    price : 100,
  },
   {
    name: "キッチンカー（ケバブ）",
    image: "/images/ケバブ.png",
    description: "かまた駅のケバブは\nめっさ にく おおもり\nみなみすなまち駅は\nキャベツばっかり\nみなみせんじゅ駅のケバブは\nベリーグッドテイスト\nだにょ～ん\n",
    price : 100,
  },
   {
  name: "オトナブルートレイン",
  type: "video",
  image: "/videos/otona_blue.mp4",
  description: "個性や自由ではみ出していく\nはみ出しちゃいけないのは…\n車線だけなんだぜ\nいつかは花になる\nアマリリス～♪ハァッ！！！",
  price : 100,
},
{
    name: "アイシールド２１",
    image: "/images/アイシールド21.gif",
    description: "ヤー！！ハー！！\nビビりでパシりな小市民は\nアメフトの世界じゃ\n英雄だった\nホームやかいだんは\nはしらないでね！",
    price : 100,
  },
{
  name: "せいそう だいしゃニキ",
  image: "/images/清掃台車ニキ.png",
  description: "だいしゃ に のっては\nいけません！",
  price : 100,
},
{
  name: "じぶんさがしニキ",
  image: "/images/自分探し.gif",
  description: "きままなひとりたび！\nこの長い長い下り坂を～♪\n君を自転車の後ろに載せて～♪\nブレーキいっぱい\n握りしめて～♪\nゆっくりゆっくり下ってく～♪",
  price : 100,
},

{
  name: "きょだいロボ",
  image: "/images/きょだいロボ.gif",
  description: "……………………\nえ…なにこれ…\nこわ\nこんなのつくったかな…",
  price : 100,
},
{
  name: "回転寿司",
  image: "/images/回転寿司.gif",
  description: "おすしー！\nむしろ…おしすー！\nすし なら\nまいにちだってくえるぜ\nはむかっぱも\nすしはだいすきだってさ",
  price : 100,
},
{
  name: "パックマン",
  image: "/images/パックマン.gif",
  description: "……………………\nえー…これは\n…80年代の…ルンバ\nくわしいことは\nパパにきこう！",
  price : 100,
},
];


const currentVehicle = shopVehicles[shopIndex];

const buyVehicle = shopVehicles[buyIndex];



const selectedTrain = trains.find(
  (train) => train.name === saveData.selectedTrain
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
    "カスタムショップへ ようこそ！\n\n※ほしい のりものがあったら\n現代のタナハシにいってね！",
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
    level: 1,
    distance: 0,
    retiredTrains: [],
    money: 0,
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

  setScene("intro");
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

  setScene("customShop");
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
  src="/images/kappa_1.png"
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
    <p style={{ color: "white", fontSize: "28px" }}>
      🚃 セーブデータ
    </p>

    <p style={{ color: "white", fontSize: "22px" }}>
      のりもの：
      {saveData.selectedTrain || "なし"}
    </p>

    <p style={{ color: "white", fontSize: "22px" }}>
      レベル：{saveData.level}
    </p>

    <p style={{ color: "white", fontSize: "22px" }}>
      走行距離：{saveData.distance}km
    </p>

    <p style={{ color: "white", fontSize: "22px" }}>
  おかね：{saveData.money}円
  </p>

    <button
      onClick={() => {
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
  padding: "10px 30px",
}}
    >
      このデータで遊ぶ
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
  setScene("frame");
};

    bell.play();

    setSaveData({
      ...saveData,
      selectedTrain: train.name,
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
    alert("電車ボタン");
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

<button
  onClick={() => {
    alert("星ボタン");
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
    alert("メンテナンスボタン");
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
    color: "#006400",
    fontSize: "24px",
    fontWeight: "bold",
    zIndex: 10,
  }}
>
  🚃 走行距離：{saveData.distance}km
</p>

<p
  style={{
    position: "absolute",
    top: "120px",
    left: "20px",
    color: "#006400",
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
        transform: `
  translate(calc(-50% + ${trainX}px), -50%)
  scaleX(${trainFlip ? -1 : 1})
`,
        width: "180px",
        
      }}
    />
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
    marginTop: "20px",
  }}
>
  どれを かいますか？
</p>

    <p
  style={{
    textAlign: "left",
    width: "300px",
    margin: "0 auto 20px",
  }}
>
  💰 もってる おかね：{saveData.money}円
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
    style={{
      display: "flex",
      alignItems: "center",
      margin: "20px 0",
      fontSize: "26px",
    }}
  >
    <span style={{ width: "30px" }}>
      {buyIndex === index ? "▶" : ""}
    </span>

    <span style={{ width: "180px" }}>
      {vehicle.name}
    </span>

    <span>
      {vehicle.price}円
    </span>
  </p>
))}
</div>

 

    <button
  onClick={() => {

  if (saveData.money >= currentVehicle.price) {

    setSaveData({
      ...saveData,
      money: saveData.money - currentVehicle.price,
    });

    alert("かった！");

  } else {

    alert("おかねが たりないよ！");

  }

}}
  style={{
    marginTop: "20px",
    fontSize: "24px",
    padding: "10px 40px",
    background: "black",
    color: "white",
    border: "2px solid white",
    borderRadius: "10px",
  }}
>
  はい
</button>

<button
  onClick={() => {
    setShopMode("main");
  }}
  style={{
    marginTop: "20px",
    marginLeft: "20px",
    fontSize: "24px",
    padding: "10px 40px",
    background: "black",
    color: "white",
    border: "2px solid white",
    borderRadius: "10px",
  }}
>
  いいえ
</button>

  </div>
)}

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