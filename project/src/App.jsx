import { useState } from "react";
import "./styles.css";

function App() {
  const animals = [
    ["🐶", "강아지"],
    ["🐱", "고양이"],
    ["🐰", "토끼"],
    ["🐻", "곰"],
    ["🐼", "판다"],
    ["🦊", "여우"],
    ["🐸", "개구리"],
    ["🐵", "원숭이"],
    ["🐹", "햄스터"],
    ["🐥", "병아리"],
  ];

  const [sentences, setSentences] = useState([]);
  const [input, setInput] = useState("");
  const [bubble, setBubble] = useState(
    "안녕! 무엇을 배워볼까?💭"
  );

  const [animal, setAnimal] = useState([
    "🐶",
    "강아지",
  ]);

  const [editIndex, setEditIndex] = useState(-1);

  // 저장 / 수정
  const handleSubmit = (e) => {
    e.preventDefault();

    const sentence = input.trim();

    if (!sentence) return;

    if (editIndex === -1) {
      setSentences([...sentences, sentence]);
    } else {
      const updated = [...sentences];
      updated[editIndex] = sentence;
      setSentences(updated);
      setEditIndex(-1);
    }

    setBubble(sentence);
    setInput("");
  };

  // 수정 버튼
  const editSentence = (index) => {
    setInput(sentences[index]);
    setEditIndex(index);
  };

  // 삭제 버튼
  const deleteSentence = (index) => {
    const updated = sentences.filter(
      (_, i) => i !== index
    );

    setSentences(updated);
    setEditIndex(-1);
  };

  // 말하기 버튼
  const handleSpeak = () => {
    const lastSentence =
      sentences[sentences.length - 1];

    setBubble(input.trim() || lastSentence || 
      "먼저 문장을 입력해줘!");
  };

  // 랜덤 동물 버튼
  const randomAnimal = () => {
    const randomIndex = Math.floor(
      Math.random() * animals.length
    );

    setAnimal(animals[randomIndex]);
  };

  return (
    <main>
      <section className="box">
        <p className="eyebrow">
          프-백 연합 프로젝트 : 서윤소래
        </p>

        <br />

        <h1>
          귀요미들에게 말을 가르쳐보세요!
        </h1>

        <br />

        <div className="direction">
          <p>
            사용 방법. . . ✏️
            <br />
            문장을 입력하고 말하기 버튼을
            누르면 동물이 똑같이 말해요.
          </p>
        </div>

        <div className="animal-area">
          <div className="bubble">
            {bubble}
          </div>

          <div className="animal">
            {animal[0]}
          </div>

          <h2>{animal[1]}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="가르칠 문장을 입력하세요"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            required
          />

          <button type="submit">
            {editIndex === -1
              ? "저장"
              : "수정"}
          </button>
        </form>

        <div className="button-row">
          <button
            type="button"
            onClick={handleSpeak}
          >
            🗣️ 말하기
          </button>

          <button
            type="button"
            onClick={randomAnimal}
          >
            🎲 랜덤 동물
          </button>
        </div>
      </section>

      <section className="box">
        <h2>
          저장한 문장{" "}
          <span>{sentences.length}개</span>
        </h2>

        {sentences.length === 0 ? (
          <p id="emptyText">
            아직 저장한 문장이 없어요.
          </p>
        ) : (
          <ul id="list">
            {sentences.map(
              (sentence, index) => (
                <li key={index}>
                  <span>{sentence}</span>

                  <button
                    onClick={() =>
                      editSentence(index)
                    }
                  >
                    수정
                  </button>

                  <button
                    className="delete"
                    onClick={() =>
                      deleteSentence(index)
                    }
                  >
                    삭제
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;