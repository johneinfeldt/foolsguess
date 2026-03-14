"use client";

import { useState, useEffect, useCallback } from "react";
import { Question } from "@/lib/types";
import { usePartyState, ROUNDS_PER_GAME } from "./usePartyState";
import { useLang, t } from "@/lib/i18n";
import { loadQuestions } from "@/lib/questionsLoader";
import PlayerSetup from "./PlayerSetup";
import TurnIntro from "./TurnIntro";
import PartyBoard from "./PartyBoard";
import RoundResults from "./RoundResults";
import FinalResults from "./FinalResults";

interface PartyGameProps {
  allQuestionsEn: Question[];
}

function pickRandomQuestions(questions: Question[], count: number): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function PartyGame({ allQuestionsEn }: PartyGameProps) {
  const lang = useLang();
  const [allQuestions, setAllQuestions] = useState<Question[]>(allQuestionsEn);
  const { state, dispatch, currentQuestion } = usePartyState();

  useEffect(() => {
    loadQuestions(lang, allQuestionsEn).then(setAllQuestions);
  }, [lang, allQuestionsEn]);

  const handleStart = useCallback((players: string[]) => {
    const questions = pickRandomQuestions(allQuestions, ROUNDS_PER_GAME);
    dispatch({ type: "START_GAME", players, questions });
  }, [allQuestions, dispatch]);

  const handleReady = useCallback(() => {
    dispatch({ type: "BEGIN_TURN" });
  }, [dispatch]);

  const handleNextRound = useCallback(() => {
    dispatch({ type: "NEXT_ROUND" });
  }, [dispatch]);

  const handlePlayAgain = useCallback(() => {
    // Reload the page to reset everything
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
        {state.phase !== "setup" && state.phase !== "final_results" && (
          <span className="text-sm font-medium text-text-muted">
            {t("party.title", lang)}
          </span>
        )}
      </nav>

      <main className="mx-auto max-w-lg">
        {state.phase === "setup" && (
          <PlayerSetup onStart={handleStart} />
        )}

        {state.phase === "turn_intro" && (
          <TurnIntro
            playerName={state.players[state.currentPlayerIndex]}
            playerIndex={state.currentPlayerIndex}
            roundNumber={state.currentRound + 1}
            totalRounds={ROUNDS_PER_GAME}
            onReady={handleReady}
          />
        )}

        {state.phase === "playing" && currentQuestion && (
          <PartyBoard
            key={`${state.currentRound}-${state.currentPlayerIndex}`}
            question={currentQuestion}
            state={state}
            dispatch={dispatch}
            playerName={state.players[state.currentPlayerIndex]}
            playerIndex={state.currentPlayerIndex}
          />
        )}

        {state.phase === "round_results" && currentQuestion && (
          <RoundResults
            players={state.players}
            roundScores={state.scores[state.currentRound] || []}
            roundNumber={state.currentRound + 1}
            questionText={currentQuestion.question}
            onNext={handleNextRound}
            isLastRound={state.currentRound >= ROUNDS_PER_GAME - 1}
          />
        )}

        {state.phase === "final_results" && (
          <FinalResults
            players={state.players}
            scores={state.scores}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </main>
    </div>
  );
}
