import { supabase } from './supabase';
import { getStockfish } from './stockfish';
import type { ThemeId } from './database.types';

interface AnalysisResult {
  criticalMoveNumber: number;
  criticalFen: string;
  playedMove: string;
  bestMove: string;
  evalBefore: number;
  evalAfter: number;
  explanation: string;
  theme: ThemeId;
}

/**
 * Full post-game analysis pipeline:
 * 1. Stockfish finds the critical mistake
 * 2. Gemini generates kid-friendly explanation
 * 3. System selects matching drill puzzles
 * 4. Results are persisted to Supabase
 */
export async function analyzeGameAndCreateDrills(
  gameId: string,
  studentId: string,
  moves: string[]
): Promise<AnalysisResult | null> {
  try {
    // Step 1: Stockfish analysis — find the biggest mistake
    const stockfish = getStockfish();
    await stockfish.init();
    const analysis = await stockfish.analyzeGame(moves, 12);

    // Step 2: Generate kid-friendly explanation
    const explanation = await generateExplanation(
      analysis.criticalFen,
      analysis.playedMove,
      analysis.bestMove,
      analysis.theme
    );

    // Step 3: Save analysis to database
    const { data: savedAnalysis, error: analysisError } = await supabase
      .from('game_analyses')
      .insert({
        game_id: gameId,
        critical_move_number: analysis.criticalMoveNumber,
        critical_fen: analysis.criticalFen,
        played_move: analysis.playedMove,
        best_move: analysis.bestMove,
        eval_before: analysis.evalBefore,
        eval_after: analysis.evalAfter,
        explanation,
        theme: analysis.theme as ThemeId,
        student_id: studentId,
      })
      .select()
      .single();

    if (analysisError || !savedAnalysis) {
      console.error('Failed to save analysis:', analysisError);
      return null;
    }

    // Step 4: Select drill puzzles matching the mistake theme
    const { data: puzzles } = await supabase
      .from('puzzles')
      .select('id')
      .eq('theme', analysis.theme)
      .limit(3);

    if (puzzles && puzzles.length > 0) {
      await supabase.from('drill_sets').insert({
        game_analysis_id: savedAnalysis.id,
        student_id: studentId,
        theme: analysis.theme,
        puzzle_ids: puzzles.map(p => p.id),
      });
    }

    return {
      ...analysis,
      explanation,
      theme: analysis.theme as ThemeId,
    };
  } catch (err) {
    console.error('Analysis pipeline failed:', err);
    return null;
  }
}

/**
 * Generate a kid-friendly explanation using Gemini API
 * Falls back to template-based explanation if API is unavailable
 */
async function generateExplanation(
  fen: string,
  playedMove: string,
  bestMove: string,
  theme: string
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `You are a friendly chess coach for kids aged 8-12. 
A student just played a chess game and made a mistake.

Position (FEN): ${fen}
Move played: ${playedMove}
Best move was: ${bestMove}
Mistake type: ${theme}

Write a SHORT (2-3 sentences), encouraging explanation for the student about:
1. What happened in simple words
2. Why the better move was better
3. A quick tip to remember

Use simple language. Be kind and encouraging. No chess notation — describe moves by piece name and direction.
Example tone: "Your knight was left all alone and could be captured! Moving it to the center would have kept it safe and also threatened their bishop."`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      return response.text || getFallbackExplanation(theme);
    } catch (err) {
      console.warn('Gemini API call failed, using fallback:', err);
    }
  }

  return getFallbackExplanation(theme);
}

/**
 * Template-based fallback explanations when Gemini is unavailable
 */
function getFallbackExplanation(theme: string): string {
  const explanations: Record<string, string> = {
    hanging:
      "One of your pieces was left without protection, and your opponent could have captured it for free! Before you move a piece, always check: is it safe where it's going?",
    captures:
      "There was a free piece you could have captured! Always scan the board for pieces your opponent left unprotected — free pieces are like free points!",
    checkmates:
      "There was a way to checkmate in this position! When your opponent's king is boxed in, look for ways your queen or rook can deliver the final blow.",
    forks:
      "You could have attacked two pieces at once with a fork! Knights are especially sneaky at this — they can jump to a square that threatens two pieces at the same time.",
    pins:
      "One of the pieces was stuck in a pin — it couldn't move because a more important piece was behind it. Look for chances to pin your opponent's pieces to their king or queen!",
  };

  return explanations[theme] || explanations.hanging;
}
