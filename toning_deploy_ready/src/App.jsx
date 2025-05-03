
import { useState } from "react";

const colors = [
  { name: "Calm Blue", hex: "#A2C3E8", tone: "차분함" },
  { name: "Warm Blush", hex: "#F2B8A2", tone: "따뜻함" },
  { name: "Fresh Mint", hex: "#B5EAD7", tone: "상쾌함" },
  { name: "Golden Glow", hex: "#F9E79F", tone: "희망" },
  { name: "Slate Grey", hex: "#BDC3C7", tone: "무기력" },
  { name: "Peach Cream", hex: "#FFE5B4", tone: "안정감" },
  { name: "Lavender Dream", hex: "#D8B4E2", tone: "몽환적임" },
  { name: "Olive Dust", hex: "#B4C19D", tone: "불안정함" },
  { name: "Coral Punch", hex: "#FF6F61", tone: "에너지" },
  { name: "Deep Navy", hex: "#2C3E50", tone: "집중" },
];

export default function Toning() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({ id: '', pw: '' });
  const [history, setHistory] = useState([]);
  const [journal, setJournal] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [editText, setEditText] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    const today = history.length + 1;
    setHistory([...history, { day: today, color: selectedColor, text: journal }]);
    setJournal("");
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleJournalChange = (e) => {
    setJournal(e.target.value);
  };

  const handleDayClick = (day) => {
    const entry = history.find((h) => h.day === day);
    setSelectedDay(entry);
    setEditText(entry.text);
  };

  const handleEditSave = () => {
    setHistory(
      history.map((entry) =>
        entry.day === selectedDay.day ? { ...entry, text: editText } : entry
      )
    );
    setSelectedDay(null);
    setEditText("");
  };

  const getToneStats = () => {
    const stats = {};
    history.forEach(({ color }) => {
      stats[color.tone] = (stats[color.tone] || 0) + 1;
    });
    return stats;
  };

  const toneStats = getToneStats();

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center transition-all duration-500 p-8 overflow-y-auto"
      style={{ backgroundColor: loggedIn ? selectedColor.hex : "#ffffff" }}
    >
      {!loggedIn ? (
        <form onSubmit={handleLogin} className="flex flex-col items-center space-y-4">
          <h1 className="text-5xl font-bold tracking-widest mb-2">TONING</h1>
          <p className="text-lg text-gray-700 mb-4">what’s your today’s tone?</p>
          <input
            name="id"
            placeholder="아이디"
            value={form.id}
            onChange={handleInputChange}
            className="border rounded px-4 py-2"
          />
          <input
            name="pw"
            type="password"
            placeholder="비밀번호"
            value={form.pw}
            onChange={handleInputChange}
            className="border rounded px-4 py-2"
          />
          
          <div className="flex flex-col w-full px-1">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => handleColorSelect(color)}
                  className={\`min-w-[48px] h-10 rounded-full shadow-md transition-transform border-2 \${selectedColor.name === color.name ? 'border-black' : 'border-transparent'}\`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <p className="text-[10px] text-gray-400 ml-1 mt-1">* based on color psychology</p>
          </div>
          
          <button type="submit" className="mt-4 bg-black text-white px-6 py-2 rounded">
            로그인
          </button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}
