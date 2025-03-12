export default async function sendData(formData: FormData): Promise<void> {
    'use server'; // Denne funktion kører på serveren

    console.log('Modtaget data: "', formData.get('customerId'), '"');
}
