'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CreditCard, MapPin, User, Check, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import { GDPRConsent, GDPRConsents } from '@/components/GDPRConsent';

interface CheckoutData {
  designId?: string;
  customPrompt?: string;
  pricingBreakdown: {
    subtotal: number;
    discount: number;
    commission: number;
    total: number;
  };
  images?: any[];
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

function CheckoutPageContent() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [step, setStep] = useState(1); // 1: GDPR Consent, 2: Shipping Info, 3: Payment, 4: Confirmation
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [gdprConsents, setGdprConsents] = useState<GDPRConsents | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/?signup=true');
      return;
    }

    // Get checkout data from localStorage or URL params
    const savedData = localStorage.getItem('checkoutData');
    if (savedData) {
      setCheckoutData(JSON.parse(savedData));
    } else {
      // Redirect back if no checkout data
      router.push('/design');
    }
  }, [router, user, loading]);

  const handleGDPRConsentComplete = async (consents: GDPRConsents) => {
    setGdprConsents(consents);
    
    // Record consent in database
    if (user) {
      try {
        await fetch('/api/user/consent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            consentType: 'privacy',
            consentGiven: consents.privacyAccepted,
            consentVersion: consents.consentVersion,
            consentText: 'Privacy policy accepted during checkout'
          })
        });

        await fetch('/api/user/consent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            consentType: 'terms',
            consentGiven: consents.termsAccepted,
            consentVersion: consents.consentVersion,
            consentText: 'Terms of service accepted during checkout'
          })
        });

        if (consents.marketingConsent) {
          await fetch('/api/user/consent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user.id,
              consentType: 'marketing',
              consentGiven: true,
              consentVersion: consents.consentVersion,
              consentText: 'Marketing consent granted during checkout'
            })
          });
        }
      } catch (error) {
        console.error('Failed to record consent');
      }
    }
    
    setStep(2);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing with Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order in database
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...checkoutData,
          shippingInfo,
          paymentMethod,
          gdprConsents,
          stripePaymentIntentId: 'pi_mock_' + Math.random().toString(36)
        })
      });

      const order = await orderResponse.json();
      setOrderId(order.id);
      setStep(4);
      
      // Clear checkout data
      localStorage.removeItem('checkoutData');
      
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading || !checkoutData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative">
        {/* Luxury Velvet Black Background */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)',
            backgroundSize: 'cover',
          }}
        />
        
        {/* Velvet texture overlay */}
        <div 
          className="fixed inset-0 z-1 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.03) 0px,
                transparent 1px,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 3px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.03) 0px,
                transparent 1px,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 3px
              )
            `,
            opacity: 0.4
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <Header />
          <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-white text-black' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {step > stepNumber ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-white' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div>
              {step === 1 && (
                <div className="bg-black/30 backdrop-blur-md rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Privacy & Data Protection
                  </h2>
                  
                  <GDPRConsent
                    context="checkout"
                    showMarketing={true}
                    required={true}
                    onConsentChange={handleGDPRConsentComplete}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="bg-black/30 backdrop-blur-md rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <User className="w-6 h-6" />
                    Shipping Information
                  </h2>
                  
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo(prev => ({...prev, firstName: e.target.value}))}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo(prev => ({...prev, lastName: e.target.value}))}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none"
                      />
                    </div>
                    
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo(prev => ({...prev, email: e.target.value}))}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none"
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo(prev => ({...prev, phone: e.target.value}))}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none"
                    />
                    
                    <input
                      type="text"
                      placeholder="Street Address"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo(prev => ({...prev, address: e.target.value}))}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none"
                    />
                    
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo(prev => ({...prev, city: e.target.value}))}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo(prev => ({...prev, state: e.target.value}))}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo(prev => ({...prev, zipCode: e.target.value}))}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 h-12 text-lg font-semibold">
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="bg-black/30 backdrop-blur-md rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6" />
                    Payment Method
                  </h2>
                  
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                          className="w-4 h-4"
                        />
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="text-white">Credit/Debit Card</span>
                      </label>
                      
                      <label className="flex items-center gap-3 p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                          className="w-4 h-4"
                        />
                        <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          P
                        </div>
                        <span className="text-white">PayPal</span>
                      </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
                          <p className="text-yellow-400 text-sm mb-3">🚧 Stripe Integration Placeholder</p>
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Card Number"
                              className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                              defaultValue="4242 4242 4242 4242"
                              disabled
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                                defaultValue="12/25"
                                disabled
                              />
                              <input
                                type="text"
                                placeholder="CVC"
                                className="p-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400"
                                defaultValue="123"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button 
                        type="button"
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      
                      <Button 
                        type="submit" 
                        disabled={isProcessing}
                        className="flex-1 bg-white text-black hover:bg-gray-200 h-12 text-lg font-semibold"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                            Processing...
                          </div>
                        ) : (
                          `Pay $${checkoutData.pricingBreakdown.total.toLocaleString()}`
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {step === 4 && (
                <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h2>
                  <p className="text-gray-300 mb-4">Order #{orderId}</p>
                  
                  <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-white mb-2">What's Next?</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span>Design review & approval (1-2 days)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>Handcrafting by NYC masters (3-4 days)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span>Quality check & shipping (1 day)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link href="/dashboard">
                      <Button className="w-full bg-white text-black hover:bg-gray-200">
                        View Order Status
                      </Button>
                    </Link>
                    <Link href="/designs">
                      <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                        Browse More Designs
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 h-fit">
              <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
              
              {checkoutData.images && checkoutData.images.length > 0 && (
                <div className="mb-4">
                  <img
                    src={checkoutData.images[0]?.url || checkoutData.images[0]?.local_url}
                    alt="Design"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white">${checkoutData.pricingBreakdown.subtotal.toLocaleString()}</span>
                </div>
                
                {checkoutData.pricingBreakdown.discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-${checkoutData.pricingBreakdown.discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span className="text-white">Free</span>
                </div>
                
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-white">Total</span>
                    <span className="text-white">${checkoutData.pricingBreakdown.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-white mb-2">🏆 Premium Guarantees</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>✓ 5-day delivery guaranteed</li>
                  <li>✓ Lifetime warranty & repairs</li>
                  <li>✓ 30-day satisfaction guarantee</li>
                  <li>✓ Free resizing within 60 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthProvider>
      <CheckoutPageContent />
    </AuthProvider>
  );
}
