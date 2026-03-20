import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Activity, Apple, Flame, HeartPulse, LoaderCircle, RefreshCcw, Scale, Target, TrendingUp } from 'lucide-react';
import HeroCard from './components/HeroCard';
import MetricCard from './components/MetricCard';
import MealCard from './components/MealCard';
import HabitChecklist from './components/HabitChecklist';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/dashboard');
      setData(response.data);
    } catch (err) {
      setError('We could not load your wellness dashboard right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const progress = useMemo(() => {
    if (!data) return 0;
    return Math.min(100, Math.round((data.today.caloriesConsumed / data.today.calorieGoal) * 100));
  }, [data]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-50 via-slatewarm-50 to-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-5 md:gap-8 md:px-6 md:py-8">
        <motion.section {...fadeUp} transition={{ duration: 0.4 }}>
          <HeroCard />
        </motion.section>

        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-[28px] bg-white/80 p-6 shadow-sm">
            <div className="flex flex-col items-center gap-3 text-center text-slatewarm-600">
              <LoaderCircle className="h-10 w-10 animate-spin text-brand-500" />
              <p className="text-base font-medium">Building your daily weight-care snapshot…</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 text-center">
              <HeartPulse className="mx-auto h-10 w-10 text-accent-500" />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slatewarm-900">Dashboard unavailable</h2>
                <p className="mt-2 text-base leading-relaxed text-slatewarm-600">{error}</p>
              </div>
              <button
                type="button"
                onClick={loadDashboard}
                className="mx-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <RefreshCcw className="h-5 w-5" />
                Retry
              </button>
            </div>
          </div>
        ) : (
          data && (
            <>
              <motion.section
                className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
                initial="initial"
                animate="animate"
              >
                {[
                  { title: 'Current weight', value: `${data.profile.currentWeight} lb`, detail: `${data.profile.goalWeight} lb goal`, icon: Scale, tone: 'brand' },
                  { title: 'Weekly trend', value: `${data.profile.weeklyChange > 0 ? '+' : ''}${data.profile.weeklyChange} lb`, detail: 'Compared with last week', icon: TrendingUp, tone: 'accent' },
                  { title: 'Calories today', value: `${data.today.caloriesConsumed}`, detail: `${data.today.calorieGoal} kcal target`, icon: Flame, tone: 'brand' },
                  { title: 'Movement', value: `${data.today.steps.toLocaleString()} steps`, detail: `${data.today.activeMinutes} active min`, icon: Activity, tone: 'accent' },
                ].map((item, index) => (
                  <motion.div key={item.title} variants={fadeUp} transition={{ delay: index * 0.08, duration: 0.35 }}>
                    <MetricCard {...item} />
                  </motion.div>
                ))}
              </motion.section>

              <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.4 }} className="rounded-[28px] bg-white p-5 shadow-sm md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Today&apos;s balance</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slatewarm-900">Stay in your healthy range</h2>
                      <p className="mt-2 text-base leading-relaxed text-slatewarm-600">
                        You&apos;re {data.today.calorieGoal - data.today.caloriesConsumed} kcal away from your target. Keep meals protein-rich and finish with a light walk.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-brand-50 p-3 text-brand-600">
                      <Target className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-sm font-medium text-slatewarm-600">
                      <span>Calorie progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-brand-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {data.today.macros.map((macro) => (
                      <div key={macro.name} className="rounded-2xl bg-slatewarm-50 p-4">
                        <p className="text-sm font-medium text-slatewarm-500">{macro.name}</p>
                        <p className="mt-2 text-2xl font-semibold text-slatewarm-900">{macro.value}g</p>
                        <p className="mt-1 text-sm text-slatewarm-600">Target {macro.target}g</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...fadeUp} transition={{ delay: 0.18, duration: 0.4 }} className="rounded-[28px] bg-slatewarm-900 p-5 text-white shadow-sm md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/10 p-3">
                      <Apple className="h-6 w-6 text-accent-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">Coach note</p>
                      <h2 className="text-2xl font-semibold tracking-tight">Small wins add up</h2>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-slatewarm-100">
                    {data.coachTip}
                  </p>
                  <div className="mt-6 rounded-2xl bg-white/10 p-4">
                    <p className="text-sm text-slatewarm-100">Hydration</p>
                    <p className="mt-2 text-3xl font-semibold">{data.today.waterLiters}L</p>
                    <p className="mt-1 text-sm text-slatewarm-200">Aim for {data.today.waterGoal}L today</p>
                  </div>
                </motion.div>
              </section>

              <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr]">
                <motion.div {...fadeUp} transition={{ delay: 0.24, duration: 0.4 }} className="rounded-[28px] bg-white p-5 shadow-sm md:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Meal ideas</p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slatewarm-900">Balanced choices for today</h2>
                    </div>
                    <div className="rounded-2xl bg-accent-50 p-3 text-accent-600">
                      <Apple className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4">
                    {data.meals.map((meal, index) => (
                      <motion.div key={meal.name} {...fadeUp} transition={{ delay: 0.3 + index * 0.08, duration: 0.35 }}>
                        <MealCard meal={meal} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div {...fadeUp} transition={{ delay: 0.28, duration: 0.4 }} className="space-y-6">
                  <HabitChecklist habits={data.habits} />
                  <div className="rounded-[28px] bg-gradient-to-br from-accent-400 to-accent-600 p-6 text-white shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Mindset</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">Progress over perfection</h2>
                    <p className="mt-3 text-base leading-relaxed text-white/90">
                      Healthy weight care is about repeatable routines: nourishing meals, movement you enjoy, and enough rest to recover.
                    </p>
                  </div>
                </motion.div>
              </section>
            </>
          )
        )}
      </div>
    </main>
  );
}
