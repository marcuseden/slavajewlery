'use client';

import { Header } from '@/components/Header';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing or using Make It Jewelry Studio ("Service"), you agree to be bound by these Terms of Service
              and our Privacy Policy. If you do not agree, do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Service Description</h2>
            <p className="text-gray-300 mb-4">
              We provide an AI-powered custom jewelry design platform where you:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Describe your vision for custom jewelry</li>
              <li>Receive AI-generated photorealistic design images</li>
              <li>Order handcrafted jewelry based on approved designs</li>
              <li>Track production and receive your finished piece</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-white mb-3">3.1 Registration</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>You must be 18 or older to create an account</li>
              <li>Provide accurate, complete information</li>
              <li>Keep your password secure and confidential</li>
              <li>You are responsible for all activity under your account</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">3.2 Account Termination</h3>
            <p className="text-gray-300">
              We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent
              activity, or misuse the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Design Process</h2>
            <h3 className="text-xl font-semibold text-white mb-3">4.1 AI-Generated Designs</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Designs are generated using AI based on your text description</li>
              <li>Images are photorealistic representations, not exact final products</li>
              <li>Final handcrafted jewelry may have minor variations from images</li>
              <li>We review all designs for manufacturability before production</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.2 Design Ownership</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>You own the rights to your custom design specifications</li>
              <li>We retain the right to use anonymized designs in our portfolio</li>
              <li>Designs are not exclusive unless explicitly purchased as such</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Orders and Payment</h2>
            <h3 className="text-xl font-semibold text-white mb-3">5.1 Pricing</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Prices are estimated based on design specifications</li>
              <li>Final price may vary based on actual materials and labor</li>
              <li>All prices in USD unless otherwise specified</li>
              <li>Prices include materials, labor, and standard shipping</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">5.2 Payment Terms</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Payment processed securely via Stripe</li>
              <li>We do not store credit card information</li>
              <li>Payment required before production begins</li>
              <li>All sales are final once production has started</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">5.3 Refunds and Cancellations</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Full refund if canceled before production starts</li>
              <li>50% refund if canceled during early production stages</li>
              <li>No refund once jewelry is completed</li>
              <li>See our Satisfaction Guarantee for quality issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Production and Delivery</h2>
            <h3 className="text-xl font-semibold text-white mb-3">6.1 Timeline</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Standard production: 5-7 business days</li>
              <li>Complex designs may require additional time</li>
              <li>We will notify you of any delays</li>
              <li>Expedited production available for additional fee</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">6.2 Shipping</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Free standard shipping (US)</li>
              <li>International shipping calculated at checkout</li>
              <li>Insured shipping for all orders</li>
              <li>Tracking provided once shipped</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Guarantees and Warranties</h2>
            <h3 className="text-xl font-semibold text-white mb-3">7.1 Quality Guarantee</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>30-day satisfaction guarantee</li>
              <li>Free repairs for manufacturing defects</li>
              <li>Lifetime warranty on craftsmanship</li>
              <li>Free resizing within 60 days</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">7.2 Exclusions</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Normal wear and tear</li>
              <li>Damage from misuse or accidents</li>
              <li>Modifications by third parties</li>
              <li>Lost or stolen items</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Intellectual Property</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>All website content, software, and branding are our property</li>
              <li>You may not reproduce, distribute, or create derivative works</li>
              <li>AI-generated images are for your personal use only</li>
              <li>Trademark "Make It" and all logos are protected</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. User Conduct</h2>
            <p className="text-gray-300 mb-4">You agree NOT to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Submit offensive, harmful, or inappropriate content</li>
              <li>Attempt to hack, disrupt, or overload the Service</li>
              <li>Use the Service for fraudulent purposes</li>
              <li>Scrape, mine, or extract data from the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-300 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Service provided "AS IS" without warranties</li>
              <li>We are not liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability limited to the amount you paid for the order</li>
              <li>We are not responsible for third-party services (Stripe, OpenAI)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">11. Indemnification</h2>
            <p className="text-gray-300">
              You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your
              use of the Service, violation of these terms, or infringement of third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">12. Dispute Resolution</h2>
            <h3 className="text-xl font-semibold text-white mb-3">12.1 Governing Law</h3>
            <p className="text-gray-300 mb-4">
              These terms are governed by the laws of New York, United States.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">12.2 Arbitration</h3>
            <p className="text-gray-300">
              Disputes will be resolved through binding arbitration, except for small claims court matters or
              intellectual property disputes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">13. Changes to Terms</h2>
            <p className="text-gray-300">
              We may update these terms at any time. Material changes will be notified via email 30 days in advance.
              Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">14. Severability</h2>
            <p className="text-gray-300">
              If any provision is found unenforceable, the remaining provisions remain in full effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">15. Contact</h2>
            <div className="text-gray-300">
              <p><strong>Legal Inquiries:</strong> legal@makeitjewelry.com</p>
              <p><strong>Customer Support:</strong> support@makeitjewelry.com</p>
              <p><strong>Address:</strong> Make It Jewelry Studio, New York, NY</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

