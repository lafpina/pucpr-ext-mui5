// Turn the percentage score red, yeallow or green depending on the score value
const ScoreStyle = (score) => {
    switch (score) {
        case 100:
        case 95:
        case 90:
        case 85:
        case 80:
            return "#D66460";
            break;
        case 75:
        case 70:
        case 65:
            return "#f9a825";
            break;
        default:
            return "#60D660";
    }
};

export default ScoreStyle