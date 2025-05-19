import type { Preview } from '@storybook/react'
import { rubik, dmSans, playfairDisplay, spaceGrotesk } from "../lib/fonts";
import { useEffect } from "react";
import "../app/globals.css"

const preview = {
    decorators: [(Story) => {
        useEffect(() => {
            document.body.classList.add(
                rubik.variable,
                dmSans.variable,
                playfairDisplay.variable,
                spaceGrotesk.variable
            );
        }, [])

        return (
            <Story />
        )
    }],
    parameters: {
        nextjs: {
            appDirectory: true
            },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
} satisfies Preview;

export default preview;
