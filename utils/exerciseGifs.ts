// utils/exerciseGifs.ts
// Maps exercise names to the yuhonas/free-exercise-db repo folder names
// Each folder contains 0.jpg (start position) and 1.jpg (end position)

const BASE_URL = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

// Map our exercise names to the exact folder name in the repo
const gifMap: Record<string, string> = {
    // Chest - Upper
    "Incline Dumbbell Press": "Alternate_Incline_Dumbbell_Curl",
    "Incline Barbell Bench Press": "Barbell_Incline_Bench_Press_-_Medium_Grip",
    "Dumbbell Incline Fly": "Bent-Arm_Dumbbell_Pullover",
    "Low-to-High Cable Fly": "Cable_Crossover",
    "Decline Pushups": "Pushups_-_Close_Triceps_Position",
    "Archer Pushups (Incline focus)": "Pushups",

    // Chest - Middle
    "Flat Barbell Bench Press": "Barbell_Bench_Press_-_Medium_Grip",
    "Flat Dumbbell Press": "Bent-Arm_Dumbbell_Pullover",
    "Dumbbell Flat Fly": "Bent-Arm_Dumbbell_Pullover",
    "Floor Press (Dumbbell)": "Alternating_Floor_Press",
    "Middle Cable Fly": "Cable_Crossover",
    "Cable Crossover (Middle)": "Cable_Crossover",
    "Standing Cable Chest Press": "Cable_Chest_Press",
    "Standard Push-ups": "Pushups",
    "Diamond Push-ups": "Pushups_-_Close_Triceps_Position",
    "Wide Grip Push-ups": "Pushups",
    "Pec Deck Machine": "Butterfly",
    "Chest Press Machine": "Cable_Chest_Press",

    // Chest - Lower
    "Weighted Dips (Chest Focus)": "Bench_Dips",
    "Decline Barbell Bench Press": "Bench_Press_-_Powerlifting",
    "Dumbbell Pullover": "Bent-Arm_Dumbbell_Pullover",
    "High-to-Low Cable Fly": "Cable_Crossover",
    "Parallel Bar Dips": "Bench_Dips",
    "Incline Push-ups": "Pushups",
    "Bench Dips": "Bench_Dips",

    // Back - Lats
    "Barbell Rows (Underhand)": "Bent_Over_Barbell_Row",
    "Bent Over BB Row": "Bent_Over_Barbell_Row",
    "One-Arm Dumbbell Row": "Bent_Over_Two-Dumbbell_Row",
    "DB Pullover (Lat Focus)": "Bent-Arm_Dumbbell_Pullover",
    "Front Lat Pulldown": "Cable_Incline_Pushdown",
    "Wide Grip Lat Pulldown": "Cable_Incline_Pushdown",
    "V-Bar Lat Pulldown": "Cable_Incline_Pushdown",
    "Straight Arm Pulldown": "Cable_Incline_Pushdown",
    "Pull-ups": "Band_Assisted_Pull-Up",
    "Wide Grip Pull-ups": "Band_Assisted_Pull-Up",
    "Chin-ups": "Band_Assisted_Pull-Up",
    "Neutral Grip Pull-ups": "Band_Assisted_Pull-Up",

    // Back - Upper
    "Barbell Shrugs": "Barbell_Shrug",
    "Dumbbell Shrugs": "Barbell_Shrug",
    "Barbell Upright Row": "Barbell_Rear_Delt_Row",
    "Behind the Back Shrugs": "Barbell_Shrug_Behind_The_Back",
    "Face Pulls": "Cable_Rope_Rear-Delt_Rows",
    "Rope Face Pull": "Cable_Rope_Rear-Delt_Rows",
    "Cable Shrugs": "Cable_Shrugs",
    "Inverted Rows (Wide)": "Bodyweight_Mid_Row",
    "Inverted Rows": "Bodyweight_Mid_Row",

    // Back - Mid
    "T-Bar Rows": "Bent_Over_One-Arm_Long_Bar_Row",
    "Pendlay Rows": "Bent_Over_Barbell_Row",
    "Seated Cable Rows": "Cable_Seated_Crunch",
    "Superman": "Butt-Ups",
    "Bodyweight Row (Rings)": "Bodyweight_Mid_Row",

    // Back - Lower
    "Deadlifts": "Barbell_Deadlift",
    "Rack Pulls": "Barbell_Deadlift",
    "Stiff Leg Deadlift": "Barbell_Deadlift",
    "Good Mornings": "Band_Good_Morning",
    "Snatch Grip DL": "Barbell_Deadlift",
    "Cable Deadlift": "Cable_Deadlifts",
    "Cable Pull-through": "Band_Good_Morning_Pull_Through",
    "Hyper-extensions": "Butt-Ups",
    "Bird-Dog": "Cat_Stretch",
    "Bridges": "Butt_Lift_Bridge",

    // Shoulders - Front
    "Barbell Overhead Press": "Barbell_Shoulder_Press",
    "Dumbbell Shoulder Press": "Arnold_Dumbbell_Press",
    "Arnold Press": "Arnold_Dumbbell_Press",
    "Dumbbell Front Raise": "Alternating_Deltoid_Raise",
    "Cable Front Raise": "Cable_Seated_Lateral_Raise",
    "Pike Push-ups": "Pushups",
    "Shoulder Press Machine": "Cable_Shoulder_Press",

    // Shoulders - Side
    "Dumbbell Lateral Raise": "Alternating_Deltoid_Raise",
    "Cable Lateral Raise": "Cable_Seated_Lateral_Raise",
    "Cable Upright Row": "Barbell_Rear_Delt_Row",

    // Shoulders - Rear
    "Reverse Dumbbell Fly": "Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench",
    "Chest Supported Rear Fly": "Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench",
    "Cable Face Pull": "Cable_Rope_Rear-Delt_Rows",
    "Reverse Cable Crossover": "Cable_Rear_Delt_Fly",
    "Rear Delt Pec Deck": "Cable_Rear_Delt_Fly",

    // Legs - Quads
    "Back Squat": "Barbell_Squat",
    "Front Squat": "Barbell_Full_Squat",
    "Bulgarian Split Squat": "Barbell_Lunge",
    "Goblet Squat": "Bodyweight_Squat",
    "Walking Lunges (DB)": "Bodyweight_Walking_Lunge",
    "Pistol Squats": "Bodyweight_Squat",
    "Bodyweight Squats": "Bodyweight_Squat",

    // Legs - Hamstrings
    "Romanian Deadlift": "Barbell_Deadlift",
    "Sumo Deadlift": "Barbell_Deadlift",
    "DB RDL": "Barbell_Deadlift",
    "Cable Pull Through": "Band_Good_Morning_Pull_Through",
    "Single Leg Glute Bridge": "Butt_Lift_Bridge",

    // Legs - Glutes
    "Barbell Hip Thrust": "Barbell_Hip_Thrust",
    "Barbell Glute Bridge": "Barbell_Glute_Bridge",
    "Sumo Squat (DB)": "Barbell_Squat",
    "Weighted Step Ups": "Barbell_Step_Ups",
    "Weighted Lunges": "Barbell_Lunge",
    "Glute Bridges": "Butt_Lift_Bridge",

    // Legs - Calves
    "Standing Calf Raise": "Calf_Press",
    "Seated Calf Raise": "Barbell_Seated_Calf_Raise",
    "Dumbbell Calf Raise": "Calf_Raise_On_A_Dumbbell",
    "Barbell Calf Raise": "Calf_Press",
    "One Leg DB Calf Raise": "Calf_Raise_On_A_Dumbbell",
    "Bodyweight Calf Raise": "Calf_Raises_-_With_Bands",

    // Arms - Biceps
    "Barbell Curls": "Barbell_Curl",
    "Dumbbell Curls": "Alternate_Hammer_Curl",
    "Hammer Curls": "Alternate_Hammer_Curl",
    "Standing Cable Curl": "Cable_Hammer_Curls_-_Rope_Attachment",
    "Preacher Curl Machine": "Cable_Preacher_Curl",

    // Arms - Triceps
    "Close Grip Bench Press": "Bench_Press_-_With_Bands",
    "Skull Crushers": "Band_Skull_Crusher",
    "Tricep Pushdown": "Cable_One_Arm_Tricep_Extension",
    "Rope Pushdown": "Cable_Rope_Overhead_Triceps_Extension",
    "Dips": "Bench_Dips",

    // Arms - Forearms
    "Barbell Wrist Curls": "Cable_Wrist_Curl",

    // Core - Abs
    "Weighted Crunches": "Cable_Crunch",
    "Cable Crunches": "Cable_Crunch",
    "Hanging Leg Raises": "Bent-Knee_Hip_Raise",
    "Plank": "Butt-Ups",
    "Ab Wheel Rollouts": "Barbell_Ab_Rollout_-_On_Knees",
    "Ab Crunch Machine": "Ab_Crunch_Machine",

    // Cardio
    "Burpees": "Bench_Jump",
    "Mountain Climbers": "Bench_Sprint",
    "Jumping Jacks": "Bench_Jump",
    "Stationary Bike": "Bicycling_Stationary",
};

export const getExerciseImages = (exerciseName: string): { start: string; end: string } | null => {
    const folder = gifMap[exerciseName];
    if (!folder) return null;
    return {
        start: `${BASE_URL}/${folder}/0.jpg`,
        end: `${BASE_URL}/${folder}/1.jpg`,
    };
};

// Keep this for backward compat — returns the start image
export const getExerciseGif = (exerciseName: string): string | null => {
    const images = getExerciseImages(exerciseName);
    return images ? images.start : null;
};
