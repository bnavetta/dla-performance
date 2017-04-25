const symbols = {
    'cactus': ['🌵'],
    'carrot': ['🌿', '🥕'],
    'eggplant': ['🌱', '🌾', '🍆'],
    'flower': ['☘️', '🥀', '🌷', '🌹'],
    'tree': ['🌴', '🎄', '🌲', '🌳']
};

const scores = {
    cactus: 1,
    carrot: 3,
    eggplant: 6,
    flower: 10,
    tree: 10
};

const ops = {
    cactus: '🌵',
    carrot: '🥕',
    eggplant: '🍆',
    flower: '🌹',
    tree: '🌳',
    water: '💦',
    fertilize: '✨'
}

const maxLevels = {
    cactus: 0,
    carrot: 1,
    eggplant: 2,
    flower: 3,
    tree: 3
};

module.exports = {
    symbols: symbols,
    ops: ops,
    maxLevels: maxLevels,
    scores: scores,
};
