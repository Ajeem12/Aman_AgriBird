import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className=" p-6 sm:p-10">
        {/* Page Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Learn how we collect, use, and protect your personal information.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At [Your Company Name], we value your privacy and are committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, and safeguard your data when you use our
            website and services.
          </p>
        </section>

        {/* Data Collection */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What Data We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>
              Personal information such as your name, email address, phone
              number, and address.
            </li>
            <li>
              Payment information, including credit card details, for processing
              transactions.
            </li>
            <li>Account details such as username and password.</li>
            <li>
              Browsing data, including IP address, browser type, and pages
              visited.
            </li>
            <li>
              Any other information you provide voluntarily, such as feedback or
              survey responses.
            </li>
          </ul>
        </section>

        {/* Data Usage */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How We Use Your Data
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>To process and fulfill your orders.</li>
            <li>To provide customer support and respond to your inquiries.</li>
            <li>
              To send you updates, promotions, and marketing communications.
            </li>
            <li>To improve our website, products, and services.</li>
            <li>
              To comply with legal obligations and prevent fraudulent
              activities.
            </li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How We Share Your Data
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell your personal information to third parties. However,
            we may share your data with:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mt-4">
            <li>
              Service providers who assist us in operating our website and
              services.
            </li>
            <li>Payment processors to handle transactions securely.</li>
            <li>
              Law enforcement or regulatory authorities when required by law.
            </li>
            <li>
              Third parties in connection with a business transfer, such as a
              merger or sale.
            </li>
          </ul>
        </section>

        {/* User Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mt-4">
            <li>
              Access and review the personal information we hold about you.
            </li>
            <li>Request corrections to inaccurate or incomplete data.</li>
            <li>Request the deletion of your personal information.</li>
            <li>Opt out of receiving marketing communications.</li>
            <li>Withdraw your consent for data processing at any time.</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
