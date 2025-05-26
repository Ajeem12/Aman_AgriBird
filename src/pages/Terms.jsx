import React from "react";

const Terms = () => {
  return (
    <>
      <div className=" p-6 sm:p-10">
        {/* Page Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Please read these terms and conditions carefully before using our
            services.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to [Your Company Name]. By accessing or using our website,
            you agree to comply with and be bound by the following terms and
            conditions. If you do not agree with these terms, please do not use
            our services.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            User Responsibilities
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>
              You must provide accurate and up-to-date information when creating
              an account.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              You agree to use our services only for lawful purposes and in
              compliance with all applicable laws.
            </li>
            <li>
              You are responsible for all activities that occur under your
              account.
            </li>
          </ul>
        </section>

        {/* Prohibited Activities */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Prohibited Activities
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>Engaging in fraudulent or deceptive activities.</li>
            <li>
              Uploading or sharing harmful, offensive, or illegal content.
            </li>
            <li>
              Attempting to gain unauthorized access to our systems or other
              users' accounts.
            </li>
            <li>
              Using our services to distribute spam, malware, or other harmful
              content.
            </li>
            <li>Violating any applicable laws or regulations.</li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To the fullest extent permitted by law, [Your Company Name] shall
            not be liable for any indirect, incidental, special, or
            consequential damages arising out of or in connection with your use
            of our services. This includes, but is not limited to, damages for
            loss of profits, data, or other intangible losses.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to update or modify these terms and conditions
            at any time without prior notice. Your continued use of our services
            after any changes indicates your acceptance of the updated terms.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns about these terms and
            conditions, please contact us:
          </p>
          <ul className="list-none mt-4 space-y-2">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@ecommerce.com"
                className="text-teal-600 hover:underline"
              >
                support@ecommerce.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-teal-600 hover:underline"
              >
                +1 234 567 890
              </a>
            </li>
            <li>
              <strong>Address:</strong> 123 E-Commerce St, Online City, EC 12345
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Terms;
