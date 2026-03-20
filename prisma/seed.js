import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.macroTarget.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      currentWeight: 176,
      goalWeight: 165,
      weeklyChange: -1.4,
      calorieGoal: 2100,
      caloriesConsumed: 1540,
      steps: 8420,
      activeMinutes: 46,
      waterLiters: 1.9,
      waterGoal: 2.7,
      coachTip: 'Build your plate around lean protein, colorful vegetables, and slow-digesting carbs. A 10-minute walk after dinner can help digestion and consistency.',
      habits: {
        create: [
          { name: 'Protein at breakfast', note: 'Greek yogurt, eggs, or a protein smoothie', done: true },
          { name: 'Walk after lunch', note: 'Aim for 10 to 15 minutes', done: true },
          { name: 'Evening screen cutoff', note: 'Power down 30 minutes before bed', done: false },
          { name: 'Prep tomorrow’s snacks', note: 'Fruit, nuts, or cottage cheese', done: false },
        ],
      },
      meals: {
        create: [
          {
            name: 'Berry protein oats',
            time: 'Breakfast',
            description: 'Rolled oats with chia seeds, vanilla protein, blueberries, and almond butter for a filling start.',
            calories: 420,
            highlights: 'High fiber|28g protein|Steady energy',
          },
          {
            name: 'Salmon power bowl',
            time: 'Lunch',
            description: 'Roasted salmon, quinoa, cucumber, edamame, and greens with a lemon-herb dressing.',
            calories: 560,
            highlights: 'Omega-3 fats|Balanced carbs|Very satisfying',
          },
          {
            name: 'Chicken veggie skillet',
            time: 'Dinner',
            description: 'Chicken breast with zucchini, peppers, brown rice, and avocado for a simple nutrient-dense dinner.',
            calories: 610,
            highlights: '35g protein|Colorful vegetables|Easy prep',
          },
        ],
      },
      macroTargets: {
        create: [
          { name: 'Protein', value: 112, target: 140 },
          { name: 'Carbs', value: 148, target: 190 },
          { name: 'Fats', value: 52, target: 70 },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
