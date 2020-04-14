import plot from '.';
import { exec } from 'child_process';

exec(`mkdir ${__dirname}/test`);

plot({
    data: [3, 1, 2, 3, 4],
    filename: __dirname + '/test/outputXXX.png',
    format: 'png'
});