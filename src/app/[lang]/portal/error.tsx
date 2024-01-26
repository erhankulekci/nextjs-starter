"use client";
import { Button } from "@/components";
// Error components must be Client Components

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main>
            <section>
                <div style={{ textAlign: "center", fontSize: "24px" }}>
                    <h2>Oops, something went wrong!</h2>
                    <h5 style={{ marginTop: "1rem" }}>
                        change this in app/lang/auth/portal/error.tsx
                    </h5>
                    <h4>{error.message}</h4>
                    <div style={{ margin: 5 }}>
                        <Button onClick={reset} buttontype="secondary">
                            Try again
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
