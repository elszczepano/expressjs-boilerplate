process.env.TS_NODE_PROJECT = './tests/tsconfig.build.json';

const os = require( 'os' );
const cpuCount = os.cpus().length;

module.exports = {
    concurrency: cpuCount * 2,
    extensions: [
        'js'
    ],
    files: [
        'dist-tests/**/*'
    ],
    require: [
        'tsconfig-paths/register'
    ],
    timeout: '30s'
};