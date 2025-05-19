import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "@/components/atoms/Label/Label";

const meta = {
    title: "Atoms/Label",
    component: Label,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Form Label"
            }
        }
    }
} satisfies Meta<typeof Label>

export default meta;

export const Base = {
    argTypes: {
        required: {
            control: "boolean",
            description: "Whether the label is required or not"
        },
        htmlFor: {
            control: "text",
            description: "What input is this label linked to ?"
        },
        children: {
            control: "text",
            description: "Label content"
        }
    },

    args: {
        required: false,
        htmlFor: "username",
        children: "Enter your username"
    }
} satisfies StoryObj<typeof Label>