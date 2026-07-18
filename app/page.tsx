"use client";

import { useState } from "react";

export default function Home() {
  const [scene, setScene] = useState("opening");

  return (
    <main
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  }}
>

      {scene === "opening" && (
  <>
    <img
      src="/images/logo.png"
      alt="ロゴ"
      width={320}
    />

    <img
      src="/images/banner.png"
      alt="バナー"
      width={340}
    />

    <img
      src="/images/start.png"
      alt="START"
      width={180}
      onClick={() => setScene("station")}
      style={{ cursor: "pointer" }}
    />
  </>
)}

      {scene === "station" && (
        <>
          <p>🚉 北千住葉大駅</p>

          <button
            onClick={() => setScene("running")}
          >
            発車する
          </button>
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