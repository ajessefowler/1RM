export default function calculate1RM(weight, reps) {
    // With only one rep, we assume that is a max
    if (reps == 1) return weight;
    
    // Use 3 different estimation techniques
    const epley = weight * (1 + (reps / 30));
    const brzycki = weight * (36 / (37 - reps));
    const mcglothin = (100 * weight) / (101.3 - (2.67123 * reps));
    
    // Average the three estimates
    return Math.round((epley + brzycki + mcglothin) / 3);
}