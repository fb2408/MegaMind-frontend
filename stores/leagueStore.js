
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

export async function createLeaguePost(data) {
    try {
        const response = await fetch(`https://mega-mind-backend-2fe25339801f.herokuapp.com/league`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
        console.error(error)
        return error;
    }
}

export async function joinLeagueByCode(userId, code) {
    try {
        const response = await fetch(
            `https://mega-mind-backend-2fe25339801f.herokuapp.com/league/${userId}/${code}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }}
        );
        const json = await response.json();
        console.log(response)
        if(!response.ok) return false;
        return true;
    } catch (error) {
        console.error(error);
        return {};
    }
}
