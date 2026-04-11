import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Clock, Crown, Sword, RefreshCw, Trophy, Flag } from "lucide-react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

interface GameRoom {
  id: string;
  name: string;
  players: number;
  status: 'waiting' | 'playing' | 'finished';
}

export function Multiplayer() {
  const [game, setGame] = useState<Chess | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<GameRoom | null>(null);
  const [gameStatus, setGameStatus] = useState<'lobby' | 'playing' | 'finished'>('lobby');
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [winner, setWinner] = useState<'white' | 'black' | null>(null);
  const [moveCount, setMoveCount] = useState(0);

  const rooms: GameRoom[] = [
    { id: '1', name: 'Quick Match', players: 2, status: 'waiting' },
    { id: '2', name: 'Practice Room', players: 1, status: 'waiting' },
    { id: '3', name: 'Club Tournament', players: 4, status: 'playing' },
  ];

  const startGame = (room: GameRoom) => {
    setSelectedRoom(room);
    setGame(new Chess());
    setGameStatus('playing');
    setTurn('white');
    setMoveCount(0);
    setWinner(null);
  };

  const makeMove = (move: { from: string; to: string; promotion?: string }) => {
    if (!game || gameStatus !== 'playing') return false;

    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move(move);
      if (result) {
        setGame(gameCopy);
        setTurn(prev => prev === 'white' ? 'black' : 'white');
        setMoveCount(prev => prev + 1);

        if (gameCopy.isCheckmate()) {
          setGameStatus('finished');
          setWinner(turn === 'white' ? 'black' : 'white');
        } else if (gameCopy.isDraw()) {
          setGameStatus('finished');
        }
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  };

  const onDrop = ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
    if (!targetSquare) return false;
    return makeMove({ from: sourceSquare, to: targetSquare, promotion: "q" });
  };

  const restartGame = () => {
    if (selectedRoom) {
      startGame(selectedRoom);
    }
  };

  const getGameOverMessage = () => {
    if (!game) return '';
    if (game.isCheckmate()) return `Checkmate! ${winner === 'white' ? 'White' : 'Black'} wins!`;
    if (game.isDraw()) return 'Draw!';
    if (game.isStalemate()) return 'Stalemate!';
    if (game.isThreefoldRepetition()) return 'Threefold repetition!';
    return '';
  };

  if (gameStatus === 'lobby') {
    return (
      <div className="px-4 py-6 md:p-8 max-w-5xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center md:hidden">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Play</p>
              <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Multiplayer</h1>
            </div>
          </div>
        </header>

        <div className="card p-5 mb-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-6 h-6" />
            <h2 className="font-bold text-lg">Find a Game</h2>
          </div>
          <p className="text-sm text-purple-100">Play against classmates in real-time</p>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-4">Available Rooms</h3>
        <div className="space-y-3">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => startGame(room)}
              className="card w-full p-4 flex items-center justify-between hover:border-blue-300 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Sword className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900">{room.name}</h3>
                  <p className="text-sm text-slate-500">{room.players} players</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${room.status === 'waiting' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                <span className="text-sm font-medium text-slate-600">{room.status === 'waiting' ? 'Join' : 'Spectate'}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Or Play Locally</h3>
          <button
            onClick={() => startGame({ id: 'local', name: 'Local Game', players: 2, status: 'playing' })}
            className="card w-full p-4 flex items-center justify-between hover:border-blue-300 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Sword className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-900">Play vs Friend</h3>
                <p className="text-sm text-slate-500">Hotseat on same device</p>
              </div>
            </div>
            <span className="text-sm font-medium text-blue-600">Start</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameStatus === 'finished') {
    return (
      <div className="px-4 py-6 md:p-8 max-w-5xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center gap-3">
            <Link to="/multiplayer" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Game Over</p>
              <h1 className="text-xl font-bold text-slate-900">{selectedRoom?.name}</h1>
            </div>
          </div>
        </header>

        <div className="card p-8 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{getGameOverMessage()}</h2>
          <p className="text-slate-600 mb-6">{moveCount} moves played</p>

          <div className="flex gap-3">
            <button
              onClick={restartGame}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-xl"
            >
              <RefreshCw className="w-5 h-5" />
              Play Again
            </button>
            <Link
              to="/multiplayer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl"
            >
              Back to Lobby
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-4 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-slate-900">{selectedRoom?.name}</h1>
            <p className="text-xs text-slate-500">{moveCount} moves • {turn === 'white' ? "White's" : "Black's"} turn</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${turn === 'white' ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-white'}`}>
              White
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${turn === 'black' ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700'}`}>
              Black
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 flex justify-center">
        <div className="w-full max-w-md aspect-square">
          <Chessboard
            options={{
              position: game?.fen() || 'start',
              onPieceDrop: onDrop,
              boardOrientation: turn === 'white' ? 'white' : 'black',
              darkSquareStyle: { backgroundColor: '#739552' },
              lightSquareStyle: { backgroundColor: '#ebecd0' },
              animationDurationInMs: 200,
            }}
          />
        </div>
      </div>

      <div className="px-4 pb-24">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-600">Game Info</span>
            <span className="text-xs text-slate-500">Move {moveCount + 1}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">White</p>
              <p className="font-semibold text-slate-900">Player 1</p>
            </div>
            <div>
              <p className="text-slate-500">Black</p>
              <p className="font-semibold text-slate-900">Player 2</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={restartGame}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl"
          >
            <RefreshCw className="w-5 h-5" />
            Restart
          </button>
          <Link
            to="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl"
          >
            <Flag className="w-5 h-5" />
            Resign
          </Link>
        </div>
      </div>
    </div>
  );
}
