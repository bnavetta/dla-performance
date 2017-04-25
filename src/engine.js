const { maxLevels, scores } = require('../shared');

const WIDTH = 15;
const HEIGHT = 15;

const state = {
    garden: new Array(HEIGHT).fill().map(() => new Array(WIDTH).fill().map(() => ({}))),

    gardenerAction: undefined,
    rabbitActions: {},
};

function addGardenerClick(click) {
    state.gardenerAction = click;
}

function addRabbitClick(id, click) {
    state.rabbitActions[id] = click;
}

function getScore() {
    return state.garden.reduce(
        (acc, row) => acc + row.reduce(
            (acc, val) => val.type && maxLevels[val.type] == val.level ? acc + scores[val.type] : acc, 0), 0);
}

function tick(callback) {
    if (!!state.gardenerAction) {
        const { row, col, op } = state.gardenerAction;
        if (row < 0 || row >= HEIGHT || col < 0 || col >= WIDTH) {
            console.log(`Invalid gardener move at (${row}, ${col})`);
        } else {
            switch (op) {
                case 'cactus':
                case 'carrot':
                case 'eggplant':
                case 'flower':
                case 'tree':
                    if (!!state.garden[row][col].type) {
                        console.log(`Attempted to replace an existing plant at (${row}, ${col})`);
                    } else {
                        state.garden[row][col] = {type: op, level: 0};
                        console.log(`Added ${op} at (${row}, ${col})`);
                    }
                    break;
                case 'water':
                case 'fertilize':
                    if (!state.garden[row][col].type) {
                        console.log(`Attempted to ${op} a nonexistent plant at (${row}, ${col})`);
                    } else {
                        if (state.garden[row][col].level >= maxLevels[state.garden[row][col].type]) {
                            console.log(`${state.garden[row][col].type} at (${row}, ${col}) already at max level`);
                        } else {
                            state.garden[row][col].level += 1;
                            console.log(`Performed ${op} on (${row}, ${col})`);
                        }
                    }
                    break;
                default:
                    console.log(`Unknown operation ${op} by gardener at (${row}, ${col})`);
            }
        }
     }

     // SUCH HACK :(((

     const rabbitCounts = new Map();
     for (let { row, col} of Object.values(state.rabbitActions)) {
         const key = `${row}-${col}`;
         const existing = rabbitCounts.get(key) || 0;
         rabbitCounts.set(key, existing + 1);
     }

     let maxCount = 0;
     let maxKey = '';
     for (let [key, count] of rabbitCounts) {
         if (count > maxCount) {
             maxCount = count;
             maxKey = key;
         }
     }

     if (maxCount > 0) {
         const [rowStr, colStr] = maxKey.split('-');
         const row = parseInt(rowStr);
         const col = parseInt(colStr);

         if (!!state.garden[row][col].type) {
             console.log(`Eating plant at (${row}, ${col})`);
             state.garden[row][col].level -= 1;
             if (state.garden[row][col].level < 0) {
                 console.log(`Destroyed plant at (${row}, ${col})`);
                 state.garden[row][col] = {};
             }
         }
     }

     state.gardenerAction = undefined;
     state.rabbitActions = {};

     callback({ garden: state.garden, score: getScore() });
}

function start(onTick) {
    const loop = setInterval(tick.bind(null, onTick), 1000);
    console.log('Game started');
    return loop;
}

module.exports = {
    start,
    addGardenerClick,
    addRabbitClick
}
