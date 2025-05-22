export const parseResultTime = (ms: number) => {
    const pad = (n: number, z = 2) => ('00' + n).slice(-z);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    ms %= 1000 * 60 * 60;
    const minutes = Math.floor(ms / (1000 * 60));

    ms %= 1000 * 60;
    const seconds = Math.floor(ms / 1000);

    const milliseconds = ms % 1000;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

