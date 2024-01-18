

export async function getHomePageData(id) {
    try {
        const response = await fetch(
            `https://mega-mind-backend-2fe25339801f.herokuapp.com/user/${id}/mainPage`,
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return {};
    }
};

export async function getAllCategories() {
    try {
        const response = await fetch(
            `https://mega-mind-backend-2fe25339801f.herokuapp.com/league/categories`,
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return {};
    }
};

export async function changeUser(id, changes) {
    try {
        const response = await fetch(`https://mega-mind-backend-2fe25339801f.herokuapp.com/user/${id}`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return {};
    }
};
