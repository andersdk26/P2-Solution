import Button from '@/components/Button';
import Title from '@/components/Title';
import { JSX } from 'react';

export default function test(): JSX.Element {
    return (
        <>
            <Title textColor="blue">Test</Title>
            <Button className="m-8">Button</Button>
            <Button className="m-8">Button</Button>
        </>
    );
}
