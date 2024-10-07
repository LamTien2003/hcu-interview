import { ButtonProps as RadixButtonProps } from "@radix-ui/themes";

enum ButtonSize {
  ExtraSmall = "1",
  Small = "2",
  Medium = "3",
  Large = "4",
}
enum ButtonVariant {
  Classic = "classic",
  Solid = "solid",
  Soft = "soft",
  Surface = "surface",
  Outline = "outline",
  Ghost = "ghost",
}

export default interface ButtonProps extends RadixButtonProps {}
export { ButtonSize, ButtonVariant };
