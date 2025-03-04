import Title from '@/components/Title';
import { FilledButton, OutlinedButton } from '@/components/Buttons';
import { JSX } from 'react';

export default function test(): JSX.Element {
    return (
        <>
            <FilledButton>Sign in</FilledButton>
            <br></br>
            <OutlinedButton>Create account</OutlinedButton>
        </>
    );
}
