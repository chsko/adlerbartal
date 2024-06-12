export const toNorwegianDateTimeString = (timestampString: string) => {
    const date = new Date(timestampString)

    // Format the date object to a human-readable string in Norwegian locale
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
        timeZoneName: undefined,
    }

    return date.toLocaleString('nb-NO', options)
}
