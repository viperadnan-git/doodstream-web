import MessageBox from "@/components/message-box";

export default function NotFound() {
    return (
        <MessageBox title="You are lost!" countdown={30}>
            <p className="text-center text-muted">
                The page you are looking for does not exist.
            </p>
        </MessageBox>
    );
}
