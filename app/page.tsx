"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const imageCache = useRef<HTMLImageElement[]>([]);

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
    console.log("保存データ発見:", JSON.parse(savedData));
  }
}, []);

  const [scene, setScene] = useState("opening");
  const [messageIndex, setMessageIndex] = useState(0);

  const saveData = {
  selectedTrain: "",
  level: 1,
  distance: 0,
  retiredTrains: [],
};

const saveGame = () => {
  localStorage.setItem(
    "yotaRailwaySave",
    JSON.stringify(saveData)
  );
};

  const messages = [
  "こんにちは！",
  "ぼくは ハムカッパ！",
  "でんしゃで あそぼう！",
  "すきな でんしゃを えらんでね！",
];

  return (

  <>
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
    paddingTop: "20px",
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
    src="/images/banner①.png"
    alt="バナー"
    width={340}
  />
</div>

  <img
  src="/images/start.png"
  alt="START"
  width={180}
  onClick={() => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.1;
      bgmRef.current.currentTime = 0;
      bgmRef.current.play();
    }

    setScene("intro");
  }}
  style={{ cursor: "pointer" }}
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
      でんしゃを えらんでね！
    </p>

    <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  }}
>
  <img
    src="/images/train_ver1.1.png"
    alt="でんしゃ1"
    width={180}
    loading="eager"
  />

  <button
  onClick={() => {
  saveData.selectedTrain = "ハムカッパでんしゃ";
  saveGame();
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
  ハムカッパでんしゃ
</button>
</div>

    <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  }}
>
  <img
    src="/images/train_ver2.1.png"
    alt="でんしゃ2"
    width={180}
    loading="eager"
  />

  <button
  onClick={() => {
  saveData.selectedTrain = "しんかんせん";
  saveGame();
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
    しんかんせん
  </button>
</div>

    <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  }}
>
  <img
    src="/images/train_ver3.1.png"
    alt="でんしゃ3"
    width={180}
    loading="eager"
  />

  <button
    onClick={() => {
      saveData.selectedTrain = "トーマス";
      saveGame();
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
    トーマス
  </button>
</div>

        <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "30px",
  }}
>
  <img
    src="/images/yonezu_1.png"
    alt="でんしゃ4"
    width={180}
    loading="eager"
  />

  <button
  onClick={() => {
  saveData.selectedTrain = "よねづけんし";
  saveGame();
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
    よねづけんし
  </button>
</div>

</div>
</>
)}

      {scene === "running" && (
        <>
          <p>🚃 電車が走っています</p>

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