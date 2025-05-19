import type { Meta, StoryObj } from "@storybook/react"
import { HelperText } from "@/components/atoms/HelperText/HelperText";

const meta = {
    title: "Atoms/HelperText",
    component: HelperText,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Helper text to display below an input for additional description"
            }
        }
    }
} satisfies Meta<typeof HelperText>

export default meta;

export const Base = {
    argTypes: {
        children: {
            control: "text",
            description: "HelperText content"
        }
    },

    args: {
        children: "We'll only use it for spam"
    }
} satisfies StoryObj<typeof HelperText>

