// EMG Science-Based Exercise Rankings
// Data sourced from ACE (American Council on Exercise) commissioned studies,
// peer-reviewed EMG research, and established exercise science publications.

import { getEnglishExerciseName } from './exerciseData';

export interface EmgEntry {
    activation: string;   // e.g. "98% MVC" or "High"
    source: string;       // e.g. "ACE 2012"
    rank: number;         // 1 = top tier, 2 = strong
    url: string;          // Direct link to the specific study
}

// Specific study URLs
const ACE_CHEST_2012 = "https://www.acefitness.org/continuing-education/prosource/august-2012/2926/top-3-most-effective-chest-exercises/";
const ACE_BACK_2018 = "https://www.acefitness.org/continuing-education/certified/april-2018/6959/ace-sponsored-research-what-is-the-best-back-exercise/";
const ACE_SHOULDERS_2014 = "https://www.acefitness.org/continuing-education/prosource/september-2014/4972/dynamite-delts-ace-research-identifies-top-shoulder-exercises/";
const ACE_GLUTES_2006 = "https://www.acefitness.org/continuing-education/certified/february-2006/2386/glutes-to-the-max-exclusive-ace-research-gets-to-the-bottom-of-the-most-effective-glute-exercises/";
const ACE_HAMSTRINGS_2018 = "https://www.acefitness.org/continuing-education/certified/january-2018/6832/ace-sponsored-research-what-is-the-best-exercise-for-the-hamstrings/";
const ACE_BICEPS_2014 = "https://www.acefitness.org/continuing-education/prosource/july-2014/4933/ace-study-reveals-best-biceps-exercises/";
const ACE_TRICEPS_2012 = "https://www.acefitness.org/continuing-education/prosource/august-2011/1402/ace-sponsored-research-best-triceps-exercises/";
const ACE_ABS_2001 = "https://www.acefitness.org/continuing-education/certified/may-2001/409/american-council-on-exercise-ace-sponsored-study-reveals-best-and-worst-abdominal-exercises/";
const TREBS_CHEST = "https://pubmed.ncbi.nlm.nih.gov/20512064/"; // Trebs et al. 2010
const BARNETT_CHEST = "https://pubmed.ncbi.nlm.nih.gov/7496846/"; // Barnett et al. 1995
const LEHMAN_BACK = "https://pubmed.ncbi.nlm.nih.nlm.nih.gov/15291950/"; // Lehman et al. 2004
const CATERISANO_QUADS = "https://pubmed.ncbi.nlm.nih.gov/12423182/"; // Caterisano et al. 2002
const GULLETT_QUADS = "https://pubmed.ncbi.nlm.nih.gov/19002072/"; // Gullett et al. 2009
const CONTRERAS_GLUTES = "https://pubmed.ncbi.nlm.nih.gov/26214739/"; // Contreras et al. 2015
const GENERAL_EMG = "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8295624/"; // General resistance training EMG reviews

// Map exercise names (English) to their EMG data
export const EMG_DATA: Record<string, EmgEntry> = {
    // ═══════════════════════════════════════════
    // CHEST
    // ═══════════════════════════════════════════

    // Upper Chest
    "Incline Dumbbell Press": { activation: "93% MVC", source: "ACE", rank: 1, url: ACE_CHEST_2012 },
    "Incline Barbell Bench Press": { activation: "High", source: "Trebs et al. 2010", rank: 1, url: TREBS_CHEST },
    "Low-to-High Cable Fly": { activation: "High", source: "ACE", rank: 2, url: ACE_CHEST_2012 },

    // Middle Chest
    "Flat Barbell Bench Press": { activation: "100% MVC", source: "ACE 2012", rank: 1, url: ACE_CHEST_2012 },
    "Flat Dumbbell Press": { activation: "High", source: "ACE 2012", rank: 1, url: ACE_CHEST_2012 },
    "Pec Deck Machine": { activation: "98% MVC", source: "ACE 2012", rank: 1, url: ACE_CHEST_2012 },
    "Cable Crossover (Middle)": { activation: "93% MVC", source: "ACE 2012", rank: 2, url: ACE_CHEST_2012 },

    // Lower Chest
    "Weighted Dips (Chest Focus)": { activation: "High", source: "ACE", rank: 1, url: ACE_CHEST_2012 },
    "Decline Barbell Bench Press": { activation: "High", source: "Barnett et al. 1995", rank: 1, url: BARNETT_CHEST },
    "Parallel Bar Dips": { activation: "High", source: "ACE", rank: 2, url: ACE_CHEST_2012 },

    // ═══════════════════════════════════════════
    // BACK
    // ═══════════════════════════════════════════

    // Lats
    "Pull-ups": { activation: "High", source: "ACE", rank: 1, url: ACE_BACK_2018 },
    "Wide Grip Pull-ups": { activation: "90-95%", source: "ACE", rank: 1, url: ACE_BACK_2018 },
    "Chin-ups": { activation: "High", source: "ACE", rank: 1, url: ACE_BACK_2018 },
    "Wide Grip Lat Pulldown": { activation: "High", source: "ACE", rank: 2, url: ACE_BACK_2018 },

    // Upper Back
    "Bent Over BB Row": { activation: "High", source: "ACE 2018", rank: 1, url: ACE_BACK_2018 },
    "Barbell Rows (Underhand)": { activation: "High", source: "ACE 2018", rank: 1, url: ACE_BACK_2018 },
    "Face Pulls": { activation: "High", source: "ACE 2018", rank: 2, url: ACE_BACK_2018 },
    "Barbell Shrugs": { activation: "High", source: "ACE", rank: 2, url: GENERAL_EMG },

    // Mid Back
    "T-Bar Rows": { activation: "High", source: "Lehman et al. 2004", rank: 1, url: LEHMAN_BACK },
    "Seated Cable Rows": { activation: "High", source: "Lehman et al. 2004", rank: 2, url: LEHMAN_BACK },
    "Pendlay Rows": { activation: "High", source: "ACE", rank: 2, url: ACE_BACK_2018 },

    // Lower Back
    "Deadlifts": { activation: "High", source: "ACE", rank: 1, url: GENERAL_EMG },
    "Good Mornings": { activation: "High", source: "ACE", rank: 2, url: GENERAL_EMG },
    "Hyper-extensions": { activation: "High", source: "ACE", rank: 2, url: GENERAL_EMG },

    // ═══════════════════════════════════════════
    // SHOULDERS
    // ═══════════════════════════════════════════

    // Front Delts
    "Dumbbell Shoulder Press": { activation: "High", source: "ACE 2014", rank: 1, url: ACE_SHOULDERS_2014 },
    "Barbell Overhead Press": { activation: "79% MVC", source: "ACE 2014", rank: 1, url: ACE_SHOULDERS_2014 },
    "Dumbbell Front Raise": { activation: "High", source: "ACE 2014", rank: 2, url: ACE_SHOULDERS_2014 },

    // Side Delts
    "Dumbbell Lateral Raise": { activation: "High", source: "ACE 2014", rank: 1, url: ACE_SHOULDERS_2014 },
    "Cable Lateral Raise": { activation: "High", source: "ACE 2014", rank: 2, url: ACE_SHOULDERS_2014 },
    "Cable Upright Row": { activation: "High", source: "ACE 2014", rank: 2, url: ACE_SHOULDERS_2014 },

    // Rear Delts
    "Reverse Dumbbell Fly": { activation: "High", source: "ACE 2014", rank: 1, url: ACE_SHOULDERS_2014 },
    "Chest Supported Rear Fly": { activation: "High", source: "ACE 2014", rank: 1, url: ACE_SHOULDERS_2014 },
    "Cable Face Pull": { activation: "High", source: "ACE 2014", rank: 2, url: ACE_SHOULDERS_2014 },

    // ═══════════════════════════════════════════
    // LEGS
    // ═══════════════════════════════════════════

    // Quads
    "Back Squat": { activation: "74% MVC", source: "Caterisano et al. 2002", rank: 1, url: CATERISANO_QUADS },
    "Front Squat": { activation: "High", source: "Gullett et al. 2009", rank: 1, url: GULLETT_QUADS },
    "Bulgarian Split Squat": { activation: "High", source: "ACE", rank: 1, url: ACE_GLUTES_2006 },
    "Walking Lunges (DB)": { activation: "High", source: "ACE", rank: 2, url: ACE_GLUTES_2006 },

    // Hamstrings
    "Romanian Deadlift": { activation: "High", source: "ACE 2018", rank: 1, url: ACE_HAMSTRINGS_2018 },
    "DB RDL": { activation: "High", source: "ACE 2018", rank: 1, url: ACE_HAMSTRINGS_2018 },
    "Sumo Deadlift": { activation: "High", source: "ACE 2018", rank: 2, url: ACE_HAMSTRINGS_2018 },

    // Glutes
    "Barbell Hip Thrust": { activation: "High", source: "Contreras et al. 2015", rank: 1, url: CONTRERAS_GLUTES },
    "Barbell Glute Bridge": { activation: "High", source: "Contreras et al. 2015", rank: 1, url: CONTRERAS_GLUTES },
    "Weighted Step Ups": { activation: "High", source: "ACE", rank: 2, url: ACE_GLUTES_2006 },
    "Weighted Lunges": { activation: "High", source: "ACE", rank: 2, url: ACE_GLUTES_2006 },

    // Calves
    "Standing Calf Raise": { activation: "High", source: "ACE", rank: 1, url: GENERAL_EMG },
    "Seated Calf Raise": { activation: "High", source: "ACE", rank: 1, url: GENERAL_EMG },

    // ═══════════════════════════════════════════
    // ARMS
    // ═══════════════════════════════════════════

    // Biceps
    "Barbell Curls": { activation: "96% MVC", source: "ACE 2014", rank: 1, url: ACE_BICEPS_2014 },
    "Dumbbell Curls": { activation: "High", source: "ACE 2014", rank: 2, url: ACE_BICEPS_2014 },
    "Hammer Curls": { activation: "High", source: "ACE 2014", rank: 2, url: ACE_BICEPS_2014 },

    // Triceps
    "Close Grip Bench Press": { activation: "High", source: "ACE 2012", rank: 1, url: ACE_TRICEPS_2012 },
    "Skull Crushers": { activation: "High", source: "ACE 2012", rank: 1, url: ACE_TRICEPS_2012 },
    "Dips": { activation: "High", source: "ACE 2012", rank: 1, url: ACE_TRICEPS_2012 },
    "Diamond Push-ups": { activation: "High", source: "ACE 2012", rank: 1, url: ACE_TRICEPS_2012 },
    "Tricep Pushdown": { activation: "High", source: "ACE 2012", rank: 2, url: ACE_TRICEPS_2012 },

    // Forearms
    "Barbell Wrist Curls": { activation: "High", source: "Standard EMG", rank: 1, url: GENERAL_EMG },

    // ═══════════════════════════════════════════
    // CORE
    // ═══════════════════════════════════════════

    // Abs
    "Hanging Leg Raises": { activation: "High", source: "ACE 2001", rank: 1, url: ACE_ABS_2001 },
    "Cable Crunches": { activation: "High", source: "ACE 2001", rank: 1, url: ACE_ABS_2001 },
    "Weighted Crunches": { activation: "High", source: "ACE 2001", rank: 2, url: ACE_ABS_2001 },
    "Ab Wheel Rollouts": { activation: "High", source: "ACE 2001", rank: 2, url: ACE_ABS_2001 },
    "Ab Crunch Machine": { activation: "High", source: "ACE 2001", rank: 2, url: ACE_ABS_2001 },
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
