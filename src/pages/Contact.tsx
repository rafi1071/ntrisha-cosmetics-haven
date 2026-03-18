import type { FormEvent } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-20 text-center">
          <p className="uppercase tracking-[0.3em] text-sm text-primary-foreground/80">
            Contact
          </p>
          <h1 className="font-elegant text-4xl md:text-5xl font-bold mt-4">
            We love hearing from you
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-primary-foreground/90 text-lg">
            Whether you need product guidance, order help, or a beauty
            consultation, our team is ready to make your experience effortless.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-soft border-none animate-fade-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Email Us</CardTitle>
              <CardDescription>
                We respond within 24 hours on business days.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-foreground/80 font-medium">
              info@nirjontrishacollection.xyz
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-none animate-fade-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Call Us</CardTitle>
              <CardDescription>Mon-Sat, 10:00 AM - 8:00 PM</CardDescription>
            </CardHeader>
            <CardContent className="text-foreground/80 font-medium">
              +880 1677-622558
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-none animate-fade-in">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Visit Our Studio</CardTitle>
              <CardDescription>By appointment only</CardDescription>
            </CardHeader>
            <CardContent className="text-foreground/80 font-medium">
              123 Beauty Avenue, NYC 10001
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded-2xl p-6 shadow-soft h-full">
              <h2 className="font-elegant text-2xl font-semibold mb-4">
                Concierge Hours
              </h2>
              <p className="text-muted-foreground mb-6">
                Schedule a personalized beauty consultation or ask about limited
                edition launches.
              </p>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Tuesday - Sunday</p>
                  <p className="text-muted-foreground text-sm">10:00 AM - 8:00 PM</p>
                  <p className="text-muted-foreground text-sm">Friday: 10:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="lg:col-span-3 shadow-luxury border-none">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Tell us what you need and we will reach out with personalized
                recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Full name" aria-label="Full name" required />
                  <Input
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    required
                  />
                </div>
                <Input placeholder="Subject" aria-label="Subject" />
                <Textarea
                  placeholder="How can we help you?"
                  aria-label="Message"
                  rows={6}
                  required
                />
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
