import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { IconButton } from "@/components/atoms/Button/IconButton";
import { Arrow } from "@/components/atoms/Icons";

type IconButtonStoryProps = ComponentProps<typeof IconButton> & {
  direction?: "up" | "right" | "down" | "left";
};

const meta = {
    title: "Atoms/Icon-Button",
    component: IconButton,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Circular icon button with different variations and colors"
            }
        }
    },
    argTypes: {
        onClick: {
            action: "clicked"
        }
    },
    args: {
        onClick: fn()
    }
} satisfies Meta<IconButtonStoryProps>

export default meta

export const Base = {
    argTypes: {
        variant: {
            control: "select",
            options: ["contained", "outlined"],
            description: "Visual style of the button"
        },
        color: {
            control: "select",
            options: ["primary", "secondary"],
            description: "Color theme of the button"
        },
        direction: {
            control: "select",
            options: ["up", "right", "down", "left"],
            description: "Direction of the arrow",
        }
    },
    args: {
        direction: "right",
        variant: "contained",
        color: "primary",
        disabled: false,
        icon: <Arrow direction="right" />
    },

    render: (args: IconButtonStoryProps) => {
        const { direction, ...rest } = args;
        return (
            <IconButton
                {...rest}
                icon={<Arrow direction={direction} />}
            />
        )
    }
} satisfies StoryObj<IconButtonStoryProps>;

export const Navigation = {
    render: () => (
    <div className="flex gap-4">
      <IconButton
        variant="outlined"
        color="primary"
        disabled={true}
        icon={<Arrow direction="left" />}
      />
      <IconButton
        variant="contained"
        color="primary"
        icon={<Arrow direction="right" />}
      />
    </div>
    )
};