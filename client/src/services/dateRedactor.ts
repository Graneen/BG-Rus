export default function dateRedactor(date: Date) {
    const tempDate = date.toString().slice(0, 10)
    return `${tempDate[8]+tempDate[9]}.${tempDate[5]+tempDate[6]}`
}
