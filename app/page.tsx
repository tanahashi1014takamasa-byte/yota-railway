"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {

  const bgmRef = useRef<HTMLAudioElement | null>(null);
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
    setSaveData(JSON.parse(savedData));
  }
}, []);






  const [scene, setScene] = useState("opening");
  const [trainX, setTrainX] = useState(0);
  const [trainDirection, setTrainDirection] = useState(1);
  const [trainFlip, setTrainFlip] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showTrains, setShowTrains] = useState(false);
  

  const [saveData, setSaveData] = useState({
  selectedTrain: "",
  level: 1,
  distance: 0,
  retiredTrains: [],
});


useEffect(() => {
  const timer = setInterval(() => {
    if (scene !== "frame") return;

    if (leverState === "left") {
      setTrainX((x) => x - 2);
    } else if (leverState === "right") {
      setTrainX((x) => x + 2);
    }
  }, 16);

  return () => clearInterval(timer);
}, [leverState, scene]);


const saveGame = () => {
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


const selectedTrain = trains.find(
  (train) => train.name === saveData.selectedTrain
);

const leverImage =
  leverState === "left"
    ? "/images/lever_l.png"
    : leverState === "right"
    ? "/images/lever_r.png"
    : "/images/lever.png";


  const messages = [
  "こんにちは！よーたくん！",
  "いっしょに あそぼう～！",
  "すきな のりものを えらんでね！",
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

<button
  onClick={() => {
    window.location.reload();
  }}
  style={{
    position: "fixed",
    top: "20px",
    left: "20px",
    fontSize: "60px",
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
    setSaveData({
      selectedTrain: "",
      level: 1,
      distance: 0,
      retiredTrains: [],
    });

    setMessageIndex(0);
const steam = new Audio("/sounds/steam_train.mp3");
steam.volume = 0.3;

steam.onended = () => {
  if (bgmRef.current) {
    bgmRef.current.volume = 0.1;
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

{scene === "save" && (
  <>
    <p style={{ color: "white", fontSize: "28px" }}>
      🚃 セーブデータ
    </p>

    <p style={{ color: "white", fontSize: "22px" }}>
      でんしゃ：
      {saveData.selectedTrain || "なし"}
    </p>

    <p style={{ color: "white", fontSize: "22px" }}>
      レベル：{saveData.level}
    </p>

    <p style={{ color: "white", fontSize: "22px" }}>
      走行距離：{saveData.distance}km
    </p>

    <button
      onClick={() => {
        const steam = new Audio("/sounds/steam_train.mp3");
        steam.volume = 0.3;
        steam.play();
        setScene("running");
      }}
      style={{
        fontSize: "20px",
        padding: "10px 30px",
        marginTop: "20px",
      }}
    >
      このデータで遊ぶ
    </button>
  </>
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
      height: "100vh",
    }}
  >
    <img
      src="/images/frame.png"
      alt="フレーム"
      style={{
        height: "100vh",
        width: "auto",
        display: "block",
      }}
    />

     <div
  style={{
    position: "absolute",
    bottom: "35px",
    left: "45%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "20px",
  }}
>
  <img
    src="/images/lever_l.png"
    width={50}
    onClick={() => setLeverState("left")}
    style={{ cursor: "pointer" }}
  />

  <img
    src="/images/lever.png"
    width={50}
    onClick={() => setLeverState("center")}
    style={{ cursor: "pointer" }}
  />

  <img
    src="/images/lever_r.png"
    width={50}
    onClick={() => setLeverState("right")}
    style={{ cursor: "pointer" }}
  />
</div>

    <img
      src={selectedTrain?.image}
      alt="選んだ電車"
      style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: `
  translate(calc(-50% + ${trainX}px), -50%)
  scaleX(${trainFlip ? -1 : 1})
`,
        width: "130px",
        
      }}
    />
  </div>
)}

      {scene === "running" && (
        <>
          <img
  src={selectedTrain?.image}
  width={120}
  alt="選択した電車"
/>

<p style={{ color: "white", fontSize: "24px" }}>
  🚃 電車が走っています
</p>

          <p>🌳🏠🌳🏠🌳</p>

      <button
        onClick={() => setScene("arrive")}
    >
      到着する
    </button>

        </>
      )}

{scene === "arrive" && (
  <>
    <p>🚉 北千住葉大駅に到着しました</p>

    <p>🚃｜🚪</p>

    <button
      onClick={() => setScene("door")}
    >
      ドアを開ける
    </button>
  </>
)}

{scene === "door" && (
  <>
    <p>🚪 ドアが開きました</p>

    <p>「プシュー」</p>

 <img
      src="/images/hamukappa.png"
      alt="ハムカッパ"
      width={150}
    />

  </>
)}

    </main>
    </>
  );
}