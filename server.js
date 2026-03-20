import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/dashboard', async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst({
      include: {
        habits: true,
        meals: true,
        macroTargets: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ error: 'No profile found' });
    }

    const today = {
      caloriesConsumed: profile.caloriesConsumed,
      calorieGoal: profile.calorieGoal,
      steps: profile.steps,
      activeMinutes: profile.activeMinutes,
      waterLiters: profile.waterLiters,
      waterGoal: profile.waterGoal,
      macros: profile.macroTargets.map((macro) => ({
        name: macro.name,
        value: macro.value,
        target: macro.target,
      })),
    };

    res.json({
      profile: {
        currentWeight: profile.currentWeight,
        goalWeight: profile.goalWeight,
        weeklyChange: profile.weeklyChange,
      },
      today,
      coachTip: profile.coachTip,
      meals: profile.meals.map((meal) => ({
        name: meal.name,
        time: meal.time,
        description: meal.description,
        calories: meal.calories,
        highlights: meal.highlights.split('|'),
      })),
      habits: profile.habits.map((habit) => ({
        name: habit.name,
        note: habit.note,
        done: habit.done,
      })),
    });
  } catch (error) {
    console.error('Dashboard error:', error.message);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server listening on port 3001');
});
