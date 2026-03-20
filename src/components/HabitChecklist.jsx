import { CheckCircle2, Circle } from 'lucide-react';

export default function HabitChecklist({ habits }) {
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm md:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Habit checklist</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slatewarm-900">Your daily anchors</h2>
      <div className="mt-5 space-y-3">
        {habits.map((habit) => (
          <div key={habit.name} className="flex items-center gap-3 rounded-2xl bg-slatewarm-50 p-4">
            {habit.done ? (
              <CheckCircle2 className="h-6 w-6 text-brand-500" />
            ) : (
              <Circle className="h-6 w-6 text-slatewarm-300" />
            )}
            <div>
              <p className="text-base font-medium text-slatewarm-900">{habit.name}</p>
              <p className="text-sm text-slatewarm-600">{habit.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
