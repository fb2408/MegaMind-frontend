
export async function getLeaugesForUser(id) {
    try {
        const response = await fetch(
            `https://mega-mind-backend-2fe25339801f.herokuapp.com/user/${id}/league`,
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return {};
    }
};

export async function getOneLeagueForUser(userId, leagueId) {
    try {
        const response = await fetch(
            `https://mega-mind-backend-2fe25339801f.herokuapp.com/user/${userId}/league/${leagueId}`,
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return {};
    }
};

export async function getCategoriesForLeague() {
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
