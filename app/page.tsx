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
  

  const [saveData, setSaveData] = useState({
  selectedTrain: "",
  level: 1,
  distance: 0,
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
  name: "GAL",
  image: "/images/gal.png",
  description: "これはギャルのでんしゃ ギャルでん 季節や気圧にやられる～♪うちらまだまだかわいい～♪",
},
  {
    name: "GSE 70000形ロマンスカー",
    image: "/images/GSE_70000形_ロマンスカー.png",
    description: "ここにGSEの説明",
  },
  {
    name: "江ノ電",
    image: "/images/enoden.png",
    description: "ここに江ノ電の説明",
  },
  {
    name: "江ノ電（2両編成）",
    image: "/images/enodenniki.png",
    description: "ここに江ノ電2両編成の説明",
  },
];

const currentVehicle = shopVehicles[shopIndex];

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
    "カスタムショップへ ようこそ！",
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
      justifyContent: "flex-start",
      minHeight: "100vh",
      paddingTop: "50px",
    }}
  >
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
  走行距離：{saveData.distance}km
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

   <p
  style={{
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "28px",
    border: "3px solid white",
    borderRadius: "15px",
    padding: "10px 30px",
    background: "black",
    whiteSpace: "nowrap",
  }}
>
  カスタムショップ
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
    fontSize: "16px",
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
  <div>
    {vehicleDescription}
  </div>
) : (
  doctorMessages[doctorPage].map((text, index) => (
    <div key={index}>
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
          setShopIndex(
            shopIndex === 0
            ? shopVehicles.length - 1
            : shopIndex - 1
          );
        }}
      >
        ◀
      </button>


      <img
  src={currentVehicle.image}
  alt={currentVehicle.name}
  width={250}
  onClick={() => {
  setVehicleDescription(currentVehicle.description);
}}
  style={{ cursor: "pointer" }}
/>


      <button
        onClick={() => {
          setShopIndex(
            shopIndex === shopVehicles.length - 1
            ? 0
            : shopIndex + 1
          );
        }}
      >
        ▶
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