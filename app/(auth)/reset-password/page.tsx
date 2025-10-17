import { Suspense } from "react";

import ResetPasswordPage from "./_components/ResetPasswordClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
