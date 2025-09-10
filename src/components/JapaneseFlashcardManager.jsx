import React, { useState, useEffect } from 'react';
import { Trash2, Download, Upload, Plus } from 'lucide-react';

const JapaneseFlashcardManager = () => {
  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      english: "this pizza is delicious",
      japanese: "このピザは美味しい",
      romanized: "Kono piza wa oishī",
      category: "food",
      difficulty: "easy"
    }
  ]);
  
  const [newCard, setNewCard] = useState({
    english: "",
    japanese: "",
    romanized: "",
    category: "",
    difficulty: ""
  });

  const difficulties = ["easy", "medium", "hard"];
  const categories = ["food", "greetings", "family", "work", "travel", "daily life", "emotions", "time", "numbers", "colors"];

  const handleNewCardChange = (field, value) => {
    setNewCard(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFlashcard = () => {
    if (newCard.english && newCard.japanese) {
      const newFlashcard = {
        ...newCard,
        id: Date.now()
      };
      
      setFlashcards(prev => [...prev, newFlashcard]);
      setNewCard({
        english: "",
        japanese: "",
        romanized: "",
        category: "",
        difficulty: ""
      });
      
      downloadUpdatedJson([...flashcards, newFlashcard]);
    }
  };

  const deleteFlashcard = (id) => {
    const updatedCards = flashcards.filter(card => card.id !== id);
    setFlashcards(updatedCards);
    downloadUpdatedJson(updatedCards);
  };

  const updateFlashcard = (id, field, value) => {
    const updatedCards = flashcards.map(card =>
      card.id === id ? { ...card, [field]: value } : card
    );
    setFlashcards(updatedCards);
    downloadUpdatedJson(updatedCards);
  };

  const downloadUpdatedJson = (data) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'japanese-flashcards.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const uploadedData = JSON.parse(e.target.result);
          if (Array.isArray(uploadedData)) {
            setFlashcards(uploadedData);
          }
        } catch (error) {
          alert('Error parsing JSON file. Please check the format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const exportJson = () => {
    downloadUpdatedJson(flashcards);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              🇯🇵 Japanese Language Learning Platform
            </h1>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                <Upload size={18} />
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={exportJson}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Download size={18} />
                Export JSON
              </button>
            </div>
          </div>

          {/* Add New Card Form */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6 border-2 border-green-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Plus size={20} className="text-green-600" />
              Add New Flashcard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <input
                type="text"
                placeholder="English phrase"
                value={newCard.english}
                onChange={(e) => handleNewCardChange('english', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Japanese (ひらがな/カタカナ/漢字)"
                value={newCard.japanese}
                onChange={(e) => handleNewCardChange('japanese', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                style={{ fontFamily: 'Arial, "Hiragino Sans", "Yu Gothic", sans-serif' }}
              />
              <input
                type="text"
                placeholder="Romanized (romaji)"
                value={newCard.romanized}
                onChange={(e) => handleNewCardChange('romanized', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <select
                value={newCard.category}
                onChange={(e) => handleNewCardChange('category', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={newCard.difficulty}
                onChange={(e) => handleNewCardChange('difficulty', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Difficulty</option>
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
            <button
              onClick={addFlashcard}
              disabled={!newCard.english || !newCard.japanese}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Flashcard
            </button>
          </div>

          {/* Flashcards Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">English</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Japanese</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Romanized</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Difficulty</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flashcards.map((card, index) => (
                    <tr key={card.id} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={card.english}
                          onChange={(e) => updateFlashcard(card.id, 'english', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={card.japanese}
                          onChange={(e) => updateFlashcard(card.id, 'japanese', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          style={{ fontFamily: 'Arial, "Hiragino Sans", "Yu Gothic", sans-serif' }}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={card.romanized}
                          onChange={(e) => updateFlashcard(card.id, 'romanized', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={card.category}
                          onChange={(e) => updateFlashcard(card.id, 'category', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={card.difficulty}
                          onChange={(e) => updateFlashcard(card.id, 'difficulty', e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          {difficulties.map(diff => (
                            <option key={diff} value={diff}>
                              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                diff === 'easy' ? 'bg-green-400' : 
                                diff === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                              }`}></span>
                              {diff}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => deleteFlashcard(card.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition-colors"
                          title="Delete flashcard"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {flashcards.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">No flashcards yet!</p>
              <p>Add your first Japanese phrase above to get started.</p>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-600 bg-blue-50 rounded-lg p-4">
            <p><strong>💡 Tips:</strong></p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>All changes are automatically saved and downloaded as JSON</li>
              <li>Use the Import button to load existing flashcard collections</li>
              <li>Japanese text supports hiragana (ひらがな), katakana (カタカナ), and kanji (漢字)</li>
              <li>Romanized text helps with pronunciation practice</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JapaneseFlashcardManager;