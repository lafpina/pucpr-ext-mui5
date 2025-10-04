/*

**/
async function getZendeskTickets(clientEmail) {

    const query = `type:ticket requester:${clientEmail}`; // All tickets created from 
    const url = `https://youraccountzendek/api/v2/search.json?query=${query}`

    let qtyTickets = 0

    try {
        const res = await fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',

                Authorization: `Basic ${process.env.ZENDESK_AUTH}`
            }
        })
        let data = await res.json();

        qtyTickets = data.count

    } catch (error) {
        console.log('zendesk response error', error)
    }

    return qtyTickets
}

export default getZendeskTickets;
