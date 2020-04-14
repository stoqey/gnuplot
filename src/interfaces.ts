export interface SetUpOptions {
    format?: any;
    font?: any;
    fontSize?: any;
    width?: any;
    height?: any;
    locale?: any;
    xRange?: any;
    yRange?: any;
    margin?: any;
    time: any;
    title?: any;
    titleSize?: any;
    logscale?: any;
    xlabel?: any;
    ylabel?: any;
    decimalsign?: any;
    xRotate?: any;
    yFormat?: any;
    nokey?: any;
}

export interface PlotOptions extends SetUpOptions {
    data?: any;
    filename: string;
    style: string;
    moving_avg: number;
    moving_max: number;
    exec: any;
    hideSeriesTitle: boolean;
    finish: (data: any) => void;
}