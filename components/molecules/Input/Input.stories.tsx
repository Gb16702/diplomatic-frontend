import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./Input"

const meta = {
    title: "Molecules/Input",
    component: Input,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Customizable input"
            }
        }
    }
} satisfies Meta<typeof Input>

export default meta;

export const Base = {
    argTypes: {
        id: {
            control: "text",
            description: "Label content"
        },
        type: {
            control: "select",
            options: ["text", "email", "password"],
            description: "Input type"
        },
        placeholder: {
            control: "text",
            description: "Input placeholder"
        },
        disabled: {
            control: "boolean",
            description: "Whether the input is disabled or not",
        }
    },

    args: {
        id: "username",
        type: "text",
        placeholder: "socrates@gmail.com",
        disabled: false,
    }
} satisfies StoryObj<typeof Input>
