import { useCallback } from 'react';

export function useDeleteItem(url, method) {

    const deleteItem = useCallback(async (id) => {
        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
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
    }, [url, method]);

    return deleteItem;
}

