import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  website: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  brief: z.string().min(10, "Please provide a brief description"),
  startDate: z.string().min(1, "Please select a preferred start date"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

const GetStarted = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success("Thank you! We'll be in touch within 24-48 hours.");
    reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col">
      <Starfield />
      <Header />

      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-2xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-center">
            Get Started
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Tell us about your project and let's bring your vision to life
          </p>

          <Card className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    {...register("businessName")}
                    placeholder="Your business name"
                  />
                  {errors.businessName && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.businessName.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="Your phone number"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.phone.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="website">Current Website (Optional)</Label>
                <Input
                  id="website"
                  {...register("website")}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <Label htmlFor="projectType">Project Type *</Label>
                <select
                  id="projectType"
                  {...register("projectType")}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select a project type</option>
                  <option value="creation">Website Creation</option>
                  <option value="redesign">Website Redesign</option>
                </select>
                {errors.projectType && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.projectType.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="brief">Project Brief *</Label>
                <Textarea
                  id="brief"
                  {...register("brief")}
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  rows={5}
                />
                {errors.brief && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.brief.message as string}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="startDate">Preferred Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register("startDate")}
                />
                {errors.startDate && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.startDate.message as string}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  {...register("consent")}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm">
                  I accept that the above information will be used to contact me about my project inquiry. *
                </Label>
              </div>
              {errors.consent && (
                <p className="text-sm text-destructive">
                  {errors.consent.message as string}
                </p>
              )}

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Launch Your Website
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;