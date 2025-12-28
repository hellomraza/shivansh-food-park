'use client';

import { Navigation } from '@/components/Navigation';
import { ReviewCarousel } from '@/components/ReviewCarousel';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContactSubmission } from '@/hooks/use-restaurant';
import { insertContactSchema, type InsertContact } from '@/lib/schema';
import type { PlaceDetails } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Clock, Loader2, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface HomeClientProps {
  restaurant: PlaceDetails;
  initialPhotoUrls: Record<string, string>;
}

interface PhotoUrl {
  [key: string]: string;
}

export function HomeClient({ restaurant, initialPhotoUrls }: HomeClientProps) {
  const contactMutation = useContactSubmission();
  const [photoUrls] = useState<PhotoUrl>(initialPhotoUrls);

  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-background z-10" />
          {/* Restaurant interior hero - use first Google Maps photo or fallback */}
          {restaurant.photos && restaurant.photos.length > 0 && photoUrls['photo_0'] ? (
            <Image
              src={photoUrls['photo_0']}
              alt={`${restaurant.name} Interior`}
              fill
              priority
              fetchPriority="high"
              className="object-cover"
              sizes="100vw"
              quality={80}
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMxMjUyMCIvPjwvc3ZnPg=="
              placeholder="blur"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-r from-amber-900 to-amber-700" />
          )}
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
              Welcome to
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              {restaurant.name}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the art of culinary excellence in an atmosphere of refined elegance.
              Where every dish tells a story of tradition and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-black hover:bg-white hover:text-black transition-all duration-300 font-semibold px-8 py-6 text-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Reserve a Table
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all duration-300 px-8 py-6 text-lg"
                asChild
              >
                <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
                  View on Map
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-background relative">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading 
                title="A Legacy of Taste" 
                subtitle="Our Story" 
                alignment="left"
              />
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Located at {restaurant.formatted_address}, Shivansh Food Park has established itself as a beacon of culinary delight. 
                With a {restaurant.rating} star rating from over {restaurant.user_ratings_total} satisfied guests, 
                we pride ourselves on delivering an unforgettable dining experience.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Our chefs meticulously select the finest ingredients to craft dishes that are both visually stunning 
                and exceptionally delicious. Whether you&apos;re joining us for a casual lunch or a celebratory dinner, 
                expect nothing less than perfection.
              </p>
              
              <div className="flex gap-8 border-t border-border pt-8">
                <div>
                  <h4 className="text-primary text-3xl font-serif font-bold mb-1">{restaurant.rating}</h4>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground">Stars Rating</p>
                </div>
                <div>
                  <h4 className="text-primary text-3xl font-serif font-bold mb-1">{restaurant.user_ratings_total}+</h4>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground">Reviews</p>
                </div>
                <div>
                  <h4 className="text-primary text-3xl font-serif font-bold mb-1">{restaurant.opening_hours?.open_now ? 'Open' : 'Closed'}</h4>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground">Status Now</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 border-2 border-primary/20 z-0 translate-x-4 translate-y-4" />
              {restaurant.photos && restaurant.photos.length > 1 && photoUrls['photo_1'] ? (
                <Image 
                  src={photoUrls['photo_1']} 
                  alt="Restaurant Interior" 
                  width={400}
                  height={250}
                  className="relative z-10 w-full shadow-2xl"
                />
              ) : restaurant.photos && restaurant.photos.length > 0 && photoUrls['photo_0'] ? (
                <Image 
                  src={photoUrls['photo_0']} 
                  alt="Restaurant Interior" 
                  width={400}
                  height={250}
                  className="relative z-10 w-full shadow-2xl"
                />
              ) : (
                <div className="relative z-10 w-full aspect-4/3 bg-linear-to-br from-gray-800 to-gray-900 shadow-2xl" />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeading title="Culinary Masterpieces" subtitle="Our Gallery" />
          
          {restaurant.photos && restaurant.photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurant.photos.slice(0, 6).map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden aspect-4/3 rounded-sm cursor-pointer"
                >
                  {photoUrls[`photo_${index}`] ? (
                    <Image 
                      src={photoUrls[`photo_${index}`]} 
                      alt={`Restaurant photo ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-gray-700 to-gray-800 animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white font-serif text-xl italic border-b border-primary pb-1">View</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No photos available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading title="Guest Experiences" subtitle="Testimonials" />
          <ReviewCarousel reviews={restaurant.reviews} />
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="contact" className="py-24 bg-card relative border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <SectionHeading title="Get in Touch" subtitle="Contact Us" alignment="left" />
              <p className="text-muted-foreground mb-8">
                Have a question or want to make a reservation? Send us a message and we&apos;ll get back to you promptly.
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-background border-border focus:border-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} className="bg-background border-border focus:border-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How can we help you?" className="min-h-30 bg-background border-border focus:border-primary/50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-white hover:text-black font-semibold py-6"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Info & Map */}
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="bg-background border-border">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <MapPin />
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">Location</h3>
                    <p className="text-muted-foreground text-sm">{restaurant.formatted_address}</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-background border-border">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <Phone />
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">Phone</h3>
                    <p className="text-muted-foreground text-sm">{restaurant.formatted_phone_number}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-background border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-primary" />
                    <h3 className="font-serif font-bold text-lg">Opening Hours</h3>
                  </div>
                  <ul className="space-y-2">
                    {restaurant.opening_hours?.weekday_text?.map((hours, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
                        <span>{hours.split(': ')[0]}</span>
                        <span className="font-medium text-foreground">{hours.split(': ')[1]}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Map Embed - Pinned Location */}
              <div className="w-full h-75 bg-secondary/50 rounded-lg overflow-hidden relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://maps.google.com/maps?q=loc:${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
                  className="filter grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  title={`Map pinned to ${restaurant.name}`}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-12 border-t border-white/10 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-primary tracking-tighter mb-6">
            {restaurant.name}
          </h2>
          <div className="flex justify-center gap-6 mb-8 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} {restaurant.name}. All rights reserved. Designed with precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
