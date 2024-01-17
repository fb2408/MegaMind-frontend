
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
