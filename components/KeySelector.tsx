interface KeySelectorProps {
  selectedKey: number;
  onKeyChange: (key: number) => void;
}

const KeySelector = ({ selectedKey, onKeyChange }: KeySelectorProps) => {
  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-3 text-gray-200">
        Select API Key
      </label>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => onKeyChange(num)}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              selectedKey === num
                ? "bg-[#800020] text-white shadow-lg shadow-[#800020]/30"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Key {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KeySelector;
