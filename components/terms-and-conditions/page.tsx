// app/terms-and-conditions/page.tsx
export default function TermsAndConditions() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Policies</h1>

      {/* Terms of Service */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Terms of Service</h2>
        <p className="mb-4">
          By using Sommario AI at{" "}
          <a
            href="https://sommario-ai.vercel.app"
            className="text-blue-600 underline"
          >
            https://sommario-ai.vercel.app
          </a>
          , you agree to be bound by these Terms of Service.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You may not use this service for illegal or harmful purposes.</li>
          <li>
            You retain full responsibility for the use of summaries and outputs
            provided by our AI.
          </li>
          <li>
            We reserve the right to suspend or terminate accounts that violate
            our policies.
          </li>
          <li>
            The service is provided “as is” without warranties of any kind.
          </li>
        </ul>
      </section>

      {/* Privacy Policy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
        <p className="mb-4">
          Your privacy is important to us. This policy explains how we handle
          your information.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            We collect only the necessary information to operate the service,
            such as your email and PDF content.
          </li>
          <li>
            All uploaded PDFs are processed securely and are not shared with
            third parties.
          </li>
          <li>
            We may store summaries for improving our services, but these are
            anonymized and not linked to your identity.
          </li>
          <li>
            We use third-party services (e.g., Clerk, Paddle) for authentication
            and payments — they have their own privacy policies.
          </li>
        </ul>
      </section>

      {/* Refund Policy */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-2">Refund Policy</h2>
        <p className="mb-4">
          We want you to be happy with your purchase. If you’re not satisfied,
          you can request a refund.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Refunds are considered on a case-by-case basis.</li>
          <li>
            You can email us at{" "}
            <a
              href="mailto:radhakrishn0181@gmail.com"
              className="text-blue-600 underline"
            >
              support@sommario-ai.vercel.app
            </a>{" "}
            to initiate a refund request.
          </li>
          <li>We usually respond within a few business days.</li>
        </ul>
      </section>

      <p className="text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString("en-US")}
      </p>
    </main>
  );
}
