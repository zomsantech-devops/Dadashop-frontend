export default function determineTier (points: number): string {
    if (points >= 3000) {
        return 'Unreal';
    } else if (points >= 300) {
        return 'Diamond';
    } else {
        return 'Gold';
    }
};