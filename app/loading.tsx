import Center from "@/components/layouts/center";
import { SpinnerIcon } from "@/components/icons";

export default function Loading() {
    return (
        <Center>
            <div role="status">
                <SpinnerIcon className="size-14 text-primary animate-spin"></SpinnerIcon>
                <span className="sr-only">Loading...</span>
            </div>
        </Center>
    );
}
