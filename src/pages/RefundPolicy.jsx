import React from "react";

const RefundPolicy = () => {
  return (
    <>
      <div className=" p-6 sm:p-10">
        {/* Page Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Refund Policy</h1>
          <p className="mt-4 text-lg text-gray-600">
            Learn about our refund policy and how we handle returns and refunds.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At [Your Company Name], we strive to ensure customer satisfaction
            with every purchase. If you are not entirely satisfied with your
            purchase, we’re here to help. Please read our refund policy
            carefully to understand the terms and conditions.
          </p>
        </section>

        {/* Eligibility for Refunds */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Eligibility for Refunds
          </h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>Items must be returned within 30 days of purchase.</li>
            <li>
              Items must be unused, in their original packaging, and in the same
              condition as received.
            </li>
            <li>
              Proof of purchase (receipt or order confirmation) is required.
            </li>
            <li>
              Certain items, such as perishable goods, custom products, or gift
              cards, are non-refundable.
            </li>
          </ul>
        </section>

        {/* Refund Process */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Refund Process
          </h2>
          <ol className="list-decimal list-inside text-gray-700 leading-relaxed space-y-2">
            <li>
              <strong>Initiate a Return:</strong> Contact our customer support
              team at{" "}
              <a
                href="mailto:support@ecommerce.com"
                className="text-teal-600 hover:underline"
              >
                support@ecommerce.com
              </a>{" "}
              or call us at{" "}
              <a
                href="tel:+1234567890"
                className="text-teal-600 hover:underline"
              >
                +1 234 567 890
              </a>{" "}
              to initiate a return.
            </li>
            <li>
              <strong>Return the Item:</strong> Ship the item back to us using
              the address provided by our support team. Ensure the item is
              securely packaged to avoid damage during transit.
            </li>
            <li>
              <strong>Refund Approval:</strong> Once we receive and inspect the
              returned item, we will notify you of the approval or rejection of
              your refund.
            </li>
            <li>
              <strong>Receive Your Refund:</strong> If approved, your refund
              will be processed, and the amount will be credited to your
              original payment method within 7-10 business days.
            </li>
          </ol>
        </section>
      </div>
    </>
  );
};

export default RefundPolicy;
