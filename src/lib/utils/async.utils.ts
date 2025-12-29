export async function rateLimit<T, R>(
    items: T[],
    limit: number,
    worker: (item: T, index: number) => Promise<R>
): Promise<(R | { error: any })[]> {

    const results: (R | { error: any })[] = new Array(items.length);
    let running = 0;
    let currentIndex = 0;

    return new Promise((resolve) => {
        const runNext = () => {
            if (currentIndex >= items.length && running === 0) {
                return resolve(results);
            }

            while (running < limit && currentIndex < items.length) {
                const index = currentIndex++;
                const item = items[index];

                running++;

                Promise.resolve(worker(item, index))
                    .then((res) => {
                        results[index] = res;
                    })
                    .catch((err) => {
                        results[index] = { error: err };
                    })
                    .finally(() => {
                        running--;
                        runNext();
                    });
            }
        };

        runNext();
    });
}
