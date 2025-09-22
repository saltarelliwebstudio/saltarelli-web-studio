import React, { useState } from "react";
import { Mail, Phone, Send, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    projectType: "",
    budget: "",
    brief: "",
    startDate: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please accept the consent to be contacted.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the form data to your backend
    toast({
      title: "Form Submitted!",
      description: "Thank you for your interest. I'll be in touch within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      businessName: "",
      email: "",
      phone: "",
      website: "",
      projectType: "",
      budget: "",
      brief: "",
      startDate: "",
      consent: false,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Starfield />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Let's Work Together
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to bring your website vision to life? Let's talk.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="bg-card/50 backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle>Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href="mailto:info@saltarelliwebstudio.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail size={20} />
                    <span className="text-sm">info@saltarelliwebstudio.com</span>
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone size={20} />
                    <span className="text-sm">(123) 456-7890</span>
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    I typically respond within 24 hours during business days.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span className="text-sm">Mon - Fri: 9am - 6pm EST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-primary" />
                      <span className="text-sm">Free consultation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Discovery Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Project Discovery Form</CardTitle>
                  <CardDescription>
                    Fill out this form to get started. The more details you provide, 
                    the better I can understand your needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          required
                          placeholder="ABC Company"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website">Current Website (if any)</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, projectType: value }))
                          }
                        >
                          <SelectTrigger id="projectType">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New Website</SelectItem>
                            <SelectItem value="redesign">Website Redesign</SelectItem>
                            <SelectItem value="update">Website Update</SelectItem>
                            <SelectItem value="consultation">Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Range *</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, budget: value }))
                          }
                        >
                          <SelectTrigger id="budget">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">$499 - Basic Plan</SelectItem>
                            <SelectItem value="growth">$799 - Growth Plan</SelectItem>
                            <SelectItem value="custom">Custom Quote Needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="brief">Project Brief *</Label>
                      <Textarea
                        id="brief"
                        name="brief"
                        value={formData.brief}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Tell me about your project goals, target audience, and any specific features you need..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="startDate">Preferred Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, consent: checked as boolean }))
                        }
                      />
                      <Label htmlFor="consent" className="text-sm text-muted-foreground">
                        I accept that the above information will be used to contact me 
                        about my project inquiry. *
                      </Label>
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Launch Your Website <Send className="ml-2" size={20} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;