const questions = [
  {
    id: "feeling",
    title: "今、心にいちばん近いのは？",
    hint: "直感でひとつ選んでください",
    choices: [
      ["tired", "少し疲れた", "休みたいのに、気持ちが止まらない", "☾"],
      ["lost", "迷っている", "どちらへ進むか決めきれない", "↝"],
      ["change", "変わりたい", "今のままではいたくない", "✦"],
      ["calm", "穏やかでいたい", "心のざわつきを小さくしたい", "○"],
    ],
  },
  {
    id: "focus",
    title: "何について考えることが多い？",
    hint: "いちばん近いテーマを選んでください",
    choices: [
      ["work", "仕事・挑戦", "働き方、夢、目標のこと", "↗"],
      ["relation", "人間関係", "家族、友人、恋愛のこと", "∞"],
      ["self", "自分自身", "自信、性格、生き方のこと", "◇"],
      ["future", "これから", "選択、変化、未来のこと", "⌁"],
    ],
  },
  {
    id: "effort",
    title: "ここまでのあなたに近いのは？",
    hint: "うまく言葉にできなくても大丈夫です",
    choices: [
      ["pushed", "頑張ってきた", "できることを積み重ねてきた", "＋"],
      ["endured", "我慢してきた", "言いたいことを飲み込んできた", "—"],
      ["thinking", "考え続けてきた", "答えが出るまで向き合ってきた", "…"],
      ["paused", "立ち止まった", "いったん距離を置いてみた", "｜"],
    ],
  },
  {
    id: "tone",
    title: "今、どんな言葉を受け取りたい？",
    hint: "言葉の温度を選んでください",
    choices: [
      ["gentle", "そっと包む", "自分に優しくなれる言葉", "◡"],
      ["honest", "本質をつく", "はっと視点が変わる言葉", "・"],
      ["courage", "背中を押す", "一歩進みたくなる言葉", "↑"],
      ["quiet", "静かに残る", "あとからじわっと響く言葉", "∴"],
    ],
  },
];

const themes = [
  ["leaf", "若葉", "#dceae4", "#edf4f0", "#1d302d", "#e96b4f"],
  ["sunset", "夕映え", "#efd9d2", "#f7e8e3", "#472f2e", "#b95043"],
  ["sun", "陽だまり", "#ede2c2", "#f5edd6", "#39392f", "#c98d31"],
  ["night", "夜更け", "#2f424e", "#3b505b", "#f4eddf", "#ee9679"],
];

const openings = {
  tired: {
    work: "休むことは、\n歩みを止めることじゃない。",
    relation: "誰かに優しくするために、\n自分を削り続けなくていい。",
    self: "疲れたと気づけた日は、\n自分を守りはじめた日。",
    future: "先が見えない日は、\n遠くまで見ようとしなくていい。",
  },
  lost: {
    work: "迷っているのは、\n納得して進みたいと思っているから。",
    relation: "離れるか迷う関係には、\n大切にしたかったものがある。",
    self: "自分がわからない時間も、\n自分を知っていく途中。",
    future: "迷いは、道がない証拠じゃない。\n選びたい未来がある証拠。",
  },
  change: {
    work: "変わりたいと思えた時点で、\n昨日とはもう違う場所にいる。",
    relation: "関係を変える一歩は、\n相手より先に自分を大切にすること。",
    self: "新しい自分になるより、\n本当の自分に戻ればいい。",
    future: "大きく変えなくてもいい。\n向きを少し変えれば、景色は変わる。",
  },
  calm: {
    work: "速さをゆるめても、\nあなたの価値はゆるがない。",
    relation: "心が静かになる人を、\n大切にしていい。",
    self: "機嫌よく生きることも、\n立派な目標のひとつ。",
    future: "焦りの声より、\n心がほどける方を選んでいい。",
  },
};

const middles = {
  pushed: "ここまで頑張った時間は、\nもう十分、あなたの力になっている。",
  endured: "耐えてきたあなたに必要なのは、\nもう一度耐えることじゃない。",
  thinking: "考え抜いた時間は、\n答えのない空白ではない。",
  paused: "立ち止まったからこそ、\n聞こえてくる本音がある。",
};

const endings = {
  gentle: "今日は、自分を急かさなくていい。",
  honest: "手放していいものは、きっとある。",
  courage: "小さな一歩で、流れは変わる。",
  quiet: "答えは、静かな方にある。",
};

const state = {
  step: 0,
  answers: { feeling: "", focus: "", effort: "", tone: "" },
  themeId: "leaf",
};

const experience = document.querySelector("#experience");
const shell = document.querySelector(".site-shell");
const headline = document.querySelector("#headline");
const eyebrow = document.querySelector("#eyebrow");
const lead = document.querySelector("#lead");
const toast = document.querySelector("#toast");
let toastTimer;

function quoteForAnswers() {
  return `${openings[state.answers.feeling][state.answers.focus]}\n\n${middles[state.answers.effort]}\n\n${endings[state.answers.tone]}`;
}

function serialForAnswers() {
  const source = Object.values(state.answers).join("");
  const value = Array.from(source).reduce((sum, character) => sum + character.charCodeAt(0), 17);
  return String((value % 89) + 11).padStart(2, "0");
}

function activeTheme() {
  return themes.find(([id]) => id === state.themeId) || themes[0];
}

function showStatus(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 4200);
}

function reset() {
  state.step = 0;
  state.answers = { feeling: "", focus: "", effort: "", tone: "" };
  state.themeId = "leaf";
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setIntro(isResult) {
  shell.classList.toggle("result-mode", isResult);
  eyebrow.textContent = isResult ? "YOUR KOTOBA" : "KOTOBA NO KAGAMI";
  headline.innerHTML = isResult
    ? "あなたのための言葉が、<span>できました。</span>"
    : "いまの気持ちを、<span>残したくなる一枚に。</span>";
  lead.innerHTML = isResult
    ? "胸に置いておきたい言葉なら、<br />好きな色で保存してください。"
    : "いくつかの質問に答えるだけ。<br />あなたの今に寄り添う言葉と画像をつくります。";
}

function sampleCard() {
  return `
    <aside class="preview-wrap" aria-label="生成画像のイメージ">
      <p class="preview-label">できあがりのイメージ</p>
      <div class="quote-card">
        <span class="quote-number"># 17</span><div class="sun-shape"></div>
        <blockquote>迷っているのは、<br />ちゃんと自分の人生を<br />選ぼうとしている証拠。<br />答えを急がなくていい。</blockquote>
        <div class="card-signature"><span>Kotoba no Kagami</span><i></i></div>
      </div>
      <p class="preview-caption">縦長画像でそのままシェアできます</p>
    </aside>`;
}

function renderQuestion() {
  const question = questions[state.step];
  const selected = state.answers[question.id];
  const choices = question.choices.map(([id, label, note, mark]) => `
    <button class="choice ${selected === id ? "is-selected" : ""}" data-choice="${id}" type="button" aria-pressed="${selected === id}">
      <b>${mark}</b><span><strong>${label}</strong><small>${note}</small></span>
    </button>`).join("");

  experience.innerHTML = `
    <div class="experience-grid">
      <section class="question-panel" aria-labelledby="question-title">
        <div class="progress-row" aria-label="${state.step + 1}問目、全${questions.length}問">
          <span>${String(state.step + 1).padStart(2, "0")}</span>
          <div class="progress-track"><div class="progress-value" style="width:${((state.step + 1) / questions.length) * 100}%"></div></div>
          <span>${String(questions.length).padStart(2, "0")}</span>
        </div>
        <div class="question-copy">
          <p>QUESTION ${String(state.step + 1).padStart(2, "0")}</p>
          <h2 id="question-title">${question.title}</h2><span>${question.hint}</span>
        </div>
        <div class="choice-grid">${choices}</div>
        <div class="nav-row">
          ${state.step ? '<button class="back-button" id="back-button" type="button">← 戻る</button>' : ""}
          <button class="primary-button" id="next-button" type="button" ${selected ? "" : "disabled"}>
            ${state.step === questions.length - 1 ? "言葉をつくる" : "次の質問へ"}<span aria-hidden="true">→</span>
          </button>
        </div>
      </section>
      ${sampleCard()}
    </div>`;

  experience.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      state.answers[question.id] = button.dataset.choice;
      renderQuestion();
    });
  });

  experience.querySelector("#next-button").addEventListener("click", () => {
    if (!state.answers[question.id]) return;
    state.step += 1;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  experience.querySelector("#back-button")?.addEventListener("click", () => {
    state.step -= 1;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function wrapCanvasLine(context, text, maxWidth) {
  if (!text) return [""];
  const lines = [];
  let current = "";
  Array.from(text).forEach((character) => {
    const next = current + character;
    if (current && context.measureText(next).width > maxWidth) {
      if ("、。！？）」』】".includes(character)) current = next;
      else { lines.push(current); current = character; }
    } else current = next;
  });
  if (current) lines.push(current);
  return lines;
}

function paintCard() {
  const canvas = document.querySelector("#result-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const width = 1080;
  const height = 1350;
  canvas.width = width;
  canvas.height = height;
  const [, , background, surface, ink, accent] = activeTheme();
  const quote = quoteForAnswers();

  context.fillStyle = background;
  context.fillRect(0, 0, width, height);
  const wash = context.createLinearGradient(0, 0, width, height);
  wash.addColorStop(0, `${surface}99`);
  wash.addColorStop(0.48, `${surface}22`);
  wash.addColorStop(1, `${background}00`);
  context.fillStyle = wash;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.07;
  context.fillStyle = ink;
  for (let index = 0; index < 150; index += 1) {
    const x = (index * 197 + 43) % width;
    const y = (index * 283 + 71) % height;
    context.beginPath();
    context.arc(x, y, index % 5 === 0 ? 2.2 : 1.1, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();

  context.save();
  context.strokeStyle = ink;
  context.globalAlpha = 0.1;
  context.lineWidth = 2;
  context.beginPath(); context.arc(width + 18, 65, 330, 0, Math.PI * 2); context.stroke();
  context.beginPath(); context.arc(width + 42, height - 10, 250, 0, Math.PI * 2); context.stroke();
  context.restore();

  context.fillStyle = ink;
  context.globalAlpha = 0.55;
  context.font = "italic 28px Georgia, serif";
  context.fillText(`# ${serialForAnswers()}`, 112, 112);
  context.globalAlpha = 1;
  context.fillStyle = accent;
  context.beginPath(); context.arc(width - 118, 104, 13, 0, Math.PI * 2); context.fill();
  context.globalAlpha = 0.16;
  context.beginPath(); context.arc(width - 118, 104, 28, 0, Math.PI * 2); context.fill();
  context.globalAlpha = 1;

  let fontSize = 64;
  context.font = `500 ${fontSize}px "Yu Mincho", "Hiragino Mincho ProN", serif`;
  let lines = quote.split("\n").flatMap((line) => wrapCanvasLine(context, line, 850));
  if (lines.length > 10) {
    fontSize = 56;
    context.font = `500 ${fontSize}px "Yu Mincho", "Hiragino Mincho ProN", serif`;
    lines = quote.split("\n").flatMap((line) => wrapCanvasLine(context, line, 850));
  }
  const lineHeight = fontSize * 1.58;
  const blankHeight = fontSize * 0.62;
  const textHeight = lines.reduce((total, line) => total + (line ? lineHeight : blankHeight), 0);
  let y = Math.max(260, (height - textHeight) / 2 + 35);
  context.fillStyle = ink;
  context.globalAlpha = 0.98;
  lines.forEach((line) => {
    if (!line) y += blankHeight;
    else { context.fillText(line, 112, y); y += lineHeight; }
  });
  context.globalAlpha = 0.5;
  context.font = "italic 25px Georgia, serif";
  const signature = "Kotoba no Kagami";
  const signatureY = height - 106;
  context.fillText(signature, 112, signatureY);
  const nameWidth = context.measureText(signature).width;
  context.strokeStyle = ink;
  context.beginPath();
  context.moveTo(112 + nameWidth + 30, signatureY - 8);
  context.lineTo(width - 112, signatureY - 8);
  context.stroke();
  context.globalAlpha = 1;
}

function canvasBlob() {
  return new Promise((resolve, reject) => {
    document.querySelector("#result-canvas")?.toBlob((blob) => blob ? resolve(blob) : reject(new Error("image")), "image/png");
  });
}

async function saveImage(showMessage = true) {
  try {
    const blob = await canvasBlob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `kotoba-no-kagami-${serialForAnswers()}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    if (showMessage) showStatus("画像を保存しました");
  } catch { showStatus("画像を作れませんでした。もう一度お試しください"); }
}

async function shareFromDevice() {
  try {
    const blob = await canvasBlob();
    const file = new File([blob], `kotoba-no-kagami-${serialForAnswers()}.png`, { type: "image/png" });
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      await navigator.share({ title: "ことばの鏡", text: `${quoteForAnswers().replace(/\n+/g, " ")}\n#ことばの鏡`, files: [file] });
      showStatus("共有メニューを開きました");
    } else {
      await saveImage(false);
      showStatus("画像を保存しました。Instagramなどで選んでください");
    }
  } catch (error) {
    if (error?.name !== "AbortError") showStatus("共有できませんでした。画像保存をお試しください");
  }
}

function shareToX() {
  void saveImage(false);
  const text = `${quoteForAnswers().replace(/\n+/g, " ")}\n\n#ことばの鏡`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(location.href)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  showStatus("画像を保存しました。Xの投稿画面で添付してください");
}

async function copyQuote() {
  try { await navigator.clipboard.writeText(quoteForAnswers()); showStatus("言葉をコピーしました"); }
  catch { showStatus("コピーできませんでした"); }
}

function renderResult() {
  const quote = quoteForAnswers();
  experience.innerHTML = `
    <section class="result-grid" aria-labelledby="result-title">
      <div class="canvas-column">
        <p class="result-kicker" id="result-title">KOTOBA #${serialForAnswers()}</p>
        <canvas id="result-canvas" class="result-canvas" aria-label="生成された言葉"></canvas>
      </div>
      <div class="result-controls">
        <div class="quote-copy"><p>あなたに届いた言葉</p><blockquote>${quote}</blockquote><button id="copy-button" type="button">言葉をコピー <span>↗</span></button></div>
        <div class="theme-picker"><p>背景を選ぶ</p><div class="theme-list">
          ${themes.map(([id, name, color]) => `<button class="${state.themeId === id ? "is-active" : ""}" data-theme="${id}" type="button" aria-pressed="${state.themeId === id}"><i style="background:${color}"></i>${name}</button>`).join("")}
        </div></div>
        <div class="share-actions">
          <button class="share-primary" id="device-share" type="button"><span>↗</span>Instagramなどへ共有</button>
          <div><button id="x-share" type="button"><b>𝕏</b> Xでシェア</button><button id="save-button" type="button"><b>↓</b> 画像を保存</button></div>
        </div>
        <button class="restart-button" id="restart-button" type="button">質問にもう一度答える</button>
        <p class="privacy-note">回答と画像はこの端末の中だけで生成され、保存・送信されません。</p>
      </div>
    </section>`;
  paintCard();
  experience.querySelectorAll("[data-theme]").forEach((button) => button.addEventListener("click", () => {
    state.themeId = button.dataset.theme;
    renderResult();
  }));
  experience.querySelector("#copy-button").addEventListener("click", copyQuote);
  experience.querySelector("#device-share").addEventListener("click", shareFromDevice);
  experience.querySelector("#x-share").addEventListener("click", shareToX);
  experience.querySelector("#save-button").addEventListener("click", () => saveImage());
  experience.querySelector("#restart-button").addEventListener("click", reset);
}

function render() {
  const isResult = state.step === questions.length;
  setIntro(isResult);
  if (isResult) renderResult();
  else renderQuestion();
}

document.querySelector("#brand-button").addEventListener("click", reset);
render();
