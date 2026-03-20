import { Heart, Sparkles } from 'lucide-react';

export default function HeroCard() {
  return (
    <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 p-6 text-white shadow-sm md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            <Heart className="h-4 w-4" />
            WeightCare daily companion
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Feel stronger, lighter, and more in control of your health.</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Track your progress, build sustainable habits, and make everyday choices that support a healthy weight without extreme dieting.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:max-w-sm sm:grid-cols-2">
          {[
            ['Daily check-ins', '2 min'],
            ['Healthy habits', '4 goals'],
            ['Meal guidance', 'Smart picks'],
            ['Energy focus', 'All day'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              <p className="text-sm text-white/80">{label}</p>
              <p className="mt-2 text-lg font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slatewarm-900/20 px-4 py-2 text-sm font-medium text-white/90">
        <Sparkles className="h-4 w-4" />
        Gentle, realistic guidance for long-term results
      </div>
    </div>
  );
}
