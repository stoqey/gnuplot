/* gnuplotter
 * this project is a fork of Richard Meadows's 'node-plotter'
 *
 */
import 'mocha';

import { plot } from './index';
import { expect as should } from 'chai';

function handleResult(error: any, stdout: any, stderr: { should: { be: { empty: () => void; }; }; }, cb: { (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (err?: any): void; (): void; }) {
	should(error).not.exist;
	cb();
}

describe('Plot tests', function () {

	// describe('SVG plot', function () {
	// 	it('Output1', function (done) {
	// 		plot({
	// 			title: 'svg example',
	// 			data: { 'tick': [3, 1, 2, 3, 4, 15, 3, 2, 4, 11], 'line': { 1: 5, 5: 6 } },
	// 			style: 'lines',
	// 			filename: __dirname + '/test/output11.svg',
	// 			format: 'svg',
	// 			nokey: true,
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});
	// });

	// describe('PNG output', function () {

	// });

	describe('PNG output', function () {

		it('Async Output1', async () => {
			const ploted = await plot({
				data: [3, 1, 2, 3, 4],
				filename: __dirname + '/test/outputExample.png',
				format: 'png'
			});

			should(ploted).be.true;
		});

		// 	it('Output1', function (done) {
		// 		plot({
		// 			data: [3, 1, 2, 3, 4],
		// 			filename: __dirname + '/test/output1.png',
		// 			format: 'png',
		// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
		// 		});
	});

	// 	it('Output2', function (done) {
	// 		plot({
	// 			data: [3, 1, 2, 3, 4],
	// 			filename: __dirname + '/test/output2.png',
	// 			style: 'linespoints',
	// 			title: 'Example \'Title\', \\n runs onto multiple lines',
	// 			logscale: true,
	// 			xlabel: 'time',
	// 			ylabel: 'length of string',
	// 			format: 'png',
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output3', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 'tick': [3, 1, 2, 3, 4] },
	// 			style: 'lines',
	// 			filename: __dirname + '/test/output3.png',
	// 			format: 'png',
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output4', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 'tick': [3, 1, 2, 3, 4], 'line': { 1: 5, 5: 6 } },
	// 			style: 'lines',
	// 			filename: __dirname + '/test/output4.png',
	// 			format: 'png',
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output5', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 'tick': [3, 1, 2, 3, 4], 'line': { 1: 5, 5: 6 } },
	// 			style: 'lines',
	// 			filename: __dirname + '/test/output5.png',
	// 			format: 'png',
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output6', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 'tick': [3, 1, 2, 3, 4, 15, 3, 2, 4, 11], 'tick2': [3, 10, 2, 30, 4, 15, 3, 20, 4, 11], 'line': { 1: 5, 5: 6 } },
	// 			moving_avg: 4,
	// 			style: 'lines',
	// 			filename: __dirname + '/test/output6.png',
	// 			format: 'png',
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output7', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 'tick': [3, 1, 2, 3, 4, 15, 3, 2, 4, 11], 'tick2': [3, 10, 2, 30, 4, 15, 3, 20, 4, 11], 'line': { 1: 5, 5: 6 } },
	// 			moving_max: 2,
	// 			style: 'lines',
	// 			filename: __dirname + '/test/output7.png',
	// 			format: 'png',
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output8', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 'tick': [3, 1, 2, 3, 4, 15, 3, 2, 4, 11], 'tick2': [3, 10, 2, 30, 4, 15, 3, 20, 4, 11], 'line': { 1: 5, 5: 6 } },
	// 			moving_max: 2,
	// 			style: 'lines',
	// 			filename: __dirname + '/test/output8.png',
	// 			nokey: true,
	// 			format: 'png',
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output10', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 'temperature': { 1357162672: 22, 1357162782: 23, 1357162892: 24 } },
	// 			time: 'hours',
	// 			style: 'linespoints',
	// 			filename: __dirname + '/test/output10.png',
	// 			format: 'png',
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output11', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 'temperature': { 1357162672: 22, 1357162782: 23, 1357162892: 24 } },
	// 			time: 'hours',
	// 			style: 'linespoints',
	// 			filename: __dirname + '/test/output11.png',
	// 			format: 'png',
	// 			margin: {
	// 				left: 10,
	// 				right: 10,
	// 				top: 10,
	// 				bottom: 10
	// 			},
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output12', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 't1': { 1357162672: 22, 1357162782: 23, 1357162892: 24 }, 't2': { 1357162672: 18, 1357162782: 20, 1357162892: 23 } },
	// 			time: 'hours',
	// 			style: 'line',
	// 			filename: __dirname + '/test/output12.png',
	// 			format: 'png',
	// 			hideSeriesTitle: true,
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output13', function (done) {
	// 		plot({
	// 			title: 'example',
	// 			data: { 't1': { 1357162672: 22.5, 1357162782: 23.5, 1357162892: 24.5 } },
	// 			time: 'hours',
	// 			style: 'line',
	// 			filename: __dirname + '/test/output13.png',
	// 			format: 'png',
	// 			decimalsign: ',',
	// 			xRotate: {
	// 				value: 45,
	// 				yOffset: 1,
	// 				xOffset: 1
	// 			},
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output14', function (done) {
	// 		plot({
	// 			locale: 'it_IT.UTF-8',
	// 			title: 'example',
	// 			data: { 't1': { 1357162672: 22.2, 1357162782: 23, 1357162892: 24 } },
	// 			time: 'hours',
	// 			style: 'line',
	// 			filename: __dirname + '/test/output14.png',
	// 			format: 'png',
	// 			decimalsign: ',',
	// 			yFormat: '%.2f USD',
	// 			hideSeriesTitle: true,
	// 			xlabel: 'Time',
	// 			ylabel: 'Price',
	// 			margin: {
	// 				left: 10,
	// 				right: 3,
	// 				top: 3,
	// 				bottom: 4
	// 			},
	// 			xRotate: {
	// 				value: 45,
	// 				yOffset: -1.5,
	// 				xOffset: -2
	// 			},
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output15', function (done) {
	// 		plot({
	// 			font: 'arial',
	// 			fontSize: 16,
	// 			titleSize: 30,
	// 			width: 1366,
	// 			height: 768,
	// 			title: 'example',
	// 			data: { 'temperature': { 1357162672: 22, 1357162782: 23, 1357162892: 24 } },
	// 			time: '%d %b',
	// 			style: 'line',
	// 			filename: __dirname + '/test/output15.png',
	// 			format: 'png',
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});

	// 	it('Output16', function (done) {
	// 		plot({
	// 			font: 'arial',
	// 			fontSize: 16,
	// 			titleSize: 30,
	// 			width: 1366,
	// 			height: 768,
	// 			title: 'example',
	// 			data: { 'temperature': { 1357162672: 22, 1357162782: 23, 1357162892: 24 } },
	// 			time: '%d %b',
	// 			style: 'line',
	// 			filename: __dirname + '/test/output16.png',
	// 			format: 'png',
	// 			xRange: {
	// 				min: 1357162672,
	// 				max: 1357162892
	// 			},
	// 			yRange: {
	// 				min: 18,
	// 				max: 30
	// 			},
	// 			finish: function (error: any, stdout: any, stderr: any) { handleResult(error, stdout, stderr, done); }
	// 		});
	// 	});
	// });
});