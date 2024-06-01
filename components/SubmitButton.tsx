import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface Props {
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    text?: string;
}
export default function SubmitButton({ size = "default", variant = "default", text = "Submit" }: Props) {

    const { pending } = useFormStatus();

    return (
        <Button size={size} type="submit" className="active:scale-95" variant={variant} aria-disabled={pending}>{text}</Button>
    )
}