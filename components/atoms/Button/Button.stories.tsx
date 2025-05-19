import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Button } from "./Button"

const meta = {
    title: "Atoms/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Customizable button with different variations and colors"
            }
        }
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["contained", "outlined", "text"],
            description: "Visual style of the button"
        },
        color: {
            control: "select",
            options: ["primary", "secondary"],
            description: "Color theme of the button"
        },
        onClick: {
            action: "clicked"
        }
    },
    args: {
        onClick: fn()
    }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        variant: "contained",
        color: "primary",
        children: "Sign Up",
        type: "button",
        loading: false,
        disabled: false,
        withShadow: false,
    }
}
