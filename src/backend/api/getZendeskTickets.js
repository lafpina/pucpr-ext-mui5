/*

**/
async function getZendeskTickets(clientEmail) {

    const query = `type:ticket requester:${clientEmail}`; // All tickets created from 
    const url = `https://dipano.zendesk.com/api/v2/search.json?query=${query}`

    let qtyTickets = 0

    try {
        const res = await fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                // Encode base64. Use Decode Base64 to unveal token
                Authorization: 'Basic bHVpekBmcmFsZGFzZGlwYW5vLmNvbS5ici90b2tlbjpLR1FBMmVBa1ViUmdLYTkxdjY1RUs4NERGOG9SV3VnWm9ickpPRUdw'
            }
        })
        let data = await res.json();
        // console.log('response', JSON.parse(JSON.stringify(data)))
        console.log('QTY TICKETS:', data.count)
        qtyTickets = data.count

    } catch (error) {
        console.log('zendesk response error', error)
    }

    return qtyTickets
}

export default getZendeskTickets;
