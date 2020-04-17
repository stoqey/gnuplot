/* @stoqey/gnuplot
 * this project is a fork of Richard Meadows's 'node-plotter'
 */

import { exec, ExecException } from 'child_process';
import _ from 'lodash';
import { SetUpOptions, PlotOptions } from './interfaces';

/*
 * Performs a n-point moving average on array.
 */
function moving_average(array: number[], n: number) {
	var nums: number[] = [];

	Object.keys(array).forEach((i: any) => {
		/* If this item in the array is a number */
		if (_.isNumber(array[i])) {
			nums.push(array[i]);
			if (nums.length > n) {
				nums.splice(0, 1); /* Remove the first element of the array */
			}
			/* Take the average of the n items in this array */
			var sum = _.reduce(nums, function (memo: number, num: number) { return memo + num; }, 0);
			array[i] = sum / nums.length;
		}
	});

	return array;
}
/**
 * Performs a n-point maximum on array.
 */
function moving_maximum(array: number[], n: number) {
	var nums: number[] = [];

	Object.keys(array).forEach(function (i: any) {
		/* If this item in the array is a number */
		if (_.isNumber(array[i])) {
			nums.push(array[i]);
			if (nums.length > n) {
				nums.splice(0, 1); /* Remove the first element of the array */
			}
			/* Take the average of the n items in this array */
			var sum = _.reduce(nums, function (memo: any, num: any) { return memo + num; }, 0);
			array[i] = sum / nums.length;
		}
	});

	return array;
}
/**
 * Applys an n-point moving filter to a set of series.
 */
function apply_moving_filter(set: { [x: string]: any; }, filter: { (array: number[], n: number): number[]; (array: number[], n: number): number[]; (arg0: any, arg1: any): any; }, n: number) {
	if (!_.isNumber(n)) { n = 3; }

	Object.keys(set).forEach(function (series) {
		/* Apply the filter */
		set[series] = filter(set[series], n);
	});

	return set;
}
/**
 * Returns the string to give to gnuplot based on the value of options.time.
 */
function time_format(time: any) {
	if (_.isString(time)) {
		/* Translate the string we've been given into a format */
		switch (time) {
			case 'days':
			case 'Days':
				return '%d/%m';
			case 'hours':
			case 'Hours':
				return '%H:%M';
			default: /* Presume we've been given a gnuplot-readable time format string */
				return time;
		}
	} else { /* Just default to hours */
		return '%H:%M';
	}
}
/**
 * Sets up gnuplot based on the properties we're given in the options object.
 */
function setup_gnuplot(gnuplot: { stdin: { write: (arg0: string) => void; }; }, options: SetUpOptions) {
	if (options.format === 'svg') { /* Setup gnuplot for SVG */
		// gnuplot.stdin.write(`set term svg fname "${options.font || 'system-ui'}" fsize ${options.fontSize || 13}\n`);
	} else if (options.format == 'pdf') {
		/* PDF: setup Gnuplot output to postscript so ps2pdf can interpret it */
		gnuplot.stdin.write(`set term postscript landscape enhanced color dashed "${options.font || 'Arial'}" fsize ${options.fontSize || 14}\n`);
	} else { /* Setup gnuplot for png */
		gnuplot.stdin.write(`set term png size ${options.width || 800},${options.height || 640} font "${options.font || 'Arial'}, ${options.fontSize || 13}"\n`);
	}

	/* Locale config */
	if (options.locale) {
		gnuplot.stdin.write(`set locale '${options.locale}'\n`);
	}

	/* Data range config */
	if (options.xRange) {
		gnuplot.stdin.write(`set xrange ['${options.xRange.min}':'${options.xRange.max}']\n`);
	}

	if (options.yRange) {
		gnuplot.stdin.write(`set yrange ['${options.yRange.min}':'${options.yRange.max}']\n`);
	}

	/* Margin config */
	if (options.margin) {
		gnuplot.stdin.write(`set lmargin ${options.margin.left}\n`);
		gnuplot.stdin.write(`set rmargin ${options.margin.right}\n`);
		gnuplot.stdin.write(`set tmargin ${options.margin.top}\n`);
		gnuplot.stdin.write(`set bmargin ${options.margin.bottom}\n`);
	}

	/* Formatting Options */
	if (options.time) {
		gnuplot.stdin.write('set xdata time\n');
		gnuplot.stdin.write('set timefmt "%s"\n');
		gnuplot.stdin.write(`set format x "${time_format(options.time)}"\n`);
		gnuplot.stdin.write('set xlabel ""\n');
	}
	if (options.title) {
		gnuplot.stdin.write(`set title "${options.title}" font "${options.font || 'Helvetica'}, ${options.titleSize || 13}"\n`);
	}
	if (options.logscale) {
		gnuplot.stdin.write('set logscale y\n');
	}
	if (options.xlabel) {
		gnuplot.stdin.write(`set xlabel "${options.xlabel}"\n`);
	}
	if (options.ylabel) {
		gnuplot.stdin.write(`set ylabel "${options.ylabel}"\n`);
	}
	if (options.decimalsign) {
		gnuplot.stdin.write(`set decimalsign '${options.decimalsign}'\n`);
	}
	if (options.xRotate) {
		gnuplot.stdin.write(`set xtics rotate by ${options.xRotate.value} offset ${options.xRotate.xOffset},${options.xRotate.yOffset}\n`);
	}
	if (options.yFormat) {
		gnuplot.stdin.write(`set format y '${options.yFormat}'\n`);
	}

	/* Setup ticks */
	// gnuplot.stdin.write('set grid xtics ytics mxtics\n');
	// gnuplot.stdin.write('set mxtics\n');

	if (options.nokey) {
		gnuplot.stdin.write('set nokey\n');
	}
}
/**
 * Called after Gnuplot has finished.
 */
function post_gnuplot_processing(error: ExecException | null, stdout: string | Buffer, stderr: string | Buffer) {
	/* Print stuff */
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
}

/* -------- Public Functions -------- */


/**
 * Plots data to a PDF file. If it does not exist, the PDF file will
 * be created, otherwise this plot will be appended as a new page.
 */
function plotCallack(options: PlotOptions) {
	/* Required Options */
	if (!options.data || !options.filename) {
		throw new Error('The options object must have \'data\' and \'filename\' properties!');
	}
	/* Translate data into an object if needs be */
	if (_.isArray(options.data)) {
		/* If it's a one-dimentional array */
		if (_.isEqual(_.flatten(options.data), options.data)) {
			options.data = { 'Series 1': options.data };
		}
	}

	/* Defaults */
	if (!options.style) {
		options.style = 'lines'; /* Default to lines */
	}

	/* Apply moving averages and maximums */
	if (options.moving_avg) {
		options.data = apply_moving_filter(options.data, moving_average, options.moving_avg);
	}
	if (options.moving_max) {
		options.data = apply_moving_filter(options.data, moving_maximum, options.moving_max);
	}

	/* Execute Gnuplot specifing a function to be called when it terminates */
	var gnuplot: { stdin: any; };

	const filePath = options.filename;

	exec(`touch ${filePath}`);

	if (options.format === 'pdf') { /* Special setup for pdf */
		gnuplot = exec(`gnuplot | ps2pdf - ${filePath}`, (options.exec ? options.exec : {}), options.finish || post_gnuplot_processing);
	} else { /* Default for everything else */
		gnuplot = exec(`gnuplot > ${filePath}`, (options.exec ? options.exec : {}), options.finish || post_gnuplot_processing);
	}

	/* Sets up gnuplot based on the properties we've been given in the
	* options object */
	setup_gnuplot(gnuplot, options);

	/* Get an array containing all the series */
	var series = _.keys(options.data);
	/* Reject series that are functions or come from higher up the protoype chain */
	for (var i = 0; i < series.length; i += 1) {
		if (!options.data.hasOwnProperty(series[i]) ||
			typeof options.data[series[i]] === 'function') {
			delete series[i]; /* undefine this element */
		}
	}
	/* Filter out any undefined elements */
	series = _.filter(series, function () { return true; });

	/* Print the command to actually do the plot */
	gnuplot.stdin.write('plot');
	for (var i = 1; i <= series.length; i += 1) { /* For each series */
		/* Instruct gnuplot to plot this series */
		var s = `\'-\' using 1:2 with ${options.style}`;

		if (!options.hideSeriesTitle) {
			s += ` title\' ${series[i - 1]} \'`;
		}
		else {
			s += ' notitle';
		}

		gnuplot.stdin.write(s);
		/* If another series is to follow, add a comma */
		if (i < series.length) { gnuplot.stdin.write(','); }
	}
	gnuplot.stdin.write('\n');

	/* Print out the data */
	for (var i = 0; i < series.length; i += 1) { /* For each series */
		Object.keys(options.data[series[i]]).forEach(function (key) {
			gnuplot.stdin.write(key + ' ' + options.data[series[i]][key] + '\n');
		});

		/* Terminate the data */
		gnuplot.stdin.write('e\n');
	}

	gnuplot.stdin.end();
}

/**
 * Plots data to a PDF file. If it does not exist, the PDF file will
 * be created, otherwise this plot will be appended as a new page.
 */
export function plot(options: PlotOptions): Promise<boolean> | void {
	if (options.finish) {
		return plotCallack(options);
	}

	// Promise
	return new Promise((resolve, reject) => {
		plotCallack({
			...options,
			finish: (error) => {
				if (error) {
					return reject(error);
				}
				resolve(true);
			}
		})
	})
}

export default plot;