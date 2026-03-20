import clsx from 'clsx';

const tones = {
  brand: 'bg-brand-50 text-brand-700',
  accent: 'bg-accent-50 text-accent-700',
};

export default function MetricCard({ title, value, detail, icon: Icon, tone = 'brand' }) {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slatewarm-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slatewarm-900">{value}</p>
          <p className="mt-2 text-sm text-slatewarm-600">{detail}</p>
        </div>
        <div className={clsx('rounded-2xl p-3', tones[tone])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
