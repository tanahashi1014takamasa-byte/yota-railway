"use client";

import { useState } from "react";

export default function Home() {
  const [scene, setScene] = useState("opening");
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
  "こんにちは！",
  "ぼくは ハムカッパ！",
  "でんしゃで あそぼう！",
  "すきな でんしゃを えらんでね！",
];

  return (
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
  onClick={() => setScene("intro")}
  style={{ cursor: "pointer" }}
/>
  </>
)}

{scene === "intro" && (
 <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100%",
  }}
>
  <img
    src="/images/kappa.png"
    alt="ハムカッパ"
    width={100}
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
      background: "white",
      color: "black",
      padding: "15px",
      borderRadius: "15px",
      marginLeft: "15px",
      fontSize: "24px",
      cursor: "pointer",
    }}
  >
    {messages[messageIndex]}
  </div>
</div>
)}


      {scene === "trainSelect" && (
  <>
    <p style={{ color: "white", fontSize: "24px" }}>
      でんしゃを えらんでね！
    </p>

    <img
      src="/images/train1.png"
      alt="でんしゃ1"
      width={160}
    />

    <img
      src="/images/train2.png"
      alt="でんしゃ2"
      width={160}
    />

    <img
      src="/images/train3.png"
      alt="でんしゃ3"
      width={160}
    />
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
  );
}