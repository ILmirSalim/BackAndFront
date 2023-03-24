import { useCallback } from 'react';

export function useUpdateItem(url, method, title, titleTwo) {

    const updateItem = useCallback(async () => {
        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    titleTwo
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
    }, [url, method, title, titleTwo]);

    return updateItem;
}
