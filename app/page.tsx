"use client";

import { useState } from "react";

export default function Home() {
  const [scene, setScene] = useState("station");

  return (
    <main>
      <h1>北千住葉大鉄道</h1>

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
  </>
)}

    </main>
  );
}