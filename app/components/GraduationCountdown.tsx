"use client";

import { useEffect, useState } from "react";
import texts from "../texts.json";

const GRADUATION_DATE = new Date("2026-06-08T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = GRADUATION_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return null;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

function isGraduationDay() {
  const now = new Date();
  return (
    now.toDateString() === GRADUATION_DATE.toDateString()
  );
}

function isAfterGraduation() {
  const now = new Date();
  return now > GRADUATION_DATE;
}

export default function GraduationCountdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(() => getTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-amber-50">
        <p className="text-amber-800">{texts.loading}</p>
      </div>
    );
  }

  // يوم التخرج أو بعده - واجهة احتفالية
  if (timeLeft === null) {
    const isToday = isGraduationDay();
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-400 via-amber-300 to-yellow-200">
        {/* عناصر احتفالية متحركة */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <span className="text-4xl opacity-60">
                {["🎓", "🎉", "⭐", "✨", "🌟", "💫"][i % 6]}
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
          <div className="mb-8 animate-bounce-slow">
            <span className="text-8xl">🎓</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-amber-900 drop-shadow-sm md:text-5xl">
            {isToday ? texts.graduationDay.title : texts.afterGraduation.title}
          </h1>

          <p className="mb-8 max-w-md text-xl text-amber-800/90">
            {isToday
              ? texts.graduationDay.message
              : texts.afterGraduation.message}
          </p>

          <div className="rounded-3xl bg-white/70 px-8 py-6 shadow-xl backdrop-blur-sm">
            <p className="text-2xl font-semibold text-amber-900">
              {isToday ? texts.graduationDay.badge : texts.afterGraduation.badge}
            </p>
            <p className="mt-2 text-amber-800">
              {new Date("2026-06-08").toLocaleDateString("ar-SA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <p className="mt-12 text-lg text-amber-800/80">
            {isToday ? texts.graduationDay.blessing : texts.afterGraduation.blessing}
          </p>
        </div>
      </div>
    );
  }

  // العد التنازلي - قبل التخرج
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-sky-100">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-8">
        <h1 className="mb-2 text-center text-2xl font-bold text-teal-900 md:text-3xl">
          {texts.countdown.title}
        </h1>
        <p className="mb-10 text-teal-700">
          {texts.countdown.dateLabel}
        </p>

        <div className="grid w-full max-w-sm grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {[
            { value: timeLeft.seconds, label: texts.countdown.units.seconds, unit: "seconds" },
            { value: timeLeft.minutes, label: texts.countdown.units.minutes, unit: "minutes" },
            { value: timeLeft.hours, label: texts.countdown.units.hours, unit: "hours" },
            { value: timeLeft.days, label: texts.countdown.units.days, unit: "days" },
          ].map(({ value, label, unit }) => (
            <div
              key={unit}
              className="flex flex-col items-center rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-sm"
            >
              <span className="text-4xl font-bold tabular-nums text-teal-700 sm:text-5xl">
                {value}
              </span>
              <span className="mt-1 text-sm font-medium text-teal-600">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-teal-700">
          {texts.countdown.encouragement}
        </p>

        <div className="mt-8 text-6xl opacity-60">🎓</div>
      </div>
    </div>
  );
}
