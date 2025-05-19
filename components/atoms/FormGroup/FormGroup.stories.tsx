import type { Meta, StoryObj } from "@storybook/react"
import { FormGroup } from "@/components/atoms/FormGroup/FormGroup";
import {Input} from "@/components/molecules/Input";
import {Label} from "@/components/atoms/Label";
import {HelperText} from "@/components/atoms/HelperText";

const meta = {
    title: "Atoms/FormGroup",
    component: FormGroup,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "A flexible wrapper used to group form elements."
            }
        }
    },
    decorators: [
        (Story) => (
            <div className={"min-w-[350px] bg-cream p-14 rounded-xl"}>
                <Story />
            </div>
        )
    ]
} satisfies Meta<typeof FormGroup>

export default meta;

export const Default = {
  args: {
    children: (
      <>
        <Label htmlFor={"email"}>
            Email address
        </Label>
        <Input id="email" type="text" placeholder="you@example.com" />
      </>
    ),
  },
} satisfies StoryObj<typeof FormGroup> ;

export const WithHelperText = {
  args: {
    children: (
      <>
        <Label htmlFor={"email"}>
            Email address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
        />
        <HelperText>
            We'll only use this for spam
        </HelperText>
      </>
    ),
  },
} satisfies StoryObj<typeof FormGroup>;

export const RequiredWithHelperText = {
  args: {
    children: (
      <>
        <Label htmlFor={"password"} required>
            Create a Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
        />
        <HelperText>
            Must be at least 8 characters
        </HelperText>
      </>
    ),
  },
} satisfies StoryObj<typeof FormGroup>;
