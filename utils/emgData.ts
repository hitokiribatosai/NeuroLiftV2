// EMG Science-Based Exercise Rankings
// Data sourced from ACE (American Council on Exercise) commissioned studies,
// peer-reviewed EMG research, and established exercise science publications.

import { getEnglishExerciseName } from './exerciseData';

export interface EmgEntry {
    activation: string;   // e.g. "98% MVC" or "High"
    source: string;       // e.g. "ACE 2012"
    rank: number;         // 1 = top tier, 2 = strong
}

// Map exercise names (English) to their EMG data
export const EMG_DATA: Record<string, EmgEntry> = {
    // ═══════════════════════════════════════════
    // CHEST
    // ═══════════════════════════════════════════

    // Upper Chest
    "Incline Dumbbell Press": { activation: "93% MVC", source: "ACE", rank: 1 },
    "Incline Barbell Bench Press": { activation: "High", source: "Trebs et al. 2010", rank: 1 },
    "Low-to-High Cable Fly": { activation: "High", source: "ACE", rank: 2 },

    // Middle Chest
    "Flat Barbell Bench Press": { activation: "100% MVC", source: "ACE 2012", rank: 1 },
    "Flat Dumbbell Press": { activation: "High", source: "ACE 2012", rank: 1 },
    "Pec Deck Machine": { activation: "98% MVC", source: "ACE 2012", rank: 1 },
    "Cable Crossover (Middle)": { activation: "93% MVC", source: "ACE 2012", rank: 2 },

    // Lower Chest
    "Weighted Dips (Chest Focus)": { activation: "High", source: "ACE", rank: 1 },
    "Decline Barbell Bench Press": { activation: "High", source: "Barnett et al. 1995", rank: 1 },
    "Parallel Bar Dips": { activation: "High", source: "ACE", rank: 2 },

    // ═══════════════════════════════════════════
    // BACK
    // ═══════════════════════════════════════════

    // Lats
    "Pull-ups": { activation: "High", source: "ACE", rank: 1 },
    "Wide Grip Pull-ups": { activation: "90-95%", source: "ACE", rank: 1 },
    "Chin-ups": { activation: "High", source: "ACE", rank: 1 },
    "Wide Grip Lat Pulldown": { activation: "High", source: "ACE", rank: 2 },

    // Upper Back
    "Bent Over BB Row": { activation: "High", source: "ACE 2018", rank: 1 },
    "Barbell Rows (Underhand)": { activation: "High", source: "ACE 2018", rank: 1 },
    "Face Pulls": { activation: "High", source: "ACE 2018", rank: 2 },
    "Barbell Shrugs": { activation: "High", source: "ACE", rank: 2 },

    // Mid Back
    "T-Bar Rows": { activation: "High", source: "Lehman et al. 2004", rank: 1 },
    "Seated Cable Rows": { activation: "High", source: "Lehman et al. 2004", rank: 2 },
    "Pendlay Rows": { activation: "High", source: "ACE", rank: 2 },

    // Lower Back
    "Deadlifts": { activation: "High", source: "ACE", rank: 1 },
    "Good Mornings": { activation: "High", source: "ACE", rank: 2 },
    "Hyper-extensions": { activation: "High", source: "ACE", rank: 2 },

    // ═══════════════════════════════════════════
    // SHOULDERS
    // ═══════════════════════════════════════════

    // Front Delts
    "Dumbbell Shoulder Press": { activation: "High", source: "ACE 2014", rank: 1 },
    "Barbell Overhead Press": { activation: "79% MVC", source: "ACE 2014", rank: 1 },
    "Dumbbell Front Raise": { activation: "High", source: "ACE 2014", rank: 2 },

    // Side Delts
    "Dumbbell Lateral Raise": { activation: "High", source: "ACE 2014", rank: 1 },
    "Cable Lateral Raise": { activation: "High", source: "ACE 2014", rank: 2 },
    "Cable Upright Row": { activation: "High", source: "ACE 2014", rank: 2 },

    // Rear Delts
    "Reverse Dumbbell Fly": { activation: "High", source: "ACE 2014", rank: 1 },
    "Chest Supported Rear Fly": { activation: "High", source: "ACE 2014", rank: 1 },
    "Cable Face Pull": { activation: "High", source: "ACE 2014", rank: 2 },

    // ═══════════════════════════════════════════
    // LEGS
    // ═══════════════════════════════════════════

    // Quads
    "Back Squat": { activation: "74% MVC", source: "Caterisano et al. 2002", rank: 1 },
    "Front Squat": { activation: "High", source: "Gullett et al. 2009", rank: 1 },
    "Bulgarian Split Squat": { activation: "High", source: "ACE", rank: 1 },
    "Walking Lunges (DB)": { activation: "High", source: "ACE", rank: 2 },

    // Hamstrings
    "Romanian Deadlift": { activation: "High", source: "ACE 2018", rank: 1 },
    "DB RDL": { activation: "High", source: "ACE 2018", rank: 1 },
    "Sumo Deadlift": { activation: "High", source: "ACE 2018", rank: 2 },

    // Glutes
    "Barbell Hip Thrust": { activation: "High", source: "Contreras et al. 2015", rank: 1 },
    "Barbell Glute Bridge": { activation: "High", source: "Contreras et al. 2015", rank: 1 },
    "Weighted Step Ups": { activation: "High", source: "ACE", rank: 2 },
    "Weighted Lunges": { activation: "High", source: "ACE", rank: 2 },

    // Calves
    "Standing Calf Raise": { activation: "High", source: "ACE", rank: 1 },
    "Seated Calf Raise": { activation: "High", source: "ACE", rank: 1 },

    // ═══════════════════════════════════════════
    // ARMS
    // ═══════════════════════════════════════════

    // Biceps
    "Barbell Curls": { activation: "96% MVC", source: "ACE 2014", rank: 1 },
    "Dumbbell Curls": { activation: "High", source: "ACE 2014", rank: 2 },
    "Hammer Curls": { activation: "High", source: "ACE 2014", rank: 2 },

    // Triceps
    "Close Grip Bench Press": { activation: "High", source: "ACE 2012", rank: 1 },
    "Skull Crushers": { activation: "High", source: "ACE 2012", rank: 1 },
    "Dips": { activation: "High", source: "ACE 2012", rank: 1 },
    "Diamond Push-ups": { activation: "High", source: "ACE 2012", rank: 1 },
    "Tricep Pushdown": { activation: "High", source: "ACE 2012", rank: 2 },

    // Forearms
    "Barbell Wrist Curls": { activation: "High", source: "Standard EMG", rank: 1 },

    // ═══════════════════════════════════════════
    // CORE
    // ═══════════════════════════════════════════

    // Abs
    "Hanging Leg Raises": { activation: "High", source: "ACE 2001", rank: 1 },
    "Cable Crunches": { activation: "High", source: "ACE 2001", rank: 1 },
    "Weighted Crunches": { activation: "High", source: "ACE 2001", rank: 2 },
    "Ab Wheel Rollouts": { activation: "High", source: "ACE 2001", rank: 2 },
    "Ab Crunch Machine": { activation: "High", source: "ACE 2001", rank: 2 },
};

// Research sources for the Home page
export const EMG_SOURCES = [
    { name: "American Council on Exercise (ACE)", description: "Commissioned EMG studies on exercise effectiveness", url: "https://www.acefitness.org/resources/everyone/ace-sponsored-research/" },
    { name: "Journal of Strength & Conditioning Research", description: "Peer-reviewed exercise science journal", url: "https://journals.lww.com/nsca-jscr/" },
    { name: "Contreras et al. (2015)", description: "EMG analysis of hip extension exercises", url: "https://pubmed.ncbi.nlm.nih.gov/" },
    { name: "Trebs et al. (2010)", description: "EMG comparison of incline angles for chest", url: "https://pubmed.ncbi.nlm.nih.gov/" },
    { name: "Caterisano et al. (2002)", description: "Effect of squat depth on muscle activation", url: "https://pubmed.ncbi.nlm.nih.gov/" },
    { name: "Lehman et al. (2004)", description: "EMG analysis of rowing exercises", url: "https://pubmed.ncbi.nlm.nih.gov/" },
];

/** Check if an exercise is EMG verified (works with any language) */
export const isEmgVerified = (exerciseName: string): boolean => {
    const englishName = getEnglishExerciseName(exerciseName);
    return englishName in EMG_DATA;
};

/** Get EMG data for an exercise (works with any language, null if not verified) */
export const getEmgData = (exerciseName: string): EmgEntry | null => {
    const englishName = getEnglishExerciseName(exerciseName);
    return EMG_DATA[englishName] || null;
};
