import { useCallback } from 'react';

export function useUpdateItem(url, method, titleTwo) {

    const updateItem = useCallback(async (id) => {
        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
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
    }, [url, method, titleTwo]);

    return updateItem;
}
