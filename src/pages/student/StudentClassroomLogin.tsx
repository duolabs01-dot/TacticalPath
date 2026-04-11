import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClassroom, PICTURE_GRID } from '../../context/ClassroomContext';
import { Shield, Check } from 'lucide-react';

export function StudentClassroomLogin() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { classroom, login, selectedPictures, setSelectedPictures } = useClassroom();
  const [error, setError] = useState(false);

  const handlePictureClick = (emoji: string) => {
    if (selectedPictures.includes(emoji)) {
      setSelectedPictures(selectedPictures.filter(p => p !== emoji));
    } else if (selectedPictures.length < 3) {
      setSelectedPictures([...selectedPictures, emoji]);
    }
    setError(false);
  };

  const handleLogin = () => {
    if (selectedPictures.length === 3) {
      const success = login(selectedPictures);
      if (success) {
        navigate(`/c/${slug}/waiting`);
      } else {
        setError(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Classroom branding */}
      <div className="w-full max-w-sm text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-100 mb-4">
          <span className="text-3xl">♞</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 font-display">{classroom.schoolName}</h1>
        <p className="text-slate-500 mt-1">{classroom.name} · {classroom.coachName}</p>
      </div>

      {/* Picture password grid */}
      <div className="w-full max-w-sm">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-slate-700">Pick your 3 pictures</h2>
          <p className="text-sm text-slate-500">Tap the pictures in your secret order</p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {PICTURE_GRID.map((emoji) => {
            const selectedIndex = selectedPictures.indexOf(emoji);
            const isSelected = selectedIndex !== -1;
            return (
              <button
                key={emoji}
                onClick={() => handlePictureClick(emoji)}
                className={`relative aspect-square rounded-2xl text-3xl flex items-center justify-center transition-all duration-150 ${
                  isSelected
                    ? 'bg-sky-100 border-2 border-sky-500 scale-95 shadow-inner'
                    : 'bg-white border-2 border-slate-200 hover:border-slate-300 active:scale-95'
                }`}
              >
                {emoji}
                {isSelected && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{selectedIndex + 1}</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected sequence preview */}
        {selectedPictures.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm text-slate-500">Your order:</span>
            <div className="flex gap-1">
              {selectedPictures.map((pic, i) => (
                <span key={i} className="w-8 h-8 bg-sky-50 border border-sky-200 rounded-lg flex items-center justify-center text-lg">
                  {pic}
                </span>
              ))}
              {[...Array(3 - selectedPictures.length)].map((_, i) => (
                <span key={`empty-${i}`} className="w-8 h-8 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-rose-500 text-sm mb-3 font-medium">
            Those pictures didn't match. Try again!
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={selectedPictures.length !== 3}
          className={`w-full h-14 rounded-2xl text-lg font-bold transition-all duration-150 ${
            selectedPictures.length === 3
              ? 'bg-sky-500 text-white hover:bg-sky-600 active:scale-[0.98] shadow-lg shadow-sky-500/25'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {selectedPictures.length === 3 ? 'Join Class' : `Pick ${3 - selectedPictures.length} more`}
        </button>

        <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-slate-400">
          <Shield className="w-3 h-3" />
          <span>Safe classroom · Only your classmates can see you</span>
        </div>
      </div>
    </div>
  );
}