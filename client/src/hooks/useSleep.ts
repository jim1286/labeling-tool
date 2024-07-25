const useSleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

export default useSleep;
