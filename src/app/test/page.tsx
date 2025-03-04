import Title from '@/components/Title';
import Button from '@/components/Button';
import { JSX } from 'react';

export default function test(): JSX.Element {
    return (
        <>
            <Title textColor="blue">Test</Title>
            <Button className='m-8'>click</Button>
        </>
    );
}
