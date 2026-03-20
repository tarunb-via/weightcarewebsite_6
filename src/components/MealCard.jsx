import { Flame, Salad } from 'lucide-react';

export default function MealCard({ meal }) {
  return (
    <div className="rounded-[24px] bg-slatewarm-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-brand-700">
            <Salad className="h-4 w-4" />
            {meal.time}
          </div>
          <h3 className="mt-3 text-xl font-semibold text-slatewarm-900">{meal.name}</h3>
          <p className="mt-2 text-base leading-relaxed text-slatewarm-600">{meal.description}</p>
        </div>
        <div className="rounded-2xl bg-accent-100 px-3 py-2 text-right text-accent-700">
          <div className="inline-flex items-center gap-1 text-sm font-medium">
            <Flame className="h-4 w-4" />
            {meal.calories} kcal
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {meal.highlights.map((highlight) => (
          <span key={highlight} className="rounded-full bg-white px-3 py-1 text-sm text-slatewarm-600">
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
}
