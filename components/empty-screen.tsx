import { UseChatHelpers } from 'ai/react';

import { Button } from '@/components/ui/button';
import { ExternalLink } from '@/components/external-link';
import { IconArrowRight, IconEdit, IconMicrophone, IconPlus, IconUpload } from '@/components/ui/icons';
import { Timeline } from './timeline';
import { Card } from './ui/card';
import CardButton from './card-button';

const exampleMessages = [
    {
        heading: 'Find next steps',
        message: `What is a "serverless function"?`,
    },
    {
        heading: 'Generate an executive summary',
        message: 'Summarize the following article for a 2nd grader: \n',
    },
    {
        heading: 'Create an .ics file',
        message: `Draft an email to my boss about the following: \n`,
    },
];



export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="rounded-lg border bg-background p-8">
                <h1 className="mb-2 text-xl font-semibold">
                    <ExternalLink href="https://brainstream.app">
                        Brainstream
                    </ExternalLink>{' '}
                </h1>
                <div className='grid grid-cols-2 gap-4'>
                    <CardButton title='New Recording' icon={<IconMicrophone />}>
                        Create a new recording.
                    </CardButton>
                    <CardButton title='Start a Conversation' icon={<IconEdit />}>
                        Start with a plain-text conversation.
                    </CardButton>
                    <CardButton title='Upload a Recording' icon={<IconUpload />}>
                        Start with a plain-text conversation.
                    </CardButton>
                    <CardButton title='Something Else' icon={<IconUpload />}>
                        Nobody knows!
                    </CardButton>
                </div>
                <div className="mt-4 flex flex-col items-start space-y-2">
                    {exampleMessages.map((message, index) => (
                        <Button
                            key={index}
                            variant="link"
                            className="h-auto p-0 text-base"
                            onClick={() => setInput(message.message)}
                        >
                            <IconArrowRight className="mr-2 text-muted-foreground" />
                            {message.heading}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
