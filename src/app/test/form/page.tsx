import sendData from '@/components/sendData';
import { JSX } from 'react';

export default function Page(): JSX.Element {
    async function createInvoice(formData: FormData): Promise<void> {
        'use server';

        const rawFormData = {
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
        };

        // Send data to server
        console.log('Faktura oprettet:', rawFormData);
    }

    return (
        <>
            <form action={createInvoice}>
                <label htmlFor="customerId">Kunde ID:</label>
                <input type="text" name="customerId" id="customerId" />

                <label htmlFor="amount">Beløb:</label>
                <input type="number" name="amount" id="amount" />

                <label htmlFor="status">Status:</label>
                <select name="status" id="status">
                    <option value="paid">Betalt</option>
                    <option value="unpaid">Ubetalt</option>
                </select>

                <button type="submit">Opret faktura</button>
            </form>
            <form action={sendData}>
                <label htmlFor="customerId">Kunde ID:</label>
                <input type="text" name="customerId" id="customerId" />

                <label htmlFor="amount">Beløb:</label>
                <input type="number" name="amount" id="amount" />

                <label htmlFor="status">Status:</label>
                <select name="status" id="status">
                    <option value="paid">Betalt</option>
                    <option value="unpaid">Ubetalt</option>
                </select>

                <button type="submit">Opret faktura</button>
            </form>
        </>
    );
}
