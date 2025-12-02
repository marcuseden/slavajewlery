import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Award, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            SLAVA
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              My Designs
            </Link>
            <Button asChild size="sm">
              <Link href="/design">Design Now</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Design Studio</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Design Your Own
            <br />
            One-of-One Jewelry
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bring your vision to life. AI-generated designs, handcrafted by master jewelers in NYC.
            From $1,000 to $4,000.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/design">
                <Sparkles className="w-5 h-5" />
                Design Your Piece
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="#collections">Explore Collections</Link>
            </Button>
          </div>

          {/* Price Range Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <span className="text-lg font-semibold">$1,000</span>
            <span className="text-muted-foreground">—</span>
            <span className="text-lg font-semibold">$4,000</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Vision</h3>
              <p className="text-muted-foreground">
                Answer a few questions about style, metal, stones, and describe your dream piece in your own words.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Creates Your Design</h3>
              <p className="text-muted-foreground">
                Our AI generates a manufacturable design spec and 5 photorealistic images showing your piece from every angle.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Handcrafted in NYC</h3>
              <p className="text-muted-foreground">
                Our master jewelers review, approve, and craft your unique piece with meticulous attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card">
              <Award className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Master Craftsmanship</h3>
              <p className="text-sm text-muted-foreground">
                Every piece handcrafted by experienced NYC jewelers with decades of expertise.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card">
              <Sparkles className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">AI-Powered Design</h3>
              <p className="text-sm text-muted-foreground">
                State-of-the-art AI ensures your vision is manufacturable and stunning.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-card">
              <Shield className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                Rigorous QA process and final approval by expert jewelers before production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Celebrity Collections Placeholder */}
      <section id="collections" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Celebrity Collections
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Coming Soon - Curated designs inspired by iconic styles
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-muted/50 border border-border flex items-center justify-center"
              >
                <span className="text-muted-foreground">Collection {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Create Your Masterpiece?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start designing your one-of-a-kind jewelry piece in minutes.
          </p>
          <Button asChild size="lg">
            <Link href="/design">
              <Sparkles className="w-5 h-5" />
              Start Designing Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SLAVA</h3>
              <p className="text-sm text-muted-foreground">
                Custom one-of-one jewelry, handcrafted in NYC.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/design" className="hover:text-foreground transition-colors">Design Tool</Link></li>
                <li><Link href="#collections" className="hover:text-foreground transition-colors">Collections</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">My Designs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Slava Jewelry Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
