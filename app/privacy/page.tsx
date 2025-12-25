'use client';

import { Header } from '@/components/Header';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Data Controller</h2>
            <p className="text-gray-300 mb-4">
              Make It Jewelry Studio operates this website and is the data controller responsible for your personal information.
            </p>
            <p className="text-gray-300">
              Contact: privacy@makeitjewelry.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Data We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 Personal Information</h3>
            <p className="text-gray-300 mb-4">
              When you create an account or place an order, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Account Data:</strong> Email address, full name, password (encrypted)</li>
              <li><strong>Shipping Information:</strong> Name, address, phone number, email</li>
              <li><strong>Payment Information:</strong> Processed securely by Stripe (we never store card details)</li>
              <li><strong>Design Data:</strong> Your jewelry design specifications and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.2 Automatically Collected Data</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent (anonymized)</li>
              <li><strong>Technical Data:</strong> Browser type, device information (no IP addresses logged)</li>
              <li><strong>Authentication Data:</strong> Login timestamps, OAuth provider (Google/Apple)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Lawful Basis for Processing (GDPR)</h2>
            <p className="text-gray-300 mb-4">We process your data based on:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Contract:</strong> To fulfill your jewelry orders and provide services</li>
              <li><strong>Consent:</strong> For marketing communications (opt-in only)</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
              <li><strong>Legal Obligation:</strong> To comply with tax and accounting laws (7-year retention)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. How We Use Your Data</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Process and fulfill your jewelry orders</li>
              <li>Generate AI-powered jewelry designs based on your preferences</li>
              <li>Communicate order status and updates</li>
              <li>Provide customer support</li>
              <li>Improve our AI models and user experience (anonymized data only)</li>
              <li>Send marketing emails (only with your consent - opt-out anytime)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing</h2>
            <p className="text-gray-300 mb-4">We share your data only with:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Payment Processors:</strong> Stripe (for secure payment processing)</li>
              <li><strong>AI Services:</strong> OpenAI (design descriptions only, no personal data)</li>
              <li><strong>Hosting:</strong> Vercel and Supabase (encrypted data storage)</li>
              <li><strong>Shipping:</strong> Courier services (only shipping address when applicable)</li>
            </ul>
            <p className="text-gray-300">
              <strong>We NEVER sell your personal data to third parties.</strong>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
            <table className="w-full text-gray-300 mb-4">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-2">Data Type</th>
                  <th className="text-left py-2">Retention Period</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2">Account Data</td>
                  <td className="py-2">Until deletion requested or 3 years of inactivity</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2">Order Data</td>
                  <td className="py-2">7 years (legal/accounting requirement)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2">Design Drafts</td>
                  <td className="py-2">1 year of inactivity, then deleted</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2">Consent Logs</td>
                  <td className="py-2">10 years (compliance requirement)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2">Audit Logs</td>
                  <td className="py-2">7 years (security requirement)</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your GDPR Rights</h2>
            <p className="text-gray-300 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of all your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
              <li><strong>Erasure (Right to be Forgotten):</strong> Delete your account and data</li>
              <li><strong>Data Portability:</strong> Export your data in machine-readable format (JSON)</li>
              <li><strong>Restrict Processing:</strong> Limit how we use your data</li>
              <li><strong>Withdraw Consent:</strong> Opt-out of marketing at any time</li>
              <li><strong>Object:</strong> Object to processing based on legitimate interest</li>
            </ul>
            <p className="text-gray-300 mb-4">
              To exercise these rights, visit your account settings or email privacy@makeitjewelry.com
            </p>
            <p className="text-gray-300">
              <strong>Response Time:</strong> We will respond within 30 days (GDPR requirement)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Data Security</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
              <li>Passwords hashed with bcrypt (never stored in plain text)</li>
              <li>Access controls with role-based permissions</li>
              <li>Regular security audits and penetration testing</li>
              <li>No PII in application logs (automated scrubbing)</li>
              <li>Multi-factor authentication available for admins</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
            <p className="text-gray-300 mb-4">
              Your data may be processed in the United States and EU. We ensure adequate protection through:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Standard Contractual Clauses (SCCs) with service providers</li>
              <li>GDPR-compliant data processing agreements</li>
              <li>Encryption in transit and at rest</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Cookies and Tracking</h2>
            <p className="text-gray-300 mb-4">We use:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Authentication and session management (required)</li>
              <li><strong>Analytics:</strong> Anonymized usage statistics (opt-out available)</li>
              <li><strong>No Third-Party Advertising Cookies</strong></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">11. Children's Privacy</h2>
            <p className="text-gray-300">
              Our services are not intended for users under 18. We do not knowingly collect data from children.
              If you believe we have collected data from a minor, contact us immediately for deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Policy</h2>
            <p className="text-gray-300">
              We will notify you of material changes via email (30 days notice). Continued use after changes
              constitutes acceptance. Policy version is tracked with each consent record.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">13. Complaints</h2>
            <p className="text-gray-300 mb-4">
              If you believe we are not complying with GDPR, you can:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Contact us: privacy@makeitjewelry.com</li>
              <li>File a complaint with your local data protection authority</li>
              <li>EU residents: Contact your national supervisory authority</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Information</h2>
            <div className="text-gray-300">
              <p><strong>Data Protection Officer:</strong> dpo@makeitjewelry.com</p>
              <p><strong>Privacy Inquiries:</strong> privacy@makeitjewelry.com</p>
              <p><strong>General Support:</strong> support@makeitjewelry.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

