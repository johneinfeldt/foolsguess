"use client";

import { useState, useEffect, useCallback } from "react";
import { Question } from "@/lib/types";
import { usePartyState, Player, ROUNDS_PER_GAME } from "./usePartyState";
import { useLang, t } from "@/lib/i18n";
import { loadQuestions } from "@/lib/questionsLoader";
import PartyModeSelect from "./PartyModeSelect";
import PlayerSetup from "./PlayerSetup";
import TurnIntro from "./TurnIntro";
import PartyBoard from "./PartyBoard";
import RoundResults from "./RoundResults";
import FinalResults from "./FinalResults";
import OnlineGame from "./OnlineGame";

interface PartyGameProps {
  allQuestionsEn: Question[];
}

export function pickRandomQuestions(questions: Question[], count: number): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function PartyGame({ allQuestionsEn }: PartyGameProps) {
  const lang = useLang();
  const [mode, setMode] = useState<"select" | "same_device" | "online">("select");
  const [allQuestions, setAllQuestions] = useState<Question[]>(allQuestionsEn);
  const { state, dispatch, currentQuestion } = usePartyState();

  useEffect(() => {
    loadQuestions(lang, allQuestionsEn).then(setAllQuestions);
  }, [lang, allQuestionsEn]);

  const handleStart = useCallback((players: Player[]) => {
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
    window.location.reload();
  }, []);

  const currentPlayer = state.players[state.currentPlayerIndex];

  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      {/* Nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md">
        <a href="/" className="text-xl font-bold tracking-tight">
          <span className="text-accent">Fools</span>Guess
        </a>
        {mode !== "select" && (
          <span className="text-sm font-medium text-text-muted">
            {t("party.title", lang)}
          </span>
        )}
      </nav>

      <main className="mx-auto max-w-lg">
        {/* Mode selection */}
        {mode === "select" && (
          <PartyModeSelect
            onSelectSameDevice={() => setMode("same_device")}
            onSelectOnline={() => setMode("online")}
          />
        )}

        {/* Online mode */}
        {mode === "online" && (
          <OnlineGame allQuestions={allQuestions} />
        )}

        {/* Same device mode */}
        {mode === "same_device" && (
          <>
            {state.phase === "setup" && (
              <PlayerSetup onStart={handleStart} />
            )}

            {state.phase === "turn_intro" && currentPlayer && (
              <TurnIntro
                playerName={currentPlayer.name}
                avatar={currentPlayer.avatar}
                playerIndex={state.currentPlayerIndex}
                roundNumber={state.currentRound + 1}
                totalRounds={ROUNDS_PER_GAME}
                onReady={handleReady}
              />
            )}

            {state.phase === "playing" && currentQuestion && currentPlayer && (
              <PartyBoard
                key={`${state.currentRound}-${state.currentPlayerIndex}`}
                question={currentQuestion}
                state={state}
                dispatch={dispatch}
                playerName={currentPlayer.name}
                avatar={currentPlayer.avatar}
                playerIndex={state.currentPlayerIndex}
              />
            )}

            {state.phase === "round_results" && currentQuestion && (
              <RoundResults
                players={state.players}
                roundScores={state.scores[state.currentRound] || []}
                roundNumber={state.currentRound + 1}
                questionText={currentQuestion.question}
                answers={currentQuestion.answers}
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
          </>
        )}
      </main>
    </div>
  );
}
