export default function determineTier (points: number): string {
    if (points >= 3000) {
        return 'Mythic';
    } else if (points >= 300) {
        return 'Epic';
    } else {
        return 'Rare';
    }
};