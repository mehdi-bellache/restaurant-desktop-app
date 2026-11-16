

function generateKitchenTicketTimeHTML(){
    const date = new Date();
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
        timeStyle: 'short',
    }).format(date);
}

