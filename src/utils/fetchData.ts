export async function fetchData (query: string, method: string = 'GET'): Promise<any> {
    try {
        const response = await fetch(`http://localhost:5187${query}`, {
            method: `${method}`,
            headers: {
            "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};