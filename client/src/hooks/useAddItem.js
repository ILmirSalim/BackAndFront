import { useCallback } from 'react';

export function useAddItem(url, method, title) {

    const addItem = useCallback(async () => {
        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title
                })
            })

            if (res.status !== 200) {
                const json = await res.json()
                alert(json.message)
                return
            }


        } catch (error) {
            console.log(error.message);
        }
    }, [url, method, title]);

    return addItem;
}

