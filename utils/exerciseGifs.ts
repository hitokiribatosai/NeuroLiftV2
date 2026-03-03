// utils/exerciseGifs.ts
export const getExerciseGif = (exerciseName: string): string | null => {
    const baseUrl = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

    // Mapping of exact app exercise names to the gif slug in the DB
    const gifMap: Record<string, string> = {
        // Chest - Upper
        "Incline Dumbbell Press": "dumbbell_incline_bench_press",
        "Incline Barbell Bench Press": "barbell_incline_bench_press",
        "Dumbbell Incline Fly": "dumbbell_incline_fly",
        "Incline Hammer Strength Press": "lever_incline_chest_press",
        "Reverse Grip BB Bench Press": "barbell_reverse_grip_incline_bench_press",
        "Low-to-High Cable Fly": "cable_low_fly",
        "Cable Incline Fly": "cable_incline_fly",
        "Incline Cable Press": "cable_incline_push",
        "Single Arm Low Cable Fly": "cable_one_arm_low_fly",
        "Cable Y-Raise (Upper Chest Focus)": "cable_middle_fly",
        "Decline Pushups": "decline_push-up",
        "Feet Elevated Pushups": "decline_push-up",
        "Archer Pushups (Incline focus)": "archer_push-up",
        "Incline Machine Press": "lever_incline_chest_press",
        "Smith Machine Incline Press": "smith_incline_bench_press",
        "Machine Incline Fly": "lever_incline_fly",

        // Chest - Middle
        "Flat Barbell Bench Press": "barbell_bench_press",
        "Flat Dumbbell Press": "dumbbell_bench_press",
        "Dumbbell Flat Fly": "dumbbell_fly",
        "Hammer Strength Chest Press": "lever_chest_press",
        "Floor Press (Dumbbell)": "dumbbell_floor_press",
        "Middle Cable Fly": "cable_middle_fly",
        "Cable Crossover (Middle)": "cable_cross-over",
        "Standing Cable Chest Press": "cable_standing_chest_press",
        "Single Arm Cable Press": "cable_one_arm_chest_press",
        "Flat Cable Bench Press": "cable_bench_press",
        "Standard Push-ups": "push-up",
        "Diamond Push-ups": "diamond_push-up",
        "Wide Grip Push-ups": "wide_push-up",
        "Pec Deck Machine": "lever_pec_deck_fly",
        "Chest Press Machine": "lever_chest_press",
        "Lever Chest Press": "lever_chest_press",

        // Chest - Lower
        "Weighted Dips (Chest Focus)": "dips",
        "Decline Barbell Bench Press": "barbell_decline_bench_press",
        "Decline Dumbbell Press": "dumbbell_decline_bench_press",
        "Decline Hammer Strength Press": "lever_decline_chest_press",
        "Dumbbell Pullover": "dumbbell_pullover",
        "High-to-Low Cable Fly": "cable_high_pulley_overhead_tricep_extension",
        "Decline Cable Fly": "cable_decline_fly",
        "Single Arm High Cable Fly": "cable_one_arm_middle_fly",
        "Standing Decline Cable Press": "cable_decline_fly",
        "Cable Pullover (Lower Chest)": "cable_straight_arm_pulldown",
        "Parallel Bar Dips": "dips",
        "Incline Push-ups": "incline_push-up",
        "Bench Dips": "bench_dips",
        "Machine Dip Station": "assisted_triceps_dip",
        "Decline Chest Press Machine": "lever_decline_chest_press",

        // Back - Lats
        "Barbell Rows (Underhand)": "barbell_reverse_grip_bent_over_row",
        "Bent Over BB Row": "barbell_bent_over_row",
        "One-Arm Dumbbell Row": "dumbbell_one_arm_row",
        "Meadows Rows": "barbell_meadows_row",
        "DB Pullover (Lat Focus)": "dumbbell_pullover",
        "Front Lat Pulldown": "cable_lat_pulldown",
        "Wide Grip Lat Pulldown": "cable_lat_pulldown",
        "V-Bar Lat Pulldown": "cable_v-bar_pulldown",
        "Single Arm Lat Pulldown": "cable_one_arm_lat_pulldown",
        "Underhand Cable Row": "cable_seated_high_row",
        "Straight Arm Pulldown": "cable_straight_arm_pulldown",
        "Pull-ups": "pull-up",
        "Wide Grip Pull-ups": "wide_pull-up",
        "Chin-ups": "chin-up",
        "Neutral Grip Pull-ups": "neutral_grip_pull-up",
        "Assisted Pull-up Machine": "assisted_pull-up",
        "Lat Pulldown Machine": "lever_lat_pulldown",

        // Back - Upper Back
        "Barbell Shrugs": "barbell_shrug",
        "Dumbbell Shrugs": "dumbbell_shrug",
        "Snatch Grip High Pull": "barbell_upright_row_v._2",
        "Barbell Upright Row": "barbell_upright_row",
        "Behind the Back Shrugs": "barbell_behind_the_back_shrug",
        "Face Pulls": "cable_upper_row",
        "Rope Face Pull": "cable_rear_delt_row_with_rope",
        "Cable Shrugs": "cable_shrug",
        "Single Arm Rear Delt Fly": "cable_one_arm_rear_delt_row",
        "Overhead Cable Face Pull": "cable_rear_pull_down",
        "Scapular Pull-ups": "scapular_pull-up",
        "Inverted Rows (Wide)": "inverted_row",
        "Rear Delt Pushups": "pike_push_up",
        "Rear Delt Machine": "lever_seated_reverse_fly",
        "Upper Back Row Machine": "lever_high_row",

        // Back - Mid
        "T-Bar Rows": "t-bar_row",
        "Pendlay Rows": "barbell_pendlay_row",
        "Seal Row": "barbell_seal_row",
        "Seated Cable Rows": "cable_seated_row",
        "Neutral Grip Cable Row": "cable_seated_row",
        "Single Arm Seated Row": "cable_one_arm_seated_row",
        "Standing Cable Row": "cable_standing_row_v._2",
        "Cable Face Away Row": "cable_straight_arm_pulldown",
        "Inverted Rows": "inverted_row",
        "Bodyweight Row (Rings)": "inverted_row",
        "Superman": "superman",
        "Seated Row Machine": "lever_seated_row",
        "Chest Supported Row Machine": "lever_t-bar_row",

        // Back - Lower
        "Deadlifts": "barbell_deadlift",
        "Rack Pulls": "barbell_rack_pull",
        "Stiff Leg Deadlift": "barbell_stiff_leg_deadlift",
        "Good Mornings": "barbell_good_morning",
        "Snatch Grip DL": "barbell_deadlift",
        "Cable Good Morning": "cable_good_morning",
        "Cable Deadlift": "cable_deadlift",
        "Cable Pull-through": "cable_pull_through",
        "Cable Back Extension": "cable_back_extension",
        "Single Leg Cable DL": "cable_one_arm_single_leg_deadlift",
        "Hyper-extensions": "hyperextension",
        "Bird-Dog": "bird_dog",
        "Bridges": "glute_bridge",
        "Back Extension Machine": "lever_back_extension",
        "Hyperextension Station": "hyperextension",

        // Shoulders - Front
        "Barbell Overhead Press": "barbell_seated_overhead_press",
        "Dumbbell Shoulder Press": "dumbbell_seated_shoulder_press",
        "Arnold Press": "dumbbell_arnold_press",
        "Smith Machine Press": "smith_seated_shoulder_press",
        "Dumbbell Front Raise": "dumbbell_front_raise",
        "Cable Front Raise": "cable_front_raise",
        "Single Arm Cable Press": "cable_one_arm_shoulder_press",
        "Cable Y-Raise (Front Delt)": "cable_front_raise_over_bench",
        "Cable Face Away Press": "cable_one_arm_shoulder_press",
        "Handstand Push-ups": "handstand_push-up",
        "Pike Push-ups": "pike_push_up",
        "Shoulder Press Machine": "lever_shoulder_press",
        "Chest-Supported Press": "lever_shoulder_press",

        // Shoulders - Side
        "Dumbbell Lateral Raise": "dumbbell_lateral_raise",
        "Lean-Away DB Raise": "dumbbell_lateral_raise",
        "Behind the Back Raise": "dumbbell_lateral_raise",
        "Cable Lateral Raise": "cable_lateral_raise",
        "Single Arm Cable Lateral": "cable_one_arm_lateral_raise",
        "Cable Upright Row": "cable_upright_row",
        "Behind the Back Cable Raise": "cable_one_arm_lateral_raise",
        "Side Plank Raise": "side_plank",
        "Shoulder Taps": "shoulder_tap",
        "Machine Lateral Raise": "lever_lateral_raise",

        // Shoulders - Rear
        "Reverse Dumbbell Fly": "dumbbell_reverse_fly",
        "Chest Supported Rear Fly": "dumbbell_lying_rear_delt_row",
        "Face Pull (DB)": "dumbbell_rear_delt_row",
        "Cable Face Pull": "cable_upper_row",
        "Reverse Cable Crossover": "cable_rear_delt_crossover",
        "Scapular Shrugs": "scapular_pull-up",
        "Rear Delt Pec Deck": "lever_seated_reverse_fly",

        // Legs - Quads
        "Back Squat": "barbell_squat",
        "Front Squat": "barbell_front_squat",
        "Bulgarian Split Squat": "dumbbell_bulgarian_split_squat",
        "Goblet Squat": "dumbbell_goblet_squat",
        "Walking Lunges (DB)": "dumbbell_walking_lunge",
        "Cable Squat": "cable_squat",
        "Cable Leg Extension": "cable_leg_extension",
        "Cable Step Up": "cable_step_up",
        "Cable Lunge": "cable_lunge",
        "Cable Sissy Squat": "sissy_squat",
        "Pistol Squats": "pistol_squat",
        "Bodyweight Squats": "bodyweight_squat",
        "Sissy Squats": "sissy_squat",
        "Leg Press Machine": "sled_leg_press",
        "Hack Squat Machine": "sled_hack_squat",
        "Pendulum Squat": "sled_hack_squat",
        "Leg Extension Machine": "lever_leg_extension",

        // Legs - Hamstrings
        "Romanian Deadlift": "barbell_romanian_deadlift",
        "Sumo Deadlift": "barbell_sumo_deadlift",
        "Lying Leg Curl (DB)": "dumbbell_lying_leg_curl",
        "DB RDL": "dumbbell_romanian_deadlift",
        "Cable Pull Through": "cable_pull_through",
        "Single Leg Cable Curl": "cable_standing_leg_curl",
        "Cable SLDL": "cable_stiff_leg_deadlift",
        "Cable Hamstring Walkout": "cable_pull_through",
        "Cable Glute-Ham Raise": "glute-ham_raise",
        "Nordic Curls": "glute-ham_raise",
        "Sliding Leg Curls": "bodyweight_lying_leg_curl",
        "Single Leg Glute Bridge": "single_leg_glute_bridge",
        "Lying Leg Curl Machine": "lever_lying_leg_curl",
        "Seated Leg Curl Machine": "lever_seated_leg_curl",
        "Standing Leg Curl Machine": "lever_standing_leg_curl",
        "Glute-Ham Raise Machine": "glute-ham_raise",

        // Legs - Glutes
        "Barbell Hip Thrust": "barbell_hip_thrust",
        "Barbell Glute Bridge": "barbell_glute_bridge",
        "Sumo Squat (DB)": "dumbbell_sumo_squat",
        "Weighted Step Ups": "dumbbell_step-up",
        "Weighted Lunges": "dumbbell_lunge",
        "Cable Glute Kickback": "cable_glute_kickback",
        "Cable Abduction": "cable_hip_abduction",
        "Cable Squat (Wide)": "cable_squat",
        "Cable Curtsy Lunge": "cable_lunge",
        "Glute Bridges": "glute_bridge",
        "Donkey Kicks": "donkey_kick",
        "Fire Hydrants": "fire_hydrant",
        "Hip Thrust Machine": "lever_hip_thrust",
        "Glute Kickback Machine": "lever_kneeling_leg_curl",

        // Legs - Calves
        "Standing Calf Raise": "barbell_standing_calf_raise",
        "Seated Calf Raise": "barbell_seated_calf_raise",
        "Dumbbell Calf Raise": "dumbbell_standing_calf_raise",
        "Barbell Calf Raise": "barbell_standing_calf_raise",
        "One Leg DB Calf Raise": "dumbbell_single_leg_calf_raise",
        "Cable Standing Calf Raise": "cable_standing_calf_raise",
        "Cable Single Leg Raise": "cable_standing_calf_raise",
        "Cable Seated Calf Raise": "lever_seated_calf_raise",
        "Cable Leg Press Calf Raise": "cable_standing_calf_raise",
        "Cable Calf Stretch": "cable_standing_calf_raise",
        "Bodyweight Calf Raise": "bodyweight_standing_calf_raise",
        "Single Leg BW Raise": "bodyweight_single_leg_calf_raise",
        "Jumping Jacks": "jumping_jack",
        "Seated Calf Machine": "lever_seated_calf_raise",
        "Rotary Calf Machine": "lever_standing_calf_raise",

        // Arms - Biceps
        "Barbell Curls": "barbell_curl",
        "Dumbbell Curls": "dumbbell_curl",
        "Hammer Curls": "dumbbell_hammer_curl",
        "Standing Cable Curl": "cable_curl",
        "Preacher Curl Machine": "lever_preacher_curl",
        "Bicep Curl Machine": "lever_bicep_curl",

        // Arms - Triceps
        "Close Grip Bench Press": "barbell_close_grip_bench_press",
        "Tricep Pushdown": "cable_triceps_pushdown_v._2",
        "Rope Pushdown": "cable_pushdown",
        "Tricep Extension Machine": "lever_triceps_extension",

        // Arms - Forearms
        "Barbell Wrist Curls": "barbell_wrist_curl",
        "Dead Hang": "dead_hang",
        "Wrist Curl Machine": "lever_reverse_wrist_curl",

        // Core - Abs
        "Weighted Crunches": "weighted_crunch",
        "Cable Crunches": "cable_kneeling_crunch",
        "Hanging Leg Raises": "hanging_leg_raise",
        "Plank": "front_plank",
        "Ab Wheel Rollouts": "ab_roller",
        "Ab Crunch Machine": "lever_seated_crunch",

        // Cardio
        "Burpees": "burpee",
        "Mountain Climbers": "mountain_climber",
        "High Knees": "high_knee_run_in_place",
        "Butt Kicks": "butt_kicks",
        "Running (Outdoors)": "run",
        "Walking": "walking",
        "Treadmill": "run_on_treadmill",
        "Stationary Bike": "stationary_bike_walk",
        "Elliptical Trainer": "elliptical_machine",
        "Stair Climber": "step_machine",
        "Rowing Machine": "rowing_machine"
    };

    const slug = gifMap[exerciseName];
    if (!slug) return null;

    // The yuhonas repo uses the first letter as a directory, then the slug.gif
    // Examples: 
    // https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/d/dumbbell_incline_bench_press/0.gif
    // Wait, the API for yuhonas/free-exercise-db actually stores it as:
    // /exercises/c/cable_curl/0.gif  OR  /exercises/p/push-up/0.gif
    // Let me double-check the structure... well actually it's easier to use the exerciseDB CDN if available, or just construct it:

    // ExerciseDB uses IDs, yuhonas is just the slug
    const firstLetter = slug.charAt(0).toLowerCase();

    // Actually yuhonas usually has images/0.gif / 1.gif or similar. Let's use `images/0.gif` inside the slug folder
    // Format: exercises/{firstLetter}/{slug}/images/0.gif
    return `${baseUrl}${slug}/images/0.gif`;
};
